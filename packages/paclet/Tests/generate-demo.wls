#!/usr/bin/wolframscript
(* wl-disable-file DocCommentMismatch *)
here = DirectoryName[$InputFileName];
PacletDirectoryLoad[ParentDirectory[here]];
Needs["ToneAr`WebGraphics`"];

(*
 * Share one inlined Three.js across all 3D widgets on the page
 *)
ToneAr`WebGraphics`PackageScope`$wgxInlineRuntime = False;

histogramData =
	Table[Sin[n / 7] + 0.45  Cos[n / 17] + 0.18  Sin[n / 3], {n, 1, 400}];

rasterData =
	Table[
		Rescale[Sin[x / 4]  Cos[y / 5] + x / 36, {-1.5, 1.5}],
		{y, 1, 36},
		{x, 1, 48}
	];

boxWhiskerData =
	Table[
		Table[0.35  group + Sin[n / (2 + group)] + n / 24, {n, 1, 24}],
		{group, 1, 3}
	];

pointSeries = Table[{x, Sin[x / 3] + 0.35  Cos[x / 5]}, {x, 0, 24}];

(* ----------------------------------------------------------------------- *)
examples =
	{
		{
			"Primitives",
			"Point, Line, Arrow, Circle, Disk, Rectangle, Polygon, Text.",
			Graphics[
				{
					Disk[{0, 0}, 0.7],
					Circle[{2, 0}, 0.7],
					Rectangle[{3.4, -0.7}, {4.8, 0.7}],
					Polygon[{{5.5, -0.7}, {7, -0.7}, {6.25, 0.8}}],
					Blue,
					Thick,
					Line[{{0, -1.4}, {7, -1.4}}],
					Red,
					Arrow[{{0, -2}, {7, -2}}],
					Black,
					PointSize[0.03],
					Point[Table[{i, 1.4}, {i, 0, 7}]],
					Text["text", {3.5, 2}]
				},
				PlotRange -> {{-0.9, 7.1}, {-2.3, 2.3}},
				ImageSize -> 320
			]
		},
		{
			"Annuli, sectors & arcs",
			"Annulus, Disk sector and Circle arc primitives.",
			Graphics[
				{
					RGBColor[0.1, 0.55, 0.8],
					Annulus[{0, 0}, {0.45, 1}],
					Orange,
					Disk[{2.4, 0}, 1, {Pi / 6, 5  Pi / 4}],
					Black,
					Thick,
					Circle[{4.8, 0}, 1, {Pi / 4, 7  Pi / 4}],
					Text[Style["ring", 11, Bold], {0, -1.35}],
					Text["sector", {2.4, -1.35}],
					Text["arc", {4.8, -1.35}]
				},
				PlotRange -> {{-1.2, 5.9}, {-1.6, 1.3}},
				ImageSize -> 340
			]
		},
		{
			"Rounded boxes & holes",
			"RoundingRadius plus even-odd Polygon holes.",
			Graphics[
				{
					FaceForm[RGBColor[0.95, 0.72, 0.36]],
					EdgeForm[{Black, AbsoluteThickness[2]}],
					Rectangle[{0, 0}, {2, 1.1}, RoundingRadius -> 0.18],
					FaceForm[RGBColor[0.45, 0.7, 0.38]],
					EdgeForm[{GrayLevel[0.2], Dashed}],
					Polygon[
						{
							{{3, 0}, {5, 0}, {5, 1.6}, {3, 1.6}},
							{{3.6, 0.45}, {4.4, 0.45}, {4.4, 1.15}, {3.6, 1.15}}
						}
					],
					FaceForm[None],
					EdgeForm[{Red, AbsoluteThickness[2]}],
					Rectangle[{0.4, -1.2}, {4.6, -0.35}, RoundingRadius -> {0.08, 0.24}]
				},
				PlotRange -> {{-0.3, 5.3}, {-1.45, 1.85}},
				ImageSize -> 340
			]
		},
		{
			"Arrowheads, caps & joins",
			"Arrowheads, CapForm and JoinForm in stroke serialization.",
			Graphics[
				{
					AbsoluteThickness[6],
					CapForm["Round"],
					JoinForm["Round"],
					RGBColor[0.2, 0.45, 0.75],
					Line[{{0, 0}, {1, 1}, {2, 0}}],
					CapForm["Square"],
					JoinForm["Bevel"],
					RGBColor[0.85, 0.35, 0.25],
					Line[{{0, -1}, {1, 0}, {2, -1}}],
					Black,
					AbsoluteThickness[2],
					Arrowheads[{{0.06, 0.25}, {0.08, 1}}],
					Arrow[{{2.8, -1.1}, {4.2, 1.0}, {5.5, -0.2}}]
				},
				PlotRange -> {{-0.3, 5.8}, {-1.4, 1.3}},
				ImageSize -> 340
			]
		},
		{
			"Geometric transformations",
			"Rotated copies serialized through GeometricTransformation.",
			Graphics[
				Table[
					{
						Opacity[0.62],
						Hue[i / 8],
						GeometricTransformation[
							Disk[{1, 0}, {0.28, 0.72}],
							RotationTransform[i  Pi / 4, {0, 0}]
						]
					},
					{i, 0, 7}
				],
				PlotRange -> {{-1.7, 1.7}, {-1.7, 1.7}},
				ImageSize -> 280
			]
		},
		{
			"Text placement & fonts",
			"Style, Offset and Scaled text placement.",
			Graphics[
				{
					GrayLevel[0.85],
					Line[{{0, 0}, {4, 0}}],
					Red,
					PointSize[0.03],
					Point[{1, 0}],
					Text[
						Style["offset bold", 13, Bold, FontColor -> Red],
						Offset[{0, 18}, {1, 0}],
						{0, -1}
					],
					Text[
						Style["scaled center", 12, Italic, Underlined],
						Scaled[{0.55, 0.68}]
					],
					Darker[Green],
					Text[Style["anchored", 10], {3, -0.45}, {1, 0}]
				},
				PlotRange -> {{0, 4}, {-1, 1}},
				Axes      -> True,
				Ticks     -> {{{1, "one"}, {3, "three"}}, Automatic},
				ImageSize -> 340
			]
		},
		{
			"Inset graphics",
			"Nested Graphics via Inset, positioned inside an outer scene.",
			Graphics[
				{
					GrayLevel[0.9],
					Rectangle[{0, 0}, {4, 2}],
					Inset[
						Graphics[
							{
								RGBColor[0.15, 0.35, 0.75],
								AbsoluteThickness[2],
								Line[Table[{t, 18  Sin[t / 5]}, {t, -24, 24, 2}]],
								Red,
								Disk[{24, 0}, 3]
							},
							PlotRange -> {{-24, 24}, {-20, 20}},
							ImageSize -> 120
						],
						{1.1, 1.1}
					],
					Inset[
						Graphics[
							{Orange, Disk[{0, 0}, 10], Black, Circle[{0, 0}, 10]},
							PlotRange -> {{-12, 12}, {-12, 12}},
							ImageSize -> 80
						],
						{3.2, 0.8}
					]
				},
				PlotRange -> {{0, 4}, {0, 2}},
				ImageSize -> 320
			]
		},
		{
			"Raster image",
			"Raster data embedded as a PNG data URI.",
			Graphics[
				{
					Raster[rasterData, {{0, 0}, {6, 3}}],
					FaceForm[None],
					EdgeForm[{White, AbsoluteThickness[2]}],
					Rectangle[{0, 0}, {6, 3}]
				},
				PlotRange -> {{0, 6}, {0, 3}},
				ImageSize -> 340
			]
		},
		{
			"Tests: Density legend",
			"DensityPlot with VertexColors and an automatic BarLegend.",
			DensityPlot[
				Sin[x]  Sin[y],
				{x, -4, 4},
				{y, -3, 3},
				ColorFunction -> "SunsetColors",
				PlotLegends   -> Automatic,
				ImageSize     -> 360
			]
		},
		{
			"Tests: ArcCsch mesh",
			"DensityPlot with mesh functions over a complex-valued expression.",
			DensityPlot[
				Abs[ArcCsch[x + I  y]],
				{x, -2, 2},
				{y, -2, 2},
				MeshFunctions -> Function @@@ {
					{{x, y, z}, Re[ArcCsch[x + I  y]]},
					{{x, y, z}, Im[ArcCsch[x + I  y]]}
				},
				MeshStyle     -> {Opacity[1 / 3], Opacity[2 / 3]},
				ColorFunction -> "NeonColors",
				PlotLabel     -> ArcCsch,
				Ticks         -> None,
				Mesh          -> 10,
				ImageSize     -> 360
			]
		},
		{
			"Tests: Density row",
			"PlotLayout -> \"Row\" with positioned inset graphics.",
			DensityPlot[
				{Sin[x]  Cos[y], Sin[x + y]  Cos[x - y]},
				{x, -5, 5},
				{y, -5, 5},
				PlotLayout -> "Row",
				ImageSize  -> 520
			]
		},
		{
			"Tests: Exclusions",
			"DensityPlot exclusions and a symbolic plot label.",
			DensityPlot[
				Im[ArcCsch[(x + I  y) ^ 3]],
				{x, -2, 2},
				{y, -2, 2},
				ColorFunction   -> "Pastel",
				ExclusionsStyle -> {None, Purple},
				Mesh            -> None,
				PlotLabel       -> Im[ArcCsch[(x + I  y) ^ 3]],
				Ticks           -> None,
				ImageSize       -> 360
			]
		},
		{
			"Tests: CMYK mesh",
			"DensityPlot with explicit mesh levels and translucent mesh style.",
			DensityPlot[
				Sin[x]  Sin[y],
				{x, -4, 4},
				{y, -3, 3},
				ColorFunction -> "CMYKColors",
				PlotPoints    -> 35,
				MeshFunctions -> {#3&, #3&},
				Mesh          -> {Range[-1, 1, 0.4], Range[-0.8, 0.8, 0.4]},
				MeshStyle     -> Opacity[0.5, Black],
				ImageSize     -> 360
			]
		},
		{
			"Tests: Misc",
			"General",
			RegionPlot[
				x ^ 2 + y ^ 2 < 1,
				{x, -1, 1},
				{y, -1, 1},
				Mesh          -> 10,
				MeshShading   -> {{Automatic, None}, {None, Automatic}},
				ColorFunction -> "DarkRainbow"
			]
		},
		{
			"Colours, opacity & dashing",
			"Bare colours, Opacity, EdgeForm and Dashing.",
			Graphics[
				{
					Red,
					Disk[{0, 0}, 1],
					Opacity[0.5],
					Blue,
					Disk[{1.2, 0}, 1],
					Opacity[1],
					EdgeForm[{Black, Thick, Dashing[{0.04, 0.03}]}],
					FaceForm[LightGreen],
					Rectangle[{2.6, -1}, {4.2, 1}]
				},
				PlotRange -> {{-1.1, 4.3}, {-1.1, 1.1}},
				ImageSize -> 320
			]
		},
		{
			"Gradient fills",
			"LinearGradientFilling and RadialGradientFilling.",
			Graphics[
				{
					LinearGradientFilling[{Yellow, Red, Purple}],
					Disk[{0, 0}, 1],
					RadialGradientFilling[{White, Blue}],
					Disk[{2.4, 0}, 1]
				},
				PlotRange -> {{-1.1, 3.5}, {-1.1, 1.1}},
				ImageSize -> 300
			]
		},
		{
			"VertexColors (Gouraud)",
			"Per-vertex colour interpolated across a polygon.",
			Graphics[
				{
					Polygon[
						{{0, 0}, {2, 0}, {2, 2}, {0, 2}},
						VertexColors -> {Red, Green, Blue, Yellow}
					]
				},
				PlotRange -> {{0, 2}, {0, 2}},
				ImageSize -> 280
			]
		},
		{
			"Curves",
			"BezierCurve and BSplineCurve (sampled).",
			Graphics[
				{
					Thick,
					Blue,
					BezierCurve[{{0, 0}, {1, 2}, {2, -1}, {3, 1}}],
					Red,
					BSplineCurve[{{0, -1.5}, {1, 0.5}, {2, -1.5}, {3, 0.5}}]
				},
				PlotRange -> {{-0.2, 3.2}, {-2, 2.2}},
				ImageSize -> 300
			]
		},
		{
			"Tooltips",
			"Hover a shape to see its label (rich JS tooltip).",
			Graphics[
				{
					Red,
					Tooltip[Disk[{0, 0}, 1], "a red disk"],
					RGBColor[0.2, 0.5, 0.9],
					Tooltip[Rectangle[{1.4, -0.85}, {2.8, 0.85}], "a blue rectangle"]
				},
				PlotRange -> {{-1.1, 2.9}, {-1.1, 1.1}},
				ImageSize -> 300
			]
		},
		{
			"Tooltip with graphic label",
			"Tooltip labels can be rendered from nested Graphics.",
			Graphics[
				{
					Tooltip[
						Disk[{0, 0}, 1],
						Graphics[
							{
								RGBColor[0.2, 0.5, 0.9],
								Disk[{0, 0}, 1],
								White,
								Text[Style["tip", 14, Bold], {0, 0}]
							},
							PlotRange -> {{-1.2, 1.2}, {-1.2, 1.2}},
							ImageSize -> 90
						]
					],
					Black,
					Circle[{0, 0}, 1]
				},
				PlotRange -> {{-1.2, 1.2}, {-1.2, 1.2}},
				ImageSize -> 240
			]
		},
		{
			"Mouseover",
			"Hover to swap the displayed primitive.",
			Graphics[
				{Mouseover[Disk[{0, 0}, 1], Circle[{0, 0}, 1]]},
				PlotRange -> {{-1.1, 1.1}, {-1.1, 1.1}},
				ImageSize -> 240
			]
		},
		{
			"StatusArea",
			"Hover a disk to write to the status line (bottom-left).",
			Graphics[
				{
					Darker[Green],
					StatusArea[Disk[{0, 0}, 0.9], "green disk"],
					Orange,
					StatusArea[Disk[{2.2, 0}, 0.9], "orange disk"]
				},
				PlotRange -> {{-1.1, 3.3}, {-1.1, 1.1}},
				ImageSize -> 300
			]
		},
		{
			"Hyperlinks",
			"Click the disk to open wolfram.com (also tooltipped).",
			Graphics[
				{
					Black,
					Hyperlink[
						Tooltip[Disk[{0, 0}, 1], "click -> wolfram.com"],
						"https://www.wolfram.com"
					]
				},
				PlotRange -> {{-1.1, 1.1}, {-1.1, 1.1}},
				ImageSize -> 240
			]
		},
		{
			"Plot + coordinate readout",
			"Hover the curve: a ball tracks it and shows (x, y).",
			Plot[Sin[x]  Exp[-x / 8], {x, 0, 6  Pi}, ImageSize -> 360]
		},
		{
			"Multiple curves",
			"Coordinate readout picks the curve nearest the cursor.",
			Plot[{Sin[x], Cos[x]}, {x, 0, 2  Pi}, ImageSize -> 360]
		},
		{
			"PlotLabel + AxesLabel",
			"Standard plot title and axis labels, rendered from WL options.",
			Plot[
				Sin[x]  Exp[-x / 8],
				{x, 0, 6  Pi},
				PlotLabel -> Style["Damped sine", 14, Bold],
				AxesLabel -> {x, Sin[x] * Exp[-x / 8]},
				ImageSize -> 380
			]
		},
		{
			"PlotLegends key",
			"PlotLegends produces a LineLegend key beside the plot.",
			Plot[
				{Sin[x], Cos[x], Sin[x]  Cos[x]},
				{x, 0, 2  Pi},
				PlotLabel   -> "Trigonometric functions",
				AxesLabel   -> {"x", "y"},
				PlotLegends -> {"sin x", "cos x", "sin x cos x"},
				ImageSize   -> 380
			]
		},
		{
			"FrameLabel",
			"Frame labels and frame lines from standard WL plot options.",
			Plot[
				Exp[-x]  Sin[6  x],
				{x, 0, 4},
				Frame      -> True,
				Axes       -> False,
				PlotLabel  -> "Framed response",
				FrameLabel -> {"time (s)", "response", "top label", None},
				ImageSize  -> 360
			]
		},
		{
			"Labeled title wrapper",
			"A Labeled plot keeps the outer title wrapper in the export.",
			Labeled[
				Plot[Sin[x ^ 2], {x, 0, 4}, AxesLabel -> {x, Sin[x ^ 2]}],
				"External title",
				Top
			]
		},
		{
			"ListLinePlot",
			"Discrete data with the same hover readout.",
			ListLinePlot[Table[{n, Prime[n]}, {n, 1, 25}], ImageSize -> 340]
		},
		{
			"ListPlot",
			"Point-heavy plot output from ListPlot.",
			ListPlot[
				pointSeries,
				PlotStyle -> RGBColor[0.15, 0.45, 0.75],
				ImageSize -> 340
			]
		},
		{
			"Parametric (Lissajous)",
			"A ParametricPlot curve with coordinate readout.",
			ParametricPlot[{Sin[3  t], Sin[4  t]}, {t, 0, 2  Pi}, ImageSize -> 280]
		},
		{
			"LogPlot",
			"Log-scaled plot output, still using the curve coordinate tool.",
			LogPlot[Exp[-x] + 0.02, {x, 0, 5}, ImageSize -> 340]
		},
		{
			"ContourPlot",
			"Filled contour polygons with frame and labels.",
			ContourPlot[
				Sin[x]  Cos[y],
				{x, -3, 3},
				{y, -3, 3},
				FrameLabel -> {"x", "y"},
				ImageSize  -> 320
			]
		},
		{
			"VectorPlot",
			"Arrow-dense vector field output.",
			VectorPlot[{y, -x}, {x, -2, 2}, {y, -2, 2}, ImageSize -> 320]
		},
		{
			"Bar chart (native)",
			"BarChart via the Charting` constructs; hover a bar to highlight it.",
			BarChart[
				{3, 7, 5, 8, 4, 6, 9, 2},
				ChartLabels -> {"a", "b", "c", "d", "e", "f", "g", "h"},
				ImageSize   -> 340
			]
		},
		{
			"Pie chart (native)",
			"PieChart with hover highlight and click-to-explode wedges.",
			PieChart[
				{30, 22, 18, 15, 10},
				ChartLabels -> {"Apples", "Pears", "Plums", "Cherries", "Figs"},
				ImageSize   -> 280
			]
		},
		{
			"Histogram (native)",
			"Histogram of sampled data.",
			Histogram[histogramData, ImageSize -> 320]
		},
		{
			"Bubble chart (native)",
			"BubbleChart: x, y, and size per point.",
			BubbleChart[
				{{1, 2, 3}, {2, 1, 4}, {3, 4, 1}, {4, 2, 2}},
				ImageSize -> 300
			]
		},
		{
			"Grouped bars + legend",
			"ChartLegends produces a swatch legend beside grouped bars.",
			BarChart[
				{{3, 5, 4}, {2, 4, 7}},
				ChartLayout  -> "Grouped",
				ChartLegends -> {"north", "south"},
				ChartLabels  -> {"Q1", "Q2", "Q3"},
				ImageSize    -> 360
			]
		},
		{
			"BoxWhiskerChart",
			"Box, whisker and median geometry from charting constructs.",
			BoxWhiskerChart[
				boxWhiskerData,
				ChartLabels -> {"alpha", "beta", "gamma"},
				ImageSize   -> 340
			]
		},
		{
			"SectorChart",
			"SectorChart wedges exercise polar chart output.",
			SectorChart[
				{{1, 3}, {2, 5}, {3, 2}, {4, 4}},
				ChartLabels -> {"A", "B", "C", "D"},
				ImageSize   -> 300
			]
		},
		{
			"3D surface (Plot3D)",
			"WebGL via Three.js. Drag to rotate, scroll to zoom, right-drag to pan.",
			Plot3D[Sin[x]  Cos[y], {x, -3, 3}, {y, -3, 3}, ImageSize -> 340]
		},
		{
			"Parametric surface (torus)",
			"A ParametricPlot3D surface rendered in WebGL; drag to orbit.",
			ParametricPlot3D[
				{Cos[u]  (2 + Cos[v]), Sin[u]  (2 + Cos[v]), Sin[v]},
				{u, 0, 2  Pi},
				{v, 0, 2  Pi},
				ImageSize -> 320
			]
		},
		{
			"Revolution surface",
			"A RevolutionPlot3D surface in WebGL.",
			RevolutionPlot3D[Sin[t] + 1.2, {t, 0, 3  Pi}, ImageSize -> 320]
		},
		{
			"Spherical surface",
			"SphericalPlot3D mesh extraction rendered as a WebGL widget.",
			SphericalPlot3D[
				1 + 0.25  Sin[5  theta]  Sin[3  phi],
				{theta, 0, Pi},
				{phi, 0, 2  Pi},
				ImageSize -> 320
			]
		},
		{
			"Explicit 3D polygons",
			"Graphics3D with literal Polygon faces.",
			Graphics3D[
				{
					Polygon[{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}}],
					Polygon[{{0, 0, 0}, {1, 0, 0}, {0, 0, 1}}],
					Polygon[{{0, 0, 0}, {0, 1, 0}, {0, 0, 1}}],
					Polygon[{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}]
				},
				ImageSize -> 300
			]
		}
	};

(* ----------------------------------------------------------------------- *)
css =
	ToneAr`WebGraphics`PackageScope`compactifyCSS @
	Import[
		PacletObject["ToneAr/WebGraphics"]["AssetLocation", "demo.css"],
		"Text"
	]

html =
	XMLTemplate[
		File @
		PacletObject["ToneAr/WebGraphics"]["AssetLocation", "demo.template.html"]
	][
		<|
			"style"    -> StringJoin[ "<style>", css, "</style>"],
			"lib3d"    -> ToneAr`WebGraphics`PackageScope`wgx3DLibraryTag[],
			"examples" -> examples
		|>
	];

out = FileNameJoin[{here, "demo-gallery.html"}];

Export[out, html, "Text", OverwriteTarget -> True];

Print["Wrote ", Length[examples], " examples: ", out];