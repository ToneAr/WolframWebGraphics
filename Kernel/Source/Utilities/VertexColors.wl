(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		footOnLine,
		gouraudTriangle,
		vertexPolygon,
		flatVertexPolygon,
		vertexColorPolygonQ,
		currentTexture,
		texturedPolygonQ,
		texturedPolygonElement,
		axisAlignedRectQ,
		imageDataURI,
		denseVertexColorRunQ,
		denseFilledPolygonLayerQ,
		rasterizedGraphicsElement,
		rasterizedVertexColorElement,
		graphicsComplexVertexColorsExpand,
		vertexLine
	}
];

footOnLine[p_, a_, b_] :=
	With[{ab = b - a}, If[ab . ab == 0, a, a + ((p - a) . ab / (ab . ab))  ab]];

gouraudTriangle[verts : {v1_, v2_, v3_}, cols : {c1_, c2_, c3_}] :=
	(*
	 * One Gouraud triangle: an opaque base (mean colour) + three per-vertex
	 * gradients fading colour -> transparent toward the opposite edge
	 *)
	Module[{
			tris = {{v1, v2, v3}, {v2, v3, v1}, {v3, v1, v2}},
			pts = ptsStr[verts],
			defs = {},
			shapes
		},
		shapes =
			{
				XMLElement[
					"polygon",
					{"points" -> pts, "fill" -> colorToSvg[Blend[cols]]["rgb"]},
					{}
				]
			};
		MapThread[
			Function[
				{tri, col},
				Module[{
						vi = tri[[1]],
						f = footOnLine[tri[[1]], tri[[2]], tri[[3]]],
						gid = uid["vc"],
						c = colorToSvg[col]
					},
					AppendTo[
						defs,
						XMLElement[
							"linearGradient",
							{
								"id" -> gid,
								"gradientUnits" -> "userSpaceOnUse",
								"x1" -> xPx[f[[1]]],
								"y1" -> yPx[f[[2]]],
								"x2" -> xPx[vi[[1]]],
								"y2" -> yPx[vi[[2]]]
							},
							{
								XMLElement[
									"stop",
									{
										"offset" -> "0",
										"stop-color" -> c["rgb"],
										"stop-opacity" -> "0"
									},
									{}
								],
								XMLElement[
									"stop",
									{
										"offset" -> "1",
										"stop-color" -> c["rgb"],
										"stop-opacity" -> "1"
									},
									{}
								]
							}
						]
					];
					AppendTo[
						shapes,
						XMLElement[
							"polygon",
							{"points" -> pts, "fill" -> StringJoin[ "url(#", gid, ")"]},
							{}
						]
					]
				]
			],
			{tris, cols}
		];
		{defs, shapes}
	];

vertexPolygon[pts_, cols_, props_] :=
	Module[{
			tris = Table[{1, i, i + 1}, {i, 2, Length[pts] - 1}],
			defs = {},
			shapes = {}
		},
		Scan[
			Function[
				idx,
				With[{r = gouraudTriangle[pts[[idx]], cols[[idx]]]},
					defs = Join[defs, r[[1]]];
					shapes = Join[shapes, r[[2]]]
				]
			],
			tris
		];
		XMLElement["g", {}, Prepend[shapes, XMLElement["defs", {}, defs]]]
	];

flatVertexPolygon[pts_, cols_, props_] :=
	Module[{c = colorToSvg[Blend[cols]], attrs},
		attrs = {"points" -> ptsStr[pts], "fill" -> c["rgb"]};
		If[c["alpha"] < 1,
			attrs = Append[attrs, "fill-opacity" -> makeSvgNumber[c["alpha"]]]
		];
		XMLElement["polygon", attrs, {}]
	];

vertexColorPolygonQ[Polygon[pts : {{_?NumericQ, _?NumericQ}..}, opts___]] :=
	Module[{
			vc = Lookup[Association[{opts}], VertexColors, None]
		},
		ListQ[vc] && Length[vc] === Length[pts] && AllTrue[vc, colorSpecQ]
	];
vertexColorPolygonQ[_] := False;

denseVertexColorRunQ[run_List] :=
	run =!= {} && AllTrue[run, vertexColorPolygonQ];
denseVertexColorRunQ[_] := False;

vertexColorPolygonsRange[polys_List] :=
	Module[{
			pts = Join @@ Cases[polys, Polygon[p_, ___] :> p],
			xr,
			yr
		},
		If[pts === {},
			Automatic,
			{xr, yr} = MinMax /@ Transpose[N[pts]];
			{xr, yr}
		]
	];

