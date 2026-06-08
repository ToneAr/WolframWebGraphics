(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		$defaultArrowSize,
		arrowSvg,
		symbolicArrow,
		arrowheadSpecs,
		arrowheadOne,
		pointTangent,
		arrowHead,
		labelMissingQ,
		plotOptionAssociation,
		plotRangeOf,
		resolveGraphics,
		axisNormalize,
		tickStr,
		axisTickList,
		axisNodes,
		axisPrimitives,
		frameNormalize,
		frameNodes,
		framePrimitives,
		svgSize,
		labelSpecs,
		axisLabelSpecs,
		axisLabelAttrs,
		absTextNode,
		plotLabelNodes,
		axisLabelNodes,
		frameLabelNormalize,
		frameLabelNodes,
		plotDecorationNodes,
		roundingAttr,
		bezierPath,
		ellipseGeom,
		ellipseTag,
		curveClass
	}
];

$defaultArrowSize = 0.045;

arrowSvg[pts_, props_] :=
	Module[{
			style = getCurrentStyleProps[props, "Stroke"],
			col,
			specs
		},
		col = Lookup[Association[style], "stroke", "#000000"];
		specs = arrowheadSpecs[getCurrentArrowheads[props]];
		XMLElement[
			"g",
			{},
			Prepend[
				arrowHead[pts, #[[1]], #[[2]], col]& /@ specs,
				XMLElement["polyline", {"points" -> ptsStr[pts], Sequence @@ style}, {}]
			]
		]
	];

symbolicArrow[Tiny] = 0.02;
symbolicArrow[Small] = 0.03;
symbolicArrow[Medium] = 0.045;
symbolicArrow[Large] = 0.07;
symbolicArrow[_] = 0.045;

arrowheadSpecs[Automatic] := {{$defaultArrowSize, 1}};
arrowheadSpecs[Arrowheads[Automatic]] := {{$defaultArrowSize, 1}};
arrowheadSpecs[Arrowheads[s_?NumericQ]] := {{s, 1}};
arrowheadSpecs[Arrowheads[sym_Symbol]] := {{symbolicArrow[sym], 1}};
arrowheadSpecs[Arrowheads[specs_List]] := arrowheadOne /@ specs;
arrowheadSpecs[_] := {{$defaultArrowSize, 1}};

arrowheadOne[p_?NumericQ] := {$defaultArrowSize, p};
arrowheadOne[{s_?NumericQ, p_?NumericQ, ___}] := {s, p};
arrowheadOne[{s_?NumericQ}] := {s, 1};
arrowheadOne[_] := {$defaultArrowSize, 1};

pointTangent[pts_, t_] :=
	(* point + unit tangent at arc-length fraction t in [0,1] *)
	Module[{
			diffs = Differences[pts],
			lens,
			total,
			target,
			acc = 0,
			i = 1
		},
		lens = Norm /@ diffs;
		total = Total[lens];
		If[total == 0,
			{First[pts], {1, 0}},
			target = t  total;
			While[
				i < Length[lens] && acc + lens[[i]] < target,
				acc += lens[[i]];
				i++
			];
			{
				pts[[i]] +
				If[lens[[i]] == 0, 0, (target - acc) / lens[[i]]]  diffs[[i]],
				Normalize[diffs[[i]]]
			}
		]
	];

arrowHead[pts_, size_, pos_, col_] :=
	(*
	 * Arrowhead is built directly in pixel space: the head SIZE is absolute px
	 * while the path points are data coords, so map the tip + tangent to px
	 *)
	Module[{
			pt,
			tan,
			len = fracToUser[Abs[size]],
			tip,
			dir,
			perp,
			back
		},
		{pt, tan} = pointTangent[pts, Clip[pos, {0, 1}]];
		tip = {mapX[pt[[1]]], mapY[pt[[2]]]};
		dir = Normalize[{sclX[]  tan[[1]], -sclY[]  tan[[2]]}];
		If[size < 0, dir = -dir];
		perp = {-dir[[2]], dir[[1]]};
		back = tip - len  dir;
		XMLElement[
			"polygon",
			{
				"points" -> StringRiffle[
					(StringJoin[ makeSvgNumber[#[[1]]], ",", makeSvgNumber[#[[2]]]])& /@ {
						tip,
						back + 0.4  len  perp,
						back - 0.4  len  perp
					},
					" "
				],
				"fill" -> col
			},
			{}
		]
	];

(* ========================================================================== *)
(*  Axes / ticks / labels (generated from Graphics options;                   *)
(*  WL stores these in options, not as primitives in g[[1]])                  *)
(* ========================================================================== *)
labelMissingQ[x_] :=
	MatchQ[
		x,
		None | Automatic | Missing[___] | Spacer[___] | {} | {None..} |
			{{None..}..}
	];

plotOptionAssociation[g_] := Association[Options[g]];

plotRangeOf[g_] :=
	With[{
			pr = Lookup[plotOptionAssociation[g], PlotRange, Automatic]
		},
		If[MatchQ[pr, {{_?NumericQ, _?NumericQ}, {_?NumericQ, _?NumericQ}}],
			pr,
			$Failed
		]
	];

resolveAbsoluteGraphicsOptions[g_, keys_List] :=
	Association[
		Quiet[
			Check[AbsoluteOptions[g, keys], {}],
			{AbsoluteOptions::optnf, AbsoluteOptions::optx}
		]
	];

replaceGraphicsOptions[opts_List, repl_Association] :=
	Normal[Join[Association[opts], repl]];

resolvedPlotDecorationOptions[g_] :=
	KeySelect[
		resolveAbsoluteGraphicsOptions[g, {PlotRange, Ticks, FrameTicks}],
		MemberQ[{PlotRange, Ticks, FrameTicks}, #]&
	];

resolveGraphics[g : Graphics[prim_, opts___]] :=
	(*
	 * Charts (and any auto-ranged Graphics) emit a symbolic PlotRange
	 * (All / Automatic). The pixel map only engages for a NUMERIC range, so
	 * resolve it from the actual graphic via AbsoluteOptions and substitute it
	 * back. The same pass resolves Automatic Ticks/FrameTicks into the full WL
	 * tick tuples (including minor ticks, labels, lengths and per-tick style).
	 *)
	Module[{o = Association[{opts}], abs, repl = <||>},
		abs = resolvedPlotDecorationOptions[g];
		If[
			MatchQ[
				Lookup[abs, PlotRange, Lookup[o, PlotRange, Automatic]],
				{{_?NumericQ, _?NumericQ}, {_?NumericQ, _?NumericQ}}
			],
			repl[PlotRange] = Lookup[abs, PlotRange, Lookup[o, PlotRange]]
		];
		If[KeyExistsQ[abs, Ticks], repl[Ticks] = abs[Ticks]];
		If[KeyExistsQ[abs, FrameTicks], repl[FrameTicks] = abs[FrameTicks]];
		If[repl === <||>,
			g,
			Graphics[prim, Sequence @@ replaceGraphicsOptions[{opts}, repl]]
		]
	];
resolveGraphics[other_] := other;

axisNormalize[True] = {True, True};
axisNormalize[False] = {False, False};
axisNormalize[{a_, b_}] := {TrueQ[a], TrueQ[b]};
axisNormalize[_] = {False, False};

tickStr[v_] :=
	With[{r = Round[N[v], 1.*^-6]},
		If[r == Round[r], ToString[Round[r]], ToString[r]]
	];

axisTickList[spec_, {lo_, hi_}, n_] :=
	Module[{ticks},
		ticks =
			Which[
				spec === None,
					{},
				spec === Automatic,
					automaticTickList[{lo, hi}, n],
				ListQ[spec],
					normalizeTickList[spec],
				tickFunctionSpecQ[spec],
					normalizeTickFunction[spec, {lo, hi}, n],
				True,
					automaticTickList[{lo, hi}, n]
			];
		Select[ticks, lo <= #[[1]] <= hi&]
	];

automaticTickList[{lo_, hi_}, n_] :=
	normalizeTickList[FindDivisions[{lo, hi}, n]];

tickFunctionSpecQ[spec_] :=
	!ListQ[spec] && spec =!= Automatic && spec =!= None && !StringQ[spec];

normalizeTickFunction[func_, {lo_, hi_}, n_] :=
	Module[{res = Check[func[lo, hi], $Failed]},
		If[ListQ[res], normalizeTickList[res], automaticTickList[{lo, hi}, n]]
	];

normalizeTickList[spec_List] := DeleteCases[normalizeTick /@ spec, Null];

normalizeTick[p_?NumericQ] :=
	{p, tickStr[p], defaultTickLength[], {}};
normalizeTick[{p_?NumericQ, label_}] :=
	{p, label, defaultTickLength[], {}};
normalizeTick[{p_?NumericQ, label_, len_}] :=
	{p, label, tickLengthPair[len], {}};
normalizeTick[{p_?NumericQ, label_, len_, style_}] :=
	{p, label, tickLengthPair[len], styleSpecList[style]};
normalizeTick[_] := Null;

defaultTickLength[] := {0.012, 0.};
tickLengthPair[{p_?NumericQ, m_?NumericQ}] := {p, m};
tickLengthPair[len_?NumericQ] := {len, 0.};
tickLengthPair[_] := defaultTickLength[];

tickTupleQ[x_] := MatchQ[x, {_?NumericQ, ___}];
tickSpecPairQ[x_] := ListQ[x] && Length[x] === 2 && !tickTupleQ[x];
tickLabelMissingQ[label_] := label === "" || labelMissingQ[label];

styleRuleQ[_Rule | _RuleDelayed] := True;
styleRuleQ[_] := False;
styleRuleListQ[x_List] := AllTrue[x, styleRuleQ];
stylePairSpecQ[x_List] :=
	Length[x] === 2 && !styleRuleListQ[x] && Head[x] =!= Directive;
stylePairSpecQ[_] := False;

styleSpecList[None | Automatic] := {};
styleSpecList[spec_] := Flatten[{spec}];

axisSideStyle[spec_, i_] :=
	Module[{s = Replace[spec, None | Automatic -> {}]},
		If[stylePairSpecQ[s], s[[i]], s]
	];

frameSideIndex["Left"] = {1, 1};
frameSideIndex["Right"] = {1, 2};
frameSideIndex["Bottom"] = {2, 1};
frameSideIndex["Top"] = {2, 2};

frameFlatIndex["Bottom"] = 1;
frameFlatIndex["Left"] = 2;
frameFlatIndex["Top"] = 3;
frameFlatIndex["Right"] = 4;

frameSideStyle[spec_, side_] :=
	Module[{s = Replace[spec, None | Automatic -> {}]},
		Which[
			MatchQ[s, {{_, _}, {_, _}}],
				Extract[s, frameSideIndex[side]],
			ListQ[s] && Length[s] === 4 && !styleRuleListQ[s],
				s[[frameFlatIndex[side]]],
			stylePairSpecQ[s],
				If[MemberQ[{"Bottom", "Top"}, side], s[[1]], s[[2]]],
			True,
				s
		]
	];

axisTickSpec[spec_, i_] := If[tickSpecPairQ[spec], spec[[i]], spec];

frameTicksNormalize[Automatic] = {{Automatic, Automatic}, {Automatic, Automatic}};
frameTicksNormalize[None] = {{None, None}, {None, None}};
frameTicksNormalize[spec_?frameTicksNestedQ] := spec;
frameTicksNormalize[spec_?tickSpecPairQ] :=
	{{spec[[2]], spec[[2]]}, {spec[[1]], spec[[1]]}};
frameTicksNormalize[spec_] := {{spec, spec}, {spec, spec}};

frameTicksNestedQ[spec_] :=
	ListQ[spec] && Length[spec] === 2 && AllTrue[spec, tickSpecPairQ];

tickSideVector["Bottom"] = {0, -1};
tickSideVector["Top"] = {0, 1};
tickSideVector["Left"] = {-1, 0};
tickSideVector["Right"] = {1, 0};

tickLabelAnchor["Bottom"] = {0, 1};
tickLabelAnchor["Top"] = {0, -1};
tickLabelAnchor["Left"] = {1, 0};
tickLabelAnchor["Right"] = {-1, 0};

tickOffset[side_, len_] := tickSideVector[side]  fracToUser[len];

tickLinePrimitive[base_, side_, {pos_, neg_}] :=
	Line[
		{
			Offset[-tickOffset[side, neg], base],
			Offset[tickOffset[side, pos], base]
		}
	];

tickLabelPrimitive[label_, base_, side_, lens_] :=
	Text[
		label,
		Offset[
			tickOffset[side, Max[Abs /@ lens]] + 7  tickSideVector[side],
			base
		],
		tickLabelAnchor[side]
	];

decorationBag[styles___] :=
	Module[{bag = Internal`Bag[]},
		Scan[
			Internal`StuffBag[bag, #]&,
			Join[{GrayLevel[0], AbsoluteThickness[0.8]}, styleSpecList /@ {styles}]
		];
		bag
	];

decorationNode[prim_, styles___] := serialize[prim, decorationBag[styles]];

skipAxisTickLabelQ[_, None] := False;
skipAxisTickLabelQ[pos_, ref_?NumericQ] := Abs[N[pos - ref]] < 10^-10;

tickNodes[ticks_, baseFn_, side_, styles_, skipLabelAt_ : None] :=
	Flatten[
		Table[
			With[{
					base = baseFn[tick[[1]]],
					local = tick[[4]]
				},
				DeleteCases[
					{
						decorationNode[
							tickLinePrimitive[base, side, tick[[3]]],
							styles,
							local
						],
						If[
							tickLabelMissingQ[tick[[2]]] ||
							skipAxisTickLabelQ[tick[[1]], skipLabelAt],
							Null,
							decorationNode[
								tickLabelPrimitive[tick[[2]], base, side, tick[[3]]],
								{FontSize -> 9},
								styles,
								local
							]
						]
					},
					Null
				]
			],
			{tick, ticks}
		],
		1
	];

axisNodes[g_] :=
	(*
	 * serialized axis line / tick / label nodes; {} when no numeric range or
	 * Axes is off.
	 *)
	Module[{pr = plotRangeOf[g], axes, opts, origin, ox, oy},
		If[pr === $Failed,
			{},
			opts = plotOptionAssociation[g];
			axes = axisNormalize[Lookup[plotOptionAssociation[g], Axes, False]];
			If[axes === {False, False},
				{},
				origin = Lookup[opts, AxesOrigin, Automatic];
				{ox, oy} =
					If[MatchQ[origin, {_?NumericQ, _?NumericQ}],
						{
							Clip[origin[[1]], pr[[1]]],
							Clip[origin[[2]], pr[[2]]]
						},
						{
							If[pr[[1, 1]] <= 0 <= pr[[1, 2]], 0, pr[[1, 1]]],
							If[pr[[2, 1]] <= 0 <= pr[[2, 2]], 0, pr[[2, 1]]]
						}
					];
				axisPrimitives[g, pr, axes, {ox, oy}]
			]
		]
	];

axisPrimitives[g_, {{x1_, x2_}, {y1_, y2_}}, axes_, {ox_, oy_}] :=
	Module[{
			opts = plotOptionAssociation[g],
			ticks,
			axisStyle,
			tickStyle
		},
		ticks = Lookup[opts, Ticks, Automatic];
		axisStyle = Lookup[opts, AxesStyle, {}];
		tickStyle = Lookup[opts, TicksStyle, {}];
		Join[
			If[axes[[1]],
				Join[
					{
						decorationNode[
							Line[{{x1, oy}, {x2, oy}}],
							axisSideStyle[axisStyle, 1]
						]
					},
					tickNodes[
						axisTickList[axisTickSpec[ticks, 1], {x1, x2}, 8],
						({#, oy}&),
						"Bottom",
						{
							axisSideStyle[axisStyle, 1],
							axisSideStyle[tickStyle, 1]
						},
						ox
					]
				],
				{}
			],
			If[axes[[2]],
				Join[
					{
						decorationNode[
							Line[{{ox, y1}, {ox, y2}}],
							axisSideStyle[axisStyle, 2]
						]
					},
					tickNodes[
						axisTickList[axisTickSpec[ticks, 2], {y1, y2}, 5],
						({ox, #}&),
						"Left",
						{
							axisSideStyle[axisStyle, 2],
							axisSideStyle[tickStyle, 2]
						},
						oy
					]
				],
				{}
			]
		]
	];

frameNormalize[True] = {{True, True}, {True, True}};
frameNormalize[False] = {{False, False}, {False, False}};
frameNormalize[{{l_, r_}, {b_, t_}}] :=
	{{TrueQ[l], TrueQ[r]}, {TrueQ[b], TrueQ[t]}};
frameNormalize[{x_, y_}] := {{TrueQ[y], TrueQ[y]}, {TrueQ[x], TrueQ[x]}};
frameNormalize[_] = {{False, False}, {False, False}};

frameNodes[g_] :=
	Module[{pr = plotRangeOf[g], frame},
		If[pr === $Failed,
			{},
			frame = frameNormalize[Lookup[plotOptionAssociation[g], Frame, False]];
			If[!TrueQ[Or @@ Flatten[frame]],
				{},
				framePrimitives[g, pr, frame]
			]
		]
	];

frameLinePrimitive[{{x1_, x2_}, {y1_, y2_}}, "Bottom"] :=
	Line[{{x1, y1}, {x2, y1}}];
frameLinePrimitive[{{x1_, x2_}, {y1_, y2_}}, "Top"] :=
	Line[{{x1, y2}, {x2, y2}}];
frameLinePrimitive[{{x1_, x2_}, {y1_, y2_}}, "Left"] :=
	Line[{{x1, y1}, {x1, y2}}];
frameLinePrimitive[{{x1_, x2_}, {y1_, y2_}}, "Right"] :=
	Line[{{x2, y1}, {x2, y2}}];

frameSideTicks[ticks_, {{x1_, x2_}, {y1_, y2_}}, side_] :=
	Switch[
		side,
		"Bottom" | "Top",
			axisTickList[ticks, {x1, x2}, 8],
		"Left" | "Right",
			axisTickList[ticks, {y1, y2}, 5]
	];

frameSideBase[{{x1_, _}, {_, _}}, "Left"] := ({x1, #}&);
frameSideBase[{{_, x2_}, {_, _}}, "Right"] := ({x2, #}&);
frameSideBase[{{_, _}, {y1_, _}}, "Bottom"] := ({#, y1}&);
frameSideBase[{{_, _}, {_, y2_}}, "Top"] := ({#, y2}&);

frameSideEnabled[frame_, "Left"] := frame[[1, 1]];
frameSideEnabled[frame_, "Right"] := frame[[1, 2]];
frameSideEnabled[frame_, "Bottom"] := frame[[2, 1]];
frameSideEnabled[frame_, "Top"] := frame[[2, 2]];

frameSideTickSpec[ticks_, "Left"] := ticks[[1, 1]];
frameSideTickSpec[ticks_, "Right"] := ticks[[1, 2]];
frameSideTickSpec[ticks_, "Bottom"] := ticks[[2, 1]];
frameSideTickSpec[ticks_, "Top"] := ticks[[2, 2]];

frameSideNodes[g_, pr_, frame_, side_] :=
	Module[{opts, frameStyle, tickStyle, ticks, sideTicks},
		If[!TrueQ[frameSideEnabled[frame, side]],
			{},
			opts = plotOptionAssociation[g];
			frameStyle = frameSideStyle[Lookup[opts, FrameStyle, {}], side];
			tickStyle = frameSideStyle[Lookup[opts, FrameTicksStyle, {}], side];
			ticks = frameTicksNormalize[Lookup[opts, FrameTicks, Automatic]];
			sideTicks = frameSideTickSpec[ticks, side];
			Join[
				{
					decorationNode[frameLinePrimitive[pr, side], frameStyle]
				},
				tickNodes[
					frameSideTicks[sideTicks, pr, side],
					frameSideBase[pr, side],
					side,
					{frameStyle, tickStyle}
				]
			]
		]
	];

framePrimitives[g_, pr_, frame_] :=
	Join[
		frameSideNodes[g, pr, frame, "Bottom"],
		frameSideNodes[g, pr, frame, "Top"],
		frameSideNodes[g, pr, frame, "Left"],
		frameSideNodes[g, pr, frame, "Right"]
	];

svgSize[props_] :=
	ToExpression /@ Lookup[props, {"width", "height"}, {"360", "360"}];

labelSpecs[opts_] :=
	Flatten[{Replace[Lookup[opts, LabelStyle, {}], None | Automatic -> {}]}];

axisLabelSpecs[opts_] :=
	Join[
		{FontSize -> 12, FontFamily -> "sans-serif", FontColor -> GrayLevel[0.35]},
		labelSpecs[opts]
	];

axisLabelAttrs[] := {"class" -> "wgx-axis-label"};

labelPlainText[expr_] :=
	Module[{text = labelTextString[expr]},
		If[StringQ[text], text, textContent[expr]]
	];

embeddedGraphicsLabelTexts[g_] :=
	DeleteDuplicates[
		Cases[
			Cases[g, Style[x_, "GraphicsLabel", ___] :> x, Infinity],
			Text[e_, ___] :> labelPlainText[e],
			Infinity
		]
	];

absTextNode[expr_, {x_, y_}, anchor_, baseline_, specs_, attrs_ : {}] :=
	Module[{content, localSpecs},
		{content, localSpecs} = textExtract[expr];
		labelSvgNode[
			content,
			{x, y},
			anchor,
			baseline,
			getCurrentTextProps[Internal`Bag[], Join[specs, localSpecs]],
			attrs
		]
	];

plotLabelNodes[g_, props_] :=
	Module[{
			opts = plotOptionAssociation[g],
			label,
			wh,
			specs
		},
		label = Lookup[opts, PlotLabel, None];
		If[labelMissingQ[label],
			{},
			wh = svgSize[props];
			specs = Join[{FontSize -> 14, Bold}, labelSpecs[opts]];
			{
				absTextNode[
					label,
					{wh[[1]] / 2, 18},
					"middle",
					"middle",
					specs
				]
			}
		]
	];

axisLabelNodes[g_, props_] :=
	Module[{
			opts = plotOptionAssociation[g],
			labels,
			pr,
			origin,
			wh,
			specs,
			x,
			y,
			embeddedLabels
		},
		labels = Lookup[opts, AxesLabel, None];
		If[labelMissingQ[labels] || !MatchQ[labels, {_, _}],
			{},
			pr = plotRangeOf[g];
			If[pr === $Failed,
				{},
				wh = svgSize[props];
				origin = Lookup[opts, AxesOrigin, Automatic];
				{x, y} =
					If[MatchQ[origin, {_?NumericQ, _?NumericQ}],
						origin,
						{
							If[pr[[1, 1]] <= 0 <= pr[[1, 2]], 0, pr[[1, 1]]],
							If[pr[[2, 1]] <= 0 <= pr[[2, 2]], 0, pr[[2, 1]]]
						}
					];
				specs = axisLabelSpecs[opts];
				embeddedLabels = embeddedGraphicsLabelTexts[g];
				DeleteCases[
					{
						If[
							labelMissingQ[labels[[1]]] ||
							MemberQ[embeddedLabels, labelPlainText[labels[[1]]]],
							Null,
							absTextNode[
								labels[[1]],
								{
									Clip[mapX[pr[[1, 2]]] + 12, {8, wh[[1]] - 8}],
									Clip[mapY[y], {12, wh[[2]] - 8}]
								},
								"start",
								"middle",
								specs,
								axisLabelAttrs[]
							]
						],
						If[
							labelMissingQ[labels[[2]]] ||
							MemberQ[embeddedLabels, labelPlainText[labels[[2]]]],
							Null,
							absTextNode[
								labels[[2]],
								{
									0,
									Max[12, mapY[pr[[2, 2]]] - 18]
								},
								"start",
								"middle",
								specs,
								axisLabelAttrs[]
							]
						]
					},
					Null
				]
			]
		]
	];

frameLabelNormalize[{{l_, r_}, {b_, t_}}] := {{l, r}, {b, t}};
frameLabelNormalize[{b_, l_}] := {{l, None}, {b, None}};
frameLabelNormalize[{b_, l_, t_, r_}] := {{l, r}, {b, t}};
frameLabelNormalize[_] := {{None, None}, {None, None}};

frameLabelNodes[g_, props_] :=
	Module[{
			opts = plotOptionAssociation[g],
			labels,
			wh,
			specs,
			xmid,
			ymid
		},
		labels = frameLabelNormalize[Lookup[opts, FrameLabel, None]];
		If[labelMissingQ[labels],
			{},
			wh = svgSize[props];
			{xmid, ymid} = wh / 2;
			specs = Join[{FontSize -> 12}, labelSpecs[opts]];
			DeleteCases[
				{
					If[labelMissingQ[labels[[2, 1]]],
						Null,
						absTextNode[
							labels[[2, 1]],
							{xmid, wh[[2]] - 18},
							"middle",
							"middle",
							specs
						]
					],
					If[labelMissingQ[labels[[2, 2]]],
						Null,
						absTextNode[labels[[2, 2]], {xmid, 38}, "middle", "middle", specs]
					],
					If[labelMissingQ[labels[[1, 1]]],
						Null,
						absTextNode[
							labels[[1, 1]],
							{18, ymid},
							"middle",
							"middle",
							specs,
							{
								"transform" ->
									StringJoin[
										"rotate(-90 ",
										makeSvgNumber[18],
										" ",
										makeSvgNumber[ymid],
										")"
									]
							}
						]
					],
					If[labelMissingQ[labels[[1, 2]]],
						Null,
						absTextNode[
							labels[[1, 2]],
							{wh[[1]] - 18, ymid},
							"middle",
							"middle",
							specs,
							{
								"transform" ->
									StringJoin[
										"rotate(90 ",
										makeSvgNumber[wh[[1]] - 18],
										" ",
										makeSvgNumber[ymid],
										")"
									]
							}
						]
					]
				},
				Null
			]
		]
	];

plotDecorationNodes[g_, props_] :=
	Join[
		plotLabelNodes[g, props],
		axisLabelNodes[g, props],
		frameLabelNodes[g, props]
	];

roundingAttr[r_?NumericQ] := If[r == 0, {}, {"rx" -> wPx[r], "ry" -> hPx[r]}];
roundingAttr[{rx_?NumericQ, ry_?NumericQ}] :=
	{"rx" -> wPx[rx], "ry" -> hPx[ry]};
roundingAttr[_] := {};

bezierPath[pts_] :=
	Module[{rest = Rest[pts], cubics, extra},
		cubics = Partition[rest, 3];
		extra = Drop[rest, 3  Length[cubics]];
		StringJoin[
			"M ",
			ptStr[First[pts]],
			(
				StringJoin[
					" C ",
					ptStr[#[[1]]],
					" ",
					ptStr[#[[2]]],
					" ",
					ptStr[#[[3]]]
				]
			)& /@ cubics,
			(StringJoin[ " L ", ptStr[#]])& /@ extra
		]
	];

ellipseGeom[{x_, y_}, rx_, ry_] :=
	(*
	 * A circle/ellipse, choosing the right SVG element for the current x/y px
	 * scale (a true circle only when the scale is uniform)
	 *)
	If[sclX[]  rx == sclY[]  ry,
		{"cx" -> xPx[x], "cy" -> yPx[y], "r" -> wPx[rx]},
		{"cx" -> xPx[x], "cy" -> yPx[y], "rx" -> wPx[rx], "ry" -> hPx[ry]}
	];

ellipseTag[rx_, ry_] := If[sclX[]  rx == sclY[]  ry, "circle", "ellipse"];

curveClass[] :=
	(*
	 * Inside a plot's HighlightElements annotation, tag the curve so the JS
	 * coordinate tool can read off {x,y} along it
	 *)
	If[TrueQ[$wgxCurve], $wgxNeedsRuntime = True; {"class" -> "wgx-curve"}, {}];
