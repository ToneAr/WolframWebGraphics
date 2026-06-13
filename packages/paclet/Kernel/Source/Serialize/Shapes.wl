(* ::Section:: *) (* Points *)
serialize[Point[{x_?NumericQ, y_?NumericQ}], props_] :=
	XMLElement[
		"circle",
		Join[
			{
				"cx" -> xPx[x],
				"cy" -> yPx[y],
				"r"  -> makeSvgNumber[getCurrentPointRadius[props]]
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
(* ::Section:: *) (* Lines *)
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
serialize[Line[lines : {_?graphicsPtsQ..}, opts__], props_] :=
	With[{
			vc = Lookup[Association[{opts}], VertexColors, None]
		},
		If[
			ListQ[vc] &&
			Length[vc] === Length[lines] &&
			And @@ MapThread[
				Function[
					{pts, cols},
					ListQ[cols] &&
					Length[pts] === Length[cols] &&
					AllTrue[cols, colorSpecQ]
				],
				{lines, vc}
			],
			XMLElement[
				"g",
				{},
				MapThread[vertexLine[#1, normalizeColorSpec /@ #2, props]&, {lines, vc}]
			],
			serialize[Line[lines], props]
		]
	];
(* ::Section:: *) (* Arrows *)
serialize[Arrow[Line[pts_], rest___], props_] := arrowSvg[pts, props];
serialize[Arrow[pts : {{_?NumericQ, _?NumericQ}..}, rest___], props_] :=
	arrowSvg[pts, props];
(* ::Section:: *) (* Circles / Arcs *)
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
(* ::Section:: *) (* Discs / Sectors *)
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
(* ::Section:: *) (* Annulus *)
serialize[
	Annulus[{x_?NumericQ, y_?NumericQ}, {ri_?NumericQ, ro_?NumericQ}],
	props_
] :=
	filledElement[
		"path",
		{
			"d"         -> StringJoin[
				closedPath[circlePts[{x, y}, ro, {0, 2  Pi}]],
				" ",
				closedPath[Reverse @ circlePts[{x, y}, ri, {0, 2  Pi}]]
			],
			"fill-rule" -> "evenodd"
		},
		props
	];
(* ::Section:: *) (* Rectangles *)
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
				"x"      -> xPx[Min[x1, x2]],
				"y"      -> yPx[Max[y1, y2]],
				"width"  -> makeSvgNumber[Abs[mapX[x2] - mapX[x1]]],
				"height" -> makeSvgNumber[Abs[mapY[y2] - mapY[y1]]]
			},
			roundingAttr[Lookup[Association[opts], RoundingRadius, 0]]
		],
		props
	];
(* ::Section:: *) (* Polygons *)
serialize[Polygon[pts_?graphicsPtsQ], props_] :=
	filledElement["polygon", {"points" -> ptsStr[pts]}, props];
serialize[Polygon[contours : {_?graphicsPtsQ..}], props_] :=
	filledElement[
		"path",
		{
			"d"         -> StringRiffle[closedPath /@ contours, " "],
			"fill-rule" -> "evenodd"
		},
		props
	];
serialize[Polygon[pts : {{_?NumericQ, _?NumericQ}..}, opts__], props_] :=
	Module[{o = Association[{opts}], tex, vtc, vc},
		tex = currentTexture[props];
		vtc = Lookup[o, VertexTextureCoordinates, None];
		vc = Lookup[o, VertexColors, None];
		Which[
			tex =!= None && vtc =!= None,
				texturedPolygonElement[tex, Polygon[pts, opts], props],
			ListQ[vc] && AllTrue[vc, colorSpecQ] && Length[vc] === Length[pts],
				rasterizedVertexColorElement[
					{Polygon[pts, VertexColors -> (normalizeColorSpec /@ vc)]},
					props
				],
			True,
				serialize[Polygon[pts], props]
		]
	];
serialize[Polygon[contours : {_?graphicsPtsQ..}, opts__], props_] :=
	Module[{tex = currentTexture[props], vtc},
		vtc = Lookup[Association[{opts}], VertexTextureCoordinates, None];
		If[tex =!= None && vtc =!= None,
			texturedPolygonElement[tex, Polygon[contours, opts], props],
			serialize[Polygon[contours], props]
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
(* ::Section:: *) (* Curves *)
serialize[BezierCurve[pts_?graphicsPtsQ, opts___], props_] :=
	XMLElement[
		"path",
		Join[
			{"d" -> bezierPath[pts, opts]},
			curveClass[],
			getCurrentStyleProps[props, "Stroke"]
		],
		{}
	];
serialize[BSplineCurve[pts_?graphicsPtsQ, opts___], props_] :=
	XMLElement[
		"path",
		Join[
			{"d" -> bSplinePath[pts, opts]},
			curveClass[],
			getCurrentStyleProps[props, "Stroke"]
		],
		{}
	];
serialize[JoinedCurve[codes_, coords_List, opts___], props_] :=
	Module[{
			path =
				codedJoinedCurvePath[
					codes,
					coords,
					Lookup[
						Association[FilterRules[{opts}, CurveClosed]],
						CurveClosed,
						False
					]
				]
		},
		If[path === $Failed,
			Null,
			XMLElement[
				"path",
				Join[
					{"d" -> path},
					curveClass[],
					getCurrentStyleProps[props, "Stroke"]
				],
				{}
			]
		]
	];
serialize[JoinedCurve[spec_, opts___], props_] :=
	Module[{
			path =
				joinedCurvePath[
					spec,
					Lookup[
						Association[FilterRules[{opts}, CurveClosed]],
						CurveClosed,
						False
					]
				]
		},
		If[path === $Failed,
			Null,
			XMLElement[
				"path",
				Join[
					{"d" -> path},
					curveClass[],
					getCurrentStyleProps[props, "Stroke"]
				],
				{}
			]
		]
	];
serialize[FilledCurve[codes_, coords_List, ___], props_] :=
	Module[{
			path = codedFilledCurvePath[codes, coords]
		},
		If[path === $Failed,
			Null,
			filledElement["path", {"d" -> path, "fill-rule" -> "evenodd"}, props]
		]
	];
serialize[FilledCurve[spec_, ___], props_] :=
	Module[{path = filledCurvePath[spec]},
		If[path === $Failed,
			Null,
			filledElement["path", {"d" -> path, "fill-rule" -> "evenodd"}, props]
		]
	];
