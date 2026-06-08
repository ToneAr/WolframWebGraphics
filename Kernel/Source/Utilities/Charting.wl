PackageScoped[
	{
		geomTransformPixelMatrix,
		geomTransformWrap,
		chartingUnwrap,
		hoverEffectStyle,
		chartStyleEffectQ,
		chartTransformEffectQ,
		chartEffectAttrs,
		chartEffectMatrixString,
		chartEffectElement,
		clickGroupKey,
		clickGroupAttr
	}
]

(* data-space affine {{a,b,tx},{c,d,ty},{0,0,1}} -> SVG pixel matrix
   {A,B,C,D,E,F} for <g transform="matrix(A B C D E F)"> (x'=A x + C y + E).
   The current data->pixel scale/offset is derived from mapX/mapY.

   GeometricTransformation evaluates TransformationFunction[3x3] to
   {{{a,b},{c,d}},{tx,ty}}, so we accept that evaluated form here. *)
(* Form: {{{a,b},{c,d}},{tx,ty}} (GeometricTransformation evaluated form) *)
geomTransformPixelMatrix[{{{a_, b_}, {c_, d_}}, {tx_, ty_}}] :=
	Module[
		{sx, sy, bx, by, sl11, sl12, sl21, sl22, e, f},
		(* signed data->pixel coeffs: $mapAx/$mapAy/$mapBx/$mapBy are file-private
		   to Properties.wl, and sclX[]/sclY[] drop the sign ($mapAy<0), so derive
		   them from the PackageScoped mapX/mapY: $mapAx = mapX[1]-mapX[0], etc. *)
		sx = mapX[1] - mapX[0];
		bx = mapX[0];
		sy = mapY[1] - mapY[0];
		by = mapY[0];
		If[
			sx == 0 || sy == 0,
			{1, 0, 0, 1, 0, 0}, (* degenerate map: identity, never ComplexInfinity *)
			(* pixel linear = S.L.S^{-1} *)
			sl11 = a;
			sl12 = b  sx / sy;
			sl21 = c  sy / sx;
			sl22 = d;
			(* pixel translation = B + S.t - SL.B *)
			e = bx + sx  tx - (sl11  bx + sl12  by);
			f = by + sy  ty - (sl21  bx + sl22  by);
			{sl11, sl21, sl12, sl22, e, f}
		]
	];
(* Form: {{a,b,tx},{c,d,ty},{0,0,1}} (raw 3x3 homogeneous matrix) *)
geomTransformPixelMatrix[{{a_, b_, tx_}, {c_, d_, ty_}, {_, _, _}}] :=
	geomTransformPixelMatrix[{{{a, b}, {c, d}}, {tx, ty}}];
(* Form: TransformationFunction[3x3 matrix] (unevaluated) *)
geomTransformPixelMatrix[TransformationFunction[m_]] :=
	geomTransformPixelMatrix[m];

(* wrap a serialized primitive in a <g> carrying an SVG pixel-space matrix *)
geomTransformWrap[prim_, mat_, props_] :=
	XMLElement[
		"g",
		{
			"transform" ->
				StringJoin[ "matrix(", StringRiffle[makeSvgNumber /@ mat, " "], ")"]
		},
		{serialize[prim, props]}
	];

(* LightDarkSwitched[light, dark] / [<|...|>] -> the light value. Used both
   as a standalone value (this serialize rule) and as a directive inside
   Style[]/Directive[] (handled in Properties.wl applyDirective via chartingUnwrap). *)
chartingUnwrap[LightDarkSwitched[light_]] := light;
chartingUnwrap[LightDarkSwitched[light_, _]] := light;
chartingUnwrap[LightDarkSwitched[a_Association]] :=
	Lookup[a, "Light", Lookup[a, Automatic, First[Values[a], a]]];
chartingUnwrap[x_] := x;

(* ---- Charting`DelayedMouseEffect / DelayedClickEffect ----------------- *)
(* The effect spec is {tag, payload}: the FIRST element is the transform TYPE,
   either a restyle ("Style" / Style) or an affine transform
   ("GeometricTransformation" / GeometricTransformation). Crucially the tag may
   be a STRING or a Symbol depending on the WL version, so match both. We
   dispatch on the tag for BOTH the mouse (hover) and click wrappers -- e.g. a
   PieChart wedge's click effect is a "GeometricTransformation" (the explode),
   while a hover effect is usually a "Style". *)
(* parse the effect's EdgeForm into an SVG style fragment (tag-agnostic: the
   EdgeForm is found wherever it sits in the spec) *)
hoverEffectStyle[eff_] :=
	Module[{edge, st, parts = {}, col, w, op},
		edge = FirstCase[{eff}, _EdgeForm, EdgeForm[GrayLevel[0.5]], Infinity];
		st =
			Fold[applyDirective, $emptyStyle, Flatten[{First[edge, GrayLevel[0.5]]}]];
		If[!MissingQ[st["Color"]],
			col = colorToSvg[st["Color"]];
			AppendTo[parts, StringJoin[ "stroke:", col["rgb"]]];
			op = (st["Opacity"] /. _Missing -> 1.) * col["alpha"];
			If[NumericQ[op] && op < 1,
				AppendTo[parts, StringJoin[ "stroke-opacity:", makeSvgNumber[op]]]
			]
		];
		w = st["StrokeWidth"] /. _Missing -> ptToUser[1.5];
		AppendTo[parts, StringJoin[ "stroke-width:", makeSvgNumber[w]]];
		StringRiffle[parts, ";"]
	];

(* effect type tests: tag is the first element, String or Symbol *)
chartStyleEffectQ[{tag_, ___}] := MatchQ[tag, "Style" | Style];
chartStyleEffectQ[_] := False;

chartTransformEffectQ[{tag_, ___}] :=
	MatchQ[tag, "GeometricTransformation" | GeometricTransformation];
chartTransformEffectQ[_] := False;

(* the SVG pixel-space matrix string for a transform effect {tag, tf, ___} *)
chartEffectMatrixString[{_, tf_, ___}] :=
	StringJoin[
		"matrix(",
		StringRiffle[makeSvgNumber /@ geomTransformPixelMatrix[tf], " "],
		")"
	];

(* attributes wiring an effect spec to the JS runtime for a given event:
     hover -> data-wgx-hover (restyle) | data-wgx-hover-transform (affine)
     click -> data-wgx-click (affine)  | data-wgx-click-style (restyle)
   An unrecognized tag yields {} (no interactivity, base rendered as-is). *)
chartEffectAttrs["hover", eff_] :=
	Which[
		chartStyleEffectQ[eff],
			{
				"data-wgx-hover" -> hoverEffectStyle[eff],
				"onmouseover" -> "wgxHoverOn(evt)",
				"onmouseout" -> "wgxHoverOff(evt)"
			},
		chartTransformEffectQ[eff],
			{
				"data-wgx-hover-transform" -> chartEffectMatrixString[eff],
				"onmouseover" -> "wgxHoverOn(evt)",
				"onmouseout" -> "wgxHoverOff(evt)"
			},
		True,
			{}
	];
chartEffectAttrs["click", eff_] :=
	Which[
		chartTransformEffectQ[eff],
			{
				"data-wgx-click" -> chartEffectMatrixString[eff],
				"onclick" -> "wgxClickToggle(evt)",
				"style" -> "cursor:pointer"
			},
		chartStyleEffectQ[eff],
			{
				"data-wgx-click-style" -> hoverEffectStyle[eff],
				"onclick" -> "wgxClickToggle(evt)",
				"style" -> "cursor:pointer"
			},
		True,
			{}
	];

(* attach the effect attrs to the base primitive (wrapped in a <g>). When the
   base renders to nothing or the effect is unrecognized, render the base
   unchanged (no empty wrapper, no XMLElement::cnts from a Null child). *)
chartEffectElement[prim_, attrs_, props_] :=
	With[{inner = serialize[prim, props]},
		If[inner === Null || attrs === {},
			inner,
			$wgxNeedsRuntime = True;
			XMLElement["g", {}, {addAttrs[inner, attrs]}]
		]
	];

(* A pie wedge and its label are separate primitives, each with its own
   DelayedClickEffect, but they share one Dynamic[click$NNNN] state variable so
   they explode TOGETHER. Emit that shared variable as a data-wgx-click-group
   key (a stable hash of the Dynamic), and the JS toggles the whole group at
   once. Elements with no Dynamic get no group (toggle individually). *)
clickGroupKey[d_] := StringJoin[ "wgxg-", IntegerString[Hash[d], 36]];

clickGroupAttr[Dynamic[var_, ___]] :=
	{"data-wgx-click-group" -> clickGroupKey[Dynamic[var]]};
clickGroupAttr[_] := {};