plain2DPolygonQ[Polygon[{{_?NumericQ, _?NumericQ}..}, opts___]] :=
	!MemberQ[{opts}, VertexColors -> _];
plain2DPolygonQ[Polygon[{{{_?NumericQ, _?NumericQ}..}..}, opts___]] :=
	!MemberQ[{opts}, VertexColors -> _];
plain2DPolygonQ[_] := False;

denseFilledPolygonLayerQ[layer_] :=
	Module[{
			polys = Cases[layer, _Polygon, Infinity]
		},
		Length[polys] > 50 &&
		AllTrue[polys, plain2DPolygonQ] &&
		FreeQ[
			layer,
			_Line |
			_Point |
			_Text |
			_Raster |
			_Inset |
			_Circle |
			_Disk |
			_Rectangle |
			_BezierCurve |
			_BSplineCurve |
			_JoinedCurve |
			_FilledCurve |
			_Arrow |
			_Tooltip |
			_Annotation |
			_Mouseover |
			_Hyperlink |
			_StatusArea |
			_Dynamic |
			_DynamicModule |
			_GeometricTransformation |
			_GraphicsComplex |
			_Charting`DelayedMouseEffect |
			_Charting`DelayedClickEffect
		]
	];

rasterStyleItems[props_] /; Head[props] === Internal`Bag :=
	Internal`BagPart[props, All];
rasterStyleItems[props_List] := props;
rasterStyleItems[_] := {};

currentTexture[props_] :=
	Module[{
			textures = Cases[rasterStyleItems[props], _Texture, Infinity]
		},
		If[textures === {}, None, Last[textures]]
	];

texturedPolygonQ[Polygon[_, opts___]] :=
	KeyExistsQ[Association[{opts}], VertexTextureCoordinates];
texturedPolygonQ[_] := False;

firstPolygonContour[pts : {{_?NumericQ, _?NumericQ}..}] := pts;
firstPolygonContour[contours : {{{_?NumericQ, _?NumericQ}..}..}] :=
	First[contours];
firstPolygonContour[_] := $Failed;

firstTextureCoordinateContour[uv : {{_?NumericQ, _?NumericQ}..}] := uv;
firstTextureCoordinateContour[uv : {{{_?NumericQ, _?NumericQ}..}..}] :=
	First[uv];
firstTextureCoordinateContour[_] := $Failed;

closedContourDrop[pts_] /;
	Length[pts] > 1 && Norm[N[First[pts] - Last[pts]]] < 1.*^-6 :=
	Most[pts];
closedContourDrop[pts_] := pts;

