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
		bSplinePath,
		joinedCurvePath,
		filledCurvePath,
		codedJoinedCurvePath,
		codedFilledCurvePath,
		pixelOpenPath,
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

labelMissingQ[x_] :=
	MatchQ[
		x,
		None | Automatic | Missing[___] | Spacer[___] | {} | {None..} | {{None..}..}
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
		resolveAbsoluteGraphicsOptions[
			g,
			{
				PlotRange,
				PlotRangePadding,
				ImagePadding,
				ImageSize,
				AspectRatio,
				Ticks,
				FrameTicks
			}
		],
		MemberQ[
			{
				PlotRange,
				PlotRangePadding,
				ImagePadding,
				ImageSize,
				AspectRatio,
				Ticks,
				FrameTicks
			},
			#
		]&
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
		If[KeyExistsQ[abs, PlotRangePadding],
			repl[PlotRangePadding] = abs[PlotRangePadding]
		];
		If[KeyExistsQ[abs, ImagePadding], repl[ImagePadding] = abs[ImagePadding]];
		If[KeyExistsQ[abs, ImageSize], repl[ImageSize] = abs[ImageSize]];
		If[KeyExistsQ[abs, AspectRatio], repl[AspectRatio] = abs[AspectRatio]];
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

normalizeTick[p_?NumericQ] := {p, tickStr[p], defaultTickLength[], {}};
normalizeTick[{p_?NumericQ, label_}] := {p, label, defaultTickLength[], {}};
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

frameTicksNormalize[Automatic] =
	{{Automatic, Automatic}, {Automatic, Automatic}};
frameTicksNormalize[None] = {{None, None}, {None, None}};
frameTicksNormalize[spec_?frameTicksNestedQ] := spec;
frameTicksNormalize[spec_?tickSpecPairQ] :=
	{{spec[[2]], spec[[2]]}, {spec[[1]], spec[[1]]}};
frameTicksNormalize[spec_] := {{spec, spec}, {spec, spec}};

frameTicksNestedQ[spec_] :=
	ListQ[spec] && Length[spec] === 2 && AllTrue[spec, tickSpecPairQ];

tickInsideVector["Bottom"] = {0, 1};
tickInsideVector["Top"] = {0, -1};
tickInsideVector["Left"] = {1, 0};
tickInsideVector["Right"] = {-1, 0};

tickOutsideVector["Bottom"] = {0, -1};
tickOutsideVector["Top"] = {0, 1};
tickOutsideVector["Left"] = {-1, 0};
tickOutsideVector["Right"] = {1, 0};

tickLabelAnchor["Bottom"] = {0, 1};
tickLabelAnchor["Top"] = {0, -1};
tickLabelAnchor["Left"] = {1, 0};
tickLabelAnchor["Right"] = {-1, 0};

tickInsideOffset[side_, len_] := tickInsideVector[side]  fracToUser[len];

tickOutsideOffset[side_, len_] := tickOutsideVector[side]  fracToUser[len];

tickLinePrimitive[base_, side_, {pos_, neg_}] :=
	Line[
		{
			Offset[-tickInsideOffset[side, neg], base],
			Offset[tickInsideOffset[side, pos], base]
		}
	];

tickLabelPrimitive[label_, base_, side_, lens_] :=
	Text[
		label,
		Offset[
			tickOutsideOffset[side, Max[Abs /@ lens]] + 7  tickOutsideVector[side],
			base
		],
		tickLabelAnchor[side]
	];

decorationBag[styles___] :=
	Module[{bag = Internal`Bag[]},
		Scan[
			Internal`StuffBag[bag, #]&,
			Join[
				{$defaultTextAndAxesColor, AbsoluteThickness[0.8]},
				styleSpecList /@ {styles}
			]
		];
		bag
	];

decorationNode[prim_, styles___] := serialize[prim, decorationBag[styles]];

skipAxisTickLabelQ[_, None] := False;
skipAxisTickLabelQ[pos_, ref_?NumericQ] := Abs[N[pos - ref]] < 10 ^ -10;

tickNodes[ticks_, baseFn_, side_, styles_, skipLabelAt_ : None] :=
	Flatten[
		Table[
			With[{base = baseFn[tick[[1]]], local = tick[[4]]},
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
						{axisSideStyle[axisStyle, 1], axisSideStyle[tickStyle, 1]},
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
						{axisSideStyle[axisStyle, 2], axisSideStyle[tickStyle, 2]},
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
			If[!TrueQ[Or @@ Flatten[frame]], {}, framePrimitives[g, pr, frame]]
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
	Switch[side,
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
	Module[{
			opts,
			frameStyle,
			tickStyle,
			ticks,
			sideTicks
		},
		If[!TrueQ[frameSideEnabled[frame, side]],
			{},
			opts = plotOptionAssociation[g];
			frameStyle = frameSideStyle[Lookup[opts, FrameStyle, {}], side];
			tickStyle = frameSideStyle[Lookup[opts, FrameTicksStyle, {}], side];
			ticks = frameTicksNormalize[Lookup[opts, FrameTicks, Automatic]];
			sideTicks = frameSideTickSpec[ticks, side];
			Join[
				{decorationNode[frameLinePrimitive[pr, side], frameStyle]},
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
	Join[{FontSize -> 12, FontFamily -> "sans-serif"}, labelSpecs[opts]];

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
			{absTextNode[label, {wh[[1]] / 2, 18}, "middle", "middle", specs]}
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
								{0, Max[12, mapY[pr[[2, 2]]] - 18]},
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

pixelPtStr[p_] :=
	StringJoin[ makeSvgNumber[p[[1]]], ",", makeSvgNumber[p[[2]]]];

pixelOpenPath[pts_] :=
	StringJoin[
		"M ",
		pixelPtStr[First[pts]],
		(StringJoin[ " L ", pixelPtStr[#]])& /@ Rest[pts]
	];

pixelPathJoin[parts_] := StringRiffle[DeleteCases[parts, ""], " "];

pixelLineTail[pts_] :=
	StringRiffle[(StringJoin[ "L ", pixelPtStr[#]])& /@ Rest[pts], " "];

pixelLinePath[pts_] :=
	pixelPathJoin[
		{StringJoin[ "M ", pixelPtStr[First[pts]]], pixelLineTail[pts]}
	];

bezierDegree[pts_, opts___] :=
	Module[{
			d =
				Lookup[
					Association[FilterRules[{opts}, SplineDegree]],
					SplineDegree,
					Automatic
				]
		},
		Which[ IntegerQ[d] && d > 0, d, True, Min[3, Max[1, Length[pts] - 1]]]
	];

bezierClosedQ[opts___] :=
	TrueQ[
		Lookup[Association[FilterRules[{opts}, SplineClosed]], SplineClosed, False]
	];

quadraticBezierCommand[{p0_, p1_, p2_}] :=
	Module[{c1, c2},
		c1 = p0 + (2 / 3)  (p1 - p0);
		c2 = p2 + (2 / 3)  (p1 - p2);
		StringJoin[ "C ", pixelPtStr[c1], " ", pixelPtStr[c2], " ", pixelPtStr[p2]]
	];

cubicBezierCommand[{_, p1_, p2_, p3_}] :=
	StringJoin[ "C ", pixelPtStr[p1], " ", pixelPtStr[p2], " ", pixelPtStr[p3]];

sampledBezierCommand[pts_] :=
	Module[{f, n},
		f = BezierFunction[pts];
		n = Clip[4  Length[pts], {24, 200}];
		pixelLineTail[Table[f[t], {t, 0, 1, 1. / n}]]
	];

pixelBezierSegmentCommand[pts_] :=
	Switch[Length[pts],
		1,
			"",
		2,
			StringJoin[ "L ", pixelPtStr[pts[[2]]]],
		3,
			quadraticBezierCommand[pts],
		4,
			cubicBezierCommand[pts],
		_,
			sampledBezierCommand[pts]
	];

pixelBezierTail[pts_, opts___] :=
	Module[{
			degree = bezierDegree[pts, opts],
			rest = Rest[pts],
			current = First[pts],
			cmds = {},
			take,
			chunk
		},
		While[
			rest =!= {},
			take = Take[rest, UpTo[degree]];
			chunk = Prepend[take, current];
			AppendTo[cmds, pixelBezierSegmentCommand[chunk]];
			current = Last[take];
			rest = Drop[rest, Length[take]]
		];
		pixelPathJoin[cmds]
	];

pixelBezierPath[pts_, opts___] :=
	pixelPathJoin[
		{
			StringJoin[ "M ", pixelPtStr[First[pts]]],
			pixelBezierTail[pts, opts],
			If[bezierClosedQ[opts], "Z", ""]
		}
	];

bezierPath[pts_, opts___] := pixelBezierPath[pointPx /@ pts, opts];

bSplinePixelPoints[pts_, opts___] :=
	Module[{f, n},
		f = BSplineFunction[pts, FilterRules[{opts}, Options[BSplineFunction]]];
		n = Clip[4  Length[pts], {24, 200}];
		Table[f[t], {t, 0, 1, 1. / n}]
	];

bSplinePath[pts_, opts___] :=
	pixelOpenPath[bSplinePixelPoints[pointPx /@ pts, opts]];

curvePtsQ[pts_] := MatchQ[pts, {__}] && AllTrue[pts, graphicsPointQ];

curveSegmentQ[Line[pts_?curvePtsQ, ___]] := True;
curveSegmentQ[BezierCurve[pts_?curvePtsQ, ___]] := True;
curveSegmentQ[BSplineCurve[pts_?curvePtsQ, ___]] := True;
curveSegmentQ[_] := False;

curveComponentQ[segments_List] :=
	segments =!= {} && AllTrue[segments, curveSegmentQ];
curveComponentQ[_] := False;

curveComponents[segment_?curveSegmentQ] := {{segment}};
curveComponents[segments_List] /; curveComponentQ[segments] := {segments};
curveComponents[components_List] /; AllTrue[components, curveComponentQ] :=
	components;
curveComponents[_] := $Failed;

curveContinuePoints[pts_, None] := pts;
curveContinuePoints[pts_, current_] := Prepend[pts, current];

curveSegmentPath[Line[pts_?curvePtsQ, ___], current_, start_] :=
	Module[{
			px = curveContinuePoints[pointPx /@ pts, current]
		},
		{If[start, pixelLinePath[px], pixelLineTail[px]], Last[px]}
	];
curveSegmentPath[BezierCurve[pts_?curvePtsQ, opts___], current_, start_] :=
	Module[{
			px = curveContinuePoints[pointPx /@ pts, current]
		},
		{If[start, pixelBezierPath[px, opts], pixelBezierTail[px, opts]], Last[px]}
	];
curveSegmentPath[BSplineCurve[pts_?curvePtsQ, opts___], current_, start_] :=
	Module[{px, sampled},
		px = curveContinuePoints[pointPx /@ pts, current];
		sampled = bSplinePixelPoints[px, opts];
		{If[start, pixelLinePath[sampled], pixelLineTail[sampled]], Last[sampled]}
	];

componentClosedQ[closed_List, i_, default_] :=
	If[i <= Length[closed], TrueQ[closed[[i]]], default];
componentClosedQ[closed_, _, _] := TrueQ[closed];

curveComponentPath[segments_, closed_] :=
	Module[{
			current = None,
			start = True,
			cmds = {},
			part,
			failed = False
		},
		Do[
			part = curveSegmentPath[segment, current, start];
			If[part === $Failed,
				failed = True;
				Break[],
				If[part[[1]] =!= "", AppendTo[cmds, part[[1]]]];
				current = part[[2]];
				start = False
			],
			{segment, segments}
		];
		If[failed, $Failed, pixelPathJoin[Join[cmds, {If[TrueQ[closed], "Z", ""]}]]]
	];

joinedCurvePath[spec_, closedSpec_ : False] :=
	Module[{
			components = curveComponents[spec],
			paths
		},
		If[components === $Failed,
			$Failed,
			paths =
				MapIndexed[
					curveComponentPath[
						#1,
						componentClosedQ[closedSpec, First[#2], False]
					]&,
					components
				];
			If[MemberQ[paths, $Failed], $Failed, pixelPathJoin[paths]]
		]
	];

filledCurvePath[spec_] :=
	Module[{
			components = curveComponents[spec],
			paths
		},
		If[components === $Failed,
			$Failed,
			paths = curveComponentPath[#, True]& /@ components;
			If[MemberQ[paths, $Failed], $Failed, pixelPathJoin[paths]]
		]
	];

codedSegmentQ[{t_Integer, n_Integer, d_Integer}] :=
	MemberQ[{0, 1, 2}, t] && n > 0 && d >= 0;
codedSegmentQ[_] := False;

codedComponentQ[segments_List] :=
	segments =!= {} && AllTrue[segments, codedSegmentQ];
codedComponentQ[_] := False;

codedComponents[segments_List] /; codedComponentQ[segments] := {segments};
codedComponents[components_List] /; AllTrue[components, codedComponentQ] :=
	components;
codedComponents[_] := $Failed;

codedPointComponents[pts_?curvePtsQ] := {pts};
codedPointComponents[components_List] /; AllTrue[components, curvePtsQ] :=
	components;
codedPointComponents[_] := $Failed;

bezierLastControl[pts_, degree_] :=
	Module[{
			rest = Rest[pts],
			current = First[pts],
			control = First[pts],
			take,
			chunk
		},
		While[
			rest =!= {},
			take = Take[rest, UpTo[Max[1, degree]]];
			chunk = Prepend[take, current];
			control =
				Switch[Length[chunk],
					1,
						current,
					2,
						current,
					3,
						chunk[[2]],
					_,
						chunk[[-2]]
				];
			current = Last[take];
			rest = Drop[rest, Length[take]]
		];
		control
	];

codedLinePath[pts_, start_] :=
	If[start, pixelLinePath[pts], pixelLineTail[pts]];

codedBezierPath[pts_, degree_, start_] :=
	If[start,
		pixelBezierPath[pts, SplineDegree -> degree],
		pixelBezierTail[pts, SplineDegree -> degree]
	];

codedSegmentPath[{kind_, n_, degree_}, px_, i_, state_] :=
	Module[{
			start = state["Start"],
			current = state["Current"],
			control = state["Control"],
			take,
			pts,
			cmd
		},
		If[i + n - 1 > Length[px],
			$Failed,
			take = Take[px, {i, i + n - 1}];
			pts =
				Switch[kind,
					0 | 1,
						If[start, take, Prepend[take, current]],
					2,
						If[start, take, Join[{current, 2  current - control}, take]],
					_,
						$Failed
				];
			If[pts === $Failed,
				$Failed,
				cmd =
					Switch[kind,
						0,
							codedLinePath[pts, start],
						1 | 2,
							codedBezierPath[pts, degree, start],
						_,
							$Failed
					];
				If[cmd === $Failed,
					$Failed,
					<|
						"Command" -> cmd,
						"Current" -> Last[pts],
						"Control" -> If[kind == 0,
							If[Length[pts] >= 2, pts[[-2]], Last[pts]],
							bezierLastControl[pts, degree]
						],
						"Index"   -> i + n
					|>
				]
			]
		]
	];

codedCurveComponentPath[codes_, pts_, closed_] :=
	Module[{
			px = pointPx /@ pts,
			state = <|"Start" -> True, "Current" -> None, "Control" -> None|>,
			i = 1,
			cmds = {},
			part,
			failed = False
		},
		Do[
			part = codedSegmentPath[code, px, i, state];
			If[part === $Failed,
				failed = True;
				Break[],
				If[part["Command"] =!= "", AppendTo[cmds, part["Command"]]];
				state =
					<|
						"Start"   -> False,
						"Current" -> part["Current"],
						"Control" -> part["Control"]
					|>;
				i = part["Index"]
			],
			{code, codes}
		];
		If[failed, $Failed, pixelPathJoin[Join[cmds, {If[TrueQ[closed], "Z", ""]}]]]
	];

codedCurvePath[codes_, coords_, closedSpec_, defaultClosed_] :=
	Module[{codeComps, pointComps, paths},
		codeComps = codedComponents[codes];
		pointComps = codedPointComponents[coords];
		If[codeComps === $Failed ||
		pointComps === $Failed ||
		Length[codeComps] =!= Length[pointComps],
			$Failed,
			paths =
				MapIndexed[
					codedCurveComponentPath[
						#1,
						pointComps[[First[#2]]],
						componentClosedQ[closedSpec, First[#2], defaultClosed]
					]&,
					codeComps
				];
			If[MemberQ[paths, $Failed], $Failed, pixelPathJoin[paths]]
		]
	];

codedJoinedCurvePath[codes_, coords_, closedSpec_ : False] :=
	codedCurvePath[codes, coords, closedSpec, False];

codedFilledCurvePath[codes_, coords_] :=
	codedCurvePath[codes, coords, True, True];

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
