(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		legendPlacement,
		legendLabelString,
		legendSize,
		legendStyleBag,
		legendTextNode,
		lineLegendNodes,
		swatchLegendNodes,
		barLegendSpec,
		barLegendColor,
		barLegendNodes,
		legendElement,
		svgElementWithLegend,
		svgElementWithLabel
	}
];

legendPlacement[Placed[legend_, pos_, ___]] := {legend, pos};
legendPlacement[{single_}] := legendPlacement[single];
legendPlacement[legend_] := {legend, After};

legendLabelString[label_] := textContent[label];

legendSize[LineLegend[_, labels_, opts___]] :=
	Module[{
			layout = Lookup[Association[{opts}], LegendLayout, Column],
			n,
			m
		},
		n = Length[Flatten[{labels}]];
		m = Max[1, Max[StringLength /@ (legendLabelString /@ Flatten[{labels}])]];
		If[layout === Row, {n  (46 + 7  m) + 8, 30}, {54 + 7  m, 12 + 20  n}]
	];
legendSize[SwatchLegend[_, labels_, opts___]] :=
	legendSize[LineLegend[{}, labels, opts]];
legendSize[BarLegend[_, opts___]] :=
	Module[{
			marker = Lookup[Association[{opts}], LegendMarkerSize, 120]
		},
		marker = If[ListQ[marker], Last[marker], marker];
		{64, N[marker] + 18}
	];
legendSize[_] := {100, 40};