axisAlignedRectQ[contour_] :=
	Module[{
			corners = DeleteDuplicates[N[contour], Norm[#1 - #2] < 1.*^-6&]
		},
		Length[corners] === 4 &&
		Length[Union[Round[corners[[All, 1]], 1.*^-6]]] === 2 &&
		Length[Union[Round[corners[[All, 2]], 1.*^-6]]] === 2
	];

rectTextureCoordinatesQ[contour_, uv_] :=
	Module[{
			pts,
			coords,
			xs,
			ys,
			xmin,
			xmax,
			ymin,
			ymax,
			expected
		},
		pts = closedContourDrop[N[contour]];
		coords = closedContourDrop[N[uv]];
		If[Length[pts] =!= Length[coords] || Length[pts] < 4,
			False,
			xs = pts[[All, 1]];
			ys = pts[[All, 2]];
			{xmin, xmax} = MinMax[xs];
			{ymin, ymax} = MinMax[ys];
			If[xmax == xmin || ymax == ymin,
				False,
				expected =
					Function[
						p,
						{(p[[1]] - xmin) / (xmax - xmin), (p[[2]] - ymin) / (ymax - ymin)}
					] /@ pts;
				And @@ MapThread[Norm[#1 - #2] < 1.*^-6&, {coords, expected}]
			]
		]
	];

imageDataURI[img_Image] :=
	StringJoin[
		"data:image/png;base64,",
		StringDelete[ExportString[img, {"Base64", "PNG"}], "\n"]
	];

textureImageNode[img_Image, contour_] :=
	Module[{xs, ys, xmin, xmax, ymin, ymax},
		xs = contour[[All, 1]];
		ys = contour[[All, 2]];
		{xmin, xmax} = MinMax[xs];
		{ymin, ymax} = MinMax[ys];
		XMLElement[
			"image",
			{
				"x"                   -> makeSvgNumber[Min[mapX /@ {xmin, xmax}]],
				"y"                   -> makeSvgNumber[Min[mapY /@ {ymin, ymax}]],
				"width"               -> makeSvgNumber[Abs[mapX[xmax] - mapX[xmin]]],
				"height"              -> makeSvgNumber[Abs[mapY[ymax] - mapY[ymin]]],
				"preserveAspectRatio" -> "none",
				"href"                -> imageDataURI[img]
			},
			{}
		]
	];

polygon2DRange[Polygon[pts_, ___]] := polygon2DRange[pts];
polygon2DRange[pts : {{_?NumericQ, _?NumericQ}..}] :=
	MinMax /@ Transpose[N[pts]];
polygon2DRange[contours : {{{_?NumericQ, _?NumericQ}..}..}] :=
	polygon2DRange[Join @@ contours];
polygon2DRange[_] := Automatic;

rasterizedTexturedPolygonElement[tex_Texture, poly_Polygon, props_] :=
	Module[{range = polygon2DRange[poly]},
		If[range === Automatic,
			Null,
			rasterizedGraphicsImageElement[
				Join[rasterStyleItems[props], {tex, poly}],
				range
			]
		]
	];

texturedPolygonElement[
	Texture[img_Image],
	poly : Polygon[pts_, opts___],
	props_
] :=
	Module[{uv, contour, uvContour},
		uv = Lookup[Association[{opts}], VertexTextureCoordinates, None];
		contour = firstPolygonContour[pts];
		uvContour = firstTextureCoordinateContour[uv];
		If[
			contour =!= $Failed &&
			uvContour =!= $Failed &&
			axisAlignedRectQ[contour] &&
			rectTextureCoordinatesQ[contour, uvContour],
			textureImageNode[img, contour],
			rasterizedTexturedPolygonElement[Texture[img], poly, props]
		]
	];
texturedPolygonElement[tex_Texture, poly_Polygon, props_] :=
	rasterizedTexturedPolygonElement[tex, poly, props];

rasterizedGraphicsElement[prims_, props_] :=
	rasterizedGraphicsImageElement[Join[rasterStyleItems[props], {prims}]];

rasterizedVertexColorElement[polys_List, props_] :=
	rasterizedGraphicsImageElement[
		{EdgeForm[None], polys},
		vertexColorPolygonsRange[polys]
	];

rasterizedGraphicsImageElement[body_] :=
	rasterizedGraphicsImageElement[body, getMapState[][[6]]];
rasterizedGraphicsImageElement[body_, Automatic] := Null;
rasterizedGraphicsImageElement[body_, pr_] :=
	Module[{
			xr,
			yr,
			x,
			y,
			w,
			h,
			size,
			rasterScale,
			rasterSize,
			img,
			b64
		},
		{xr, yr} = N[pr];
		w = Abs[mapX[xr[[2]]] - mapX[xr[[1]]]];
		h = Abs[mapY[yr[[2]]] - mapY[yr[[1]]]];
		If[w <= 0 || h <= 0,
			Null,
			size = Max[1, Round[#]]& /@ {w, h};
			rasterScale = If[Max[size] <= 900, 2, 1];
			rasterSize = rasterScale * size;
			img =
				Rasterize[
					Graphics[
						Style[body, Antialiasing -> False],
						PlotRange        -> pr,
						PlotRangePadding -> None,
						ImagePadding     -> None,
						ImageMargins     -> 0,
						ImageSize        -> rasterSize,
						AspectRatio      -> Full,
						Axes             -> False,
						Frame            -> False,
						Background       -> None
					],
					"Image",
					Background -> None,
					RasterSize -> rasterSize
			];
			If[rasterScale > 1,
				img = ImageResize[img, size, Resampling -> "Nearest"]
			];
			b64 = StringDelete[ExportString[img, {"Base64", "PNG"}], "\n"];
			x = Min[mapX /@ xr];
			y = Min[mapY /@ yr];
			XMLElement[
				"image",
				{
					"x"                   -> makeSvgNumber[x],
					"y"                   -> makeSvgNumber[y],
					"width"               -> makeSvgNumber[w],
					"height"              -> makeSvgNumber[h],
					"preserveAspectRatio" -> "none",
					"href"                -> StringJoin[ "data:image/png;base64,", b64]
				},
				{}
			]
		]
	];

graphicsComplexIndexListQ[inds_, n_] :=
	VectorQ[inds, Function[i, IntegerQ[i] && 1 <= i <= n]];

graphicsComplexNestedIndexListQ[inds_, n_] :=
	ListQ[inds] && AllTrue[inds, graphicsComplexIndexListQ[#, n]&];

graphicsComplexCoordinates[inds_, pts_] /;
	graphicsComplexIndexListQ[inds, Length[pts]] := pts[[inds]];
graphicsComplexCoordinates[inds_, pts_] /;
	graphicsComplexNestedIndexListQ[inds, Length[pts]] :=
	pts[[#]]& /@ inds;
graphicsComplexCoordinates[coords_, _] := coords;

graphicsComplexColorsAt[inds_, cols_] /;
	graphicsComplexIndexListQ[inds, Length[cols]] := cols[[inds]];
graphicsComplexColorsAt[inds_, cols_] /;
	graphicsComplexNestedIndexListQ[inds, Length[cols]] :=
	cols[[#]]& /@ inds;
graphicsComplexColorsAt[_, _] := None;

graphicsComplexVertexColors[inds_, Missing["NotSpecified"], cols_List] :=
	graphicsComplexColorsAt[inds, cols];
graphicsComplexVertexColors[inds_, Automatic, cols_List] :=
	graphicsComplexColorsAt[inds, cols];
graphicsComplexVertexColors[_, None, _] := None;
graphicsComplexVertexColors[_, vc_List, _] := vc;
graphicsComplexVertexColors[_, _, _] := None;

graphicsComplexVertexColorOptions[opts_, None] := opts;
graphicsComplexVertexColorOptions[opts_, cols_] :=
	Append[DeleteCases[opts, VertexColors -> _], VertexColors -> cols];

graphicsComplexPolygonPrimitive[inds_, optList_, pts_, cols_] :=
	Module[{
			vertexColors,
			coordinates
		},
		vertexColors =
			graphicsComplexVertexColors[
				inds,
				Lookup[Association[optList], VertexColors, Missing["NotSpecified"]],
				cols
			];
		coordinates = graphicsComplexCoordinates[inds, pts];
		If[
			graphicsComplexNestedIndexListQ[inds, Length[pts]] &&
			ListQ[vertexColors] &&
			Length[vertexColors] === Length[inds],
			MapThread[
				Function[
					{face, faceColors},
					Polygon[
						face,
						Sequence @@
						graphicsComplexVertexColorOptions[optList, faceColors]
					]
				],
				{coordinates, vertexColors}
			],
			Polygon[
				coordinates,
				Sequence @@ graphicsComplexVertexColorOptions[optList, vertexColors]
			]
		]
	];

graphicsComplexVertexColorPrimitive[Line[inds_, opts___], pts_, cols_] :=
	Module[{
			optList = {opts},
			vc
		},
		vc =
			graphicsComplexVertexColors[
				inds,
				Lookup[Association[optList], VertexColors, Missing["NotSpecified"]],
				cols
			];
		Line[
			graphicsComplexCoordinates[inds, pts],
			Sequence @@ graphicsComplexVertexColorOptions[optList, vc]
		]
	];
graphicsComplexVertexColorPrimitive[Polygon[inds_, opts___], pts_, cols_] :=
	graphicsComplexPolygonPrimitive[inds, {opts}, pts, cols];
graphicsComplexVertexColorPrimitive[BezierCurve[inds_, opts___], pts_, cols_] :=
	Module[{
			optList = {opts},
			vc
		},
		vc =
			graphicsComplexVertexColors[
				inds,
				Lookup[Association[optList], VertexColors, Missing["NotSpecified"]],
				cols
			];
		BezierCurve[
			graphicsComplexCoordinates[inds, pts],
			Sequence @@ graphicsComplexVertexColorOptions[optList, vc]
		]
	];
graphicsComplexVertexColorPrimitive[BSplineCurve[inds_, opts___], pts_, cols_] :=
	Module[{
			optList = {opts},
			vc
		},
		vc =
			graphicsComplexVertexColors[
				inds,
				Lookup[Association[optList], VertexColors, Missing["NotSpecified"]],
				cols
			];
		BSplineCurve[
			graphicsComplexCoordinates[inds, pts],
			Sequence @@ graphicsComplexVertexColorOptions[optList, vc]
		]
	];
graphicsComplexVertexColorPrimitive[Annotation[expr_, rest___], pts_, cols_] :=
	Annotation[graphicsComplexVertexColorPrimitive[expr, pts, cols], rest];
graphicsComplexVertexColorPrimitive[Style[expr_, rest___], pts_, cols_] :=
	Style[graphicsComplexVertexColorPrimitive[expr, pts, cols], rest];
graphicsComplexVertexColorPrimitive[Tooltip[expr_, rest___], pts_, cols_] :=
	Tooltip[graphicsComplexVertexColorPrimitive[expr, pts, cols], rest];
graphicsComplexVertexColorPrimitive[Mouseover[a_, b_, rest___], pts_, cols_] :=
	Mouseover[
		graphicsComplexVertexColorPrimitive[a, pts, cols],
		graphicsComplexVertexColorPrimitive[b, pts, cols],
		rest
	];
graphicsComplexVertexColorPrimitive[StatusArea[expr_, rest___], pts_, cols_] :=
	StatusArea[graphicsComplexVertexColorPrimitive[expr, pts, cols], rest];
graphicsComplexVertexColorPrimitive[Hyperlink[expr_, rest___], pts_, cols_] :=
	Hyperlink[graphicsComplexVertexColorPrimitive[expr, pts, cols], rest];
graphicsComplexVertexColorPrimitive[GraphicsGroup[expr_, rest___], pts_, cols_] :=
	GraphicsGroup[graphicsComplexVertexColorPrimitive[expr, pts, cols], rest];
graphicsComplexVertexColorPrimitive[
	GeometricTransformation[expr_, rest___],
	pts_,
	cols_
] := GeometricTransformation[
	graphicsComplexVertexColorPrimitive[expr, pts, cols],
	rest
];
graphicsComplexVertexColorPrimitive[
	Charting`DelayedMouseEffect[expr_, rest___],
	pts_,
	cols_
] := Charting`DelayedMouseEffect[
	graphicsComplexVertexColorPrimitive[expr, pts, cols],
	rest
];
graphicsComplexVertexColorPrimitive[
	Charting`DelayedClickEffect[expr_, rest___],
	pts_,
	cols_
] := Charting`DelayedClickEffect[
	graphicsComplexVertexColorPrimitive[expr, pts, cols],
	rest
];
graphicsComplexVertexColorPrimitive[prims_List, pts_, cols_] :=
	graphicsComplexVertexColorPrimitive[#, pts, cols]& /@ prims;
graphicsComplexVertexColorPrimitive[prim_, _, _] := prim;

graphicsComplexVertexColorCurveQ[prims_] :=
	!FreeQ[prims, _Line | _BezierCurve | _BSplineCurve];

graphicsComplexVertexColorRelevantQ[prims_, vc_] :=
	graphicsComplexVertexColorCurveQ[prims] &&
	(ListQ[vc] || !FreeQ[prims, HoldPattern[VertexColors -> _]]);

graphicsComplexVertexColorsExpand[
	GraphicsComplex[pts_List, prims_, opts___]
] :=
	Module[{
			cols = Lookup[Association[{opts}], VertexColors, None]
		},
		If[graphicsComplexVertexColorRelevantQ[prims, cols],
			graphicsComplexVertexColorPrimitive[prims, pts, cols],
			$Failed
		]
	];
graphicsComplexVertexColorsExpand[_] := $Failed;

vertexLine[pts_, cols_, props_] :=
	(* VertexColors on a line -> linear gradient along the polyline axis *)
	Module[{
			lens = Accumulate[Norm /@ Differences[pts]],
			total,
			gid = uid["vl"],
			style = getCurrentStyleProps[props, "Stroke"]
		},
		total = If[lens === {} || Last[lens] == 0, 1, Last[lens]];
		XMLElement[
			"g",
			{},
			{
				XMLElement[
					"defs",
					{},
					{
						XMLElement[
							"linearGradient",
							{
								"id" -> gid,
								"gradientUnits" -> "userSpaceOnUse",
								"x1" -> xPx[pts[[1, 1]]],
								"y1" -> yPx[pts[[1, 2]]],
								"x2" -> xPx[pts[[-1, 1]]],
								"y2" -> yPx[pts[[-1, 2]]]
							},
							gradStops[Transpose[{Prepend[lens / total, 0], cols}]]
						]
					}
				],
				XMLElement[
					"polyline",
					Join[
						{"points" -> ptsStr[pts]},
						curveClass[],
						Append[
							DeleteCases[style, ("stroke" -> _)],
							"stroke" -> StringJoin[ "url(#", gid, ")"]
						]
					],
					{}
				]
			}
		]
	];
