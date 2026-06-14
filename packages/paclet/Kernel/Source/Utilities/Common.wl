(* wl-disable-file DocCommentInputMismatch, DocCommentArityMismatch *)
PackageScoped[
	{
		svgString,
		svgElement,
		setSvgSize,
		shiftSvgChildren,
		addAttrs,
		compactifyCSS,
		jsEsc,
		hrefStr,
		textSvg,
		textSvgPx,
		labelSvgNode,
		labelApproxSize,
		textExtract,
		textContent,
		rasterSvg,
		textFontSize,
		textAlignOffset
	}
]

$lightDark // PackageScoped;
$lightDark =
	Replace[
		Quiet @ AbsoluteCurrentValue[LightDark],
		Automatic | "System" -> "Light"
	];

svgString[el_] := ExportString[el, "XML"];

(*
 * The <svg> element on its own.
 * Saves/restores the global coordinate scale so a nested graphic cannot
 * corrupt the enclosing one.
 *)
svgElement[Graphics[prim_, opts : OptionsPattern[Graphics]]] :=
	svgElement[Graphics[{prim}, opts]] /; Head[prim] =!= List;
svgElement[g : Graphics[{prims___}, opts : OptionsPattern[Graphics]]] :=
	Module[{
			gr = resolveGraphics[g],
			savedMap = getMapState[],
			nr = $wgxNeedsRuntime,
			props,
			children,
			result
		},
		$wgxNeedsRuntime = False;
		props = optionsToGlobalSvgProps[Options[gr]];
		With[{bag = Internal`Bag[]},
			children = DeleteCases[serialize[#, bag]& /@ {prims}, Null]
		];
		children =
			Join[
				children,
				frameNodes[gr],
				axisNodes[gr],
				plotDecorationNodes[gr, props]
			];
		(*
		 * When the graphic carries interactive markers, give the root <svg> a
		 * `wgx`-prefixed id so the runtime can discover it (the JS finds SVGs via
		 * `svg[id^='wgx']`). Done whenever a runtime is needed -- inline or not --
		 * since the external/page-level runtime relies on the same selector.
		 *)
		If[TrueQ[$wgxNeedsRuntime], props["id"] = uid["wgx"]];
		(*
		 * The status sink (<text id='wgx-status'>) rides with the graphic
		 * whenever interactivity is present, independent of IncludeRuntime, so
		 * StatusArea still resolves a sink when the runtime is hosted externally
		 * (shared-runtime / SSR pages).
		 *)
		If[TrueQ[$wgxNeedsRuntime],
			children =
				Join[{statusNode[Lookup[props, "viewBox", Missing[]]]}, children]
		];
		If[TrueQ[$wgxInlineRuntime] && TrueQ[$wgxNeedsRuntime],
			children = Join[runtimeNodes[], children]
		];
		result = XMLElement["svg", Normal[props], children];
		setMapState[savedMap];
		$wgxNeedsRuntime = nr;
		result
	];

setSvgSize[XMLElement["svg", attrs_, children_], {w_, h_}] :=
	Module[{a = Association[attrs]},
		a["width"] = makeSvgNumber[w];
		a["height"] = makeSvgNumber[h];
		a["viewBox"] = StringRiffle[makeSvgNumber /@ {0, 0, w, h}, " "];
		XMLElement["svg", Normal[a], children]
	];

shiftSvgChildren[children_, {0, 0}] := children;
shiftSvgChildren[children_, {dx_, dy_}] :=
	{
		XMLElement[
			"g",
			{
				"transform" ->
					StringJoin[
						"translate(",
						makeSvgNumber[dx],
						" ",
						makeSvgNumber[dy],
						")"
					]
			},
			children
		]
	};

addAttrs[XMLElement[tag_, attrs_, ch_], new_List] :=
	XMLElement[
		tag,
		Join[DeleteCases[attrs, (Alternatives @@ Keys[new]) -> _], new],
		ch
	];
addAttrs[other_, _] := other;

compactifyCSS[str_String] :=
	StringReplace[
		StringReplace[
			StringReplace[
				str,
				WhitespaceCharacter.. ~~ (p : ("{" | "}" | ":" | ";" | ",")) :> p
			],
			(p : ("{" | "}" | ":" | ";" | ",")) ~~ WhitespaceCharacter.. :> p
		],
		WhitespaceCharacter.. -> " "
	];

(* escape a string for embedding inside a single-quoted JS string literal *)
jsEsc[s_String] :=
	StringReplace[s, {"\\" -> "\\\\", "'" -> "\\'", "\n" -> " ", "\r" -> ""}];
jsEsc[e_] := jsEsc[ToString[e]];

hrefStr[URL[u_]] := u;
hrefStr[u_String] := u;
hrefStr[u_] := ToString[u];

textAlignOffset[Left] = -1;
textAlignOffset[Bottom] = -1;
textAlignOffset[Right] = 1;
textAlignOffset[Top] = 1;
textAlignOffset[Center] = 0;

textSvg[expr_, {x_?NumericQ, y_?NumericQ}, {ox_, oy_}, props_] :=
	textSvgPx[expr, {mapX[x], mapY[y]}, {ox, oy}, props];

(* same as textSvg but the position is already in pixel space *)
textSvgPx[expr_, {px_, py_}, {ox_, oy_}, props_] :=
	Module[{content, specs, anchor, baseline},
		{content, specs} = textExtract[expr];
		anchor = Which[ ox < 0, "start", ox > 0, "end", True, "middle"];
		baseline =
			Which[ oy > 0, "hanging", oy < 0, "text-after-edge", True, "middle"];
		labelSvgNode[
			content,
			{px, py},
			anchor,
			baseline,
			getCurrentTextProps[props, specs],
			{}
		]
	];

textRotationTransform[theta_, {x_, y_}] :=
	StringJoin[
		"rotate(",
		makeSvgNumber[-theta / Degree],
		" ",
		makeSvgNumber[x],
		" ",
		makeSvgNumber[y],
		")"
	];

appendTransformAttr[attrs_, transform_String] :=
	Module[{a = Association[attrs], old},
		old = Lookup[a, "transform", None];
		a["transform"] =
			If[StringQ[old], StringJoin[ old, " ", transform], transform];
		Normal[a]
	];

labelSvgNode[
	Rotate[expr_, theta_?NumericQ, ___],
	pos : {_?NumericQ, _?NumericQ},
	anchor_,
	baseline_,
	textProps_,
	attrs_
] :=
	labelSvgNode[
		expr,
		pos,
		anchor,
		baseline,
		textProps,
		appendTransformAttr[attrs, textRotationTransform[theta, pos]]
	];
labelSvgNode[expr_String, {x_, y_}, anchor_, baseline_, textProps_, attrs_] :=
	XMLElement[
		"text",
		Join[
			{
				"x"                 -> makeSvgNumber[x],
				"y"                 -> makeSvgNumber[y],
				"text-anchor"       -> anchor,
				"dominant-baseline" -> baseline
			},
			textProps,
			attrs
		],
		{expr}
	];
labelSvgNode[
	Panel[inner_, opts___],
	pos : {_?NumericQ, _?NumericQ},
	anchor_,
	baseline_,
	textProps_,
	attrs_
] :=
	Module[{o, pad, content, size, w, h, x0, y0},
		o = Association[Cases[{opts}, _Rule | _RuleDelayed]];
		pad = panelPadding[Lookup[o, FrameMargins, Automatic]];
		content = First[textExtract[inner]];
		size = labelApproxSize[content, textProps];
		w = size[[1]] + pad[[1]] + pad[[2]];
		h = size[[2]] + pad[[3]] + pad[[4]];
		x0 = pos[[1]] + anchorOffset[anchor, w];
		y0 = pos[[2]] + baselineOffset[baseline, h];
		XMLElement[
			"g",
			attrs,
			{
				XMLElement[
					"rect",
					Join[
						{
							"x"      -> makeSvgNumber[x0],
							"y"      -> makeSvgNumber[y0],
							"width"  -> makeSvgNumber[w],
							"height" -> makeSvgNumber[h],
							"rx"     -> makeSvgNumber[panelRadius[o]]
						},
						panelBackgroundAttrs[Lookup[o, Background, Automatic]],
						panelFrameAttrs[Lookup[o, FrameStyle, Automatic]]
					],
					{}
				],
				labelSvgNode[
					content,
					{x0 + w / 2, y0 + h / 2},
					"middle",
					"middle",
					textProps,
					{}
				]
			}
		]
	];
labelSvgNode[expr_, {x_, y_}, anchor_, baseline_, textProps_, attrs_] :=
	Module[{text, math, box, dx, dy},
		text = labelTextString[expr];
		If[StringQ[text],
			labelSvgNode[text, {x, y}, anchor, baseline, textProps, attrs],
			math = mathMLElement[expr];
			If[math === $Failed,
				labelSvgNode[
					textContent[expr],
					{x, y},
					anchor,
					baseline,
					textProps,
					attrs
				],
				box = labelApproxSize[expr, textProps];
				dx = anchorOffset[anchor, box[[1]]];
				dy = baselineOffset[baseline, box[[2]]];
				XMLElement[
					"g",
					attrs,
					{
						XMLElement[
							"foreignObject",
							{
								"x"        -> makeSvgNumber[x + dx],
								"y"        -> makeSvgNumber[y + dy],
								"width"    -> makeSvgNumber[box[[1]]],
								"height"   -> makeSvgNumber[box[[2]]],
								"overflow" -> "visible"
							},
							{
								XMLElement[
									"div",
									{
										"xmlns" -> "http://www.w3.org/1999/xhtml",
										"style" -> mathDivStyle[textProps, anchor, baseline]
									},
									{addAttrs[math, {"display" -> "inline"}]}
								]
							}
						]
					}
				]
			]
		]
	];

SetAttributes[labelTextString, HoldFirst];
labelTextString[s_String] := s;
labelTextString[e_System`Entity] := entityLabelText[e];
labelTextString[Panel[inner_, ___]] := labelTextString[inner];
labelTextString[Style[inner_, ___]] := labelTextString[inner];
labelTextString[Pane[inner_, ___]] := labelTextString[inner];
labelTextString[Framed[inner_, ___]] := labelTextString[inner];
labelTextString[Row[items_List]] := StringJoin[ textContent /@ items];
labelTextString[Row[items_List, sep_]] :=
	StringRiffle[textContent /@ items, textContent[sep]];
labelTextString[Column[items_List, ___]] :=
	StringRiffle[textContent /@ items, " "];
labelTextString[HoldForm[s_String]] := s;
labelTextString[HoldForm[s_Symbol]] := heldSymbolText[s];
labelTextString[FormBox[s_String, ___]] := s;
labelTextString[FormBox[HoldForm[s_String], ___]] := s;
labelTextString[FormBox[HoldForm[s_Symbol], ___]] := heldSymbolText[s];
(* A bare Integer/Real is a plain glyph in WL (e.g. a bar value label from
   LabelingFunction -> Above), so render it as <text>, matching textContent's
   ToString fallback.  Rationals (1/2) and symbolic exprs (Pi, x^2) deliberately
   fall through to the MathML typeset path below. *)
labelTextString[n : (_Integer | _Real)] := ToString[n];
labelTextString[_] := Missing["NotText"];

SetAttributes[heldSymbolText, HoldFirst];
heldSymbolText[s_Symbol] :=
	With[{name = SymbolName[Unevaluated[s]]},
		If[StringLength[name] > 1, name, Missing["NotText"]]
	];

labelApproxSize[expr_String, textProps_] :=
	With[{fs = textFontSize[textProps]},
		{Max[1, StringLength[expr]]  fs  0.6, fs}
	];
labelApproxSize[expr_, textProps_] :=
	Module[{text, fs, chars},
		text = labelTextString[expr];
		If[StringQ[text],
			labelApproxSize[text, textProps],
			fs = textFontSize[textProps];
			chars = Max[1, StringLength[textContent[expr]]];
			{Max[4  fs, chars  fs  0.62], 2.4  fs}
		]
	];

textFontSize[textProps_] :=
	Module[{
			fs = Lookup[Association[textProps], "font-size", "12"]
		},
		If[StringQ[fs] && StringMatchQ[fs, NumberString], ToExpression[fs], 12]
	];

anchorOffset["start", _] := 0;
anchorOffset["end", w_] := -w;
anchorOffset[_, w_] := -w / 2;

baselineOffset["hanging", _] := 0;
baselineOffset["text-after-edge", h_] := -h;
baselineOffset[_, h_] := -h / 2;

panelMarginValue[Automatic] := ptToUser[4];
panelMarginValue[n_?NumericQ] := ptToUser[n];
panelMarginValue[_] := ptToUser[4];

panelPadding[{{l_, r_}, {b_, t_}}] := panelMarginValue /@ {l, r, t, b};
panelPadding[{h_, v_}] := panelMarginValue /@ {h, h, v, v};
panelPadding[n_?NumericQ] := ConstantArray[panelMarginValue[n], 4];
panelPadding[_] := ConstantArray[panelMarginValue[Automatic], 4];

panelRadius[o_] := panelMarginValue[Lookup[o, RoundingRadius, 3]];

panelBackgroundAttrs[None] := {"fill" -> "none"};
panelBackgroundAttrs[bg_?colorSpecQ] :=
	Module[{c = colorToSvg[bg]},
		If[c["alpha"] < 1,
			{"fill" -> c["rgb"], "fill-opacity" -> makeSvgNumber[c["alpha"]]},
			{"fill" -> c["rgb"]}
		]
	];
panelBackgroundAttrs[_] := {"fill" -> "#f8fafc"};

panelFrameAttrs[None] := {"stroke" -> "none"};
panelFrameAttrs[style_?colorSpecQ] :=
	With[{c = colorToSvg[style]}, {"stroke" -> c["rgb"], "stroke-width" -> "1"}];
panelFrameAttrs[_] := {"stroke" -> "#cbd5e1", "stroke-width" -> "1"};

mathDivStyle[textProps_, anchor_, baseline_] :=
	Module[{props = Association[textProps]},
		StringRiffle[
			Join[
				{
					"width:100%",
					"height:100%",
					"display:flex",
					StringJoin[ "justify-content:", cssJustify[anchor]],
					StringJoin[ "align-items:", cssAlign[baseline]],
					"overflow:visible",
					"line-height:1"
				},
				mathFontCss[props]
			],
			";"
		]
	];

cssJustify["start"] := "flex-start";
cssJustify["end"] := "flex-end";
cssJustify[_] := "center";

cssAlign["hanging"] := "flex-start";
cssAlign["text-after-edge"] := "flex-end";
cssAlign[_] := "center";

mathFontCss[props_] :=
	{
		If[KeyExistsQ[props, "fill"],
			StringJoin[ "color:", props["fill"]],
			Nothing
		],
		If[KeyExistsQ[props, "fill-opacity"],
			StringJoin[ "opacity:", props["fill-opacity"]],
			Nothing
		],
		If[KeyExistsQ[props, "font-size"],
			StringJoin[ "font-size:", props["font-size"], "px"],
			Nothing
		],
		If[KeyExistsQ[props, "font-family"],
			StringJoin[ "font-family:", props["font-family"]],
			Nothing
		],
		If[KeyExistsQ[props, "font-weight"],
			StringJoin[ "font-weight:", props["font-weight"]],
			Nothing
		],
		If[KeyExistsQ[props, "font-style"],
			StringJoin[ "font-style:", props["font-style"]],
			Nothing
		],
		If[KeyExistsQ[props, "text-decoration"],
			StringJoin[ "text-decoration:", props["text-decoration"]],
			Nothing
		]
	};

mathMLElement[expr_] :=
	Module[{mathString, xml},
		mathString =
			Quiet[
				ExportString[expr, "MathML"],
				{
					Export::xmlmal,
					XML`MathML`BoxesToSymbolicMathML::uncnvbxs,
					XML`MathML`BoxesToSymbolicMathML::notboxes
				}
			];
		If[StringQ[mathString],
			xml = ImportString[mathString, "XML"];
			Replace[
				xml,
				XMLObject["Document"][_, el_XMLElement, _] :> sanitizeMathMLElement[el]
			],
			$Failed
		]
	];
mathMLElement[Style[inner_, ___]] := mathMLElement[inner];
mathMLElement[Pane[inner_, ___]] := mathMLElement[inner];
mathMLElement[Framed[inner_, ___]] := mathMLElement[inner];

entityLabelText[e_System`Entity] :=
	Module[{label},
		label =
			FirstCase[
				ToBoxes[e, StandardForm],
				TemplateBox[{s_String, ___}, ___] :> entityBoxString[s],
				Missing["NotFound"],
				{0, Infinity}
			];
		If[StringQ[label], label, ToString[e, InputForm]]
	];

entityBoxString[s_String] := StringReplace[StringTrim[s, "\""], "\\\"" -> "\""];

mathGlyphReplacementRules[] :=
	Join[
		Thread[mathInvisibleCharacters[] -> ""],
		Thread[
			(FromCharacterCode /@ {63308, 63309, 63310, 63311}) -> {
				"d",
				"e",
				"i",
				"j"
			}
		]
	];

mathInvisibleCharacters[] :=
	FromCharacterCode /@ {
		8203,
		8204,
		8205,
		8288,
		8289,
		8290,
		8291,
		8292,
		63333,
		63341
	};

sanitizeMathMLElement[XMLElement[tag_, attrs_, children_]] :=
	Module[{cleanChildren},
		cleanChildren = DeleteCases[sanitizeMathMLElement /@ children, Null];
		If[tag === "mo" && cleanChildren === {},
			Null,
			XMLElement[tag, attrs, cleanChildren]
		]
	];
sanitizeMathMLElement[s_String] :=
	Module[{
			clean = StringReplace[s, mathGlyphReplacementRules[]]
		},
		If[clean =!= "", clean]
	];
sanitizeMathMLElement[other_] := other;

(*
 * Text[Style[expr, specs..]] -> {expr, font-specs}; bare numbers are sizes.
 * Non-string expr values are later exported as MathML instead of plain text.
 *)
textExtract[Style[inner_, specs___]] :=
	{inner, Replace[{specs}, {n_?NumericQ :> (FontSize -> n)}, {1}]};
textExtract[e_] := {e, {}};

textContent[s_String] := s;
textContent[e_System`Entity] := entityLabelText[e];
textContent[Panel[inner_, ___]] := textContent[inner];
textContent[Style[inner_, ___]] := textContent[inner];
textContent[Pane[inner_, ___]] := textContent[inner];
textContent[Framed[inner_, ___]] := textContent[inner];
textContent[Row[items_List]] := StringJoin[ textContent /@ items];
textContent[Row[items_List, sep_]] :=
	StringRiffle[textContent /@ items, textContent[sep]];
textContent[Column[items_List, ___]] := StringRiffle[textContent /@ items, " "];
textContent[Spacer[___]] := " ";
textContent[e_] := ToString[e];

rasterSvg[data_, {{x1_, y1_}, {x2_, y2_}}, props_] :=
	Module[
		{b64},
		(* Image and Raster row order is reversed *)
		b64 = ExportString[Image[Reverse[data]], {"Base64", "PNG"}];
		XMLElement[
			"image",
			{
				"x"                   -> xPx[Min[x1, x2]],
				"y"                   -> yPx[Max[y1, y2]],
				"width"               -> makeSvgNumber[Abs[mapX[x2] - mapX[x1]]],
				"height"              -> makeSvgNumber[Abs[mapY[y2] - mapY[y1]]],
				"preserveAspectRatio" -> "none",
				"href"                -> StringJoin[
					"data:image/png;base64,",
					StringDelete[b64, "\n"]
				]
			},
			{}
		]
	];