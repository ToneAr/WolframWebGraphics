(* ============================================================= *)
(*  Unit tests for ToneAr`WebGraphics` serialize                 *)
(*                                                               *)
(*  Run with:  wolframscript -file Tests/run.wls                 *)
(*  Assumes the paclet is already loaded (Needs done by runner). *)
(* ============================================================= *)
(* ---- helpers ---------------------------------------------------------- *)
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

(* full-document markup string (serialize now returns a String for 2D & 3D) *)
xml[g_] := serialize[g];

(* ===================================================================== *)
(*  Geometry primitives                                                  *)
(* ===================================================================== *)
VerificationTest[
	gtag[serialize[Disk[{0, 0}, 1], bag[]]],
	"circle",
	TestID -> "disk-tag"
];
VerificationTest[
	gat[serialize[Disk[{0, 0}, 1], bag[]], "r"],
	"1",
	TestID -> "disk-radius"
];
VerificationTest[
	gat[serialize[Disk[{2, 3}, 1], bag[]], "cy"],
	"-3",
	TestID -> "disk-yflip"
];
VerificationTest[
	gtag[serialize[Disk[{0, 0}, {2, 3}], bag[]]],
	"ellipse",
	TestID -> "diskxy-ellipse"
];

VerificationTest[
	gtag[serialize[Circle[{0, 0}, 1], bag[]]],
	"circle",
	TestID -> "circle-tag"
];
VerificationTest[
	gat[serialize[Circle[{0, 0}, 1], bag[]], "fill"],
	"none",
	TestID -> "circle-is-stroke"
];

VerificationTest[
	gtag[serialize[Point[{1, 2}], bag[]]],
	"circle",
	TestID -> "point-tag"
];
VerificationTest[
	gat[serialize[Point[{1, 2}], bag[]], "cy"],
	"-2",
	TestID -> "point-yflip"
];
VerificationTest[
	gtag[serialize[Point[{{0, 0}, {1, 1}}], bag[]]],
	"g",
	TestID -> "point-multi-group"
];

