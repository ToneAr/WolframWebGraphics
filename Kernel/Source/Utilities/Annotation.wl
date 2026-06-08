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
tooltipContent[label_] :=
	Module[{
			fs = ptToUser[11],
			pad = ptToUser[5],
			ox = ptToUser[10],
			content,
			specs,
			textProps,
			size,
			w,
			h,
			labelNode
		},
		{content, specs} = textExtract[label];
		textProps = getCurrentTextProps[Internal`Bag[], Join[{FontSize -> 11}, specs]];
		size = labelApproxSize[content, textProps];
		w = size[[1]] + 2  pad;
		h = size[[2]] + 2  pad;
		labelNode =
			If[StringQ[content],
				XMLElement[
					"text",
					Join[
						{
							"x" -> makeSvgNumber[ox + pad],
							"y" -> makeSvgNumber[pad + fs  0.78]
						},
						textProps
					],
					{content}
				],
				labelSvgNode[
					content,
					{ox + pad, pad + size[[2]] / 2},
					"start",
					"middle",
					textProps,
					{}
				]
			];
		{
			XMLElement[
				"rect",
				{
					"class" -> "wgx-tip-bg",
					"x" -> makeSvgNumber[ox],
					"y" -> "0",
					"width" -> makeSvgNumber[w],
					"height" -> makeSvgNumber[h],
					"rx" -> makeSvgNumber[pad  0.6]
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
