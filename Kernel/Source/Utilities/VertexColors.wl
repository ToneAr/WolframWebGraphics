(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		footOnLine,
		gouraudTriangle,
		vertexPolygon,
			flatVertexPolygon,
			vertexColorPolygonQ,
			denseVertexColorRunQ,
			denseFilledPolygonLayerQ,
			rasterizedGraphicsElement,
			rasterizedVertexColorElement,
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

plain2DPolygonQ[
	Polygon[{{_?NumericQ, _?NumericQ}..}, opts___]
] :=
	!MemberQ[{opts}, VertexColors -> _];
plain2DPolygonQ[
	Polygon[{{{_?NumericQ, _?NumericQ}..}..}, opts___]
] :=
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
			_Line | _Point | _Text | _Raster | _Inset |
			_Circle | _Disk | _Rectangle | _BezierCurve |
			_BSplineCurve | _Arrow | _Tooltip | _Annotation |
			_Mouseover | _Hyperlink | _StatusArea | _Dynamic |
			_DynamicModule | _GeometricTransformation | _GraphicsComplex |
			_Charting`DelayedMouseEffect | _Charting`DelayedClickEffect
		]
	];

rasterStyleItems[props_] /; Head[props] === Internal`Bag :=
	Internal`BagPart[props, All];
rasterStyleItems[props_List] := props;
rasterStyleItems[_] := {};

rasterizedGraphicsElement[prims_, props_] :=
	rasterizedGraphicsImageElement[
		Join[rasterStyleItems[props], {prims}]
	];

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
						PlotRange -> pr,
						PlotRangePadding -> None,
						ImagePadding -> None,
						ImageMargins -> 0,
						ImageSize -> rasterSize,
						AspectRatio -> Full,
						Axes -> False,
						Frame -> False,
						Background -> None
					],
					"Image",
					Background -> None,
					RasterSize -> rasterSize
				];
			If[
				rasterScale > 1,
				img = ImageResize[img, size, Resampling -> "Lanczos"]
			];
			b64 = StringDelete[ExportString[img, {"Base64", "PNG"}], "\n"];
			x = Min[mapX /@ xr];
			y = Min[mapY /@ yr];
			XMLElement[
				"image",
				{
					"x" -> makeSvgNumber[x],
					"y" -> makeSvgNumber[y],
					"width" -> makeSvgNumber[w],
					"height" -> makeSvgNumber[h],
					"preserveAspectRatio" -> "none",
					"href" -> StringJoin[ "data:image/png;base64,", b64]
				},
				{}
			]
		]
	];

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
					{
						"points" -> ptsStr[pts],
						Sequence @@ Append[
							DeleteCases[style, ("stroke" -> _)],
							"stroke" -> StringJoin[ "url(#", gid, ")"]
						]
					},
					{}
				]
			}
		]
	];
