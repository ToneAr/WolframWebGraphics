(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{filledElement, gradStops, endpointFrac, linearEndpoints, gradientDef}
];

filledElement[tag_, geom_List, props_] :=
	(* a filled element that honours an active gradient-fill directive *)
	Module[{
			fill = getCurrentFilling[props],
			style = getCurrentStyleProps[props, "Filled"],
			id,
			def
		},
		If[fill === None,
			XMLElement[tag, Join[geom, style], {}],
			id = uid["grad"];
			def = gradientDef[fill, id];
			style =
				Append[
					DeleteCases[style, ("fill" -> _)],
					"fill" -> StringJoin[ "url(#", id, ")"]
				];
			XMLElement[
				"g",
				{},
				{XMLElement["defs", {}, {def}], XMLElement[tag, Join[geom, style], {}]}
			]
		]
	];

gradStops[stops_] :=
	Function[
		s,
		With[{c = colorToSvg[Last[s]]},
			XMLElement[
				"stop",
				{
					"offset" -> makeSvgNumber[First[s]],
					"stop-color" -> c["rgb"],
					"stop-opacity" -> makeSvgNumber[c["alpha"]]
				},
				{}
			]
		]
	] /@ stops;

endpointFrac[Left] = {0, 0.5};
endpointFrac[Right] = {1, 0.5};
endpointFrac[Bottom] = {0.5, 0};
endpointFrac[Top] = {0.5, 1};
endpointFrac[Center] = {0.5, 0.5};
endpointFrac[{a_?NumericQ, b_?NumericQ}] := {a, b};
endpointFrac[_] := {0.5, 0.5};

(*
 * ObjectBoundingBox endpoints (0..1), y flipped for SVG
 *)
linearEndpoints[{p1_, p2_}] := {endpointFrac[p1], endpointFrac[p2]};
linearEndpoints[theta_?NumericQ] :=
	{
		{0.5, 0.5} - 0.5 * {Cos[theta], Sin[theta]},
		{0.5, 0.5} + 0.5 * {Cos[theta], Sin[theta]}
	};
linearEndpoints[_] := {{0, 0.5}, {1, 0.5}};

gradientDef[LinearGradientFilling[pos_ -> cols_, dir_ : 0, ___], id_] :=
	Module[{e = linearEndpoints[dir]},
		XMLElement[
			"linearGradient",
			{
				"id" -> id,
				"x1" -> makeSvgNumber[e[[1, 1]]],
				"y1" -> makeSvgNumber[1 - e[[1, 2]]],
				"x2" -> makeSvgNumber[e[[2, 1]]],
				"y2" -> makeSvgNumber[1 - e[[2, 2]]]
			},
			gradStops[Transpose[{pos, cols}]]
		]
	];
gradientDef[
	RadialGradientFilling[pos_ -> cols_, c_ : {{0.5, 0.5}, {0.5, 0.5}}, ___],
	id_
] :=
	XMLElement[
		"radialGradient",
		{
			"id" -> id,
			"cx" -> makeSvgNumber[c[[1, 1]]],
			"cy" -> makeSvgNumber[1 - c[[1, 2]]],
			"r" -> makeSvgNumber[Mean[c[[2]]]]
		},
		gradStops[Transpose[{pos, cols}]]
	];
gradientDef[_, id_] :=
	XMLElement[
		"linearGradient",
		{"id" -> id},
		gradStops[{{0, GrayLevel[0.9]}, {1, GrayLevel[0.3]}}]
	];
