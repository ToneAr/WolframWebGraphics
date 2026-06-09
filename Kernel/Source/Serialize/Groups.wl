serialize[{tex_Texture, poly_Polygon}, props_] /; texturedPolygonQ[poly] :=
	texturedPolygonElement[tex, poly, props];
serialize[prims_List, props_] :=
	(*
	 * A bare list is a scoped group of primitives; an all-directive / empty
	 * list contributes nothing (Null) so it is dropped instead of leaving <g/>
	 * noise
	 *)
	Module[{
			scope = forkBag[props],
			kids = {},
			i = 1,
			n = Length[prims],
			run,
			node
		},
		If[denseFilledPolygonLayerQ[prims],
			rasterizedGraphicsElement[prims, props],
			While[
				i <= n,
				If[vertexColorPolygonQ[prims[[i]]],
					run = {};
					While[
						i <= n && vertexColorPolygonQ[prims[[i]]],
						AppendTo[run, prims[[i]]];
						i++
					];
					If[denseVertexColorRunQ[run],
						node = rasterizedVertexColorElement[run, scope];
						If[node =!= Null, AppendTo[kids, node]],
						Scan[
							(
								node = serialize[#, scope];
								If[node =!= Null, AppendTo[kids, node]]
							)&,
							run
						]
					],
					node = serialize[prims[[i]], scope];
					If[node =!= Null, AppendTo[kids, node]];
					i++
				]
			];
			If[kids === {}, Null, XMLElement["g", {}, kids]]
		]
	];
serialize[GraphicsGroup[g_, ___], props_] :=
	Module[{
			polys = Cases[g, p_?vertexColorPolygonQ :> p, Infinity],
			rest,
			kids
		},
		Which[
			denseVertexColorRunQ[polys],
				rest = DeleteCases[g, _?vertexColorPolygonQ, Infinity];
				kids =
					DeleteCases[
						{
							rasterizedVertexColorElement[polys, props],
							serialize[rest, props]
						},
						Null
					];
				Which[
					kids === {},
						Null,
					Length[kids] === 1,
						First[kids],
					True,
						XMLElement["g", {}, kids]
				],
			denseFilledPolygonLayerQ[g],
				rasterizedGraphicsElement[GraphicsGroup[g], props],
			True,
				serialize[If[ListQ[g], g, {g}], props]
		]
	];
serialize[Style[prim_, styles___], props_] :=
	(*
	 * Style[expr, dirs...] scopes the directives to expr; a group-level Opacity
	 * becomes <g opacity> (composited as a whole) rather than per-element alpha
	 *)
	Module[{
			specs = {styles},
			op,
			others,
			scope,
			node
		},
		op = Cases[specs, Opacity[a_] :> a];
		op = If[op === {}, None, Last[op]];
		others = If[op === None, specs, DeleteCases[specs, Opacity[_]]];
		scope = forkBag[props];
		Internal`StuffBag[scope, #]& /@ others;
		node = serialize[prim, scope];
		If[op === None,
			node,
			XMLElement["g", {"opacity" -> makeSvgNumber[op]}, {node}]
		]
	];
serialize[gc_GraphicsComplex, props_] :=
	serialize[First[Normal[Graphics[gc], GraphicsComplex]], props];
serialize[Tooltip[expr_, label_, ___], props_] :=
	(*
	 * Tooltip[expr, label]: hover shows a styled box near the cursor.
	 * Label may be a string/expr (text) or a Graphics (rendered nested).
	 * If the inner expr serializes to Null (empty-geometry hit-area sprite),
	 * return Null rather than placing Null in XMLElement children.
	 *)
	Module[{
			target = serialize[expr, props],
			id = uid["tip"]
		},
		If[target === Null,
			Null,
			(
				$wgxNeedsRuntime = True;
				XMLElement[
					"g",
					{},
					{
						addAttrs[
							target,
							{
								"onmouseover" -> StringJoin[ "wgxShowTooltip(evt,'", id, "')"],
								"onmousemove" -> "wgxMoveTooltip(evt)",
								"onmouseout" -> "wgxHideTooltip()"
							}
						],
						XMLElement[
							"g",
							{"id" -> id, "class" -> "wgx-tip", "display" -> "none"},
							tooltipContent[label]
						]
					}
				]
			)
		]
	];
serialize[Mouseover[default_, hover_, ___], props_] :=
	(
		(*
		 * Mouseover[default, hover]: CSS swaps opacity, keeping the default
		 * hit area
		 *)
		$wgxNeedsRuntime = True;
		XMLElement[
			"g",
			{"class" -> "wgx-mo"},
			{
				XMLElement["g", {"class" -> "wgx-mo-d"}, {serialize[default, props]}],
				XMLElement["g", {"class" -> "wgx-mo-h"}, {serialize[hover, props]}]
			}
		]
	);
serialize[Hyperlink[expr_, uri_, ___], props_] :=
	(* Hyperlink: wrap in <a href> (string/URL targets) *)
	XMLElement[
		"a",
		{"href" -> hrefStr[uri], "target" -> "_blank"},
		{serialize[expr, props]}
	];
serialize[Hyperlink[uri : (_String | _URL), ___], props_] :=
	serialize[Hyperlink[hrefStr[uri], uri], props];
serialize[StatusArea[expr_, label_, ___], props_] :=
	(*
	 * StatusArea[expr, label]: hover writes label into the status text.
	 * If the inner content serializes to Null (e.g. empty-geometry hit-area
	 * sprites produced by charting internals), return Null rather than
	 * embedding Null in XMLElement children (which fires XMLElement::cnts).
	 *)
	Module[{inner = serialize[expr, props]},
		If[inner === Null,
			Null,
			(
				$wgxNeedsRuntime = True;
				XMLElement[
					"g",
					{
						"onmouseover" ->
							StringJoin[
								"wgxSetStatus(evt,'",
								jsEsc[If[StringQ[label], label, ToString[label]]],
								"')"
							],
						"onmouseout" -> "wgxClearStatus(evt)"
					},
					{inner}
				]
			)
		]
	];
serialize[Annotation[expr_, meta_, ___], props_] :=
	(*
	 * Annotation[expr, meta]:
	 * - HighlightElements (Plot's hover-coordinate spec): mark the enclosed
	 *   curve(s) so the JS coordinate tool reads {x,y} off them on hover.
	 * - simple metadata (plain string / number): keep as data-annotation.
	 * - other internal charting metadata (private-context tags, etc.): noise,
	 *   render the content only.
	 *)
	Which[
		highlightAnnotationQ[meta],
			Block[{$wgxCurve = True}, serialize[expr, props]],
		annotationMeaningful[meta],
			With[{inner = serialize[expr, props]},
				If[inner === Null,
					Null,
					XMLElement[
						"g",
						{"data-annotation" -> ToString[meta, InputForm]},
						{inner}
					]
				]
			],
		True,
			serialize[expr, props]
	];
serialize[Inset[g_Graphics, pos_, rest___], props_] :=
	Module[{args = {rest}, posPx, opos, size},
		posPx = insetPositionPx[pos];
		If[MissingQ[posPx],
			Null,
			opos = If[Length[args] >= 1, args[[1]], Center];
			size = If[Length[args] >= 2, args[[2]], Automatic];
			insetGraphic[g, posPx, opos, size]
		]
	];
serialize[Inset[expr_, {x_?NumericQ, y_?NumericQ}, rest___], props_] :=
	textSvg[expr, {x, y}, {0, 0}, props];