legendStyleBag[style_] :=
	Module[{bag = Internal`Bag[]},
		Internal`StuffBag[bag, style];
		bag
	];

legendTextNode[label_, {x_, y_}, specs_] :=
	absTextNode[label, {x, y}, "start", "middle", Join[{FontSize -> 11}, specs]];

lineLegendNodes[styles_, labels_, {x_, y_}, layout_, labelStyle_] :=
	Module[{
			ss = Flatten[{styles}],
			ls = Flatten[{labels}],
			row
		},
		row[i_] :=
			Module[{px, py, bag = legendStyleBag[ss[[i]]]},
				{px, py} =
					If[layout === Row, {x + 80  (i - 1), y}, {x, y + 20  (i - 1)}];
				{
					XMLElement[
						"line",
						Join[
							{
								"x1" -> makeSvgNumber[px + 8],
								"y1" -> makeSvgNumber[py + 13],
								"x2" -> makeSvgNumber[px + 36],
								"y2" -> makeSvgNumber[py + 13]
							},
							DeleteCases[getCurrentStyleProps[bag, "Stroke"], "fill" -> _]
						],
						{}
					],
					legendTextNode[ls[[i]], {px + 44, py + 13}, labelStyle]
				}
			];
		Join @@ Table[row[i], {i, Min[Length[ss], Length[ls]]}]
	];

swatchLegendNodes[styles_, labels_, {x_, y_}, layout_, labelStyle_] :=
	Module[{
			ss = Flatten[{styles}],
			ls = Flatten[{labels}],
			row
		},
		row[i_] :=
			Module[{px, py, bag = legendStyleBag[ss[[i]]]},
				{px, py} =
					If[layout === Row, {x + 80  (i - 1), y}, {x, y + 20  (i - 1)}];
				{
					XMLElement[
						"rect",
						Join[
							{
								"x" -> makeSvgNumber[px + 8],
								"y" -> makeSvgNumber[py + 7],
								"width" -> "14",
								"height" -> "14"
							},
							getCurrentStyleProps[bag, "Filled"]
						],
						{}
					],
					legendTextNode[ls[[i]], {px + 30, py + 14}, labelStyle]
				}
			];
		Join @@ Table[row[i], {i, Min[Length[ss], Length[ls]]}]
	];

barLegendSpec[BarLegend[{cf_, range : {_?NumericQ, _?NumericQ}}, ___]] :=
	{cf, range};
barLegendSpec[BarLegend[cf_, ___]] := {cf, {0, 1}};

barLegendColor[cf_, t_] :=
	Module[{
			c = Quiet @ Check[cf[t], GrayLevel[t]]
		},
		If[colorSpecQ[c], c, GrayLevel[t]]
	];

barLegendNodes[legend_, {x_, y_}] :=
	Module[{
			opts = Association[List @@ Drop[List @@ legend, 1]],
			spec,
			cf,
			range,
			marker,
			w = 18,
			n = 48,
			h,
			ticks,
			strip
		},
		spec = barLegendSpec[legend];
		{cf, range} = spec;
		marker = Lookup[opts, LegendMarkerSize, 120];
		h = N[If[ListQ[marker], Last[marker], marker]];
		strip =
			Table[
				With[{
						t = 1 - i / (n - 1),
						yy = y + i  h / n,
						c = colorToSvg[barLegendColor[cf, 1 - i / (n - 1)]]
					},
					XMLElement[
						"rect",
						{
							"x" -> makeSvgNumber[x],
							"y" -> makeSvgNumber[yy],
							"width" -> makeSvgNumber[w],
							"height" -> makeSvgNumber[h / n + 1],
							"fill" -> c["rgb"]
						},
						{}
					]
				],
				{i, 0, n - 1}
			];
		ticks =
			{
				{1, range[[2]], y},
				{0.5, Mean[range], y + h / 2},
				{0, range[[1]], y + h}
			};
		Join[
			strip,
			{
				XMLElement[
					"rect",
					{
						"x" -> makeSvgNumber[x],
						"y" -> makeSvgNumber[y],
						"width" -> makeSvgNumber[w],
						"height" -> makeSvgNumber[h],
						"fill" -> "none",
						"stroke" -> "#666666",
						"stroke-width" -> "1"
					},
					{}
				]
			},
			Join @@ Table[
				{
					XMLElement[
						"line",
						{
							"x1" -> makeSvgNumber[x + w],
							"y1" -> makeSvgNumber[tick[[3]]],
							"x2" -> makeSvgNumber[x + w + 5],
							"y2" -> makeSvgNumber[tick[[3]]],
							"stroke" -> "#444444",
							"stroke-width" -> "1"
						},
						{}
					],
					legendTextNode[tickStr[tick[[2]]], {x + w + 8, tick[[3]]}, {}]
				},
				{tick, ticks}
			]
		]
	];

legendElement[legend_, {x_, y_}] :=
	Module[{
			size = legendSize[legend],
			opts,
			layout,
			labelStyle,
			nodes
		},
		nodes =
			Which[
				MatchQ[legend, _LineLegend],
					opts = Association[List @@ Drop[List @@ legend, 2]];
					layout = Lookup[opts, LegendLayout, Column];
					labelStyle = Flatten[{Lookup[opts, LabelStyle, {}]}];
					lineLegendNodes[legend[[1]], legend[[2]], {x, y}, layout, labelStyle],
				MatchQ[legend, _SwatchLegend],
					opts = Association[List @@ Drop[List @@ legend, 2]];
					layout = Lookup[opts, LegendLayout, Column];
					labelStyle = Flatten[{Lookup[opts, LabelStyle, {}]}];
					swatchLegendNodes[
						legend[[1]],
						legend[[2]],
						{x, y},
						layout,
						labelStyle
					],
				MatchQ[legend, _BarLegend],
					barLegendNodes[legend, {x + 8, y + 8}],
				True,
					{legendTextNode[legend, {x + 8, y + 18}, {}]}
			];
		XMLElement[
			"g",
			{},
			Prepend[
				nodes,
				XMLElement[
					"rect",
					{
						"x" -> makeSvgNumber[x],
						"y" -> makeSvgNumber[y],
						"width" -> makeSvgNumber[size[[1]]],
						"height" -> makeSvgNumber[size[[2]]],
						"fill" -> "#ffffff",
						"stroke" -> "#d0d0d0",
						"stroke-width" -> "1"
					},
					{}
				]
			]
		]
	];

svgElementWithLegend[XMLElement["svg", attrs_, children_], placed_] :=
	Module[{
			a = Association[attrs],
			wh,
			legend,
			pos,
			size,
			gap = 10,
			pshift,
			lpos
		},
		wh = ToExpression /@ Lookup[a, {"width", "height"}];
		{legend, pos} = legendPlacement[placed];
		size = legendSize[legend];
		{pshift, lpos, wh} =
			Switch[pos,
				Before | Left,
					{
						{size[[1]] + gap, 0},
						{0, Max[6, (wh[[2]] - size[[2]]) / 2]},
						{wh[[1]] + size[[1]] + gap, wh[[2]]}
					},
				Below | Bottom,
					{
						{0, 0},
						{Max[6, (wh[[1]] - size[[1]]) / 2], wh[[2]] + gap},
						{wh[[1]], wh[[2]] + size[[2]] + gap}
					},
				Above | Top,
					{
						{0, size[[2]] + gap},
						{Max[6, (wh[[1]] - size[[1]]) / 2], 0},
						{wh[[1]], wh[[2]] + size[[2]] + gap}
					},
				_,
					{
						{0, 0},
						{wh[[1]] + gap, Max[6, (wh[[2]] - size[[2]]) / 2]},
						{wh[[1]] + size[[1]] + gap, wh[[2]]}
					}
			];
		setSvgSize[
			XMLElement[
				"svg",
				Normal[a],
				Join[shiftSvgChildren[children, pshift], {legendElement[legend, lpos]}]
			],
			wh
		]
	];

svgElementWithLabel[XMLElement["svg", attrs_, children_], label_, pos_] :=
	Module[{
			a = Association[attrs],
			wh,
			gap = 28,
			pshift,
			lpos
		},
		wh = ToExpression /@ Lookup[a, {"width", "height"}];
		{pshift, lpos, wh} =
			Switch[pos,
				Bottom | Below,
					{{0, 0}, {wh[[1]] / 2, wh[[2]] + 18}, {wh[[1]], wh[[2]] + gap}},
				Left | Before,
					{{gap, 0}, {14, wh[[2]] / 2}, {wh[[1]] + gap, wh[[2]]}},
				Right | After,
					{{0, 0}, {wh[[1]] + 14, wh[[2]] / 2}, {wh[[1]] + gap, wh[[2]]}},
				_,
					{{0, gap}, {wh[[1]] / 2, 18}, {wh[[1]], wh[[2]] + gap}}
			];
		setSvgSize[
			XMLElement[
				"svg",
				Normal[a],
				Join[
					shiftSvgChildren[children, pshift],
					{absTextNode[label, lpos, "middle", "middle", {FontSize -> 14, Bold}]}
				]
			],
			wh
		]
	];