(* wl-disable-file DocCommentInputMismatch *)
serialize // PackageExported;
(* ========================================================================== *)
(*  Top level: Graphics[...] -> full SVG document                             *)
(* ========================================================================== *)
serialize[Graphics[prim_, opts : OptionsPattern[Graphics]]] :=
	serialize[Graphics[{prim}, opts]];
serialize[graphics : Graphics[{prims___}, opts : OptionsPattern[Graphics]]] :=
	svgString[svgElement[graphics]];
serialize[Legended[g_Graphics, legend_]] :=
	svgString[svgElementWithLegend[svgElement[g], legend]];
serialize[Labeled[g_Graphics, label_, pos_ : Top, ___]] :=
	svgString[svgElementWithLabel[svgElement[g], label, pos]];
(* ========================================================================== *)
(*  Directives: anything unrecognized is accumulated as style.                *)
(*  (Specific primitive heads below are matched before this.)                 *)
(* ========================================================================== *)
serialize[someStylePrimitive_, currentProperties_] :=
	(Internal`StuffBag[currentProperties, someStylePrimitive];);
(* ========================================================================== *)
(*  Grouping constructs                                                       *)
(* ========================================================================== *)
serialize[prims_List, props_] :=
	(*
	 * A bare list is a scoped group of primitives; an all-directive / empty
	 * list contributes nothing (Null) so it is dropped instead of leaving <g/>
	 * noise
	 *)
	Module[{
			scope = forkBag[props],
			kids = {},
			i = 1,
			n = Length[prims],
			run,
			node
		},
		If[denseFilledPolygonLayerQ[prims],
			rasterizedGraphicsElement[prims, props],
			While[
				i <= n,
				If[vertexColorPolygonQ[prims[[i]]],
					run = {};
					While[
						i <= n && vertexColorPolygonQ[prims[[i]]],
						AppendTo[run, prims[[i]]];
						i++
					];
					If[denseVertexColorRunQ[run],
						node = rasterizedVertexColorElement[run, scope];
						If[node =!= Null, AppendTo[kids, node]],
						Scan[
							(
								node = serialize[#, scope];
								If[node =!= Null, AppendTo[kids, node]]
							)&,
							run
						]
					],
					node = serialize[prims[[i]], scope];
					If[node =!= Null, AppendTo[kids, node]];
					i++
				]
			];
			If[kids === {}, Null, XMLElement["g", {}, kids]]
		]
	];
serialize[GraphicsGroup[g_, ___], props_] :=
	Module[{
			polys = Cases[g, p_?vertexColorPolygonQ :> p, Infinity],
			rest,
			kids
		},
		Which[
			denseVertexColorRunQ[polys],
				rest = DeleteCases[g, _?vertexColorPolygonQ, Infinity];
				kids =
					DeleteCases[
						{
							rasterizedVertexColorElement[polys, props],
							serialize[rest, props]
						},
						Null
					];
				Which[
					kids === {},
						Null,
					Length[kids] === 1,
						First[kids],
					True,
						XMLElement["g", {}, kids]
				],
			denseFilledPolygonLayerQ[g],
				rasterizedGraphicsElement[GraphicsGroup[g], props],
			True,
				serialize[If[ListQ[g], g, {g}], props]
		]
	];
serialize[Style[prim_, styles___], props_] :=
	(*
	 * Style[expr, dirs...] scopes the directives to expr; a group-level Opacity
	 * becomes <g opacity> (composited as a whole) rather than per-element alpha
	 *)
	Module[{
			specs = {styles},
			op,
			others,
			scope,
			node
		},
		op = Cases[specs, Opacity[a_] :> a];
		op = If[op === {}, None, Last[op]];
		others = If[op === None, specs, DeleteCases[specs, Opacity[_]]];
		scope = forkBag[props];
		Internal`StuffBag[scope, #]& /@ others;
		node = serialize[prim, scope];
		If[op === None,
			node,
			XMLElement["g", {"opacity" -> makeSvgNumber[op]}, {node}]
		]
	];
serialize[gc_GraphicsComplex, props_] :=
	serialize[First[Normal[Graphics[gc], GraphicsComplex]], props];
serialize[Tooltip[expr_, label_, ___], props_] :=
	(*
	 * Tooltip[expr, label]: hover shows a styled box near the cursor.
	 * Label may be a string/expr (text) or a Graphics (rendered nested).
	 * If the inner expr serializes to Null (empty-geometry hit-area sprite),
	 * return Null rather than placing Null in XMLElement children.
	 *)
	Module[{
			target = serialize[expr, props],
			id = uid["tip"]
		},
		If[target === Null,
			Null,
			(
				$wgxNeedsRuntime = True;
				XMLElement[
					"g",
					{},
					{
						addAttrs[
							target,
							{
								"onmouseover" -> StringJoin[ "wgxShowTooltip(evt,'", id, "')"],
								"onmousemove" -> "wgxMoveTooltip(evt)",
								"onmouseout" -> "wgxHideTooltip()"
							}
						],
						XMLElement[
							"g",
							{"id" -> id, "class" -> "wgx-tip", "display" -> "none"},
							tooltipContent[label]
						]
					}
				]
			)
		]
	];
serialize[Mouseover[default_, hover_, ___], props_] :=
	(
		(*
		 * Mouseover[default, hover]: CSS swaps opacity, keeping the default
		 * hit area
		 *)
		$wgxNeedsRuntime = True;
		XMLElement[
			"g",
			{"class" -> "wgx-mo"},
			{
				XMLElement["g", {"class" -> "wgx-mo-d"}, {serialize[default, props]}],
				XMLElement["g", {"class" -> "wgx-mo-h"}, {serialize[hover, props]}]
			}
		]
	);
serialize[Hyperlink[expr_, uri_, ___], props_] :=
	(* Hyperlink: wrap in <a href> (string/URL targets) *)
	XMLElement[
		"a",
		{"href" -> hrefStr[uri], "target" -> "_blank"},
		{serialize[expr, props]}
	];
serialize[Hyperlink[uri : (_String | _URL), ___], props_] :=
	serialize[Hyperlink[hrefStr[uri], uri], props];
serialize[StatusArea[expr_, label_, ___], props_] :=
	(*
	 * StatusArea[expr, label]: hover writes label into the status text.
	 * If the inner content serializes to Null (e.g. empty-geometry hit-area
	 * sprites produced by charting internals), return Null rather than
	 * embedding Null in XMLElement children (which fires XMLElement::cnts).
	 *)
	Module[{inner = serialize[expr, props]},
		If[inner === Null,
			Null,
			(
				$wgxNeedsRuntime = True;
				XMLElement[
					"g",
					{
						"onmouseover" ->
							StringJoin[
								"wgxSetStatus(evt,'",
								jsEsc[If[StringQ[label], label, ToString[label]]],
								"')"
							],
						"onmouseout" -> "wgxClearStatus(evt)"
					},
					{inner}
				]
			)
		]
	];
serialize[Annotation[expr_, meta_, ___], props_] :=
	(*
	 * Annotation[expr, meta]:
	 * - HighlightElements (Plot's hover-coordinate spec): mark the enclosed
	 *   curve(s) so the JS coordinate tool reads {x,y} off them on hover.
	 * - simple metadata (plain string / number): keep as data-annotation.
	 * - other internal charting metadata (private-context tags, etc.): noise,
	 *   render the content only.
	 *)
	Which[
		highlightAnnotationQ[meta],
			Block[{$wgxCurve = True}, serialize[expr, props]],
		annotationMeaningful[meta],
			With[{inner = serialize[expr, props]},
				If[inner === Null,
					Null,
					XMLElement[
						"g",
						{"data-annotation" -> ToString[meta, InputForm]},
						{inner}
					]
				]
			],
		True,
			serialize[expr, props]
	];

graphicsPtsQ[pts_] := MatchQ[pts, {__}] && AllTrue[pts, graphicsPointQ];

(* ========================================================================== *)
(*  Points                                                                    *)
(* ========================================================================== *)
serialize[Point[{x_?NumericQ, y_?NumericQ}], props_] :=
	XMLElement[
		"circle",
		Join[
			{
				"cx" -> xPx[x],
				"cy" -> yPx[y],
				"r" -> makeSvgNumber[getCurrentPointRadius[props]]
			},
			curveClass[],
			{styleAttr[props, "Point"]}
		],
		{}
	];
serialize[Point[pts : {{_?NumericQ, _?NumericQ}..}], props_] :=
	With[{
			r = makeSvgNumber[getCurrentPointRadius[props]]
		},
		XMLElement[
			"g",
			{styleAttr[props, "Point"]},
			Function[
				p,
				XMLElement[
					"circle",
					Join[
						{"cx" -> xPx[p[[1]]], "cy" -> yPx[p[[2]]], "r" -> r},
						curveClass[]
					],
					{}
				]
			] /@ pts
		]
	];
serialize[Point[Scaled[{sx_?NumericQ, sy_?NumericQ}]], props_] :=
	serialize[Point[resolveScaledPt[{sx, sy}]], props];
(* ========================================================================== *)
(*  Lines                                                                     *)
(* ========================================================================== *)
serialize[Line[pts_?graphicsPtsQ], props_] :=
	XMLElement[
		"polyline",
		Join[
			{"points" -> ptsStr[pts]},
			curveClass[],
			getCurrentStyleProps[props, "Stroke"]
		],
		{}
	];
serialize[Line[lines : {_?graphicsPtsQ..}], props_] :=
	XMLElement[
		"g",
		{styleAttr[props, "Stroke"]},
		Function[
			l,
			XMLElement["polyline", Join[{"points" -> ptsStr[l]}, curveClass[]], {}]
		] /@ lines
	];
(* ========================================================================== *)
(*  Arrows (polyline + a per-arrow <marker> head)                             *)
(* ========================================================================== *)
serialize[Arrow[Line[pts_], rest___], props_] := arrowSvg[pts, props];
serialize[Arrow[pts : {{_?NumericQ, _?NumericQ}..}, rest___], props_] :=
	arrowSvg[pts, props];
(* ========================================================================== *)
(*  Circles / arcs (outline -> "Stroke")                                      *)
(* ========================================================================== *)
serialize[Circle[], props_] := serialize[Circle[{0, 0}, 1], props];
serialize[Circle[{x_?NumericQ, y_?NumericQ}], props_] :=
	serialize[Circle[{x, y}, 1], props];
serialize[Circle[{x_?NumericQ, y_?NumericQ}, r_?NumericQ], props_] :=
	XMLElement[
		ellipseTag[r, r],
		Join[ellipseGeom[{x, y}, r, r], {styleAttr[props, "Stroke"]}],
		{}
	];
serialize[
	Circle[{x_?NumericQ, y_?NumericQ}, {rx_?NumericQ, ry_?NumericQ}],
	props_
] :=
	XMLElement[
		ellipseTag[rx, ry],
		Join[ellipseGeom[{x, y}, rx, ry], {styleAttr[props, "Stroke"]}],
		{}
	];
serialize[
	Circle[{x_?NumericQ, y_?NumericQ}, r_?NumericQ, {a1_?NumericQ, a2_?NumericQ}],
	props_
] :=
	XMLElement[
		"polyline",
		{
			"points" -> ptsStr[circlePts[{x, y}, r, {a1, a2}]],
			styleAttr[props, "Stroke"]
		},
		{}
	];
(* ========================================================================== *)
(*  Disks / sectors (region -> "Filled")                                      *)
(* ========================================================================== *)
serialize[Disk[], props_] := serialize[Disk[{0, 0}, 1], props];
serialize[Disk[{x_?NumericQ, y_?NumericQ}], props_] :=
	serialize[Disk[{x, y}, 1], props];
serialize[Disk[{x_?NumericQ, y_?NumericQ}, r_?NumericQ], props_] :=
	filledElement[ellipseTag[r, r], ellipseGeom[{x, y}, r, r], props];
serialize[
	Disk[{x_?NumericQ, y_?NumericQ}, {rx_?NumericQ, ry_?NumericQ}],
	props_
] :=
	filledElement[ellipseTag[rx, ry], ellipseGeom[{x, y}, rx, ry], props];
serialize[
	Disk[{x_?NumericQ, y_?NumericQ}, r_?NumericQ, {a1_?NumericQ, a2_?NumericQ}],
	props_
] :=
	filledElement[
		"polygon",
		{"points" -> ptsStr[Join[{{x, y}}, circlePts[{x, y}, r, {a1, a2}]]]},
		props
	];
(* ========================================================================== *)
(*  Annulus (ring via even-odd fill)                                          *)
(* ========================================================================== *)
serialize[
	Annulus[{x_?NumericQ, y_?NumericQ}, {ri_?NumericQ, ro_?NumericQ}],
	props_
] :=
	filledElement[
		"path",
		{
			"d" ->
				StringJoin[
					closedPath[circlePts[{x, y}, ro, {0, 2  Pi}]],
					" ",
					closedPath[Reverse @ circlePts[{x, y}, ri, {0, 2  Pi}]]
				],
			"fill-rule" -> "evenodd"
		},
		props
	];
(* ========================================================================== *)
(*  Rectangles                                                                *)
(* ========================================================================== *)
serialize[Rectangle[], props_] := serialize[Rectangle[{0, 0}, {1, 1}], props];
serialize[Rectangle[{x1_?NumericQ, y1_?NumericQ}], props_] :=
	serialize[Rectangle[{x1, y1}, {x1 + 1, y1 + 1}], props];
serialize[
	Rectangle[
		{x1_?NumericQ, y1_?NumericQ},
		{x2_?NumericQ, y2_?NumericQ},
		opts : OptionsPattern[]
	],
	props_
] :=
	filledElement[
		"rect",
		Join[
			{
				"x" -> xPx[Min[x1, x2]],
				"y" -> yPx[Max[y1, y2]],
				"width" -> makeSvgNumber[Abs[mapX[x2] - mapX[x1]]],
				"height" -> makeSvgNumber[Abs[mapY[y2] - mapY[y1]]]
			},
			roundingAttr[Lookup[Association[opts], RoundingRadius, 0]]
		],
		props
	];
(* ========================================================================== *)
(*  Polygons / triangles                                                      *)
(* ========================================================================== *)
serialize[Polygon[pts_?graphicsPtsQ], props_] :=
	filledElement["polygon", {"points" -> ptsStr[pts]}, props];
serialize[Polygon[contours : {_?graphicsPtsQ..}], props_] :=
	filledElement[
		"path",
		{
			"d" -> StringRiffle[closedPath /@ contours, " "],
			"fill-rule" -> "evenodd"
		},
		props
	];
serialize[Polygon[pts : {{_?NumericQ, _?NumericQ}..}, opts__], props_] :=
	With[{
			vc = Lookup[Association[{opts}], VertexColors, None]
		},
		If[ListQ[vc] && AllTrue[vc, colorSpecQ] && Length[vc] === Length[pts],
			rasterizedVertexColorElement[
				{
					Polygon[
						pts,
						VertexColors -> (normalizeColorSpec /@ vc)
					]
				},
				props
			],
			serialize[Polygon[pts], props]
		]
	];
serialize[Line[pts : {{_?NumericQ, _?NumericQ}..}, opts__], props_] :=
	With[{
			vc = Lookup[Association[{opts}], VertexColors, None]
		},
		If[ListQ[vc] && AllTrue[vc, colorSpecQ] && Length[vc] === Length[pts],
			vertexLine[pts, normalizeColorSpec /@ vc, props],
			serialize[Line[pts], props]
		]
	];
serialize[Triangle[{a_, b_, c_}], props_] :=
	serialize[Polygon[{a, b, c}], props];
serialize[Triangle[], props_] :=
	serialize[Polygon[{{0, 0}, {1, 0}, {0, 1}}], props];
(* ========================================================================== *)
(*  Bezier / B-spline curves                                                  *)
(* ========================================================================== *)
serialize[BezierCurve[pts : {{_?NumericQ, _?NumericQ}..}, ___], props_] :=
	XMLElement["path", {"d" -> bezierPath[pts], styleAttr[props, "Stroke"]}, {}];
serialize[BSplineCurve[pts : {{_?NumericQ, _?NumericQ}..}, opts___], props_] :=
	(*
	 * SVG has no native B-spline; sample BSplineFunction into a polyline path
	 *)
	Module[{f, n},
		f = BSplineFunction[pts, FilterRules[{opts}, Options[BSplineFunction]]];
		n = Clip[4  Length[pts], {24, 200}];
		XMLElement[
			"path",
			{
				"d" -> openPath[Table[f[t], {t, 0, 1, 1. / n}]],
				styleAttr[props, "Stroke"]
			},
			{}
		]
	];
(* ========================================================================== *)
(*  Text  (placed at -y, drawn upright)                                       *)
(* ========================================================================== *)
serialize[Text[expr_, {x_?NumericQ, y_?NumericQ}], props_] :=
	textSvg[expr, {x, y}, {0, 0}, props];
serialize[
	Text[
		expr_,
		{x_?NumericQ, y_?NumericQ},
		{ox_?NumericQ, oy_?NumericQ},
		rest___
	],
	props_
] :=
	textSvg[expr, {x, y}, {ox, oy}, props];
serialize[
	Text[
		expr_,
		Offset[{dx_?NumericQ, dy_?NumericQ}, {x_?NumericQ, y_?NumericQ}],
		{ox_?NumericQ, oy_?NumericQ},
		rest___
	],
	props_
] :=
	(*
	 * Text positioned by Offset[{dx,dy},{x,y}]: data point mapped to px then an
	 * absolute pixel shift. WL +dy is up; SVG y is down, so subtract dy.
	 *)
	textSvgPx[expr, {mapX[x] + dx, mapY[y] - dy}, {ox, oy}, props];
serialize[
	Text[expr_, Offset[{dx_?NumericQ, dy_?NumericQ}, {x_?NumericQ, y_?NumericQ}]],
	props_
] :=
	textSvgPx[expr, {mapX[x] + dx, mapY[y] - dy}, {0, 0}, props];
serialize[
	Text[
		expr_,
		pos_?graphicsPointQ,
		{ox_?NumericQ, oy_?NumericQ},
		rest___
	],
	props_
] :=
	textSvgPx[expr, pointPx[pos], {ox, oy}, props];
serialize[Text[expr_, pos_?graphicsPointQ], props_] :=
	textSvgPx[expr, pointPx[pos], {0, 0}, props];
serialize[Text[expr_, Scaled[{sx_?NumericQ, sy_?NumericQ}], rest___], props_] :=
	serialize[Text[expr, resolveScaledPt[{sx, sy}], rest], props];
(* ========================================================================== *)
(*  Inset                                                                     *)
(* ========================================================================== *)
serialize[Inset[g_Graphics, pos_, rest___], props_] :=
	Module[{args = {rest}, posPx, opos, size},
		posPx = insetPositionPx[pos];
		If[MissingQ[posPx],
			Null,
			opos = If[Length[args] >= 1, args[[1]], Center];
			size = If[Length[args] >= 2, args[[2]], Automatic];
			insetGraphic[g, posPx, opos, size]
		]
	];
serialize[Inset[expr_, {x_?NumericQ, y_?NumericQ}, rest___], props_] :=
	textSvg[expr, {x, y}, {0, 0}, props];
(* ========================================================================== *)
(*  Raster / image  (embedded as a base64 PNG data URI)                       *)
(* ========================================================================== *)
serialize[Raster[data_List, opts : OptionsPattern[]], props_] :=
	With[{dims = Dimensions[data]},
		rasterSvg[data, {{0, 0}, {dims[[2]], dims[[1]]}}, props]
	];
serialize[
	Raster[
		data_List,
		{{x1_?NumericQ, y1_?NumericQ}, {x2_?NumericQ, y2_?NumericQ}},
		opts___
	],
	props_
] :=
	rasterSvg[data, {{x1, y1}, {x2, y2}}, props];
