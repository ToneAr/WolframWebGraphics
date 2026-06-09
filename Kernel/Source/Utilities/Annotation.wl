(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[{tooltipContent, annotationMeaningful, highlightAnnotationQ}];

tooltipContent[g_Graphics] :=
	{
		XMLElement[
			"g",
			{
				"transform" ->
					StringJoin[ "translate(", makeSvgNumber[ptToUser[10]], " 0)"]
			},
			{svgElement[g]}
		]
	};

tooltipRichLabelQ[expr_] :=
	!FreeQ[
		HoldComplete[expr],
		_Column |
		_Grid |
		_TextGrid |
		_TableForm |
		_MatrixForm |
		_NumberForm |
		_AccountingForm |
		_ScientificForm |
		_EngineeringForm
	];

tooltipStyledLabel[content_, specs_List] :=
	Style[
		content,
		FontSize  -> 11,
		FontColor -> $defaultTextAndAxesColor,
		Sequence @@ specs
	];

tooltipRasterLabel[content_, specs_, {x_, y_}] :=
	Module[{img, dims},
		img =
			Check[
				Rasterize[
					tooltipStyledLabel[content, specs],
					"Image",
					Background -> None
				],
				$Failed
			];
		If[Head[img] =!= Image,
			$Failed,
			dims = ImageDimensions[img];
			{
				XMLElement[
					"image",
					{
						"x"                   -> makeSvgNumber[x],
						"y"                   -> makeSvgNumber[y],
						"width"               -> makeSvgNumber[dims[[1]]],
						"height"              -> makeSvgNumber[dims[[2]]],
						"preserveAspectRatio" -> "none",
						"href"                -> imageDataURI[img]
					},
					{}
				],
				dims
			}
		]
	];

tooltipStringLines[s_String] := StringSplit[s, "\n", All];

tooltipStringSize[s_String, textProps_] :=
	Module[{
			lines = tooltipStringLines[s],
			fs = textFontSize[textProps]
		},
		{
			Max[1, Sequence @@ (StringLength /@ lines)]  fs  0.6,
			Length[lines]  fs  1.2
		}
	];

tooltipStringNode[s_String, {x_, y_}, textProps_] :=
	Module[{
			lines = tooltipStringLines[s],
			fs = textFontSize[textProps]
		},
		If[Length[lines] === 1,
			XMLElement[
				"text",
				Join[{"x" -> makeSvgNumber[x], "y" -> makeSvgNumber[y]}, textProps],
				{s}
			],
			XMLElement[
				"text",
				Join[{"x" -> makeSvgNumber[x], "y" -> makeSvgNumber[y]}, textProps],
				MapIndexed[
					XMLElement[
						"tspan",
						{
							"x"  -> makeSvgNumber[x],
							"dy" -> If[#2[[1]] === 1, "0", makeSvgNumber[fs  1.2]]
						},
						{#1}
					]&,
					lines
				]
			]
		]
	];

tooltipContent[label_] :=
	Module[{
			fs = ptToUser[11],
			pad = ptToUser[5],
			ox = ptToUser[10],
			content,
			specs,
			textProps,
			raster,
			size,
			w,
			h,
			labelNode
		},
		{content, specs} = textExtract[label];
		textProps =
			getCurrentTextProps[Internal`Bag[], Join[{FontSize -> 11}, specs]];
		raster =
			If[tooltipRichLabelQ[content],
				tooltipRasterLabel[content, specs, {ox + pad, pad}],
				$Failed
			];
		If[raster =!= $Failed,
			{labelNode, size} = raster,
			size =
				If[StringQ[content],
					tooltipStringSize[content, textProps],
					labelApproxSize[content, textProps]
				];
			labelNode =
				If[StringQ[content],
					tooltipStringNode[content, {ox + pad, pad + fs  0.78}, textProps],
					labelSvgNode[
						content,
						{ox + pad, pad + size[[2]] / 2},
						"start",
						"middle",
						textProps,
						{}
					]
				]
		];
		w = size[[1]] + 2  pad;
		h = size[[2]] + 2  pad;
		{
			XMLElement[
				"rect",
				{
					"class"  -> "wgx-tip-bg",
					"x"      -> makeSvgNumber[ox],
					"y"      -> "0",
					"width"  -> makeSvgNumber[w],
					"height" -> makeSvgNumber[h],
					"rx"     -> makeSvgNumber[pad  0.6]
				},
				{}
			],
			labelNode
		}
	];

annotationMeaningful[s_String] :=
	!StringContainsQ[s, "`"] && !StringStartsQ[s, "WRI-"];
annotationMeaningful[n_?NumberQ] := True;
annotationMeaningful[_] := False;

highlightAnnotationQ[meta_] :=
	AssociationQ[meta] && KeyExistsQ[meta, "HighlightElements"];
