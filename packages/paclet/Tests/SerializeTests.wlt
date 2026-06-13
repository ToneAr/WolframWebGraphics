$ContextAliases["pvt`"] = "ToneAr`WebGraphics`PackageScope`";

(* ::Section:: *) (* Helpers *)
bag[d___] := Module[{b = Internal`Bag[]}, (Internal`StuffBag[b, #]&) /@ {d}; b];

gtag[XMLElement[t_, _, _]] := t;
gtag[_] := Missing[];

(* attribute of an element node *)
gat[XMLElement[_, a_, _], k_] := Lookup[Association[a], k, Missing[]];
gat[_, _] := Missing[];

(* attribute of the first descendant element with the given tag *)
firstAttr[node_, tag_, k_] :=
	FirstCase[
		node,
		XMLElement[tag, a_, _] :> Lookup[Association[a], k, Missing[]],
		Missing[],
		Infinity
	];

hasTag[node_, t_] := !FreeQ[node, XMLElement[t, ___]];

contains[node_, x_] := !FreeQ[node, x];

(* full-document markup string (pvt`serialize now returns a String for 2D & 3D) *)
xml[g_] := pvt`serialize[g];

(* ::Section:: *) (* Geometry Primitives *)
TestCreate[
	gtag[pvt`serialize[Disk[{0, 0}, 1], bag[]]],
	"circle",
	TestID -> "disk-tag"
];
TestCreate[
	gat[pvt`serialize[Disk[{0, 0}, 1], bag[]], "r"],
	"1",
	TestID -> "disk-radius"
];
TestCreate[
	gat[pvt`serialize[Disk[{2, 3}, 1], bag[]], "cy"],
	"-3",
	TestID -> "disk-yflip"
];
TestCreate[
	gtag[pvt`serialize[Disk[{0, 0}, {2, 3}], bag[]]],
	"ellipse",
	TestID -> "diskxy-ellipse"
];

TestCreate[
	gtag[pvt`serialize[Circle[{0, 0}, 1], bag[]]],
	"circle",
	TestID -> "circle-tag"
];
TestCreate[
	gat[pvt`serialize[Circle[{0, 0}, 1], bag[]], "fill"],
	"none",
	TestID -> "circle-is-stroke"
];

TestCreate[
	gtag[pvt`serialize[Point[{1, 2}], bag[]]],
	"circle",
	TestID -> "point-tag"
];
TestCreate[
	gat[pvt`serialize[Point[{1, 2}], bag[]], "cy"],
	"-2",
	TestID -> "point-yflip"
];
TestCreate[
	gtag[pvt`serialize[Point[{{0, 0}, {1, 1}}], bag[]]],
	"g",
	TestID -> "point-multi-group"
];

TestCreate[
	gtag[pvt`serialize[Line[{{0, 0}, {1, 1}}], bag[]]],
	"polyline",
	TestID -> "line-tag"
];
TestCreate[
	gat[pvt`serialize[Line[{{0, 1}, {2, 3}}], bag[]], "points"],
	"0,-1 2,-3",
	TestID -> "line-points-yflip"
];
TestCreate[
	gat[
		pvt`serialize[
			Line[{{0, 0}, Offset[{10, -5}, {1, 1}]}],
			bag[]
		],
		"points"
	],
	"0,0 11,4",
	TestID -> "line-offset-point"
];
TestCreate[
	gat[
		pvt`serialize[
			Style[
				Line[{{0, 0}, Offset[{0, 10}, {0, 1}]}],
				Directive[AbsoluteThickness[4], LightDarkSwitched[RGBColor[1, 1, 1]]]
			],
			bag[]
		],
		"stroke"
	],
	"#ffffff",
	TestID -> "line-offset-lightdarkswitched-one-arg"
];
TestCreate[
	Module[{node},
		node =
			pvt`serialize[
				Line[
					{
						{{0, 0}, {0, 1}},
						{{1, 0}, {1, 1}}
					},
					VertexColors -> None
				],
				bag[]
			];
		gtag[node] === "g" &&
			Count[node, XMLElement["polyline", _, _], Infinity] === 2
	],
	True,
	TestID -> "line-multisegment-optioned"
];

TestCreate[
	gtag[pvt`serialize[Rectangle[{0, 0}, {2, 4}], bag[]]],
	"rect",
	TestID -> "rect-tag"
];
TestCreate[
	gat[pvt`serialize[Rectangle[{0, 0}, {2, 4}], bag[]], "y"],
	"-4",
	TestID -> "rect-yflip"
];
TestCreate[
	gat[pvt`serialize[Rectangle[{0, 0}, {2, 4}], bag[]], "height"],
	"4",
	TestID -> "rect-height"
];

TestCreate[
	gtag[pvt`serialize[Polygon[{{0, 0}, {1, 0}, {0, 1}}], bag[]]],
	"polygon",
	TestID -> "polygon-tag"
];
TestCreate[
	gat[
		pvt`serialize[
			Polygon[
				{
					Offset[{0, 0}, {0, 0}],
					Offset[{10, 0}, {0, 0}],
					Offset[{0, 10}, {0, 0}]
				}
			],
			bag[]
		],
		"points"
	],
	"0,0 10,0 0,-10",
	TestID -> "polygon-offset-points"
];
TestCreate[
	gat[
		pvt`serialize[
			Polygon[{{{0, 0}, {3, 0}, {0, 3}}, {{1, 1}, {2, 1}, {1, 2}}}],
			bag[]
		],
		"fill-rule"
	],
	"evenodd",
	TestID -> "polygon-holes-evenodd"
];

textureImg =
	Image[{{{1., 0., 0.}, {0., 1., 0.}}, {{0., 0., 1.}, {1., 1., 0.}}}];
textureRect =
	Polygon[
		{{0., 0.}, {1., 0.}, {1., 1.}, {0., 1.}},
		VertexTextureCoordinates -> {{0., 0.}, {1., 0.}, {1., 1.}, {0., 1.}}
	];

TestCreate[
	With[{
			doc = xml[
				Graphics[
					{Texture[textureImg], textureRect},
					PlotRange -> {{0., 1.}, {0., 1.}}
				]
			]
		},
		StringContainsQ[doc, "<image"] &&
		StringContainsQ[doc, "data:image/png;base64,"]
	],
	True,
	TestID -> "texture-polygon-directive-image"
];
TestCreate[
	gtag[pvt`serialize[{Texture[textureImg], textureRect}, bag[]]],
	"image",
	TestID -> "texture-list-rule-priority"
];
TestCreate[
	gtag[pvt`serialize[Style[textureRect, Texture[textureImg]], bag[]]],
	"image",
	TestID -> "texture-style-directive"
];
TestCreate[
	gtag[pvt`serialize[Triangle[{{0, 0}, {1, 0}, {0, 1}}], bag[]]],
	"polygon",
	TestID -> "triangle-tag"
];

TestCreate[
	gtag[pvt`serialize[Annulus[{0, 0}, {0.5, 1}], bag[]]],
	"path",
	TestID -> "annulus-path"
];
TestCreate[
	gat[pvt`serialize[Annulus[{0, 0}, {0.5, 1}], bag[]], "fill-rule"],
	"evenodd",
	TestID -> "annulus-evenodd"
];

TestCreate[
	gtag[pvt`serialize[Disk[{0, 0}, 1, {0, Pi}], bag[]]],
	"polygon",
	TestID -> "sector-polygon"
];
TestCreate[
	gtag[pvt`serialize[Circle[{0, 0}, 1, {0, Pi}], bag[]]],
	"polyline",
	TestID -> "arc-polyline"
];

TestCreate[
	StringStartsQ[
		gat[pvt`serialize[BezierCurve[{{0, 0}, {1, 1}, {2, 0}, {3, 1}}], bag[]], "d"],
		"M"
	],
	True,
	TestID -> "bezier-path"
];
TestCreate[
	StringContainsQ[
		gat[pvt`serialize[BezierCurve[{{0, 0}, {1, 1}, {2, 0}}], bag[]], "d"],
		" C "
	],
	True,
	TestID -> "bezier-quadratic-command"
];
TestCreate[
	gtag[pvt`serialize[BSplineCurve[{{0, 0}, {1, 1}, {2, 0}, {3, 1}}], bag[]]],
	"path",
	TestID -> "bspline-path"
];
TestCreate[
	gtag[
		pvt`serialize[
			BSplineCurve[
				{
					Offset[{0, 0}, {0, 0}],
					Offset[{6, 0}, {1, 1}],
					Offset[{8, 4}, {1, 1}]
				}
			],
			bag[]
		]
	],
	"path",
	TestID -> "bspline-offset-path"
];
TestCreate[
	gtag[
		pvt`serialize[
			JoinedCurve[
				{
					Line[{{0, 0}, {1, 0}}],
					BezierCurve[{{1, 1}, {2, 1}, {2, 0}}]
				}
			],
			bag[]
		]
	],
	"path",
	TestID -> "joinedcurve-path"
];
TestCreate[
	StringFreeQ[
		gat[
			pvt`serialize[
				JoinedCurve[
					{
						Line[{{0, 0}, {1, 0}}],
						BezierCurve[{{1, 1}, {2, 1}, {2, 0}}]
					}
				],
				bag[]
			],
			"d"
		],
		"Z"
	],
	True,
	TestID -> "joinedcurve-open"
];
TestCreate[
	StringContainsQ[
		gat[
			pvt`serialize[
				JoinedCurve[
					{
						Line[{{0, 0}, {1, 0}}],
						BezierCurve[{{1, 1}, {2, 1}, {2, 0}}]
					},
					CurveClosed -> True
				],
				bag[]
			],
			"d"
		],
		"Z"
	],
	True,
	TestID -> "joinedcurve-closed"
];
TestCreate[
	gat[
		pvt`serialize[
			FilledCurve[
				{
					Line[{{0, 0}, {1, 0}}],
					BezierCurve[{{1, 1}, {2, 1}, {2, 0}}]
				}
			],
			bag[]
		],
		"fill-rule"
	],
	"evenodd",
	TestID -> "filledcurve-evenodd"
];
TestCreate[
	Module[{doc, height, d},
		doc =
			xml[
				Graphics[
					FilledCurve[{BezierCurve[{{-1, 0}, {0, 1}, {1, 0}}]}],
					ImageSize -> {116.99999999999994, Automatic}
				]
			];
		height =
			ToExpression[
				First[StringCases[doc, "height='" ~~ h:NumberString ~~ "'" :> h]]
			];
		d = First[StringCases[doc, "d='" ~~ p:Shortest[__] ~~ "'" :> p]];
		height > 33 && StringStartsQ[d, "M 2."]
	],
	True,
	TestID -> "filledcurve-auto-padding"
];
TestCreate[
	StringCount[
		gat[
			pvt`serialize[
				FilledCurve[
					{
						{Line[{{0, 0}, {1, 0}}], BezierCurve[{{1, 1}, {0, 1}}]},
						{Line[{{2, 0}, {3, 0}}], BezierCurve[{{3, 1}, {2, 1}}]}
					}
				],
				bag[]
			],
			"d"
		],
		"M "
	],
	2,
	TestID -> "filledcurve-components"
];
TestCreate[
	StringContainsQ[
		gat[
			pvt`serialize[
				FilledCurve[
					{{{0, 2, 0}, {1, 3, 3}}},
					{{{0, 0}, {1, 0}, {2, 1}, {3, 0}, {4, 1}}}
				],
				bag[]
			],
			"d"
		],
		" C "
	],
	True,
	TestID -> "filledcurve-coded-cubic"
];
TestCreate[
	StringFreeQ[
		gat[
			pvt`serialize[
				JoinedCurve[
					{{{0, 2, 0}, {1, 3, 3}}},
					{{{0, 0}, {1, 0}, {2, 1}, {3, 0}, {4, 1}}}
				],
				bag[]
			],
			"d"
		],
		"Z"
	],
	True,
	TestID -> "joinedcurve-coded-open"
];
TestCreate[
	StringContainsQ[
		gat[
			pvt`serialize[
				FilledCurve[
					{{{0, 2, 0}, {2, 3, 3}}},
					{{{0, 0}, {1, 0}, {2, 1}, {3, 0}, {4, 1}}}
				],
				bag[]
			],
			"d"
		],
		" C "
	],
	True,
	TestID -> "filledcurve-coded-smooth"
];

TestCreate[
	hasTag[pvt`serialize[Arrow[{{0, 0}, {1, 1}}], bag[]], "polyline"],
	True,
	TestID -> "arrow-line"
];
TestCreate[
	hasTag[pvt`serialize[Arrow[{{0, 0}, {1, 1}}], bag[]], "polygon"],
	True,
	TestID -> "arrow-head"
];

TestCreate[
	hasTag[pvt`serialize[Text["hi", {0, 0}], bag[]], "text"],
	True,
	TestID -> "text-tag"
];
TestCreate[
	contains[pvt`serialize[Text["hi", {0, 0}], bag[]], "hi"],
	True,
	TestID -> "text-content"
];
TestCreate[
	Module[{node = pvt`serialize[Text[x^2, {0, 0}], bag[]]},
		hasTag[node, "foreignObject"] &&
		hasTag[node, "math"] &&
		hasTag[node, "msup"]
	],
	True,
	TestID -> "text-symbolic-mathml"
];
TestCreate[
	Module[{node = pvt`serialize[Text[Panel["Alpha"], {0, 0}], bag[]]},
		hasTag[node, "rect"] &&
			contains[node, "Alpha"] &&
			StringFreeQ[ToString[node, InputForm], "Panel"]
	],
	True,
	TestID -> "text-panel-renders"
];
TestCreate[
	Module[{node = pvt`serialize[Text[Panel[x^2], {0, 0}], bag[]]},
		hasTag[node, "rect"] &&
			hasTag[node, "math"] &&
			hasTag[node, "msup"]
	],
	True,
	TestID -> "text-panel-symbolic-mathml"
];
TestCreate[
	Module[{
			node =
				pvt`serialize[
					Text[Entity["Country", "UnitedStates"], {0, 0}],
					bag[]
				]
		},
		contains[node, "United States"] &&
			StringFreeQ[ToString[node, InputForm], "Entity["]
	],
	True,
	TestID -> "text-entity-label"
];
TestCreate[
	Module[{
			doc =
				Check[
					xml[
						Graphics[
							{
								Text[
									Row[{Entity["Country", "France"], ": ", 1}],
									{0, 0}
								]
							}
						]
					],
					$Failed
				]
		},
		StringQ[doc] &&
			StringContainsQ[doc, "France: 1"] &&
			StringFreeQ[doc, "Entity["]
	],
	True,
	TestID -> "text-row-entity-label"
];
TestCreate[
	Module[{doc, badChars},
		doc =
			xml[
				Graphics[
					{Text[HoldForm[Im[ArcCsch[(x + I  y) ^ 3]]], {0, 0}]}
				]
			];
		badChars =
			FromCharacterCode /@ {
				8203,
				8289,
				8290,
				8291,
				8292,
				63308,
				63309,
				63310,
				63311,
				63333,
				63341
			};
		StringFreeQ[doc, Alternatives @@ badChars] &&
		StringContainsQ[doc, "<mi>i</mi>"]
	],
	True,
	TestID -> "text-mathml-sanitizes-invisible-glyphs"
];
TestCreate[
	hasTag[pvt`serialize[Text["hi", {0, 0}], bag[]], "foreignObject"],
	False,
	TestID -> "text-string-stays-svg-text"
];

TestCreate[
	hasTag[
		pvt`serialize[
			GraphicsComplex[{{0, 0}, {1, 0}, {0, 1}}, Polygon[{1, 2, 3}]],
			bag[]
		],
		"polygon"
	],
	True,
	TestID -> "graphicscomplex-expands"
];

(* ::Section:: *) (* StyleResolution *)
TestCreate[
	gat[pvt`serialize[Disk[{0, 0}, 1], bag[Red]], "fill"],
	"#ff0000",
	TestID -> "fill-color"
];
TestCreate[
	gat[pvt`serialize[Disk[{0, 0}, 1], bag[]], "fill"],
	Missing[],
	TestID -> "fill-default-omitted"
];
TestCreate[
	gat[pvt`serialize[Disk[{0, 0}, 1], bag[Red, Opacity[0.5]]], "fill-opacity"],
	"0.5",
	TestID -> "fill-opacity"
];
TestCreate[
	StringQ[
		gat[
			pvt`serialize[Line[{{0, 0}, {1, 1}}], bag[AbsoluteThickness[2]]],
			"stroke-width"
		]
	],
	True,
	TestID -> "stroke-width-present"
];
TestCreate[
	StringQ[
		gat[
			pvt`serialize[Line[{{0, 0}, {1, 1}}], bag[Dashing[{0.05, 0.05}]]],
			"stroke-dasharray"
		]
	],
	True,
	TestID -> "dashing-present"
];
TestCreate[
	gat[pvt`serialize[Disk[{0, 0}, 1], bag[Red, EdgeForm[Black]]], "stroke"],
	"#000000",
	TestID -> "edgeform-stroke"
];
TestCreate[
	StringQ[
		gat[
			pvt`serialize[
				Disk[{0, 0}, 1],
				bag[Red, EdgeForm[{Black, Dashing[{0.05, 0.05}]}]]
			],
			"stroke-dasharray"
		]
	],
	True,
	TestID -> "dashing-on-filled-edge"
];
TestCreate[
	gat[pvt`serialize[Disk[{0, 0}, 1], bag[FaceForm[None]]], "fill"],
	"none",
	TestID -> "faceform-none"
];

TestCreate[
	ToneAr`WebGraphics`PackageScope`getCurrentStyleProps[bag[], "Filled"],
	{},
	TestID -> "styleprops-empty-default"
];
TestCreate[
	AllTrue[
		Values[
			Association[
				ToneAr`WebGraphics`PackageScope`getCurrentStyleProps[
					bag[Red, Opacity[0.4]],
					"Filled"
				]
			]
		],
		StringQ
	],
	True,
	TestID -> "styleprops-values-are-strings"
];

(* ::Section:: *) (* Gradients/Vertex Colors *)
TestCreate[
	hasTag[
		pvt`serialize[Disk[{0, 0}, 1], bag[LinearGradientFilling[{Red, Blue}]]],
		"linearGradient"
	],
	True,
	TestID -> "lineargradientfill-def"
];
TestCreate[
	StringStartsQ[
		firstAttr[
			pvt`serialize[Disk[{0, 0}, 1], bag[LinearGradientFilling[{Red, Blue}]]],
			"circle",
			"fill"
		],
		"url("
	],
	True,
	TestID -> "gradient-fill-url"
];
TestCreate[
	hasTag[
		pvt`serialize[Disk[{0, 0}, 1], bag[RadialGradientFilling[{Red, Blue}]]],
		"radialGradient"
	],
	True,
	TestID -> "radialgradientfill-def"
];
TestCreate[
	Module[{node},
		node =
			pvt`serialize[
				Polygon[
					{{0, 0}, {1, 0}, {1, 1}, {0, 1}},
					VertexColors -> {Red, Green, Blue, Yellow}
				],
				bag[]
			];
		gtag[node] === "image" &&
		StringStartsQ[gat[node, "href"], "data:image/png;base64,"]
	],
	True,
	TestID -> "vertexcolors-polygon-raster"
];
TestCreate[
	Module[{node},
		node =
			pvt`serialize[
				Polygon[
					{{0, 0}, {1, 0}, {0, 1}},
					VertexColors -> {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}
				],
				bag[]
			];
		gtag[node] === "image" &&
		StringStartsQ[gat[node, "href"], "data:image/png;base64,"]
	],
	True,
	TestID -> "vertexcolors-numeric-rgb-raster"
];
TestCreate[
	Module[{doc},
		doc =
			xml[
				Graphics[
					{
						Polygon[
							{{0, 0}, {1, 0}, {1, 1}, {0, 1}},
							VertexColors -> {Red, Green, Blue, Yellow}
						]
					},
					PlotRange -> {{0, 1}, {0, 1}}
				]
			];
		StringContainsQ[doc, "data:image/png;base64"] &&
		StringFreeQ[doc, "linearGradient"] &&
		StringFreeQ[doc, "<stop"]
	],
	True,
	TestID -> "vertexcolors-polygon-no-svg-gradient-seam"
];
TestCreate[
	StringStartsQ[
		firstAttr[
			pvt`serialize[Line[{{0, 0}, {1, 1}}, VertexColors -> {Red, Blue}], bag[]],
			"polyline",
			"stroke"
		],
		"url("
	],
	True,
	TestID -> "vertexcolors-line-stroke-url"
];
TestCreate[
	Module[{doc},
		doc =
			xml[DensityPlot[Sin[x]  Sin[y], {x, -1, 1}, {y, -1, 1}, PlotPoints -> 3]];
		StringContainsQ[doc, "data:image/png;base64"] &&
		StringFreeQ[doc, "linearGradient"]
	],
	True,
	TestID -> "densityplot-dense-vertexcolors-rasterized"
];
TestCreate[
	Module[{doc},
		doc =
			xml[
				ContourPlot[
					Sin[x  y],
					{x, -3, 3},
					{y, -3, 3},
					PlotPoints -> 4,
					MaxRecursion -> 0
				]
			];
		StringCount[doc, "data:image/png;base64"] === 1 &&
		StringFreeQ[doc, "<polygon"] &&
		StringContainsQ[doc, "<polyline"] &&
		StringContainsQ[doc, "wgxShowTooltip"]
	],
	True,
	TestID -> "contourplot-dense-filled-background-rasterized"
];
TestCreate[
	Module[{doc, b64, img, alpha},
		doc =
			xml[
				ContourPlot[
					Sin[x  y],
					{x, -3, 3},
					{y, -3, 3},
					PlotPoints -> 4,
					MaxRecursion -> 0
				]
			];
		b64 =
			First[
				StringSplit[
					StringSplit[doc, "data:image/png;base64,"][[2]],
					FromCharacterCode[39]
				]
			];
		img = ImportByteArray[ByteArray[BaseDecode[b64]], "PNG"];
		alpha = Flatten[ImageData[AlphaChannel[img], "Real"]];
		Count[alpha, x_ /; 0 < x < 1] === 0
	],
	True,
	TestID -> "contourplot-raster-has-no-alpha-stitching"
];
TestCreate[
	Module[{doc},
		doc =
			xml[
				ListContourPlot[
					Table[Sin[x  y], {x, -2, 2, 1}, {y, -2, 2, 1}]
				]
			];
		StringCount[doc, "data:image/png;base64"] === 1 &&
		StringFreeQ[doc, "<polygon"] &&
		StringContainsQ[doc, "<polyline"] &&
		StringContainsQ[doc, "wgxShowTooltip"]
	],
	True,
	TestID -> "listcontourplot-dense-filled-background-rasterized"
];
TestCreate[
	Module[{doc},
		doc =
			xml[
				RegionPlot[
					Sin[x  y] > 0,
					{x, -3, 3},
					{y, -3, 3},
					PlotPoints -> 10,
					MaxRecursion -> 0
				]
			];
		StringCount[doc, "data:image/png;base64"] === 1 &&
		StringFreeQ[doc, "<polygon"] &&
		StringContainsQ[doc, "<polyline"]
	],
	True,
	TestID -> "regionplot-dense-filled-background-rasterized"
];
TestCreate[
	Module[{doc, polys},
		polys =
			Table[
				Polygon[
					{{i, 0}, {i + 1, 0}, {i, 1}},
					VertexColors -> {Red, Blue, Green}
				],
				{i, 0, 60}
			];
		doc =
			pvt`serialize[
				Graphics[
					{polys, Tooltip[Point[{1, 0.5}], "live"]},
					PlotRange -> {{0, 61}, {0, 1}},
					ImageSize -> {300, 120}
				]
			];
		StringContainsQ[doc, "data:image/png;base64"] &&
		StringContainsQ[doc, "wgxShowTooltip"] &&
		StringContainsQ[doc, "<circle"]
	],
	True,
	TestID -> "dense-vertexcolors-raster-keeps-svg-overlays"
];
TestCreate[
	Module[{doc, polys},
		polys =
			Table[
				Polygon[
					{{i, 0}, {i + 1, 0}, {i, 1}},
					VertexColors -> {Red, Blue, Green}
				],
				{i, 0, 60}
			];
		doc =
			pvt`serialize[
				Graphics[
					GraphicsGroup[{Take[polys, 30], Take[polys, -31]}],
					PlotRange -> {{0, 61}, {0, 1}},
					ImageSize -> {300, 120}
				]
			];
		StringCount[doc, "data:image/png;base64"] === 1
	],
	True,
	TestID -> "dense-vertexcolors-graphicsgroup-single-raster"
];
TestCreate[
	Module[{doc},
		doc =
			pvt`serialize[
				DensityPlot[
					Sin[x]  Sin[y],
					{x, -1, 1},
					{y, -1, 1},
					PlotLegends -> Automatic,
					PlotPoints -> 3
				]
			];
		StringContainsQ[doc, "data:image/png;base64"] &&
		StringFreeQ[doc, "BarLegend["]
	],
	True,
	TestID -> "densityplot-barlegend-renders"
];

(* ::Section:: *) (* Fonts *)
TestCreate[
	gat[pvt`serialize[Text[Style["hi", 20, Bold], {0, 0}], bag[]], "font-weight"],
	"bold",
	TestID -> "font-bold"
];
TestCreate[
	gat[
		pvt`serialize[Text[Style["hi", FontSlant -> Italic], {0, 0}], bag[]],
		"font-style"
	],
	"italic",
	TestID -> "font-italic"
];
TestCreate[
	StringQ[gat[pvt`serialize[Text[Style["hi", 20], {0, 0}], bag[]], "font-size"]],
	True,
	TestID -> "font-size-present"
];
TestCreate[
	"font-family" /. ToneAr`WebGraphics`PackageScope`getCurrentTextProps[
		bag[],
		{FontFamily -> "Times"}
	],
	"Times",
	TestID -> "font-family"
];

(* ::Section:: *) (* Interactive Wrappers *)
TestCreate[
	StringContainsQ[
		gat[
			FirstCase[
				pvt`serialize[Tooltip[Disk[], "x"], bag[]],
				XMLElement["circle", _, _],
				Missing[],
				Infinity
			],
			"onmouseover"
		],
		"wgxShowTooltip"
	],
	True,
	TestID -> "tooltip-handler"
];
TestCreate[
	contains[pvt`serialize[Tooltip[Disk[], "x"], bag[]], "wgx-tip"],
	True,
	TestID -> "tooltip-box"
];
TestCreate[
	contains[pvt`serialize[Tooltip[Disk[], "x"], bag[]], "wgx-tip-bg"],
	True,
	TestID -> "tooltip-background-class"
];
TestCreate[
	StringCount[xml[Graphics[{Tooltip[Disk[], "a\nb"]}]], "<tspan"] === 2,
	True,
	TestID -> "tooltip-string-linebreaks"
];
TestCreate[
	hasTag[pvt`serialize[Tooltip[Disk[], x^2], bag[]], "math"],
	True,
	TestID -> "tooltip-symbolic-label-mathml"
];
TestCreate[
	With[{
			doc =
				xml[
					Graphics[
						{
							Tooltip[
								Disk[],
								Column[{Style["max", Bold], "min"}]
							]
						}
					]
				]
		},
		StringContainsQ[doc, "<image"] &&
		StringContainsQ[doc, "data:image/png;base64,"] &&
		StringFreeQ[doc, "Column["]
	],
	True,
	TestID -> "tooltip-column-label-rasterized"
];
TestCreate[
	Module[{doc, b64, img, rgb, alpha},
		doc =
			xml[
				Graphics[
					{
						Tooltip[
							Disk[],
							Column[{Style["max", Bold], "min"}]
						]
					}
				]
			];
		b64 =
			First[
				StringCases[
					doc,
					"data:image/png;base64," ~~ Shortest[s__] ~~ "'" :> s
				]
			];
		img = ImportByteArray[ByteArray[BaseDecode[b64]], "PNG"];
		rgb = Flatten[ImageData[ColorConvert[img, "RGB"], "Real"], 1];
		alpha = Flatten[ImageData[AlphaChannel[img], "Real"]];
		Count[
			MapThread[#2 > 0.2 && Min[#1] < 0.35 &, {rgb, alpha}],
			True
		] > 0
	],
	True,
	TestID -> "tooltip-column-default-text-dark"
];
TestCreate[
	And @@ StringContainsQ[
		xml[Graphics[{Tooltip[Disk[], x^2]}]],
		{
			"resizeTooltip",
			"resizeForeignObjectToContents",
			"getBoundingClientRect"
		}
	],
	True,
	TestID -> "tooltip-runtime-resizes-background"
];
TestCreate[
	gat[pvt`serialize[Mouseover[Circle[], Disk[]], bag[]], "class"],
	"wgx-mo",
	TestID -> "mouseover-class"
];
TestCreate[
	Module[{
			style = ToneAr`WebGraphics`PackageScope`$wgxStyle
		},
		StringContainsQ[style, ".wgx-mo-h{opacity:0;pointer-events:none"] &&
		StringFreeQ[style, ".wgx-mo-h{display:none}"]
	],
	True,
	TestID -> "mouseover-opacity-swap-css"
];
TestCreate[
	gtag[pvt`serialize[Hyperlink[Disk[], "https://wolfram.com"], bag[]]],
	"a",
	TestID -> "hyperlink-a"
];
TestCreate[
	gat[pvt`serialize[Hyperlink[Disk[], "https://wolfram.com"], bag[]], "href"],
	"https://wolfram.com",
	TestID -> "hyperlink-href"
];
TestCreate[
	StringContainsQ[
		gat[pvt`serialize[StatusArea[Disk[], "hi"], bag[]], "onmouseover"],
		"wgxSetStatus"
	],
	True,
	TestID -> "statusarea-handler"
];
TestCreate[
	StringQ[gat[pvt`serialize[Annotation[Disk[], "meta"], bag[]], "data-annotation"]],
	True,
	TestID -> "annotation-data"
];
(* internal charting annotations (private-context tags, assoc meta) are noise:
   render the content but emit no data-annotation *)
TestCreate[
	contains[
		pvt`serialize[Annotation[Disk[], "Charting`Private`Tag#1"], bag[]],
		"data-annotation"
	],
	False,
	TestID -> "annotation-internal-dropped"
];
TestCreate[
	hasTag[
		pvt`serialize[Annotation[Disk[], <|"HighlightElements" -> {}|>], bag[]],
		"circle"
	],
	True,
	TestID -> "annotation-internal-keeps-content"
];
TestCreate[
	pvt`serialize[
		Annotation[
			Point[{Offset[{1, 0}, {0, 0}]}],
			"WRI-GraphicsAlign-PlaceHolder"
		],
		bag[]
	],
	Null,
	TestID -> "annotation-wri-placeholder-dropped"
];
TestCreate[
	StringContainsQ[xml[Graphics[{Tooltip[Disk[], "x"]}]], "currentScript"],
	True,
	TestID -> "interactivity-injects-runtime"
];
TestCreate[
	StringContainsQ[xml[Graphics[{Red, Disk[]}]], "currentScript"],
	False,
	TestID -> "no-runtime-when-static"
];

(* ::Section:: *) (* Global Options *)
TestCreate[
	Lookup[
		ToneAr`WebGraphics`PackageScope`optionsToGlobalSvgProps[{ImageSize -> 200}],
		"width"
	],
	"200",
	TestID -> "imagesize-width"
];
(* pixel-space model: viewBox is the px box; data is mapped/stretched into it *)
TestCreate[
	Lookup[
		ToneAr`WebGraphics`PackageScope`optionsToGlobalSvgProps[
			{PlotRange -> {{-1, 1}, {-2, 2}}}
		],
		"viewBox"
	],
	"0 0 360 720",
	TestID -> "plotrange-viewbox-pixelbox"
];
TestCreate[
	Lookup[
		ToneAr`WebGraphics`PackageScope`optionsToGlobalSvgProps[
			{PlotRange -> {{-1, 1}, {-2, 2}}}
		],
		"preserveAspectRatio"
	],
	"none",
	TestID -> "plotrange-stretch"
];
TestCreate[
	StringContainsQ[
		Lookup[
			ToneAr`WebGraphics`PackageScope`optionsToGlobalSvgProps[
				{Background -> Red}
			],
			"style"
		],
		"background-color"
	],
	True,
	TestID -> "background-style"
];
TestCreate[
	StringContainsQ[xml[Graphics[{Red, Disk[]}]], "xmlns="],
	True,
	TestID -> "doc-has-xmlns"
];

(* an auto-ranged Graphics (symbolic/absent PlotRange) now resolves to a
   numeric data->pixel map, so it gets a viewBox just like an explicit range *)
TestCreate[
	StringContainsQ[xml[Graphics[{Disk[{0, 0}, 1]}]], "viewBox="],
	True,
	TestID -> "autorange-gets-viewbox"
];
TestCreate[
	MatchQ[
		Quiet[
			PlotRange /. AbsoluteOptions[
				ToneAr`WebGraphics`PackageScope`resolveGraphics[
					Graphics[{Disk[{0, 0}, 2]}]
				],
				PlotRange
			]
		],
		{{_?NumericQ, _?NumericQ}, {_?NumericQ, _?NumericQ}}
	],
	True,
	TestID -> "resolvegraphics-numeric-range"
];

(* ::Section:: *) (* Plots *)
TestCreate[
	StringQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]]],
	True,
	TestID -> "plot-serialises"
];
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "<polyline"],
	True,
	TestID -> "plot-has-curve"
];
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "viewBox="],
	True,
	TestID -> "plot-has-viewbox"
];
TestCreate[
	StringContainsQ[xml[ListLinePlot[{1, 3, 2, 4}]], "<polyline"],
	True,
	TestID -> "listlineplot-has-curve"
];
TestCreate[
	Module[{doc},
		doc =
			Check[
				xml[
					ListLinePlot[
						{1.5, 1, 2.5, 3} -> {"a", "b", "c", "d"},
						LabelingFunction -> Center
					]
				],
				$Failed
			];
		StringQ[doc] &&
			And @@ StringContainsQ[doc, {">a<", ">b<", ">c<", ">d<"}] &&
			StringFreeQ[doc, "Pane"]
	],
	True,
	TestID -> "listlineplot-labelingfunction-center-labels"
];
(* A bare number as Text content is plain text in WL (e.g. a value label from
   LabelingFunction -> Above), so it must serialise to a <text> node, not a
   MathML <foreignObject> (which librsvg and many SVG consumers do not render). *)
TestCreate[
	Module[{doc},
		doc = xml[Graphics[{Text[42, {1, 1}]}, PlotRange -> {{0, 2}, {0, 2}}]];
		StringContainsQ[doc, "<text"] &&
			StringContainsQ[doc, ">42<"] &&
			StringFreeQ[doc, "foreignObject"]
	],
	True,
	TestID -> "text-numeric-content-renders-plain-text"
];
TestCreate[
	Module[{doc},
		doc = xml[Graphics[{Text[3.5, {1, 1}]}, PlotRange -> {{0, 2}, {0, 2}}]];
		StringContainsQ[doc, ">3.5<"] && StringFreeQ[doc, "foreignObject"]
	],
	True,
	TestID -> "text-real-content-renders-plain-text"
];
TestCreate[
	Module[{doc},
		doc =
			xml[
				ListLinePlot[
					{
						Callout[{{1, 1}, {2, 2}, {3, 3}}, "aaa"],
						Callout[{{1, 1}, {2, 3}, {3, 5}}, "bbb"]
					}
				]
			];
		And @@ StringContainsQ[doc, {">aaa<", ">bbb<", "<polygon"}] &&
			StringCount[doc, "<path"] >= 4 &&
			StringContainsQ[doc, "fill-opacity"]
	],
	True,
	TestID -> "listlineplot-callout-leaders-and-backgrounds"
];
TestCreate[
	Module[{node, segments, verticals},
		node = ImportString[xml[DiscretePlot[n, {n, 1, 5}]], "XML"];
		segments =
			Cases[
				node,
				XMLElement["polyline", attrs_, _] :>
					Partition[
						ToExpression @
							StringSplit[
								Lookup[Association[attrs], "points", ""],
								{",", WhitespaceCharacter..}
							],
						2
					],
				Infinity
			];
		verticals =
			Select[
				segments,
				Length[#] === 2 &&
					Abs[#[[1, 1]] - #[[2, 1]]] < 0.001 &&
					Abs[#[[1, 2]] - #[[2, 2]]] > 20 &&
					Min[#[[All, 1]]] > 50&
			];
		Length[verticals] >= 4
	],
	True,
	TestID -> "discreteplot-has-vertical-stems"
];
TestCreate[
	And @@ StringContainsQ[
		xml[ListPlot[{1, 3, 2, 4}]],
		{"class='wgx-curve'", "nearestPointOnCircle", "initializeCoordinateTool"}
	],
	True,
	TestID -> "listplot-has-coordinate-readout"
];
TestCreate[
	Module[{doc},
		doc =
			xml[
				ListPlot[
					{1, 2},
					PlotLabels -> {Panel["A"], Entity["Country", "UnitedStates"]}
				]
			];
		And @@ StringContainsQ[doc, {"A", "United States", "<rect"}] &&
			StringFreeQ[doc, "Entity["]
	],
	True,
	TestID -> "plotlabels-panel-and-entity"
];
TestCreate[
	Module[{doc},
		doc =
			Check[
				xml[
					BarChart[
						{1, 2},
						ChartLabels -> {
							Row[{Entity["Country", "France"], ": ", 1}],
							Row[{Entity["Country", "Germany"], ": ", 2}]
						}
					]
				],
				$Failed
			];
		StringQ[doc] &&
			And @@ StringContainsQ[doc, {"France: 1", "Germany: 2"}] &&
			StringFreeQ[doc, "Entity["]
	],
	True,
	TestID -> "chartlabels-row-entities"
];
(* axes/ticks/labels are generated from the Axes/AxesOrigin options *)
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "<text"],
	True,
	TestID -> "plot-has-axis-labels"
];
(* coordinate tool: curve tagged, inverse map embedded, runtime present and
   wired on load (so the curve exists when listeners attach), JS in CDATA *)
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "class='wgx-curve'"],
	True,
	TestID -> "plot-curve-tagged"
];
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "data-mapax="],
	True,
	TestID -> "plot-inverse-map-embedded"
];
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "initializeCoordinateTool"],
	True,
	TestID -> "plot-coordtool-wired-on-load"
];
TestCreate[
	StringContainsQ[
		xml[ParametricPlot[{Sin[3  t], Sin[4  t]}, {t, 0, 2  Pi}]],
		"nearestPointOnPolyline"
	],
	True,
	TestID -> "plot-coordtool-nearest-polyline"
];
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "getCurveStrokeColor"],
	True,
	TestID -> "plot-coordtool-uses-curve-color"
];
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "labelBackground"],
	True,
	TestID -> "plot-coordtool-label-background"
];
TestCreate[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "labelAccent"],
	True,
	TestID -> "plot-coordtool-label-accent"
];
TestCreate[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}]],
		{
			"labelLeader",
			"labelOutline",
			"createElementNS(svgNamespace, \"polyline\")",
			"stroke-linejoin\", \"miter\"",
			"getSvgBounds",
			"horizontalDirection = -1",
			"verticalDirection = 1",
			"leaderEndX = horizontalDirection > 0 ? x : x + width",
			"verticalDirection < 0 ? 0.62 : 0.38",
			"updateCoordinateCallout(readout, nearestPoint, svg)"
		}
	],
	True,
	TestID -> "plot-coordtool-bounded-angular-callout"
];
TestCreate[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}]],
		{"wgx-coord-label", "#101a30", "#f59e0b"}
	],
	True,
	TestID -> "plot-coordtool-label-style"
];
TestCreate[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}]],
		{
			"readout.labelLeader.setAttribute(\"stroke\", curveColor)",
			"readout.labelOutline.setAttribute(\"stroke\", curveColor)"
		}
	],
	True,
	TestID -> "plot-coordtool-outline-uses-curve-color"
];
TestCreate[
	And @@ StringContainsQ[
		pvt`serialize[Labeled[Plot[Sin[x], {x, 0, 2  Pi}], "Labeled plot"]],
		{"getScreenCTM", "svgScreenInverse", "nearestPoint.localX"}
	],
	True,
	TestID -> "labeled-plot-hover-uses-transformed-curve-points"
];
(* the runtime script must keep the document well-formed: JS operators such as
   `<` are entity-escaped (not raw, not CDATA), so the SVG parses as XML *)
TestCreate[
	With[{doc = xml[Plot[Sin[x], {x, 0, 2  Pi}]]},
		StringContainsQ[doc, "<script>"] &&
		!StringContainsQ[doc, "<![CDATA["] &&
		StringContainsQ[doc, "&lt;"] &&
		MatchQ[Quiet[ImportString[doc, "XML"]], XMLObject["Document"][__]]
	],
	True,
	TestID -> "script-escaped-wellformed"
];
TestCreate[
	StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}]],
		"preserveAspectRatio='none'"
	],
	True,
	TestID -> "plot-fills-box"
];
(* a Graphics with Axes -> False must NOT get generated axes *)
TestCreate[
	StringContainsQ[
		xml[Graphics[{Disk[]}, PlotRange -> {{-1, 1}, {-1, 1}}, Axes -> False]],
		"<text"
	],
	False,
	TestID -> "no-axes-when-off"
];

(* an explicit Ticks list on the x-axis renders those tick labels as text
   nodes. Check ">one<"/">two<" (not bare "one": it is a substring of the
   ubiquitous fill='none'). *)
TestCreate[
	With[{
			doc =
				xml[
					Graphics[
						{Line[{{0, 0}, {3, 0}}]},
						PlotRange -> {{0, 3}, {0, 3}},
						Axes -> True,
						Ticks -> {{{1, "one"}, {2, "two"}}, Automatic}
					]
				]
		},
		AllTrue[{">one<", ">two<"}, StringContainsQ[doc, #]&]
	],
	True,
	TestID -> "explicit-ticks-render"
];

(* REGRESSION: numbers must never be emitted with a trailing dot (e.g. "270.").
   SVG parsers reject coordinate tokens like that and SILENTLY drop the whole
   element -- which made the Lissajous curve and any axis line passing through
   an integer pixel value disappear. n2s/makeSvgNumber must format "270." as "270". *)
TestCreate[
	StringCases[
		xml[ParametricPlot[{Sin[3  t], Sin[4  t]}, {t, 0, 2  Pi}]],
		(DigitCharacter..) ~~ "." ~~ (" " | "," | "'" | "\"")
	],
	{},
	TestID -> "no-trailing-dot-numbers"
];
(* the Lissajous curve itself must survive (a long polyline, many points) *)
TestCreate[
	Max[
		StringLength /@ StringCases[
			xml[ParametricPlot[{Sin[3  t], Sin[4  t]}, {t, 0, 2  Pi}]],
			"points='" ~~ p : Shortest[___] ~~ "'" :> p
		]
	] >
	1000,
	True,
	TestID -> "parametricplot-curve-survives"
];

(* standard WL plot labels / legends are option or wrapper based; the
   serializer must materialise them into visible SVG text and keys. *)
TestCreate[
	StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, PlotLabel -> "Sine wave"]],
		"Sine wave"
	],
	True,
	TestID -> "plotlabel-renders"
];
TestCreate[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, PlotLabel -> x^2]],
		{"<foreignObject", "<math", "<msup"}
	],
	True,
	TestID -> "plotlabel-symbolic-mathml"
];
TestCreate[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, AxesLabel -> {"angle", "amplitude"}]],
		{"angle", "amplitude"}
	],
	True,
	TestID -> "axeslabel-renders"
];
TestCreate[
	And @@ StringContainsQ[
		xml[
			Plot[
				Sin[t],
				{t, 0, 1},
				AxesLabel -> {Subscript[x, 1], y^2}
			]
		],
		{"<math", "<msub", "<msup", "wgx-axis-label"}
	],
	True,
	TestID -> "axeslabel-symbolic-mathml"
];
TestCreate[
	Module[{doc, yLabel},
		doc = xml[Plot[Sin[x], {x, 0, 2  Pi}, AxesLabel -> {"angle", "amplitude"}]];
		yLabel =
			FirstCase[
				ImportString[doc, "XML"],
				XMLElement["text", attrs_, {"amplitude"}] :> Association[attrs],
				<||>,
				Infinity
			];
		Lookup[yLabel, "x", Missing[]] === "0" &&
		Lookup[yLabel, "dominant-baseline", Missing[]] === "middle"
	],
	True,
	TestID -> "axeslabel-y-label-upper-left"
];
TestCreate[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, AxesLabel -> {"angle", "amplitude"}]],
		{"class='wgx-axis-label'", "fill='#595959'", "font-family='sans-serif'"}
	],
	True,
	TestID -> "axeslabel-default-style"
];
TestCreate[
	Module[{doc, node, svgAttrs, labelAttrs, width, x},
		doc =
			xml[
				Plot[
					Sin[x],
					{x, 0, 6},
					AxesLabel -> {"angle", "amplitude"},
					ImageSize -> 400
				]
			];
		node = ImportString[doc, "XML"];
		svgAttrs =
			FirstCase[
				node,
				XMLElement["svg", attrs_, _] :> Association[attrs],
				<||>,
				Infinity
			];
		labelAttrs =
			FirstCase[
				node,
				XMLElement["text", attrs_, {"angle"}] :> Association[attrs],
				<||>,
				Infinity
			];
		width = ToExpression[Lookup[svgAttrs, "width", "0"]];
		x = ToExpression[Lookup[labelAttrs, "x", "0"]];
		x + 45 <= width
	],
	True,
	TestID -> "axeslabel-x-label-within-viewbox"
];
TestCreate[
	Module[{labels},
		labels =
			StringCases[
				xml[Plot[Sin[x], {x, 0, 2  Pi}, AxesLabel -> {"angle", "amplitude"}]],
				RegularExpression["<text[^>]*class='wgx-axis-label'[^>]*>"]
			];
		labels =!= {} &&
		AllTrue[
			labels,
			StringFreeQ[#, "font-weight" | "paint-order" | "stroke-width"]&
		]
	],
	True,
	TestID -> "axeslabel-default-style-is-not-heading"
];
TestCreate[
	Module[{doc},
		doc =
			xml[
				Graphics[
					{
						Style[
							{
								Text[
									HoldForm["x label"],
									Offset[{10, 0}, {1, 0}],
									{-1, 0}
								]
							},
							"GraphicsLabel"
						]
					},
					Axes -> True,
					AxesLabel -> {"x label", "y label"},
					PlotRange -> {{0, 1}, {0, 1}}
				]
			];
		StringCount[doc, ">x label<"] === 1 &&
		StringCount[doc, ">y label<"] === 1
	],
	True,
	TestID -> "axeslabel-skips-embedded-graphicslabel"
];
TestCreate[
	Module[{doc, node, svgAttrs, labelAttrs, width, x},
		doc =
			xml[
				Graphics[
					{
						Style[
							{
								Text[
									HoldForm["Sector size"],
									Offset[{10, 0}, {1, 0}],
									{-1, 0}
								]
							},
							"GraphicsLabel"
						]
					},
					Axes -> True,
					AxesLabel -> {"Sector size", None},
					ImageSize -> 400,
					PlotRange -> {{0, 1}, {0, 1}}
				]
			];
		node = ImportString[doc, "XML"];
		svgAttrs =
			FirstCase[
				node,
				XMLElement["svg", attrs_, _] :> Association[attrs],
				<||>,
				Infinity
			];
		labelAttrs =
			FirstCase[
				node,
				XMLElement["text", attrs_, {"Sector size"}] :> Association[attrs],
				<||>,
				Infinity
			];
		width = ToExpression[Lookup[svgAttrs, "width", "0"]];
		x = ToExpression[Lookup[labelAttrs, "x", "0"]];
		x + 100 <= width
	],
	True,
	TestID -> "graphicslabel-x-label-within-viewbox"
];
TestCreate[
	And @@ StringContainsQ[
		xml[
			Plot[
				Sin[x],
				{x, 0, 2  Pi},
				Frame -> True,
				FrameLabel -> {"angle", "amplitude"}
			]
		],
		{"angle", "amplitude"}
	],
	True,
	TestID -> "framelabel-renders"
];
TestCreate[
	With[{
			doc =
				xml[
					Graphics[
						{Line[{{0, 0}, {2, 2}}]},
						PlotRange -> {{0, 2}, {0, 2}},
						Axes -> False,
						Frame -> True,
						FrameTicks -> {
							{{{1, "left"}}, {{1, "right"}}},
							{{{0.5, "bottom"}}, {{1.5, "top"}}}
						}
					]
				]
		},
		AllTrue[
			{">left<", ">right<", ">bottom<", ">top<"},
			StringContainsQ[doc, #]&
		]
	],
	True,
	TestID -> "explicit-frameticks-render"
];
TestCreate[
	With[{
			doc =
				xml[
					Graphics[
						{},
						PlotRange -> {{0, 1}, {0, 1}},
						Axes -> True,
						Ticks -> {{{0.5, "half"}}, None},
						TicksStyle -> Directive[Orange, 12]
					]
				]
		},
		StringContainsQ[doc, "fill='#ff8000'"] &&
		StringContainsQ[doc, "font-size='16'"]
	],
	True,
	TestID -> "ticksstyle-colors-labels"
];
TestCreate[
	With[{
			doc =
				xml[
					Graphics[
						{},
						PlotRange -> {{0, 1}, {0, 1}},
						Frame -> True,
						Axes -> False,
						FrameTicks -> {{{{0.5, "middle"}}, None}, {None, None}},
						FrameTicksStyle -> Directive[Orange, 12]
					]
				]
		},
		StringContainsQ[doc, ">middle<"] &&
		StringContainsQ[doc, "fill='#ff8000'"] &&
		StringContainsQ[doc, "font-size='16'"]
	],
	True,
	TestID -> "frameticksstyle-colors-labels"
];
TestCreate[
	With[{
			doc =
				xml[
					PolarPlot[
						Sin[3  t],
						{t, 0, Pi},
						PolarAxes -> True,
						PolarTicks -> {"Degrees", Automatic},
						ImageSize -> 240
					]
				]
		},
		StringCount[doc, "foreignObject"] >= 10 &&
		StringCount[doc, "<polyline"] >= 10 &&
		StringFreeQ[doc, "Scaled["]
	],
	True,
	TestID -> "polaraxes-scaled-ticks-render"
];
TestCreate[
	Module[{doc, node, labels, textNodes, insideQ},
		labels = {"left tick", "right tick", "bottom tick", "top tick"};
		doc =
			xml[
				Graphics[
					{},
					PlotRange -> {{0, 1}, {0, 1}},
					Frame -> True,
					Axes -> False,
					FrameTicks -> {
						{{{0.5, "left tick"}}, {{0.5, "right tick"}}},
						{{{0.5, "bottom tick"}}, {{0.5, "top tick"}}}
					},
					ImageSize -> 240
				]
			];
		node = ImportString[doc, "XML"];
		textNodes =
			Cases[
				node,
				XMLElement["text", attrs_, {s_String}] /; MemberQ[labels, s] :>
					{s, Association[attrs]},
				Infinity
			];
		insideQ[{text_, attrs_}] :=
			Module[{x, y, fs, w, h, left, right, top, bottom},
				x = ToExpression[attrs["x"]];
				y = ToExpression[attrs["y"]];
				fs = ToExpression[attrs["font-size"]];
				w = StringLength[text]  fs  0.6;
				h = fs;
				{left, right} =
					Switch[
						Lookup[attrs, "text-anchor", "middle"],
						"start", {x, x + w},
						"end", {x - w, x},
						_, {x - w / 2, x + w / 2}
					];
				{top, bottom} =
					Switch[
						Lookup[attrs, "dominant-baseline", "middle"],
						"hanging", {y, y + h},
						"text-after-edge", {y - h, y},
						_, {y - h / 2, y + h / 2}
					];
				AllTrue[{left, right, top, bottom}, 0 <= # <= 240&]
			];
		Length[textNodes] === Length[labels] && AllTrue[textNodes, insideQ]
	],
	True,
	TestID -> "tick-labels-inside-viewbox"
];
TestCreate[
	Module[{doc, pts},
		doc =
			xml[
				Graphics[
					{},
					PlotRange -> {{0, 1}, {0, 1}},
					Axes -> True,
					AxesOrigin -> {-10, -10},
					Ticks -> None,
					ImageSize -> 240
				]
			];
		pts =
			ToExpression /@
				StringCases[
					doc,
					"points='" ~~ p : Shortest[__] ~~ "'" :>
						StringSplit[p, {",", WhitespaceCharacter..}]
				];
		AllTrue[Flatten[pts], 0 <= # <= 240&]
	],
	True,
	TestID -> "axesorigin-clipped-to-viewbox"
];
TestCreate[
	Module[{doc, node, segments, shortSegments, insideQ},
		doc =
			xml[
				Graphics[
					{},
					PlotRange -> {{0, 1}, {0, 1}},
					Frame -> True,
					Axes -> False,
					FrameTicks -> {
						{{{0.5, "", {0.04, 0}}}, {{0.5, "", {0.04, 0}}}},
						{{{0.5, "", {0.04, 0}}}, {{0.5, "", {0.04, 0}}}}
					},
					ImageSize -> 240
				]
			];
		node = ImportString[doc, "XML"];
		segments =
			Cases[
				node,
				XMLElement["polyline", attrs_, _] :>
					Partition[
						ToExpression @
							StringSplit[
								Lookup[Association[attrs], "points", ""],
								{",", WhitespaceCharacter..}
							],
						2
					],
				Infinity
			];
		shortSegments =
			Select[
				segments,
				Length[#] === 2 && 1 < EuclideanDistance @@ # < 20&
			];
		insideQ =
			{
				AnyTrue[shortSegments, #[[1, 2]] > 120 && #[[2, 2]] < #[[1, 2]]&],
				AnyTrue[shortSegments, #[[1, 2]] < 120 && #[[2, 2]] > #[[1, 2]]&],
				AnyTrue[shortSegments, #[[1, 1]] < 120 && #[[2, 1]] > #[[1, 1]]&],
				AnyTrue[shortSegments, #[[1, 1]] > 120 && #[[2, 1]] < #[[1, 1]]&]
			};
		And @@ insideQ
	],
	True,
	TestID -> "frame-ticks-face-inward"
];
TestCreate[
	And @@ StringContainsQ[
		pvt`serialize[
			Plot[{Sin[x], Cos[x]}, {x, 0, 2  Pi}, PlotLegends -> {"sin", "cos"}]
		],
		{"sin", "cos"}
	],
	True,
	TestID -> "plotlegends-renders"
];
TestCreate[
	StringContainsQ[
		pvt`serialize[Labeled[Plot[Sin[x], {x, 0, 2  Pi}], "Labeled plot"]],
		"Labeled plot"
	],
	True,
	TestID -> "labeled-renders"
];
(* ChartLegends -> a SwatchLegend key with one text node per label.
   (The legend arrives list-wrapped: {Placed[SwatchLegend[...], After, Identity]}.) *)
TestCreate[
	With[{
			doc =
				pvt`serialize[
					BarChart[{1, 3, 2}, ChartLegends -> {"Apples", "Bananas", "Cherries"}]
				]
		},
		AllTrue[{">Apples<", ">Bananas<", ">Cherries<"}, StringContainsQ[doc, #]&]
	],
	True,
	TestID -> "chartlegends-render"
];

(* ::Section:: *) (* Charting *)
(* Offset[{dx,dy},{x,y}]: data point mapped, then an absolute pixel shift.
   Bag-level map is identity-x / y-flip, so {1,0} -> px {1,0}; +{0,-2} -> y=2 *)
TestCreate[
	Module[{
			n = pvt`serialize[Text["a", Offset[{0, -2}, {1, 0}], {0, 1}], bag[]]
		},
		{gat[n, "x"], gat[n, "y"]}
	],
	{"1", "2"},
	TestID -> "text-offset-px"
];
TestCreate[
	hasTag[pvt`serialize[Text["a", Offset[{3, 4}, {0, 0}]], bag[]], "text"],
	True,
	TestID -> "text-offset-2arg"
];
TestCreate[
	Module[{
			n =
				pvt`serialize[
					Text["a", Offset[{0, 4}, {1, 1}], ImageScaled[{0.5, 0}]],
					bag[]
				]
		},
		{gtag[n], gat[n, "dominant-baseline"]}
	],
	{"text", "text-after-edge"},
	TestID -> "text-imagescaled-anchor-renders"
];
(* Scaled[{sx,sy}] is a fraction of the data plot box. After setMap to
   {{0,10},{0,4}} over a 100x40 px box with no margins, Scaled[{0.5,0.5}]
   is data {5,2} -> the box center. resolveScaledPt returns DATA coords. *)
TestCreate[
	Module[{r},
		ToneAr`WebGraphics`PackageScope`setMap[
			{{0, 10}, {0, 4}},
			{0, 0, 0, 0},
			100,
			40
		];
		r = ToneAr`WebGraphics`PackageScope`resolveScaledPt[{0.5, 0.5}];
		ToneAr`WebGraphics`PackageScope`resetMap[];
		r
	],
	{5., 2.},
	TestID -> "scaled-to-data"
];
TestCreate[
	hasTag[pvt`serialize[Text["x", Scaled[{0.5, 0.5}]], bag[]], "text"],
	True,
	TestID -> "text-scaled-renders"
];
TestCreate[
	Module[{node, form},
		node =
			pvt`serialize[
				Text[Style[Rotate["sector", 0], Opacity[1]], {0, 0}],
				bag[]
			];
		form = ToString[node, InputForm];
		hasTag[node, "text"] &&
			StringContainsQ[form, "sector"] &&
			StringFreeQ[form, "Rotate"]
	],
	True,
	TestID -> "text-rotate-string-renders"
];
TestCreate[
	gat[pvt`serialize[Text[Rotate["x", Pi / 2], {0, 0}], bag[]], "transform"],
	"rotate(-90 0 0)",
	TestID -> "text-rotate-transform"
];
TestCreate[
	Module[{doc, radii},
		doc =
			xml[
				Graphics[
					{Inset[Graphics[{Disk[{0, 0}, 10]}, ImageSize -> 100], {2, 1}]},
					PlotRange -> {{0, 4}, {0, 2}},
					ImageSize -> 320
				]
			];
		radii =
			ToExpression /@
				StringCases[
					doc,
					("r='" | "rx='") ~~ r:NumberString ~~ "'" :> r
				];
		AnyTrue[radii, 40 < # < 60&] &&
		AllTrue[{"r='800'", "rx='800'", "ry='800'"}, StringFreeQ[doc, #]&]
	],
	True,
	TestID -> "inset-graphic-uses-inner-scale"
];
(* GeometricTransformation by a pure translation {tx,ty} in data space.
   Bag-level map: S=diag(1,-1), B={0,0}. A Disk at {0,0} translated by
   {2,3} in data -> pixel translate {1*2, -1*3} = {2,-3}. Wrapped in <g>. *)
TestCreate[
	gtag[
		pvt`serialize[
			GeometricTransformation[
				Disk[{0, 0}, 1],
				TransformationFunction[{{1., 0., 2.}, {0., 1., 3.}, {0., 0., 1.}}]
			],
			bag[]
		]
	],
	"g",
	TestID -> "geomtransform-group"
];
TestCreate[
	StringContainsQ[
		gat[
			pvt`serialize[
				GeometricTransformation[
					Disk[{0, 0}, 1],
					TransformationFunction[{{1., 0., 2.}, {0., 1., 3.}, {0., 0., 1.}}]
				],
				bag[]
			],
			"transform"
		],
	"matrix(1 0 0 1 2 -3)"
	],
	True,
	TestID -> "geomtransform-matrix"
];
TestCreate[
	gtag[pvt`serialize[Rotate[Disk[{1, 0}, 0.1], Pi / 2], bag[]]],
	"g",
	TestID -> "rotate-primitive-group"
];
TestCreate[
	gat[pvt`serialize[Rotate[Disk[{1, 0}, 0.1], Pi / 2], bag[]], "transform"],
	"matrix(0 -1 1 0 0 0)",
	TestID -> "rotate-primitive-matrix"
];

(* DelayedMouseEffect / DelayedClickEffect *)
(* DelayedMouseEffect renders the base primitive ... *)
TestCreate[
	hasTag[
		pvt`serialize[
			Charting`DelayedMouseEffect[
				Rectangle[{0, 0}, {1, 1}],
				{
					Style,
					EdgeForm[{GrayLevel[0.5], AbsoluteThickness[1.5], Opacity[0.66]}]
				}
			],
			bag[]
		],
		"rect"
	],
	True,
	TestID -> "mouseeffect-base"
];
(* ... and carries a hover data attribute + handlers *)
TestCreate[
	StringQ[
		gat[
			FirstCase[
				pvt`serialize[
					Charting`DelayedMouseEffect[
						Rectangle[{0, 0}, {1, 1}],
						{Style, EdgeForm[{GrayLevel[0.5], AbsoluteThickness[1.5]}]}
					],
					bag[]
				],
				XMLElement["rect", _, _],
				Missing[],
				Infinity
			],
			"data-wgx-hover"
		]
	],
	True,
	TestID -> "mouseeffect-hover-attr"
];
TestCreate[
	StringContainsQ[
		gat[
			FirstCase[
				pvt`serialize[
					Charting`DelayedMouseEffect[
						Rectangle[{0, 0}, {1, 1}],
						{Style, EdgeForm[{GrayLevel[0.5]}]}
					],
					bag[]
				],
				XMLElement["rect", _, _],
				Missing[],
				Infinity
			],
			"onmouseover"
		],
		"wgxHoverOn"
	],
	True,
	TestID -> "mouseeffect-handler"
];
(* 3-arg DelayedMouseEffect delegates to the 2-arg form *)
TestCreate[
	hasTag[
		pvt`serialize[
			Charting`DelayedMouseEffect[
				Rectangle[{0, 0}, {1, 1}],
				{Style, EdgeForm[Black]},
				someThirdArg
			],
			bag[]
		],
		"rect"
	],
	True,
	TestID -> "mouseeffect-3arg"
];
(* a full chart wired with an effect injects the runtime once *)
TestCreate[
	StringContainsQ[
		xml[
			Graphics[
				{
					Charting`DelayedMouseEffect[Disk[{0, 0}, 1], {Style, EdgeForm[Black]}]
				},
				PlotRange -> {{-1, 1}, {-1, 1}}
			]
		],
		"currentScript"
	],
	True,
	TestID -> "mouseeffect-injects-runtime"
];

(* ::Section:: *) (* 3D *)
(* test the widget structure without inlining the ~600KB Three.js library *)
ToneAr`WebGraphics`PackageScope`$wgxInlineRuntime = False;
TestCreate[
	StringQ[pvt`serialize[Plot3D[Sin[x  y], {x, 0, 2}, {y, 0, 2}]]],
	True,
	TestID -> "plot3d-returns-string"
];
TestCreate[
	StringContainsQ[
		pvt`serialize[Plot3D[Sin[x  y], {x, 0, 2}, {y, 0, 2}]],
		"class=\"wgx3d\""
	],
	True,
	TestID -> "plot3d-widget-div"
];
TestCreate[
	StringContainsQ[
		pvt`serialize[Plot3D[Sin[x  y], {x, 0, 2}, {y, 0, 2}]],
		"WGX3D.renderScene"
	],
	True,
	TestID -> "plot3d-widget-script"
];
TestCreate[
	StringContainsQ[
		ToneAr`WebGraphics`PackageScope`wgx3DLibraryTag[],
		"OrbitControls"
	],
	True,
	TestID -> "plot3d-library-orbitcontrols"
];
TestCreate[
	StringContainsQ[
		pvt`serialize[Graphics3D[Polygon[{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}}]]],
		"wgx3d"
	],
	True,
	TestID -> "graphics3d-explicit-polygon"
];
texture3D =
	Graphics3D[
		{
			Texture[textureImg],
			Polygon[
				{{0, 0, 0}, {1, 0, 0}, {1, 1, 0}, {0, 1, 0}},
				VertexTextureCoordinates ->
					{{0., 0.}, {1., 0.}, {1., 1.}, {0., 1.}}
			]
		}
	];
TestCreate[
	With[{mesh = First[ToneAr`WebGraphics`PackageScope`graphics3DMeshes[texture3D]]},
		StringStartsQ[mesh["tex"], "data:image/png;base64,"] &&
		mesh["uv"] === {0., 0., 1., 0., 1., 1., 0., 0., 1., 1., 0., 1.}
	],
	True,
	TestID -> "graphics3d-texture-uv-mesh"
];
TestCreate[
	With[{doc = pvt`serialize[texture3D]},
		StringContainsQ[doc, "\"tex\":\"data:image\\/png;base64,"] &&
		StringContainsQ[
			doc,
			"\"uv\":[0.0,0.0,1.0,0.0,1.0,1.0,0.0,0.0,1.0,1.0,0.0,1.0]"
		]
	],
	True,
	TestID -> "graphics3d-texture-uv-json"
];
ToneAr`WebGraphics`PackageScope`$wgxInlineRuntime = True;

(* ::Section:: *) (* Dynamics *)
(* DynamicModule[{vars}, body] -> pvt`serialize the static body *)
TestCreate[
	hasTag[
		pvt`serialize[DynamicModule[{a = False}, Disk[{0, 0}, 1]], bag[]],
		"circle"
	],
	True,
	TestID -> "dynamicmodule-body"
];
(* LightDarkSwitched[light, dark] -> pick light *)
TestCreate[
	gat[
		pvt`serialize[Style[Disk[{0, 0}, 1], LightDarkSwitched[Red, Blue]], bag[]],
		"fill"
	],
	"#ff0000",
	TestID -> "lightdark-picks-light"
];
(* bare Dynamic content -> its held value rendered when a primitive *)
TestCreate[
	hasTag[pvt`serialize[Dynamic[Disk[{0, 0}, 1]], bag[]], "circle"],
	True,
	TestID -> "dynamic-default"
];
(* a bare Dynamic[stateVar] is pure interactivity state -> contributes nothing *)
TestCreate[
	pvt`serialize[Dynamic[someStateVar], bag[]],
	Null,
	TestID -> "dynamic-bare-symbol-null"
];
(* If gated on a (non-True) symbol -> the else/default branch *)
TestCreate[
	hasTag[
		pvt`serialize[If[someClickVar, Circle[{0, 0}, 1], Disk[{0, 0}, 1]], bag[]],
		"circle"
	],
	True,
	TestID -> "if-default-branch"
];

(* DelayedClickEffect renders its base content (a Disk sector here) ... *)
TestCreate[
	contains[
		pvt`serialize[
			Charting`DelayedClickEffect[
				Disk[{0, 0}, 1, {0, Pi}],
				{
					GeometricTransformation,
					TransformationFunction[{{1., 0., 0.2}, {0., 1., 0.3}, {0., 0., 1.}}]
				},
				Dynamic[clk]
			],
			bag[]
		],
		"polygon" | "path"
	],
	True,
	TestID -> "clickeffect-base"
];
(* ... and carries the pixel-space click matrix + handler. Bag map S=diag(1,-1):
   translate {0.2,0.3} -> px {0.2,-0.3} -> "matrix(1 0 0 1 0.2 -0.3)" *)
TestCreate[
	Module[{
			n =
				FirstCase[
					pvt`serialize[
						Charting`DelayedClickEffect[
							Disk[{0, 0}, 1, {0, Pi}],
							{
								GeometricTransformation,
								TransformationFunction[
									{{1., 0., 0.2}, {0., 1., 0.3}, {0., 0., 1.}}
								]
							},
							Dynamic[clk]
						],
						bag[]
					],
					XMLElement[_, a_, _] /; KeyExistsQ[Association[a], "data-wgx-click"],
					Missing[],
					Infinity
				]
		},
		gat[n, "data-wgx-click"]
	],
	"matrix(1 0 0 1 0.2 -0.3)",
	TestID -> "clickeffect-matrix"
];
TestCreate[
	StringContainsQ[
		ToString[
			pvt`serialize[
				Charting`DelayedClickEffect[
					Disk[{0, 0}, 1, {0, Pi}],
					{
						GeometricTransformation,
						TransformationFunction[{{1., 0., 0.2}, {0., 1., 0.3}, {0., 0., 1.}}]
					},
					Dynamic[clk]
				],
				bag[]
			],
			InputForm
		],
		"wgxClickToggle"
	],
	True,
	TestID -> "clickeffect-handler"
];
(* the effect type tag may be a STRING ("GeometricTransformation"/"Style"),
   not just a symbol, depending on WL version. Both must dispatch correctly. *)
TestCreate[
	Module[{
			n =
				FirstCase[
					pvt`serialize[
						Charting`DelayedClickEffect[
							Disk[{0, 0}, 1, {0, Pi}],
							{
								"GeometricTransformation",
								TransformationFunction[
									{{1., 0., 0.2}, {0., 1., 0.3}, {0., 0., 1.}}
								]
							},
							Dynamic[clk]
						],
						bag[]
					],
					XMLElement[_, a_, _] /; KeyExistsQ[Association[a], "data-wgx-click"],
					Missing[],
					Infinity
				]
		},
		gat[n, "data-wgx-click"]
	],
	"matrix(1 0 0 1 0.2 -0.3)",
	TestID -> "clickeffect-string-tag"
];
TestCreate[
	StringQ[
		gat[
			FirstCase[
				pvt`serialize[
					Charting`DelayedMouseEffect[
						Rectangle[{0, 0}, {1, 1}],
						{"Style", EdgeForm[{GrayLevel[0.5], AbsoluteThickness[1.5]}]}
					],
					bag[]
				],
				XMLElement["rect", _, _],
				Missing[],
				Infinity
			],
			"data-wgx-hover"
		]
	],
	True,
	TestID -> "mouseeffect-string-tag"
];
(* a click effect whose tag is "Style" toggles a style (not a transform) *)
TestCreate[
	StringQ[
		gat[
			FirstCase[
				pvt`serialize[
					Charting`DelayedClickEffect[
						Rectangle[{0, 0}, {1, 1}],
						{"Style", EdgeForm[{RGBColor[1, 0, 0], AbsoluteThickness[2]}]},
						Dynamic[clk]
					],
					bag[]
				],
				XMLElement["rect", _, _],
				Missing[],
				Infinity
			],
			"data-wgx-click-style"
		]
	],
	True,
	TestID -> "clickeffect-style-tag"
];
(* a wedge and its label share one Dynamic state var -> identical click group,
   so they explode together; different vars -> different groups *)
TestCreate[
	Module[{grp},
		grp[v_] :=
			gat[
				FirstCase[
					pvt`serialize[
						Charting`DelayedClickEffect[
							Disk[{0, 0}, 1, {0, Pi}],
							{
								"GeometricTransformation",
								TransformationFunction[
									{{1., 0., 0.2}, {0., 1., 0.3}, {0., 0., 1.}}
								]
							},
							v
						],
						bag[]
					],
					XMLElement[_, a_, _] /;
						KeyExistsQ[Association[a], "data-wgx-click-group"],
					Missing[],
					Infinity
				],
				"data-wgx-click-group"
			];
		{
			StringQ[grp[Dynamic[shareVar]]],
			grp[Dynamic[shareVar]] === grp[Dynamic[shareVar]],
			grp[Dynamic[shareVar]] =!= grp[Dynamic[otherVar]]
		}
	],
	{True, True, True},
	TestID -> "clickeffect-group-key"
];
(* the runtime wires the group toggle (clicking one member toggles the group) *)
TestCreate[
	StringContainsQ[
		xml[
			Graphics[
				{
					Charting`DelayedClickEffect[
						Disk[{0, 0}, 1],
						{
							"GeometricTransformation",
							TransformationFunction[
								{{1., 0., 0.2}, {0., 1., 0.3}, {0., 0., 1.}}
							]
						},
						Dynamic[gv]
					]
				},
				PlotRange -> {{-1, 1}, {-1, 1}}
			]
		],
		"data-wgx-click-group"
	],
	True,
	TestID -> "clickeffect-group-runtime"
];
(* the runtime exposes the chart effect handlers (each checked independently:
   StringContainsQ[str, {...}] is OR, so map per-name) *)
TestCreate[
	With[{
			doc =
				xml[
					Graphics[
						{
							Charting`DelayedMouseEffect[
								Disk[{0, 0}, 1],
								{Style, EdgeForm[Black]}
							]
						},
						PlotRange -> {{-1, 1}, {-1, 1}}
					]
				]
		},
		AllTrue[
			{"wgxHoverOn", "wgxHoverOff", "wgxClickToggle"},
			StringContainsQ[doc, #]&
		]
	],
	True,
	TestID -> "runtime-has-chart-handlers"
];

(* ::Section:: *) (* Charts *)
TestCreate[
	StringCount[xml[BarChart[{1, 3, 2}]], "<rect"] >= 3,
	True,
	TestID -> "barchart-three-bars"
];
TestCreate[
	StringContainsQ[
		xml[BarChart[{1, 3, 2}, ChartLabels -> {"aa", "bb", "cc"}]],
		">aa<"
	],
	True,
	TestID -> "barchart-labels"
];
TestCreate[
	StringContainsQ[
		xml[
			BarChart[
				{1, 3, 2},
				LabelingFunction -> (Placed[Row[{"v=", #1}], Above]&)
			]
		],
		"v="
	],
	True,
	TestID -> "barchart-labelingfunction-visible-labels"
];
TestCreate[
	And @@ StringContainsQ[
		xml[
			BarChart[
				{1, 3, 2},
				LabelingFunction -> (Placed[Row[{"v=", #1}], Tooltip]&)
			]
		],
		{"v=", "wgxShowTooltip"}
	],
	True,
	TestID -> "barchart-labelingfunction-tooltip-labels"
];
(* A bare-symbol LabelingFunction (Above/Top/...) makes WL emit the bar values
   as plain-text labels (Text[1, ...]); they must render as <text> nodes, not
   vanish into MathML <foreignObject>s that librsvg cannot draw. *)
TestCreate[
	Module[{texts},
		texts =
			Cases[
				ImportString[xml[BarChart[{1, 3, 2}, LabelingFunction -> Above]], "XML"],
				XMLElement["text", _, {t_String}] :> t,
				Infinity
			];
		SubsetQ[texts, {"1", "3", "2"}]
	],
	True,
	TestID -> "barchart-labelingfunction-above-value-labels"
];
TestCreate[
	(
		StringCount[xml[PieChart[{1, 3, 2}]], "<polygon"] +
		StringCount[xml[PieChart[{1, 3, 2}]], "<path"]
	) >=
	3,
	True,
	TestID -> "piechart-three-wedges"
];
TestCreate[
	StringCount[xml[Histogram[{1, 2, 2, 3, 3, 3, 4}]], "<rect"] >= 3,
	True,
	TestID -> "histogram-bars"
];
TestCreate[
	(
		StringCount[
			xml[BubbleChart[{{1, 2, 3}, {2, 1, 4}, {3, 4, 1}}]],
			"<circle"
		] +
		StringCount[xml[BubbleChart[{{1, 2, 3}, {2, 1, 4}, {3, 4, 1}}]], "<ellipse"]
	) >=
	3,
	True,
	TestID -> "bubblechart-bubbles"
];
(* a box-whisker chart must render box + whisker geometry, not just a valid string *)
TestCreate[
	With[{
			doc = xml[BoxWhiskerChart[{{1, 2, 3, 4, 5, 6}, {2, 3, 4, 5, 6, 7}}]]
		},
		StringCount[doc, "<polyline"] >= 2 &&
		StringCount[doc, "<polygon"] + StringCount[doc, "<rect"] >= 1
	],
	True,
	TestID -> "boxwhisker-serialises"
];
TestCreate[
	With[{
			doc = xml[BoxWhiskerChart[{{1, 2, 3, 4, 5, 6}, {2, 3, 4, 5, 6, 7}}]]
		},
		StringCount[doc, "data:image/png;base64,"] >= 2 &&
		StringFreeQ[doc, "Column["] &&
		StringFreeQ[doc, "Grid["]
	],
	True,
	TestID -> "boxwhisker-tooltip-layout-rasterized"
];
TestCreate[
	(
		StringCount[xml[SectorChart[{{1, 2}, {3, 4}, {2, 1}}]], "<polygon"] +
		StringCount[xml[SectorChart[{{1, 2}, {3, 4}, {2, 1}}]], "<path"]
	) >=
	3,
	True,
	TestID -> "sectorchart-wedges"
];
TestCreate[
	StringCount[xml[RectangleChart[{{1, 2}, {3, 4}}]], "<rect"] >= 2,
	True,
	TestID -> "rectanglechart-rects"
];
TestCreate[
	StringContainsQ[xml[BarChart[{1, 3, 2}]], "currentScript"],
	True,
	TestID -> "barchart-interactive"
];

(* ::Section:: *) (* GeoGraphics *)
geoImg = Image[{{{1., 0., 0.}, {0., 1., 0.}}, {{0., 0., 1.}, {1., 1., 0.}}}];

geoRectVTC = {{{0., 1.}, {1., 1.}, {1., 0.}, {0., 0.}, {0., 1.}}};

geoTile[corners_] :=
	{
		Texture[geoImg],
		Polygon[{corners}, VertexTextureCoordinates -> geoRectVTC]
	};

geoRectCorners = {{0., 1.}, {1., 1.}, {1., 0.}, {0., 0.}, {0., 1.}};

geoSkewCorners = {{0., 1.}, {1., 1.2}, {1., 0.}, {0., 0.}, {0., 1.}};

geoSynth[corners_] :=
	GeoGraphics[
		Graphics[{geoTile[corners]}, PlotRange -> {{0., 1.}, {0., 1.}}]
	];

(* a GeoGraphics serialises to an SVG document string *)
TestCreate[
	StringContainsQ[pvt`serialize[geoSynth[geoRectCorners]], "<svg"],
	True,
	TestID -> "geo-dispatch-svg"
];

(* the raster basemap tile becomes a base64-PNG <image> *)
TestCreate[
	With[{doc = pvt`serialize[geoSynth[geoRectCorners]]},
		StringContainsQ[doc, "<image"] &&
		StringContainsQ[doc, "data:image/png;base64,"]
	],
	True,
	TestID -> "geo-texture-tile-image"
];

(* the {Texture, Polygon} tile rule wins over the generic list rule *)
TestCreate[
	gtag[pvt`serialize[geoTile[geoRectCorners], bag[]]],
	"image",
	TestID -> "geo-tile-rule-priority"
];

(* axis-aligned rectangle detection *)
TestCreate[
	ToneAr`WebGraphics`PackageScope`axisAlignedRectQ[geoRectCorners],
	True,
	TestID -> "geo-axisaligned-true"
];
TestCreate[
	ToneAr`WebGraphics`PackageScope`axisAlignedRectQ[geoSkewCorners],
	False,
	TestID -> "geo-axisaligned-false"
];

(* a skewed tile forces the whole-basemap raster fallback; a rectangular
   one does not *)
TestCreate[
	ToneAr`WebGraphics`PackageScope`geoNeedsRasterFallback[
		geoSynth[geoRectCorners][[1]]
	],
	False,
	TestID -> "geo-fallback-not-needed"
];
TestCreate[
	ToneAr`WebGraphics`PackageScope`geoNeedsRasterFallback[
		geoSynth[geoSkewCorners][[1]]
	],
	True,
	TestID -> "geo-fallback-needed"
];

(* ExportWebGraphics accepts a GeoGraphics, not just a Graphics *)
TestCreate[
	StringContainsQ[
		ExportWebGraphics[geoSynth[geoRectCorners], "SVG"],
		"<svg"
	],
	True,
	TestID -> "geo-exportwebgraphics-accepts"
];

(* Fixture-backed tests (real evaluated GeoGraphics) *)
geoFix[name_] :=
	Import[
		FileNameJoin[
			{
				PacletObject["ToneAr/WebGraphics"]["Location"],
				"Tests",
				"fixtures",
				name <> ".wxf"
			}
		]
	];

(* raster basemap: at least one base64-PNG tile <image> *)
TestCreate[
	With[{doc = pvt`serialize[geoFix["raster"]]},
		StringContainsQ[doc, "<image"] &&
		StringContainsQ[doc, "data:image/png;base64,"]
	],
	True,
	TestID -> "geo-fixture-raster-tile"
];

(* vector basemap + overlay: a GeoPath blue line and a marker inset
   (a group scaled to the Offset pin size) render; the marker must NOT be
   blown up to the full image (regression for Inset Offset sizing) *)
TestCreate[
	With[{doc = pvt`serialize[geoFix["overlay"]]},
		StringContainsQ[doc, "<svg"] &&
		(StringCount[doc, "<polyline"] + StringCount[doc, "<line"] +
			StringCount[doc, "<path"]) >= 1 &&
		StringContainsQ[doc, "scale("]
	],
	True,
	TestID -> "geo-fixture-overlay-render"
];

(* a filled region polygon (semi-transparent) renders as a closed shape *)
TestCreate[
	With[{doc = pvt`serialize[geoFix["region"]]},
		(StringCount[doc, "<polygon"] + StringCount[doc, "<path"]) >= 1 &&
		StringContainsQ[doc, "fill-opacity"]
	],
	True,
	TestID -> "geo-fixture-region-fill"
];

(* tooltip on a GeoMarker: raster tile + tooltip background + label text *)
TestCreate[
	With[{doc = pvt`serialize[geoFix["tooltip"]]},
		StringContainsQ[doc, "<image"] &&
		StringContainsQ[doc, "wgx-tip"] &&
		StringContainsQ[doc, "Paris"]
	],
	True,
	TestID -> "geo-fixture-tooltip"
];

(* country highlighting: the entity polygon is filled (semi-transparent
   yellow), the boundary is drawn, place labels render, and the result is
   well-formed XML -- matching the Wolfram Language rendering *)
TestCreate[
	With[{doc = pvt`serialize[geoFix["country"]]},
		StringContainsQ[doc, "#ffff00"] &&
		StringContainsQ[doc, "fill-opacity"] &&
		StringCount[doc, "<path"] >= 1 &&
		StringCount[doc, "<text"] >= 3 &&
		MatchQ[Quiet[ImportString[doc, "XML"]], XMLObject["Document"][__]]
	],
	True,
	TestID -> "geo-fixture-country-highlight"
];

(* multi-region highlighting: several regions filled in distinct
   semi-transparent colours *)
TestCreate[
	With[{doc = pvt`serialize[geoFix["regions"]]},
		StringContainsQ[doc, "fill-opacity"] &&
		(StringCount[doc, "<path"] + StringCount[doc, "<polygon"]) >= 2 &&
		MatchQ[Quiet[ImportString[doc, "XML"]], XMLObject["Document"][__]]
	],
	True,
	TestID -> "geo-fixture-regions-highlight"
];

(* place labels with named alignment ({Center, Bottom}, scalar Center) render
   as <text> rather than being dropped *)
TestCreate[
	gtag[
		pvt`serialize[Text["Zurich", {8.5, 47.4}, {Center, Bottom}], bag[]]
	],
	"text",
	TestID -> "text-named-alignment"
];
TestCreate[
	gtag[pvt`serialize[Text["Switzerland", {8.2, 46.8}, Center], bag[]]],
	"text",
	TestID -> "text-scalar-center-alignment"
];

(* a filled polygon with an Opacity directive but NO explicit colour (the
   default GeoGraphics region-highlight form `Style[Polygon, Opacity[0.3]]`)
   must apply the opacity to the default (black) fill -- emitting fill-opacity
   -- rather than rendering a solid opaque shape *)
TestCreate[
	With[{
			doc =
				xml[
					Graphics[
						{Style[Polygon[{{0, 0}, {2, 0}, {2, 2}}], Directive[Opacity[0.3]]]},
						PlotRange -> {{-1, 3}, {-1, 3}}
					]
				]
		},
		StringContainsQ[doc, "fill-opacity='0.3'"]
	],
	True,
	TestID -> "opacity-without-color-emits-fill-opacity"
];