VerificationTest[
	gtag[serialize[Line[{{0, 0}, {1, 1}}], bag[]]],
	"polyline",
	TestID -> "line-tag"
];
VerificationTest[
	gat[serialize[Line[{{0, 1}, {2, 3}}], bag[]], "points"],
	"0,-1 2,-3",
	TestID -> "line-points-yflip"
];
VerificationTest[
	gat[
		serialize[
			Line[{{0, 0}, Offset[{10, -5}, {1, 1}]}],
			bag[]
		],
		"points"
	],
	"0,0 11,4",
	TestID -> "line-offset-point"
];
VerificationTest[
	gat[
		serialize[
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

VerificationTest[
	gtag[serialize[Rectangle[{0, 0}, {2, 4}], bag[]]],
	"rect",
	TestID -> "rect-tag"
];
VerificationTest[
	gat[serialize[Rectangle[{0, 0}, {2, 4}], bag[]], "y"],
	"-4",
	TestID -> "rect-yflip"
];
VerificationTest[
	gat[serialize[Rectangle[{0, 0}, {2, 4}], bag[]], "height"],
	"4",
	TestID -> "rect-height"
];

VerificationTest[
	gtag[serialize[Polygon[{{0, 0}, {1, 0}, {0, 1}}], bag[]]],
	"polygon",
	TestID -> "polygon-tag"
];
VerificationTest[
	gat[
		serialize[
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
VerificationTest[
	gat[
		serialize[
			Polygon[{{{0, 0}, {3, 0}, {0, 3}}, {{1, 1}, {2, 1}, {1, 2}}}],
			bag[]
		],
		"fill-rule"
	],
	"evenodd",
	TestID -> "polygon-holes-evenodd"
];
VerificationTest[
	gtag[serialize[Triangle[{{0, 0}, {1, 0}, {0, 1}}], bag[]]],
	"polygon",
	TestID -> "triangle-tag"
];

VerificationTest[
	gtag[serialize[Annulus[{0, 0}, {0.5, 1}], bag[]]],
	"path",
	TestID -> "annulus-path"
];
VerificationTest[
	gat[serialize[Annulus[{0, 0}, {0.5, 1}], bag[]], "fill-rule"],
	"evenodd",
	TestID -> "annulus-evenodd"
];

VerificationTest[
	gtag[serialize[Disk[{0, 0}, 1, {0, Pi}], bag[]]],
	"polygon",
	TestID -> "sector-polygon"
];
VerificationTest[
	gtag[serialize[Circle[{0, 0}, 1, {0, Pi}], bag[]]],
	"polyline",
	TestID -> "arc-polyline"
];

VerificationTest[
	StringStartsQ[
		gat[serialize[BezierCurve[{{0, 0}, {1, 1}, {2, 0}, {3, 1}}], bag[]], "d"],
		"M"
	],
	True,
	TestID -> "bezier-path"
];
VerificationTest[
	gtag[serialize[BSplineCurve[{{0, 0}, {1, 1}, {2, 0}, {3, 1}}], bag[]]],
	"path",
	TestID -> "bspline-path"
];

VerificationTest[
	hasTag[serialize[Arrow[{{0, 0}, {1, 1}}], bag[]], "polyline"],
	True,
	TestID -> "arrow-line"
];
VerificationTest[
	hasTag[serialize[Arrow[{{0, 0}, {1, 1}}], bag[]], "polygon"],
	True,
	TestID -> "arrow-head"
];

VerificationTest[
	hasTag[serialize[Text["hi", {0, 0}], bag[]], "text"],
	True,
	TestID -> "text-tag"
];
VerificationTest[
	contains[serialize[Text["hi", {0, 0}], bag[]], "hi"],
	True,
	TestID -> "text-content"
];
VerificationTest[
	Module[{node = serialize[Text[x^2, {0, 0}], bag[]]},
		hasTag[node, "foreignObject"] &&
		hasTag[node, "math"] &&
		hasTag[node, "msup"]
	],
	True,
	TestID -> "text-symbolic-mathml"
];
VerificationTest[
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
VerificationTest[
	hasTag[serialize[Text["hi", {0, 0}], bag[]], "foreignObject"],
	False,
	TestID -> "text-string-stays-svg-text"
];

VerificationTest[
	hasTag[
		serialize[
			GraphicsComplex[{{0, 0}, {1, 0}, {0, 1}}, Polygon[{1, 2, 3}]],
			bag[]
		],
		"polygon"
	],
	True,
	TestID -> "graphicscomplex-expands"
];

(* ===================================================================== *)
(*  Style resolution                                                     *)
(* ===================================================================== *)
VerificationTest[
	gat[serialize[Disk[{0, 0}, 1], bag[Red]], "fill"],
	"#ff0000",
	TestID -> "fill-color"
];
VerificationTest[
	gat[serialize[Disk[{0, 0}, 1], bag[]], "fill"],
	Missing[],
	TestID -> "fill-default-omitted"
];
VerificationTest[
	gat[serialize[Disk[{0, 0}, 1], bag[Red, Opacity[0.5]]], "fill-opacity"],
	"0.5",
	TestID -> "fill-opacity"
];
VerificationTest[
	StringQ[
		gat[
			serialize[Line[{{0, 0}, {1, 1}}], bag[AbsoluteThickness[2]]],
			"stroke-width"
		]
	],
	True,
	TestID -> "stroke-width-present"
];
VerificationTest[
	StringQ[
		gat[
			serialize[Line[{{0, 0}, {1, 1}}], bag[Dashing[{0.05, 0.05}]]],
			"stroke-dasharray"
		]
	],
	True,
	TestID -> "dashing-present"
];
VerificationTest[
	gat[serialize[Disk[{0, 0}, 1], bag[Red, EdgeForm[Black]]], "stroke"],
	"#000000",
	TestID -> "edgeform-stroke"
];
VerificationTest[
	StringQ[
		gat[
			serialize[
				Disk[{0, 0}, 1],
				bag[Red, EdgeForm[{Black, Dashing[{0.05, 0.05}]}]]
			],
			"stroke-dasharray"
		]
	],
	True,
	TestID -> "dashing-on-filled-edge"
];
VerificationTest[
	gat[serialize[Disk[{0, 0}, 1], bag[FaceForm[None]]], "fill"],
	"none",
	TestID -> "faceform-none"
];

VerificationTest[
	ToneAr`WebGraphics`PackageScope`getCurrentStyleProps[bag[], "Filled"],
	{},
	TestID -> "styleprops-empty-default"
];
VerificationTest[
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

(* ===================================================================== *)
(*  Gradients + VertexColors                                             *)
(* ===================================================================== *)
VerificationTest[
	hasTag[
		serialize[Disk[{0, 0}, 1], bag[LinearGradientFilling[{Red, Blue}]]],
		"linearGradient"
	],
	True,
	TestID -> "lineargradientfill-def"
];
VerificationTest[
	StringStartsQ[
		firstAttr[
			serialize[Disk[{0, 0}, 1], bag[LinearGradientFilling[{Red, Blue}]]],
			"circle",
			"fill"
		],
		"url("
	],
	True,
	TestID -> "gradient-fill-url"
];
VerificationTest[
	hasTag[
		serialize[Disk[{0, 0}, 1], bag[RadialGradientFilling[{Red, Blue}]]],
		"radialGradient"
	],
	True,
	TestID -> "radialgradientfill-def"
];
VerificationTest[
	Module[{node},
		node =
			serialize[
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
VerificationTest[
	Module[{node},
		node =
			serialize[
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
VerificationTest[
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
VerificationTest[
	StringStartsQ[
		firstAttr[
			serialize[Line[{{0, 0}, {1, 1}}, VertexColors -> {Red, Blue}], bag[]],
			"polyline",
			"stroke"
		],
		"url("
	],
	True,
	TestID -> "vertexcolors-line-stroke-url"
];
VerificationTest[
	Module[{doc},
		doc =
			xml[DensityPlot[Sin[x]  Sin[y], {x, -1, 1}, {y, -1, 1}, PlotPoints -> 3]];
		StringContainsQ[doc, "data:image/png;base64"] &&
		StringFreeQ[doc, "linearGradient"]
	],
	True,
	TestID -> "densityplot-dense-vertexcolors-rasterized"
];
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
			serialize[
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
VerificationTest[
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
			serialize[
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
VerificationTest[
	Module[{doc},
		doc =
			serialize[
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

(* ===================================================================== *)
(*  Fonts                                                                *)
(* ===================================================================== *)
VerificationTest[
	gat[serialize[Text[Style["hi", 20, Bold], {0, 0}], bag[]], "font-weight"],
	"bold",
	TestID -> "font-bold"
];
VerificationTest[
	gat[
		serialize[Text[Style["hi", FontSlant -> Italic], {0, 0}], bag[]],
		"font-style"
	],
	"italic",
	TestID -> "font-italic"
];
VerificationTest[
	StringQ[gat[serialize[Text[Style["hi", 20], {0, 0}], bag[]], "font-size"]],
	True,
	TestID -> "font-size-present"
];
VerificationTest[
	"font-family" /. ToneAr`WebGraphics`PackageScope`getCurrentTextProps[
		bag[],
		{FontFamily -> "Times"}
	],
	"Times",
	TestID -> "font-family"
];

(* ===================================================================== *)
(*  Interactive wrappers                                                 *)
(* ===================================================================== *)
VerificationTest[
	StringContainsQ[
		gat[
			FirstCase[
				serialize[Tooltip[Disk[], "x"], bag[]],
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
VerificationTest[
	contains[serialize[Tooltip[Disk[], "x"], bag[]], "wgx-tip"],
	True,
	TestID -> "tooltip-box"
];
VerificationTest[
	contains[serialize[Tooltip[Disk[], "x"], bag[]], "wgx-tip-bg"],
	True,
	TestID -> "tooltip-background-class"
];
VerificationTest[
	hasTag[serialize[Tooltip[Disk[], x^2], bag[]], "math"],
	True,
	TestID -> "tooltip-symbolic-label-mathml"
];
VerificationTest[
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
VerificationTest[
	gat[serialize[Mouseover[Circle[], Disk[]], bag[]], "class"],
	"wgx-mo",
	TestID -> "mouseover-class"
];
VerificationTest[
	Module[{
			style = ToneAr`WebGraphics`PackageScope`$wgxStyle
		},
		StringContainsQ[style, ".wgx-mo-h{opacity:0;pointer-events:none"] &&
		StringFreeQ[style, ".wgx-mo-h{display:none}"]
	],
	True,
	TestID -> "mouseover-opacity-swap-css"
];
VerificationTest[
	gtag[serialize[Hyperlink[Disk[], "https://wolfram.com"], bag[]]],
	"a",
	TestID -> "hyperlink-a"
];
VerificationTest[
	gat[serialize[Hyperlink[Disk[], "https://wolfram.com"], bag[]], "href"],
	"https://wolfram.com",
	TestID -> "hyperlink-href"
];
VerificationTest[
	StringContainsQ[
		gat[serialize[StatusArea[Disk[], "hi"], bag[]], "onmouseover"],
		"wgxSetStatus"
	],
	True,
	TestID -> "statusarea-handler"
];
VerificationTest[
	StringQ[gat[serialize[Annotation[Disk[], "meta"], bag[]], "data-annotation"]],
	True,
	TestID -> "annotation-data"
];
(* internal charting annotations (private-context tags, assoc meta) are noise:
   render the content but emit no data-annotation *)
VerificationTest[
	contains[
		serialize[Annotation[Disk[], "Charting`Private`Tag#1"], bag[]],
		"data-annotation"
	],
	False,
	TestID -> "annotation-internal-dropped"
];
VerificationTest[
	hasTag[
		serialize[Annotation[Disk[], <|"HighlightElements" -> {}|>], bag[]],
		"circle"
	],
	True,
	TestID -> "annotation-internal-keeps-content"
];
VerificationTest[
	serialize[
		Annotation[
			Point[{Offset[{1, 0}, {0, 0}]}],
			"WRI-GraphicsAlign-PlaceHolder"
		],
		bag[]
	],
	Null,
	TestID -> "annotation-wri-placeholder-dropped"
];
VerificationTest[
	StringContainsQ[xml[Graphics[{Tooltip[Disk[], "x"]}]], "currentScript"],
	True,
	TestID -> "interactivity-injects-runtime"
];
VerificationTest[
	StringContainsQ[xml[Graphics[{Red, Disk[]}]], "currentScript"],
	False,
	TestID -> "no-runtime-when-static"
];

(* ===================================================================== *)
(*  Global options + document                                            *)
(* ===================================================================== *)
VerificationTest[
	Lookup[
		ToneAr`WebGraphics`PackageScope`optionsToGlobalSvgProps[{ImageSize -> 200}],
		"width"
	],
	"200",
	TestID -> "imagesize-width"
];
(* pixel-space model: viewBox is the px box; data is mapped/stretched into it *)
VerificationTest[
	Lookup[
		ToneAr`WebGraphics`PackageScope`optionsToGlobalSvgProps[
			{PlotRange -> {{-1, 1}, {-2, 2}}}
		],
		"viewBox"
	],
	"0 0 360 720",
	TestID -> "plotrange-viewbox-pixelbox"
];
VerificationTest[
	Lookup[
		ToneAr`WebGraphics`PackageScope`optionsToGlobalSvgProps[
			{PlotRange -> {{-1, 1}, {-2, 2}}}
		],
		"preserveAspectRatio"
	],
	"none",
	TestID -> "plotrange-stretch"
];
VerificationTest[
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
VerificationTest[
	StringContainsQ[xml[Graphics[{Red, Disk[]}]], "xmlns="],
	True,
	TestID -> "doc-has-xmlns"
];

(* an auto-ranged Graphics (symbolic/absent PlotRange) now resolves to a
   numeric data->pixel map, so it gets a viewBox just like an explicit range *)
VerificationTest[
	StringContainsQ[xml[Graphics[{Disk[{0, 0}, 1]}]], "viewBox="],
	True,
	TestID -> "autorange-gets-viewbox"
];
VerificationTest[
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

(* ===================================================================== *)
(*  Plots  (the curve must survive; see NOTE on axes below)              *)
(* ===================================================================== *)
VerificationTest[
	StringQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]]],
	True,
	TestID -> "plot-serialises"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "<polyline"],
	True,
	TestID -> "plot-has-curve"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "viewBox="],
	True,
	TestID -> "plot-has-viewbox"
];
VerificationTest[
	StringContainsQ[xml[ListLinePlot[{1, 3, 2, 4}]], "<polyline"],
	True,
	TestID -> "listlineplot-has-curve"
];
VerificationTest[
	And @@ StringContainsQ[
		xml[ListPlot[{1, 3, 2, 4}]],
		{"class='wgx-curve'", "nearestPointOnCircle", "initializeCoordinateTool"}
	],
	True,
	TestID -> "listplot-has-coordinate-readout"
];
(* axes/ticks/labels are generated from the Axes/AxesOrigin options *)
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "<text"],
	True,
	TestID -> "plot-has-axis-labels"
];
(* coordinate tool: curve tagged, inverse map embedded, runtime present and
   wired on load (so the curve exists when listeners attach), JS in CDATA *)
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "class='wgx-curve'"],
	True,
	TestID -> "plot-curve-tagged"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "data-mapax="],
	True,
	TestID -> "plot-inverse-map-embedded"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "initializeCoordinateTool"],
	True,
	TestID -> "plot-coordtool-wired-on-load"
];
VerificationTest[
	StringContainsQ[
		xml[ParametricPlot[{Sin[3  t], Sin[4  t]}, {t, 0, 2  Pi}]],
		"nearestPointOnPolyline"
	],
	True,
	TestID -> "plot-coordtool-nearest-polyline"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "getCurveStrokeColor"],
	True,
	TestID -> "plot-coordtool-uses-curve-color"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "labelBackground"],
	True,
	TestID -> "plot-coordtool-label-background"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "labelAccent"],
	True,
	TestID -> "plot-coordtool-label-accent"
];
VerificationTest[
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
VerificationTest[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}]],
		{"wgx-coord-label", "#101a30", "#f59e0b"}
	],
	True,
	TestID -> "plot-coordtool-label-style"
];
VerificationTest[
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
VerificationTest[
	And @@ StringContainsQ[
		serialize[Labeled[Plot[Sin[x], {x, 0, 2  Pi}], "Labeled plot"]],
		{"getScreenCTM", "svgScreenInverse", "nearestPoint.localX"}
	],
	True,
	TestID -> "labeled-plot-hover-uses-transformed-curve-points"
];
VerificationTest[
	StringContainsQ[xml[Plot[Sin[x], {x, 0, 2  Pi}]], "<script><![CDATA["],
	True,
	TestID -> "script-in-cdata"
];
VerificationTest[
	StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}]],
		"preserveAspectRatio='none'"
	],
	True,
	TestID -> "plot-fills-box"
];
(* a Graphics with Axes -> False must NOT get generated axes *)
VerificationTest[
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
VerificationTest[
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
VerificationTest[
	StringCases[
		xml[ParametricPlot[{Sin[3  t], Sin[4  t]}, {t, 0, 2  Pi}]],
		(DigitCharacter..) ~~ "." ~~ (" " | "," | "'" | "\"")
	],
	{},
	TestID -> "no-trailing-dot-numbers"
];
(* the Lissajous curve itself must survive (a long polyline, many points) *)
VerificationTest[
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
VerificationTest[
	StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, PlotLabel -> "Sine wave"]],
		"Sine wave"
	],
	True,
	TestID -> "plotlabel-renders"
];
VerificationTest[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, PlotLabel -> x^2]],
		{"<foreignObject", "<math", "<msup"}
	],
	True,
	TestID -> "plotlabel-symbolic-mathml"
];
VerificationTest[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, AxesLabel -> {"angle", "amplitude"}]],
		{"angle", "amplitude"}
	],
	True,
	TestID -> "axeslabel-renders"
];
VerificationTest[
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
VerificationTest[
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
VerificationTest[
	And @@ StringContainsQ[
		xml[Plot[Sin[x], {x, 0, 2  Pi}, AxesLabel -> {"angle", "amplitude"}]],
		{"class='wgx-axis-label'", "fill='#595959'", "font-family='sans-serif'"}
	],
	True,
	TestID -> "axeslabel-default-style"
];
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
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
VerificationTest[
	And @@ StringContainsQ[
		serialize[
			Plot[{Sin[x], Cos[x]}, {x, 0, 2  Pi}, PlotLegends -> {"sin", "cos"}]
		],
		{"sin", "cos"}
	],
	True,
	TestID -> "plotlegends-renders"
];
VerificationTest[
	StringContainsQ[
		serialize[Labeled[Plot[Sin[x], {x, 0, 2  Pi}], "Labeled plot"]],
		"Labeled plot"
	],
	True,
	TestID -> "labeled-renders"
];
(* ChartLegends -> a SwatchLegend key with one text node per label.
   (The legend arrives list-wrapped: {Placed[SwatchLegend[...], After, Identity]}.) *)
VerificationTest[
	With[{
			doc =
				serialize[
					BarChart[{1, 3, 2}, ChartLegends -> {"Apples", "Bananas", "Cherries"}]
				]
		},
		AllTrue[{">Apples<", ">Bananas<", ">Cherries<"}, StringContainsQ[doc, #]&]
	],
	True,
	TestID -> "chartlegends-render"
];

(* ===================================================================== *)
(*  Charting constructs                                                  *)
(* ===================================================================== *)
(* Offset[{dx,dy},{x,y}]: data point mapped, then an absolute pixel shift.
   Bag-level map is identity-x / y-flip, so {1,0} -> px {1,0}; +{0,-2} -> y=2 *)
VerificationTest[
	Module[{
			n = serialize[Text["a", Offset[{0, -2}, {1, 0}], {0, 1}], bag[]]
		},
		{gat[n, "x"], gat[n, "y"]}
	],
	{"1", "2"},
	TestID -> "text-offset-px"
];
VerificationTest[
	hasTag[serialize[Text["a", Offset[{3, 4}, {0, 0}]], bag[]], "text"],
	True,
	TestID -> "text-offset-2arg"
];
(* Scaled[{sx,sy}] is a fraction of the data plot box. After setMap to
   {{0,10},{0,4}} over a 100x40 px box with no margins, Scaled[{0.5,0.5}]
   is data {5,2} -> the box center. resolveScaledPt returns DATA coords. *)
VerificationTest[
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
VerificationTest[
	hasTag[serialize[Text["x", Scaled[{0.5, 0.5}]], bag[]], "text"],
	True,
	TestID -> "text-scaled-renders"
];
VerificationTest[
	Module[{node, form},
		node =
			serialize[
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
VerificationTest[
	gat[serialize[Text[Rotate["x", Pi / 2], {0, 0}], bag[]], "transform"],
	"rotate(-90 0 0)",
	TestID -> "text-rotate-transform"
];
VerificationTest[
	Module[{doc},
		doc =
			xml[
				Graphics[
					{Inset[Graphics[{Disk[{0, 0}, 10]}, ImageSize -> 100], {2, 1}]},
					PlotRange -> {{0, 4}, {0, 2}},
					ImageSize -> 320
				]
			];
		AnyTrue[{"r='50'", "rx='50'"}, StringContainsQ[doc, #]&] &&
		AllTrue[{"r='800'", "rx='800'", "ry='800'"}, StringFreeQ[doc, #]&]
	],
	True,
	TestID -> "inset-graphic-uses-inner-scale"
];
(* GeometricTransformation by a pure translation {tx,ty} in data space.
   Bag-level map: S=diag(1,-1), B={0,0}. A Disk at {0,0} translated by
   {2,3} in data -> pixel translate {1*2, -1*3} = {2,-3}. Wrapped in <g>. *)
VerificationTest[
	gtag[
		serialize[
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
VerificationTest[
	StringContainsQ[
		gat[
			serialize[
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
VerificationTest[
	gtag[serialize[Rotate[Disk[{1, 0}, 0.1], Pi / 2], bag[]]],
	"g",
	TestID -> "rotate-primitive-group"
];
VerificationTest[
	gat[serialize[Rotate[Disk[{1, 0}, 0.1], Pi / 2], bag[]], "transform"],
	"matrix(0 -1 1 0 0 0)",
	TestID -> "rotate-primitive-matrix"
];

(* DelayedMouseEffect / DelayedClickEffect *)
(* DelayedMouseEffect renders the base primitive ... *)
VerificationTest[
	hasTag[
		serialize[
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
VerificationTest[
	StringQ[
		gat[
			FirstCase[
				serialize[
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
VerificationTest[
	StringContainsQ[
		gat[
			FirstCase[
				serialize[
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
VerificationTest[
	hasTag[
		serialize[
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
VerificationTest[
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

(* ===================================================================== *)
(*  3D backend: Graphics3D -> Three.js/WebGL HTML widget                 *)
(* ===================================================================== *)
(* test the widget structure without inlining the ~600KB Three.js library *)
ToneAr`WebGraphics`PackageScope`$wgxInline3DLib = False;
VerificationTest[
	StringQ[serialize[Plot3D[Sin[x  y], {x, 0, 2}, {y, 0, 2}]]],
	True,
	TestID -> "plot3d-returns-string"
];
VerificationTest[
	StringContainsQ[
		serialize[Plot3D[Sin[x  y], {x, 0, 2}, {y, 0, 2}]],
		"class=\"wgx3d\""
	],
	True,
	TestID -> "plot3d-widget-div"
];
VerificationTest[
	StringContainsQ[
		serialize[Plot3D[Sin[x  y], {x, 0, 2}, {y, 0, 2}]],
		"WGX3D.renderScene"
	],
	True,
	TestID -> "plot3d-widget-script"
];
VerificationTest[
	StringContainsQ[
		ToneAr`WebGraphics`PackageScope`wgx3DLibraryTag[],
		"OrbitControls"
	],
	True,
	TestID -> "plot3d-library-orbitcontrols"
];
VerificationTest[
	StringContainsQ[
		serialize[Graphics3D[Polygon[{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}}]]],
		"wgx3d"
	],
	True,
	TestID -> "graphics3d-explicit-polygon"
];
ToneAr`WebGraphics`PackageScope`$wgxInline3DLib = True;

(* ===================================================================== *)
(*  Dynamic / DynamicModule / LightDarkSwitched / If unwrapping          *)
(* ===================================================================== *)
(* DynamicModule[{vars}, body] -> serialize the static body *)
VerificationTest[
	hasTag[
		serialize[DynamicModule[{a = False}, Disk[{0, 0}, 1]], bag[]],
		"circle"
	],
	True,
	TestID -> "dynamicmodule-body"
];
(* LightDarkSwitched[light, dark] -> pick light *)
VerificationTest[
	gat[
		serialize[Style[Disk[{0, 0}, 1], LightDarkSwitched[Red, Blue]], bag[]],
		"fill"
	],
	"#ff0000",
	TestID -> "lightdark-picks-light"
];
(* bare Dynamic content -> its held value rendered when a primitive *)
VerificationTest[
	hasTag[serialize[Dynamic[Disk[{0, 0}, 1]], bag[]], "circle"],
	True,
	TestID -> "dynamic-default"
];
(* a bare Dynamic[stateVar] is pure interactivity state -> contributes nothing *)
VerificationTest[
	serialize[Dynamic[someStateVar], bag[]],
	Null,
	TestID -> "dynamic-bare-symbol-null"
];
(* If gated on a (non-True) symbol -> the else/default branch *)
VerificationTest[
	hasTag[
		serialize[If[someClickVar, Circle[{0, 0}, 1], Disk[{0, 0}, 1]], bag[]],
		"circle"
	],
	True,
	TestID -> "if-default-branch"
];

(* DelayedClickEffect renders its base content (a Disk sector here) ... *)
VerificationTest[
	contains[
		serialize[
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
VerificationTest[
	Module[{
			n =
				FirstCase[
					serialize[
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
VerificationTest[
	StringContainsQ[
		ToString[
			serialize[
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
VerificationTest[
	Module[{
			n =
				FirstCase[
					serialize[
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
VerificationTest[
	StringQ[
		gat[
			FirstCase[
				serialize[
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
VerificationTest[
	StringQ[
		gat[
			FirstCase[
				serialize[
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
VerificationTest[
	Module[{grp},
		grp[v_] :=
			gat[
				FirstCase[
					serialize[
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
VerificationTest[
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
VerificationTest[
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

(* ===================================================================== *)
(*  Charts (integration) — each must produce its core marks              *)
(* ===================================================================== *)
VerificationTest[
	StringCount[xml[BarChart[{1, 3, 2}]], "<rect"] >= 3,
	True,
	TestID -> "barchart-three-bars"
];
VerificationTest[
	StringContainsQ[
		xml[BarChart[{1, 3, 2}, ChartLabels -> {"aa", "bb", "cc"}]],
		">aa<"
	],
	True,
	TestID -> "barchart-labels"
];
VerificationTest[
	(
		StringCount[xml[PieChart[{1, 3, 2}]], "<polygon"] +
		StringCount[xml[PieChart[{1, 3, 2}]], "<path"]
	) >=
	3,
	True,
	TestID -> "piechart-three-wedges"
];
VerificationTest[
	StringCount[xml[Histogram[{1, 2, 2, 3, 3, 3, 4}]], "<rect"] >= 3,
	True,
	TestID -> "histogram-bars"
];
VerificationTest[
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
VerificationTest[
	With[{
			doc = xml[BoxWhiskerChart[{{1, 2, 3, 4, 5, 6}, {2, 3, 4, 5, 6, 7}}]]
		},
		StringCount[doc, "<polyline"] >= 2 &&
		StringCount[doc, "<polygon"] + StringCount[doc, "<rect"] >= 1
	],
	True,
	TestID -> "boxwhisker-serialises"
];
VerificationTest[
	(
		StringCount[xml[SectorChart[{{1, 2}, {3, 4}, {2, 1}}]], "<polygon"] +
		StringCount[xml[SectorChart[{{1, 2}, {3, 4}, {2, 1}}]], "<path"]
	) >=
	3,
	True,
	TestID -> "sectorchart-wedges"
];
VerificationTest[
	StringCount[xml[RectangleChart[{{1, 2}, {3, 4}}]], "<rect"] >= 2,
	True,
	TestID -> "rectanglechart-rects"
];
VerificationTest[
	StringContainsQ[xml[BarChart[{1, 3, 2}]], "currentScript"],
	True,
	TestID -> "barchart-interactive"
];
