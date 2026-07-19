(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		fan3D,
		colorRGB3D,
		roundFlat3D,
		graphics3DMeshes,
		graphics3DLines,
		graphics3DVolumes,
		allMeshVertices3D,
		allLineVertices3D,
		allVolumeVertices3D,
		allVertices3D,
		size3D,
		viewPoint3D,
		viewVertical3D,
		viewAngle3D,
		boxRatios3D,
		plotRange3D,
		axes3D,
		lights3D
	}
]
(*
 * 2D Graphics stays on the SVG backend (Serialize.wl); 3D goes through here:
 * extract meshes from the GraphicsComplex the kernel produces, emit a <div>
 * hosting a Three.js scene with OrbitControls (drag-rotate / zoom / pan).
 * The Three.js + the OrbitControls and runtime source are inlined so
 * the output is self-contained.
 *)
(* ---- mesh extraction --------------------------------------------------- *)
(*
 * Surface appearance is resolved from the *expression itself*, nothing
 * invented: the primitive tree is walked with a directive stack honouring
 * Wolfram's lexical scoping (a directive colours the primitives that follow
 * it; nested lists inherit but don't leak), so colour / Opacity / Specularity
 * / Glow / Texture each reach the polygons they actually apply to. Primitives
 * are grouped by resolved material into one mesh each; VertexColors stays
 * per-vertex. A surface with no colour gets none (Null) -- the runtime then
 * shows a neutral diffuse lit by the derived lights, never an invented colour.
 *)
fan3D[f_] := Table[{f[[1]], f[[i]], f[[i + 1]]}, {i, 2, Length[f] - 1}];

colorRGB3D[c_] := (List @@ ColorConvert[normalizeColorSpec[c], "RGB"])[[1;;3]];

roundFlat3D[a_] := Flatten[Round[N[a], 1.*^-4]];

roundColor3D[Null] := Null;
roundColor3D[c_] := Round[N[c], 1.*^-4];

(* a colour spec, or a bare number (Specularity gray), -> {r,g,b}; else Null *)
toRGB3D[c_] := colorRGB3D[c] /; colorSpecQ[c];
toRGB3D[n_?NumericQ] := {N[n], N[n], N[n]};
toRGB3D[_] := Null;

(* ---- directive-scoped style threading ---------------------------------- *)
$textureProjectionMappings3D =
	{Automatic, None, "Box", "Cubic", "Cylindrical", "Front", "Planar", "Spherical"};

textureProjectionQ3D[map_] := MemberQ[$textureProjectionMappings3D, map];

textureImage3D[img_Image] := img;
textureImage3D[data_List] /;
	1 <= ArrayDepth[data] <= 3 && ArrayQ[data, _, NumericQ] := Image[data];
textureImage3D[obj_] := Rasterize[obj];

textureSpec3D[obj_, map_] :=
	Module[{img = textureImage3D[obj]},
		If[ImageQ[img] && textureProjectionQ3D[map],
			<|"image" -> img, "mapping" -> map|>,
			Null
		]
	];

materialTextureSpec3D[Texture[obj_]] := textureSpec3D[obj, Automatic];
materialTextureSpec3D[Texture[obj_, map_]] := textureSpec3D[obj, map];
materialTextureSpec3D[_] := Null;

textureImageFromStyle3D[st_] :=
	If[AssociationQ[st["texture"]], st["texture"]["image"], Null];

normalTextureImageFromStyle3D[st_] :=
	If[AssociationQ[st["normalTexture"]], st["normalTexture"]["image"], Null];

textureMappingFromStyle3D[st_] :=
	If[AssociationQ[st["texture"]], st["texture"]["mapping"], None];

withTextureMapping3D[st_, Missing[]] := st;
withTextureMapping3D[st_, map_?textureProjectionQ3D] :=
	If[AssociationQ[st["texture"]],
		Join[st, <|"texture" -> Join[st["texture"], <|"mapping" -> map|>]|>],
		st
	];
withTextureMapping3D[st_, _] := st;

automaticTextureMapping3D[st_, map_] :=
	If[textureMappingFromStyle3D[st] === Automatic,
		withTextureMapping3D[st, map],
		st
	];

primitiveTextureMappingOption3D[e_] :=
	Lookup[Association[Cases[Rest[List @@ e], _Rule | _RuleDelayed]],
		TextureMapping, Missing[]];

primitiveAutomaticTextureMapping3D[_Sphere | _Ball | _Ellipsoid] := "Spherical";
primitiveAutomaticTextureMapping3D[_Cylinder | _Cone] := "Cylindrical";
primitiveAutomaticTextureMapping3D[_Cuboid | _Cube] := "Box";
primitiveAutomaticTextureMapping3D[_] := "Planar";

(* Wolfram draws a thin black border on every polygon / mesh primitive by
   default; EdgeForm[] or EdgeForm[None] turns it off, EdgeForm[spec] restyles
   it. The default colour is the kernel's own black, not an invented one. *)
$edgeDefault3D =
	<|"show" -> True, "color" -> {0., 0., 0.}, "opacity" -> Null, "width" -> Null|>;
$edgeOff3D = Join[$edgeDefault3D, <|"show" -> False|>];

$defaultStyle3D =
	<|
		"color"     -> Null,
		"opacity"   -> Null,
		"specular"  -> Null,
		"shininess" -> Null,
		"emissive"      -> Null,
		"texture"       -> Null,
		"normalTexture" -> Null,
		"pbr"           -> Null,
		"thickness"     -> Null,
		"dashing"   -> Null,
		"edge"      -> $edgeDefault3D
	|>;

directiveQ3D[Directive[___]] := True;
directiveQ3D[Opacity[___]] := True;
directiveQ3D[Specularity[___]] := True;
directiveQ3D[Glow[___]] := True;
directiveQ3D[FaceForm[___]] := True;
directiveQ3D[EdgeForm[___]] := True;
directiveQ3D[Texture[___]] := True;
directiveQ3D[MaterialShading[_Association]] := True;
directiveQ3D[Thickness[___] | AbsoluteThickness[___]] := True;
directiveQ3D[PointSize[___] | AbsolutePointSize[___]] := True;
directiveQ3D[Dashing[___] | AbsoluteDashing[___]] := True;
directiveQ3D[e_] := colorSpecQ[e];

applyDirective3D[st_, Directive[ds___]] := Fold[applyDirective3D, st, {ds}];
applyDirective3D[st_, Opacity[a_?NumericQ]] := Join[st, <|"opacity" -> N[a]|>];
applyDirective3D[st_, Opacity[a_?NumericQ, c_?colorSpecQ]] :=
	Join[st, <|"opacity" -> N[a], "color" -> colorRGB3D[c]|>];
applyDirective3D[st_, Specularity[s_]] :=
	Join[st, <|"specular" -> toRGB3D[s]|>];
applyDirective3D[st_, Specularity[s_, n_?NumericQ]] :=
	Join[st, <|"specular" -> toRGB3D[s], "shininess" -> N[n]|>];
applyDirective3D[st_, Glow[c_]] := Join[st, <|"emissive" -> toRGB3D[c]|>];
applyDirective3D[st_, Glow[]] := Join[st, <|"emissive" -> Null|>];
applyDirective3D[st_, FaceForm[c_?colorSpecQ, ___]] :=
	Join[st, <|"color" -> colorRGB3D[c]|>];
applyDirective3D[st_, EdgeForm[]] := Join[st, <|"edge" -> $edgeOff3D|>];
applyDirective3D[st_, EdgeForm[None]] := Join[st, <|"edge" -> $edgeOff3D|>];
applyDirective3D[st_, EdgeForm[specs__]] :=
	Join[st, <|"edge" -> resolveEdgeForm3D[{specs}]|>];
applyDirective3D[st_, Texture[obj_]] :=
	Join[st, <|"texture" -> textureSpec3D[obj, Automatic]|>];
applyDirective3D[st_, Texture[obj_, map_]] :=
	Join[st, <|"texture" -> textureSpec3D[obj, map]|>];
applyDirective3D[st_, MaterialShading[params_Association]] :=
	Module[{baseColor, baseTexture, normalTexture, emissionColor, pbr},
		baseColor = Lookup[params, "BaseColor", White];
		baseTexture = materialTextureSpec3D[baseColor];
		If[baseTexture =!= Null, baseColor = Null];
		normalTexture = materialTextureSpec3D[
			Lookup[params, "SurfaceNormals", None]
		];
		emissionColor = toRGB3D[Lookup[params, "EmissionColor", Black]];
		pbr = <|
			"roughness" -> Replace[
				Lookup[params, "RoughnessCoefficient", 1],
				{x_?NumericQ :> N[x], _ -> Null}
			],
			"metalness" -> Replace[
				Lookup[params, "MetallicCoefficient", 0],
				{x_?NumericQ :> N[x], _ -> Null}
			],
			"emissive" -> emissionColor
		|>;
		Join[
			st,
			<|
				"color" -> toRGB3D[baseColor],
				"opacity" -> Null,
				"specular" -> Null,
				"shininess" -> Null,
				"emissive" -> Null,
				"texture" -> baseTexture,
				"normalTexture" -> normalTexture,
				"pbr" -> pbr
			|>
		]
	];
applyDirective3D[st_, Thickness[w_?NumericQ]] :=
	Join[st, <|"thickness" -> N[w]|>];
applyDirective3D[st_, AbsoluteThickness[w_?NumericQ]] :=
	Join[st, <|"thickness" -> N[w]|>];
applyDirective3D[st_, Dashing[d_]] :=
	Join[st, <|"dashing" -> N[Flatten[{d}]]|>];
applyDirective3D[st_, AbsoluteDashing[d_]] :=
	Join[st, <|"dashing" -> N[Flatten[{d}]]|>];
applyDirective3D[st_, c_?colorSpecQ] :=
	With[{a = colorToSvg[c]["alpha"]},
		If[NumericQ[a] && a < 1,
			Join[st, <|"color" -> colorRGB3D[c], "opacity" -> N[a]|>],
			Join[st, <|"color" -> colorRGB3D[c]|>]
		]
	];
applyDirective3D[st_, _] := st;

(* fold an EdgeForm's inner directives onto a fresh (shown, black) edge style.
   Recurses Directive / nested lists like applyDirective3D; colour, Opacity and
   Thickness are the edge appearance the runtime renders. *)
applyEdgeDirective3D[e_, Directive[ds___]] := Fold[applyEdgeDirective3D, e, {ds}];
applyEdgeDirective3D[e_, l_List] := Fold[applyEdgeDirective3D, e, l];
applyEdgeDirective3D[e_, Opacity[a_?NumericQ]] := Join[e, <|"opacity" -> N[a]|>];
applyEdgeDirective3D[e_, Opacity[a_?NumericQ, c_?colorSpecQ]] :=
	Join[e, <|"opacity" -> N[a], "color" -> colorRGB3D[c]|>];
applyEdgeDirective3D[e_, Thickness[w_?NumericQ]] := Join[e, <|"width" -> N[w]|>];
applyEdgeDirective3D[e_, AbsoluteThickness[w_?NumericQ]] := Join[e, <|"width" -> N[w]|>];
applyEdgeDirective3D[e_, c_?colorSpecQ] :=
	With[{a = colorToSvg[c]["alpha"]},
		If[NumericQ[a] && a < 1,
			Join[e, <|"color" -> colorRGB3D[c], "opacity" -> N[a]|>],
			Join[e, <|"color" -> colorRGB3D[c]|>]
		]
	];
applyEdgeDirective3D[e_, _] := e;

resolveEdgeForm3D[specs_List] := Fold[applyEdgeDirective3D, $edgeDefault3D, specs];

(* walk the primitive tree -> flat list of records, each <|kind, .., style|> *)
collect3D[l_List, st_] :=
	Module[{cur = st, acc = {}},
		Scan[
			Function[
				e,
				If[directiveQ3D[e],
					cur = applyDirective3D[cur, e],
					acc = Join[acc, collect3D[e, cur]]
				]
			],
			l
		];
		acc
	];
collect3D[Style[e_, ds___], st_] :=
	collect3D[e, Fold[applyDirective3D, st, {ds}]];
collect3D[
	(GraphicsGroup | Annotation | Tooltip | Rotate | Translate)[e_, ___],
	st_
] :=
	collect3D[e, st];
collect3D[gc_GraphicsComplex, st_] :=
	{<|"kind" -> "gc", "gc" -> gc, "style" -> st|>};
collect3D[r_Raster3D, st_] :=
	{<|"kind" -> "raster3d", "expr" -> r, "style" -> st|>};
indexedPolygonFaces3D[faces : {{__Integer}..}] := faces;
indexedPolygonFaces3D[face : {__Integer}] := {face};
indexedPolygonFaces3D[_] := {};

collect3D[
	Polygon[
		verts : {{_?NumericQ, _?NumericQ, _?NumericQ}..},
		faces : ({{__Integer}..} | {__Integer}),
		opts___
	],
	st_
] :=
	{<|
		"kind" -> "polyindexed",
		"verts" -> verts,
		"faces" -> indexedPolygonFaces3D[faces],
		"opts" -> {opts},
		"style" -> withTextureMapping3D[st, primitiveTextureMappingOption3D[
			Polygon[verts, faces, opts]
		]]
	|>};
collect3D[
	Polygon[pts : {{_?NumericQ, _?NumericQ, _?NumericQ}..}, opts___],
	st_
] :=
	{<|
		"kind" -> "poly",
		"pts" -> pts,
		"opts" -> {opts},
		"style" -> withTextureMapping3D[st, primitiveTextureMappingOption3D[
			Polygon[pts, opts]
		]]
	|>};
collect3D[Line[pts : {{_?NumericQ, _?NumericQ, _?NumericQ}..}, opts___], st_] :=
	{<|"kind" -> "line", "paths" -> {pts}, "opts" -> {opts}, "style" -> st|>};
collect3D[
	Line[pts : {{{_?NumericQ, _?NumericQ, _?NumericQ}..}..}, opts___],
	st_
] :=
	{<|"kind" -> "line", "paths" -> pts, "opts" -> {opts}, "style" -> st|>};
collect3D[e_?meshPrimitiveQ3D, st_] :=
	{<|
		"kind" -> "meshprim",
		"expr" -> e,
		"style" -> withTextureMapping3D[st, primitiveTextureMappingOption3D[e]]
	|>};
collect3D[_, _] := {};

$meshPrimitiveHeads3D =
	{
		Sphere,
		Ball,
		Ellipsoid,
		Cuboid,
		Cylinder,
		Cone,
		Tube,
		Torus,
		CapsuleShape,
		Simplex,
		Tetrahedron,
		Prism,
		Cube
	};

meshPrimitiveQ3D[e_] := MemberQ[$meshPrimitiveHeads3D, Head[e]];

(* the appearance fields that decide whether two primitives share a mesh *)
materialKey3D[st_] :=
	{
		st["color"],
		st["opacity"],
		st["specular"],
		st["shininess"],
		st["emissive"],
		st["texture"],
		st["normalTexture"],
		st["pbr"],
		st["edge"]
	};

(* the resolved edge style -> the runtime form (Null when the border is off) *)
edgeEmit3D[edge_Association] :=
	If[TrueQ[edge["show"]],
		<|
			"color"   -> roundColor3D[edge["color"]],
			"opacity" -> edge["opacity"],
			"width"   -> edge["width"]
		|>,
		Null
	];
edgeEmit3D[_] := Null;

(* fold the resolved material onto a geometry assoc; colour only when asked
   (per-vertex / textured meshes carry no uniform colour) *)
meshAssoc3D[base_, st_, applyColor_] :=
	Join[
		base,
		<|
			"color"     -> If[TrueQ[applyColor] && st["color"] =!= Null,
				roundColor3D[st["color"]],
				Null
			],
			"opacity"   -> st["opacity"],
			"specular"  -> roundColor3D[st["specular"]],
			"shininess" -> st["shininess"],
			"emissive"  -> roundColor3D[st["emissive"]],
			"ntex"      -> Replace[
				normalTextureImageFromStyle3D[st],
				img_Image :> imageDataURI[img],
				{0}
			],
			"pbr"       -> st["pbr"],
			"edge"      -> edgeEmit3D[st["edge"]]
		|>
	];

(* ---- literal Polygon[{coords..}] groups (no GraphicsComplex) ----------- *)
trianglesFromPolygon3D[poly_Polygon] :=
	Cases[
		Quiet @ Check[PolygonDecomposition[poly, "Triangle"], {}],
		Polygon[p : {{_?NumericQ, _?NumericQ, _?NumericQ}..}, ___] /;
			Length[p] == 3 :> p,
		Infinity
	];

literalPolygonTriangles[
	Polygon[pts : {{_?NumericQ, _?NumericQ, _?NumericQ}..}, ___]
] :=
	If[Length[pts] >= 3, fan3D[pts], {}];
literalPolygonTriangles[_] := {};

literalPolygonUVTriangles[
	Polygon[pts : {{_?NumericQ, _?NumericQ, _?NumericQ}..}, opts___]
] :=
	Module[{
			uv = Lookup[Association[{opts}], VertexTextureCoordinates, None]
		},
		If[
			MatchQ[uv, {{_?NumericQ, _?NumericQ}..}] &&
			Length[uv] === Length[pts] &&
			Length[uv] >= 3,
			fan3D[uv],
			{}
		]
	];
literalPolygonUVTriangles[_] := {};

polyGroupMesh3D[recs_] :=
	Module[{
			st = automaticTextureMapping3D[recs[[1]]["style"], "Planar"],
			tex,
			mapping,
			tris,
			verts,
			uvTris,
			uv,
			hasTexture
		},
		tex = textureImageFromStyle3D[st];
		mapping = textureMappingFromStyle3D[st];
		If[tex =!= Null,
			tris = Join @@ (literalPolygonTriangles[Polygon[#["pts"]]]& /@ recs);
			uvTris =
				Join @@ (
					literalPolygonUVTriangles[
						Polygon[#["pts"], Sequence @@ #["opts"]]
					]& /@ recs
				);
			verts = If[tris === {}, {}, Join @@ tris];
			uv = If[uvTris === {}, {}, Join @@ uvTris];
			hasTexture =
				verts =!= {} &&
				(Length[uv] === Length[verts] || mapping =!= None);
			meshAssoc3D[
				<|
					"pos"  -> roundFlat3D[verts],
					"norm" -> Null,
					"col"  -> Null,
					"uv"   -> If[Length[uv] === Length[verts], roundFlat3D[uv], Null],
					"tex"  -> If[hasTexture, imageDataURI[tex], Null],
					"map"  -> If[hasTexture && Length[uv] =!= Length[verts], mapping, Null],
					"idx"  -> Range[0, Length[verts] - 1]
				|>,
				st,
				!hasTexture
			],
			tris = Join @@ (trianglesFromPolygon3D /@ (Polygon[#["pts"]]& /@ recs));
			verts = If[tris === {}, {}, Join @@ tris];
			meshAssoc3D[
				<|
					"pos"  -> roundFlat3D[verts],
					"norm" -> Null,
					"col"  -> Null,
					"uv"   -> Null,
					"tex"  -> Null,
					"map"  -> Null,
					"idx"  -> Range[0, Length[verts] - 1]
				|>,
				st,
				True
			]
		]
	];

polyMeshes3D[{}] := {};
polyMeshes3D[recs_List] :=
	polyGroupMesh3D /@ GatherBy[recs, materialKey3D[#["style"]]&];

indexedPolygonTriangles3D[verts_, faces_] :=
	Module[{tris},
		If[!AllTrue[Flatten[faces], gcVertexIndexQ3D[verts, #]&], Return[{}]];
		tris = Join @@ (fan3D /@ faces);
		verts[[Flatten[tris]]]
	];

indexedPolygonUVTriangles3D[verts_, faces_, opts_] :=
	Module[{uv, tris},
		uv = Lookup[Association[opts], VertexTextureCoordinates, None];
		tris = Join @@ (fan3D /@ faces);
		Which[
			MatchQ[uv, {{_?NumericQ, _?NumericQ}..}] && Length[uv] === Length[verts],
				uv[[Flatten[tris]]],
			MatchQ[uv, {{{_?NumericQ, _?NumericQ}..}..}] &&
				Length[uv] === Length[faces] && Length /@ uv === Length /@ faces,
				Join @@ (Join @@ (fan3D /@ uv)),
			True,
				{}
		]
	];

indexedPolyGroupMesh3D[recs_] :=
	Module[{st, tex, mapping, verts, uv, hasTexture},
		st = automaticTextureMapping3D[recs[[1]]["style"], "Planar"];
		tex = textureImageFromStyle3D[st];
		mapping = textureMappingFromStyle3D[st];
		verts = Join @@ (
			indexedPolygonTriangles3D[#["verts"], #["faces"]]& /@ recs
		);
		uv = Join @@ (
			indexedPolygonUVTriangles3D[#["verts"], #["faces"], #["opts"]]& /@ recs
		);
		hasTexture =
			tex =!= Null && verts =!= {} &&
			(Length[uv] === Length[verts] || mapping =!= None);
		meshAssoc3D[
			<|
				"pos"  -> roundFlat3D[verts],
				"norm" -> Null,
				"col"  -> Null,
				"uv"   -> If[Length[uv] === Length[verts], roundFlat3D[uv], Null],
				"tex"  -> If[hasTexture, imageDataURI[tex], Null],
				"map"  -> If[hasTexture && Length[uv] =!= Length[verts], mapping, Null],
				"idx"  -> Range[0, Length[verts] - 1]
			|>,
			st,
			!hasTexture
		]
	];

indexedPolyMeshes3D[{}] := {};
indexedPolyMeshes3D[recs_List] :=
	indexedPolyGroupMesh3D /@ GatherBy[recs, materialKey3D[#["style"]]&];

(* ---- GraphicsComplex groups (shared vertex pool) ----------------------- *)
gcFacesOf3D[f : {{__Integer}..}] := f;
gcFacesOf3D[f : {__Integer}] := {f};
gcFacesOf3D[_] := {};

collectGCFaces3D[l_List, st_] :=
	Module[{cur = st, acc = {}},
		Scan[
			Function[
				e,
				If[directiveQ3D[e],
					cur = applyDirective3D[cur, e],
					acc = Join[acc, collectGCFaces3D[e, cur]]
				]
			],
			l
		];
		acc
	];
collectGCFaces3D[Style[e_, ds___], st_] :=
	collectGCFaces3D[e, Fold[applyDirective3D, st, {ds}]];
collectGCFaces3D[
	(GraphicsGroup | Annotation | Tooltip | Rotate | Translate)[e_, ___],
	st_
] :=
	collectGCFaces3D[e, st];
collectGCFaces3D[Polygon[f_, opts___], st_] :=
	{<|
		"faces" -> gcFacesOf3D[f],
		"style" -> withTextureMapping3D[st, primitiveTextureMappingOption3D[
			Polygon[f, opts]
		]]
	|>};
collectGCFaces3D[_, _] := {};

gcVertexIndexQ3D[verts_, i_Integer] :=
	1 <= i <= Length[verts] &&
	MatchQ[verts[[i]], {_?NumericQ, _?NumericQ, _?NumericQ}];

gcResolveCoordSpec3D[verts_, inds : {__Integer}] /;
	AllTrue[inds, gcVertexIndexQ3D[verts, #]&] :=
	verts[[inds]];
gcResolveCoordSpec3D[verts_, i_Integer] /; gcVertexIndexQ3D[verts, i] :=
	verts[[i]];
gcResolveCoordSpec3D[_, p : {_?NumericQ, _?NumericQ, _?NumericQ}] := p;
gcResolveCoordSpec3D[verts_, l_List] := gcResolveCoordSpec3D[verts, #]& /@ l;
gcResolveCoordSpec3D[_, p_] := p;

gcResolvePrimitive3D[verts_, Cuboid[p_, q_]] :=
	Cuboid[gcResolveCoordSpec3D[verts, p], gcResolveCoordSpec3D[verts, q]];
gcResolvePrimitive3D[verts_, Cuboid[p_]] :=
	Cuboid[gcResolveCoordSpec3D[verts, p]];
gcResolvePrimitive3D[verts_, e : h_[p_, rest___]] /;
	MemberQ[DeleteCases[$meshPrimitiveHeads3D, Cuboid], h] :=
	h[gcResolveCoordSpec3D[verts, p], rest];
gcResolvePrimitive3D[_, e_] := e;

collectGCPrimitives3D[l_List, verts_, st_] :=
	Module[{cur = st, acc = {}},
		Scan[
			Function[
				e,
				If[directiveQ3D[e],
					cur = applyDirective3D[cur, e],
					acc = Join[acc, collectGCPrimitives3D[e, verts, cur]]
				]
			],
			l
		];
		acc
	];
collectGCPrimitives3D[Style[e_, ds___], verts_, st_] :=
	collectGCPrimitives3D[e, verts, Fold[applyDirective3D, st, {ds}]];
collectGCPrimitives3D[
	(GraphicsGroup | Annotation | Tooltip | Rotate | Translate)[e_, ___],
	verts_,
	st_
] :=
	collectGCPrimitives3D[e, verts, st];
collectGCPrimitives3D[e_?meshPrimitiveQ3D, verts_, st_] :=
	{
		<|
			"kind"  -> "meshprim",
			"expr"  -> gcResolvePrimitive3D[verts, e],
			"style" -> withTextureMapping3D[st, primitiveTextureMappingOption3D[e]]
		|>
	};
collectGCPrimitives3D[_, _, _] := {};

gcGroupMesh3D[group_, verts_, normFlat_, uv_] :=
	Module[{
			st = automaticTextureMapping3D[group[[1]]["style"], "Planar"],
			faces,
			tris,
			tex,
			mapping,
			explicitUV,
			hasTexture
		},
		faces = Join @@ (#["faces"]& /@ group);
		tris = Join @@ (fan3D /@ faces);
		tex = textureImageFromStyle3D[st];
		mapping = textureMappingFromStyle3D[st];
		explicitUV =
			MatchQ[uv, {{_?NumericQ, _?NumericQ}..}] &&
				Length[uv] === Length[verts];
		hasTexture = tex =!= Null && (explicitUV || mapping =!= None);
		meshAssoc3D[
			<|
				"pos"  -> roundFlat3D[verts],
				"norm" -> normFlat,
				"col"  -> Null,
				"uv"   -> If[explicitUV, roundFlat3D[uv], Null],
				"tex"  -> If[hasTexture, imageDataURI[tex], Null],
				"map"  -> If[hasTexture && !explicitUV, mapping, Null],
				"idx"  -> Flatten[tris - 1]
			|>,
			st,
			!hasTexture
		]
	];

(* a GraphicsComplex's OWN option (VertexColors / VertexNormals / ...), read
   only from its option args -- never from VertexColors nested inside the
   complex's Line/Polygon primitives (e.g. mesh lines of a ColorFunction plot) *)
gcOption3D[gc_, opt_] :=
	FirstCase[Drop[List @@ gc, 2], (opt -> v_) :> v, None, Infinity];

meshFromGC3D[gc_, outerStyle_] :=
	Module[{
			verts = gc[[1]],
			norms = gcOption3D[gc, VertexNormals],
			vcol = gcOption3D[gc, VertexColors],
			uv = gcOption3D[gc, VertexTextureCoordinates],
			normFlat,
			faceRecs,
			primitiveRecs,
			faceMeshes,
			allFaces,
			tris,
			vstyle
		},
		normFlat = If[norms === None, Null, roundFlat3D[norms]];
		faceRecs = collectGCFaces3D[gc[[2]], outerStyle];
		primitiveRecs = collectGCPrimitives3D[gc[[2]], verts, outerStyle];
		faceMeshes =
			If[faceRecs === {},
				{},
				If[
					vcol =!= None && AllTrue[vcol, colorSpecQ],
					(* VertexColors wins -> single per-vertex-coloured mesh *)
					allFaces = Join @@ (#["faces"]& /@ faceRecs);
					tris = Join @@ (fan3D /@ allFaces);
					vstyle = If[faceRecs === {}, outerStyle, faceRecs[[1]]["style"]];
					{
						meshAssoc3D[
							<|
								"pos"  -> roundFlat3D[verts],
								"norm" -> normFlat,
								"col"  -> roundFlat3D[colorRGB3D /@ vcol],
								"uv"   -> Null,
								"tex"  -> Null,
								"idx"  -> Flatten[tris - 1]
							|>,
							vstyle,
							False
						]
					},
					(* else one mesh per resolved material, sharing the vertex pool *)
					gcGroupMesh3D[#, verts, normFlat, uv]& /@ GatherBy[
						faceRecs,
						materialKey3D[#["style"]]&
					]
				]
			];
		Join[faceMeshes, meshPrimitiveMeshes3D[primitiveRecs]]
	];

(* ---- line primitive groups -------------------------------------------- *)
lineOption3D[opts_, opt_] :=
	Lookup[Association[Cases[opts, _Rule | _RuleDelayed]], opt, None];

linePathSegmentEndpoints3D[path_] :=
	If[Length[path] >= 2, Join @@ Partition[path, 2, 1], {}];

lineSegmentEndpoints3D[{}] := {};
lineSegmentEndpoints3D[paths_List] :=
	Join @@ (linePathSegmentEndpoints3D /@ paths);

lineVertexColors3D[paths_, opts_] :=
	Module[{vcol, counts, colors},
		vcol = lineOption3D[opts, VertexColors];
		counts = Length /@ paths;
		If[!MatchQ[vcol, {__?colorSpecQ}] || Length[vcol] =!= Total[counts],
			Null,
			colors = TakeList[colorRGB3D /@ vcol, counts];
			roundFlat3D[lineSegmentEndpoints3D[colors]]
		]
	];

lineAssoc3D[paths_, opts_, st_] :=
	Module[{verts, colors},
		verts = lineSegmentEndpoints3D[paths];
		If[verts === {},
			Null,
			colors = lineVertexColors3D[paths, opts];
			<|
				"pos"     -> roundFlat3D[verts],
				"col"     -> colors,
				"color"   -> If[colors === Null, roundColor3D[st["color"]], Null],
				"opacity" -> st["opacity"],
				"width"   -> st["thickness"],
				"dashing" -> st["dashing"]
			|>
		]
	];

lineFromLiteral3D[rec_] := lineAssoc3D[rec["paths"], rec["opts"], rec["style"]];

collectGCLines3D[l_List, st_] :=
	Module[{cur = st, acc = {}},
		Scan[
			Function[
				e,
				If[directiveQ3D[e],
					cur = applyDirective3D[cur, e],
					acc = Join[acc, collectGCLines3D[e, cur]]
				]
			],
			l
		];
		acc
	];
collectGCLines3D[Style[e_, ds___], st_] :=
	collectGCLines3D[e, Fold[applyDirective3D, st, {ds}]];
collectGCLines3D[
	(GraphicsGroup | Annotation | Tooltip | Rotate | Translate)[e_, ___],
	st_
] :=
	collectGCLines3D[e, st];
collectGCLines3D[Line[p_, opts___], st_] :=
	{<|"paths" -> p, "opts" -> {opts}, "style" -> st|>};
collectGCLines3D[_, _] := {};

gcLineCoordPaths3D[verts_, inds : {__Integer}] /;
	AllTrue[inds, gcVertexIndexQ3D[verts, #]&] :=
	{verts[[inds]]};
gcLineCoordPaths3D[verts_, paths : {{__Integer}..}] /;
	AllTrue[Flatten[paths], gcVertexIndexQ3D[verts, #]&] :=
	verts[[#]]& /@ paths;
gcLineCoordPaths3D[_, pts : {{_?NumericQ, _?NumericQ, _?NumericQ}..}] := {pts};
gcLineCoordPaths3D[_, paths : {{{_?NumericQ, _?NumericQ, _?NumericQ}..}..}] :=
	paths;
gcLineCoordPaths3D[_, _] := {};

lineFromGCRecord3D[verts_, rec_] :=
	lineAssoc3D[
		gcLineCoordPaths3D[verts, rec["paths"]],
		rec["opts"],
		rec["style"]
	];

linesFromGC3D[gc_, outerStyle_] :=
	DeleteCases[
		lineFromGCRecord3D[gc[[1]], #]& /@ collectGCLines3D[gc[[2]], outerStyle],
		Null
	];

(* ---- meshable primitive groups ---------------------------------------- *)
meshRegionQ3D[m_] :=
	MatchQ[m, _MeshRegion | _BoundaryMeshRegion] &&
	Length[MeshCellCount[m]] >= 3 &&
	MeshCellCount[m][[3]] > 0;

discretizeMeshPrimitive3D[e_] :=
	Module[{g = Graphics3D[e], mesh},
		mesh = BoundaryDiscretizeGraphics[g];
		If[meshRegionQ3D[mesh],
			mesh,
			mesh = DiscretizeGraphics[g];
			If[meshRegionQ3D[mesh], mesh, $Failed]
		]
	];

meshFaces3D[m_] :=
	Cases[MeshCells[m, 2], Polygon[f : {__Integer}] :> f, Infinity];

meshFromRegion3D[m_, st_] :=
	Module[{
			verts = MeshCoordinates[m],
			faces,
			tris,
			tex,
			mapping,
			hasTexture
		},
		faces = meshFaces3D[m];
		tris = Join @@ (fan3D /@ faces);
		If[verts === {} || tris === {}, Return[Null]];
		tex = textureImageFromStyle3D[st];
		mapping = textureMappingFromStyle3D[st];
		hasTexture = tex =!= Null && mapping =!= None;
		meshAssoc3D[
			<|
				"pos"  -> roundFlat3D[verts],
				"norm" -> Null,
				"col"  -> Null,
				"uv"   -> Null,
				"tex"  -> If[hasTexture, imageDataURI[tex], Null],
				"map"  -> If[hasTexture, mapping, Null],
				"idx"  -> Flatten[tris - 1]
			|>,
			st,
			!hasTexture
		]
	];

(* ---- analytic feature edges for cap-bearing curved primitives ---------- *)
(*
 * A dihedral-angle threshold on the discretised mesh can't reliably tell a thin
 * cylinder's coarse lateral facets from its cap rims (the discretiser tessellates
 * a curved surface more coarsely the thinner it is). So for the primitives whose
 * feature edges are exact circles -- Cylinder caps, Cone base -- we emit the rim
 * polylines straight from the maths (model space), and the runtime draws them
 * verbatim instead of guessing from the mesh. Flat-faced primitives (Cuboid,
 * Simplex, ...) and smooth ones (Sphere, Capsule) carry none: the runtime's
 * EdgesGeometry is exact for the former and silent for the latter.
 *)
pt3Q3D[p_] := VectorQ[p, NumericQ] && Length[p] === 3;

orthoBasis3D[axis_] :=
	Module[{a = Normalize[N[axis]], u},
		u = If[Abs[a[[3]]] < 0.9, Cross[a, {0., 0., 1.}], Cross[a, {1., 0., 0.}]];
		u = Normalize[u];
		{u, Cross[a, u]}
	];

circleLoop3D[c_, r_, {u_, v_}, n_:48] :=
	Table[N[c] + N[r] (Cos[t] u + Sin[t] v), {t, 0., 2. Pi, 2. Pi / n}];

cylinderRimPaths3D[p1_, p2_, r_] :=
	With[{uv = orthoBasis3D[p2 - p1]},
		{circleLoop3D[p1, r, uv], circleLoop3D[p2, r, uv]}
	];

primitiveEdgePaths3D[Cylinder[{p1_, p2_}, r_:1]] :=
	cylinderRimPaths3D[p1, p2, r] /; pt3Q3D[p1] && pt3Q3D[p2] && NumericQ[r];
primitiveEdgePaths3D[Cylinder[]] := cylinderRimPaths3D[{0., 0., -1.}, {0., 0., 1.}, 1.];
primitiveEdgePaths3D[Cone[{p1_, p2_}, r_:1]] :=
	{circleLoop3D[p1, r, orthoBasis3D[p2 - p1]]} /;
		pt3Q3D[p1] && pt3Q3D[p2] && NumericQ[r];
primitiveEdgePaths3D[Cone[]] :=
	{circleLoop3D[{0., 0., -1.}, 1., orthoBasis3D[{0., 0., 1.}]]};
primitiveEdgePaths3D[_] := Null;

roundFlatPaths3D[paths_] := roundFlat3D /@ paths;

meshFromPrimitive3D[rec_] :=
	Module[{
			mesh = discretizeMeshPrimitive3D[rec["expr"]],
			assoc,
			paths
		},
		If[!meshRegionQ3D[mesh], Return[Null]];
		assoc = meshFromRegion3D[
			mesh,
			automaticTextureMapping3D[
				rec["style"],
				primitiveAutomaticTextureMapping3D[rec["expr"]]
			]
		];
		If[assoc === Null, Return[Null]];
		paths = primitiveEdgePaths3D[rec["expr"]];
		If[MatchQ[paths, {{{_?NumericQ, _?NumericQ, _?NumericQ}..}..}],
			Join[assoc, <|"edgePaths" -> roundFlatPaths3D[paths]|>],
			assoc
		]
	];

meshPrimitiveMeshes3D[recs_List] :=
	DeleteCases[meshFromPrimitive3D /@ recs, Null];

(* ---- volume primitive groups ------------------------------------------ *)
colorRGBA3D[Opacity[a_?NumericQ, c_]] :=
	Module[{rgba = colorRGBA3D[c]},
		{rgba[[1]], rgba[[2]], rgba[[3]], N[a]  rgba[[4]]}
	];
colorRGBA3D[Opacity[a_?NumericQ]] := {1., 1., 1., N[a]};
colorRGBA3D[c_?colorSpecQ] :=
	Module[{
			rgba = N[List @@ ColorConvert[normalizeColorSpec[c], "RGB"]]
		},
		PadRight[Take[rgba, UpTo[4]], 4, 1.]
	];
colorRGBA3D[_] := {0., 0., 0., 0.};

styleOpacity3D[rgba_, st_] :=
	If[NumericQ[st["opacity"]],
		{rgba[[1]], rgba[[2]], rgba[[3]], rgba[[4]]  st["opacity"]},
		rgba
	];

rgbaBytes3D[rgba_] := Round[255  Clip[N[rgba], {0, 1}]];

rasterDataArray3D[data_] := Normal[data];

rasterDataDimensionsQ3D[d_] :=
	Length[d] === 3 || (Length[d] === 4 && MemberQ[{3, 4}, d[[-1]]]);

rasterCoordsQ3D[
	{{_?NumericQ, _?NumericQ, _?NumericQ}, {_?NumericQ, _?NumericQ, _?NumericQ}}
] :=
	True;
rasterCoordsQ3D[_] := False;

rasterOptions3D[r_Raster3D] := Cases[Rest[List @@ r], _Rule | _RuleDelayed];

rasterOption3D[r_Raster3D, opt_, default_] :=
	Lookup[Association[rasterOptions3D[r]], opt, default];

rasterMethodOption3D[r_Raster3D, keys_List, default_] :=
	FirstCase[
		Cases[
			{rasterOption3D[r, Method, Automatic]},
			HoldPattern[Rule[k_, v_]] /; MemberQ[keys, k] :> v,
			Infinity
		],
		_,
		default
	];

rasterCoordinates3D[r_Raster3D, d_] :=
	Module[{coords, vertexCoords},
		coords =
			FirstCase[
				Rest[List @@ r],
				c_?rasterCoordsQ3D :> N[c],
				Missing["NoCoordinates"]
			];
		If[!MissingQ[coords],
			coords,
			vertexCoords = rasterOption3D[r, VertexDataCoordinates, Missing[]];
			If[rasterCoordsQ3D[vertexCoords],
				N[vertexCoords],
				{{0., 0., 0.}, N[Reverse[Take[d, 3]]]}
			]
		]
	];

rasterBounds3D[coords_] := Flatten[MinMax /@ Transpose[coords]];

rasterInterpolateValues3D[r_Raster3D] :=
	TrueQ[
		rasterMethodOption3D[r, {"InterpolateValues", InterpolateValues}, False]
	];

rasterSampleLayers3D[r_Raster3D] :=
	Module[{
			value = rasterMethodOption3D[r, {"SampleLayers", SampleLayers}, Null]
		},
		If[NumericQ[value] && value > 0, Round[N[value]], Null]
	];

rasterScaleRange3D[r_Raster3D] :=
	FirstCase[
		Rest[List @@ r],
		{a_?NumericQ, b_?NumericQ} :> N[{a, b}],
		Automatic
	];

rasterScaledValue3D[v_?NumericQ, {lo_?NumericQ, hi_?NumericQ}] :=
	If[hi == lo, 0., Clip[(N[v] - lo) / (hi - lo), {0, 1}]];
rasterScaledValue3D[v_?NumericQ, _] := Clip[N[v], {0, 1}];

volumeColorQ3D[_?colorSpecQ] := True;
volumeColorQ3D[Opacity[_?NumericQ, _]] := True;
volumeColorQ3D[Opacity[_?NumericQ]] := True;
volumeColorQ3D[_] := False;

$colorDataNames3D :=
	$colorDataNames3D = Flatten[ColorData /@ ColorData["Categories"]];

rasterColorFunctionValue3D[Automatic, t_] := GrayLevel[t, t];
rasterColorFunctionValue3D["GrayLevelOpacity", t_] := GrayLevel[t, t];
rasterColorFunctionValue3D[name_String, t_] /;
	MemberQ[$colorDataNames3D, name] :=
	ColorData[name][t];
rasterColorFunctionValue3D[cf_, t_] :=
	Replace[cf[t], {c_?volumeColorQ3D :> c, _ -> GrayLevel[t, t]}, {0}];

rasterScalarRGBA3D[v_, range_, cf_, st_] :=
	Module[{t, color},
		t = rasterScaledValue3D[v, range];
		color = rasterColorFunctionValue3D[cf, t];
		styleOpacity3D[colorRGBA3D[color], st]
	];

rasterChannelRGBA3D[channels_, st_] :=
	Module[{rgba},
		rgba =
			Switch[Length[channels],
				3,
					Append[N[channels], 1.],
				4,
					N[channels],
				_,
					{0., 0., 0., 0.}
			];
		styleOpacity3D[rgba, st]
	];

rasterBytes3D[array_, d_, r_Raster3D, st_] :=
	Module[{cf, range, channels, voxels},
		If[Length[d] === 3,
			cf = rasterOption3D[r, ColorFunction, Automatic];
			range = rasterScaleRange3D[r];
			Flatten[
				rgbaBytes3D /@ (rasterScalarRGBA3D[#, range, cf, st]& /@ Flatten[array])
			],
			channels = d[[-1]];
			voxels = Partition[Flatten[array], channels];
			Flatten[rgbaBytes3D /@ (rasterChannelRGBA3D[#, st]& /@ voxels)]
		]
	];

volumeFromRaster3D[rec_] :=
	Module[{
			r = rec["expr"],
			array,
			d,
			coords,
			bytes
		},
		array = N[rasterDataArray3D[First[r]]];
		d = Dimensions[array];
		If[!rasterDataDimensionsQ3D[d] || !ArrayQ[array, _, NumericQ],
			Null,
			bytes = rasterBytes3D[array, d, r, rec["style"]];
			If[bytes === {},
				Null,
				coords = rasterCoordinates3D[r, d];
				<|
					"dims"        -> Reverse[Take[d, 3]],
					"data"        -> BaseEncode[ByteArray[bytes]],
					"bbox"        -> rasterBounds3D[coords],
					"interpolate" -> rasterInterpolateValues3D[r],
					"samples"     -> rasterSampleLayers3D[r]
				|>
			]
		]
	];

graphics3DVolumes[g_] :=
	Module[{recs, volumeRecs},
		recs = collect3D[First[g], $defaultStyle3D];
		volumeRecs = Cases[recs, r_ /; r["kind"] === "raster3d"];
		DeleteCases[volumeFromRaster3D /@ volumeRecs, Null]
	];

meshExtent3D[m_] :=
	Module[{pts = Partition[m["pos"], 3]},
		If[pts === {},
			0.,
			Max @@ ((Subtract @@ Reverse[#])& /@ (MinMax /@ Transpose[pts]))
		]
	];

texturedMesh3D[m_] := StringQ[Lookup[m, "tex", Null]];

environmentMeshQ3D[m_, meshes_] :=
	Module[{extent, otherExtents},
		extent = meshExtent3D[m];
		otherExtents = DeleteCases[meshExtent3D /@ DeleteCases[meshes, m], 0.];
		texturedMesh3D[m] && extent >= 20. &&
			otherExtents =!= {} && extent >= 10. Min[otherExtents]
	];

markEnvironmentMeshes3D[meshes_] :=
	Join[#, <|"environment" -> environmentMeshQ3D[#, meshes]|>]& /@ meshes;

graphics3DMeshes[g_] :=
	Module[{
			recs,
			gcRecs,
			polyRecs,
			indexedPolyRecs,
			meshPrimitiveRecs
		},
		recs = collect3D[First[g], $defaultStyle3D];
		gcRecs = Cases[recs, r_ /; r["kind"] === "gc"];
		polyRecs = Cases[recs, r_ /; r["kind"] === "poly"];
		indexedPolyRecs = Cases[recs, r_ /; r["kind"] === "polyindexed"];
		meshPrimitiveRecs = Cases[recs, r_ /; r["kind"] === "meshprim"];
		markEnvironmentMeshes3D[
			Join[
				Join @@ (meshFromGC3D[#["gc"], #["style"]]& /@ gcRecs),
				polyMeshes3D[polyRecs],
				indexedPolyMeshes3D[indexedPolyRecs],
				meshPrimitiveMeshes3D[meshPrimitiveRecs]
			]
		]
	];

graphics3DLines[g_] :=
	Module[{recs, gcRecs, lineRecs},
		recs = collect3D[First[g], $defaultStyle3D];
		gcRecs = Cases[recs, r_ /; r["kind"] === "gc"];
		lineRecs = Cases[recs, r_ /; r["kind"] === "line"];
		Join[
			Join @@ (linesFromGC3D[#["gc"], #["style"]]& /@ gcRecs),
			DeleteCases[lineFromLiteral3D /@ lineRecs, Null]
		]
	];

(* ---- lighting ---------------------------------------------------------- *)
(*
 * The scene lights are taken from the graphic's resolved Lighting option, not
 * hardcoded: AbsoluteOptions returns the explicit {{"Ambient", c}, {"Directional",
 * c, dir}, ...} list (the default is the classic colored "Standard" set), which
 * is what gives a surface its characteristic look.
 *
 * Coordinate space matters: `ImageScaled[{x,y,z}]` positions a light relative to
 * the *displayed image* (view space: x right, y up, z toward the viewer; the
 * box spans 0..1 so 0.5 is the centre), which is how Wolfram's default lights
 * stay pinned to the viewer. `Scaled` and absolute coords are in the 3D scene
 * (world space). We therefore tag ImageScaled lights `"view" -> True` and emit
 * a recentred offset (origin at the box centre) for the runtime to place in the
 * camera's own frame; world lights are mapped against the bounding box as before.
 * Reading ImageScaled as world (the old behaviour) mis-orients the default
 * directionals so plot surfaces come out far too dark.
 *)
mapScaled3D[{x_, y_, z_}, bbox_] :=
	{
		bbox[[1]] + x  (bbox[[2]] - bbox[[1]]),
		bbox[[3]] + y  (bbox[[4]] - bbox[[3]]),
		bbox[[5]] + z  (bbox[[6]] - bbox[[5]])
	};

(* -> <|"pos" -> {x,y,z}, "view" -> bool|> : world point, or a view-space offset
   (recentred so the box centre is the origin) when the source is ImageScaled *)
lightCoord3D[ImageScaled[v : {_?NumericQ, _?NumericQ, _?NumericQ}], _] :=
	<|"pos" -> N[v - 0.5], "view" -> True|>;
lightCoord3D[Scaled[v_], bbox_] :=
	<|"pos" -> N[mapScaled3D[v, bbox]], "view" -> False|>;
lightCoord3D[v : {_?NumericQ, _?NumericQ, _?NumericQ}, _] :=
	<|"pos" -> N[v], "view" -> False|>;
lightCoord3D[{p_, _}, bbox_] := lightCoord3D[p, bbox];
lightCoord3D[_, bbox_] :=
	<|"pos" -> N[mapScaled3D[{0.5, 0.5, 2.}, bbox]], "view" -> False|>;

(* attach "view" -> True only when view-space, so world lights stay unchanged *)
withView3D[assoc_, lc_] :=
	If[TrueQ[lc["view"]], Join[assoc, <|"view" -> True|>], assoc];

lightSpec3D[{"Ambient", c_, ___}, _] :=
	<|"type" -> "ambient", "color" -> roundColor3D[toRGB3D[c]]|>;
lightSpec3D[{"Directional", c_, dir_, ___}, bbox_] :=
	With[{lc = lightCoord3D[dir, bbox]},
		withView3D[
			<|
				"type"     -> "directional",
				"color"    -> roundColor3D[toRGB3D[c]],
				"position" -> roundColor3D[lc["pos"]]
			|>,
			lc
		]
	];
lightSpec3D[{"Point", c_, pos_, ___}, bbox_] :=
	With[{lc = lightCoord3D[pos, bbox]},
		withView3D[
			<|
				"type"     -> "point",
				"color"    -> roundColor3D[toRGB3D[c]],
				"position" -> roundColor3D[lc["pos"]]
			|>,
			lc
		]
	];
lightSpec3D[{"Spot", c_, {src_, tgt_}, ang_, ___}, bbox_] :=
	With[{lc = lightCoord3D[src, bbox]},
		withView3D[
			<|
				"type"     -> "spot",
				"color"    -> roundColor3D[toRGB3D[c]],
				"position" -> roundColor3D[lc["pos"]],
				"target"   -> roundColor3D[lightPos3D[tgt, bbox]],
				"angle"    -> N[ang]
			|>,
			lc
		]
	];
lightSpec3D[_, _] := Null;

(* world-space point for a spot's target (always a scene location) *)
lightPos3D[Scaled[v_], bbox_] := N[mapScaled3D[v, bbox]];
lightPos3D[v : {_?NumericQ, _?NumericQ, _?NumericQ}, _] := N[v];
lightPos3D[{p_, _}, bbox_] := lightPos3D[p, bbox];
lightPos3D[_, bbox_] := N[mapScaled3D[{0.5, 0.5, 2.}, bbox]];

parseLights3D[l_List, bbox_] := DeleteCases[lightSpec3D[#, bbox]& /@ l, Null];
parseLights3D[_, _] := {};

(* Plot3D & friends bake the lighting they actually use into the surface's
   GraphicsComplex directive -- a fully resolved {{"Ambient",c},{"Directional",
   c,dir}..} list (the warm gold-tinted set). The top-level Lighting stays
   Automatic, which AbsoluteOptions resolves to the generic colored "Standard"
   set, so reading only that lights a Plot3D surface like a plain Graphics3D. *)
bakedLighting3D[g_] := Cases[First[g], (Lighting -> l_) :> l, Infinity];

(* Prefer the first baked lighting that resolves to real lights; otherwise fall
   back to the graphic's own Lighting option (so an explicit Lighting -> "Neutral"
   / None / {..} on the plot still wins, and plain Graphics3D is unaffected). *)
lights3D[g_, bbox_] :=
	Module[{fromBaked},
		fromBaked =
			FirstCase[
				parseLights3D[#, bbox]& /@ bakedLighting3D[g],
				ls_List /; ls =!= {}
			];
		If[MissingQ[fromBaked],
			parseLights3D[Lighting /. AbsoluteOptions[g, Lighting], bbox],
			fromBaked
		]
	];

allMeshVertices3D[meshes_List] :=
	Module[{verts},
		verts =
			Cases[
				meshes,
				m_Association /; KeyExistsQ[m, "pos"] &&
					!TrueQ[Lookup[m, "environment", False]] :> Partition[m["pos"], 3]
			];
		If[verts === {}, {}, Join @@ verts]
	];

allLineVertices3D[lines_List] :=
	Module[{verts},
		verts =
			Cases[
				lines,
				l_Association /; KeyExistsQ[l, "pos"] :> Partition[l["pos"], 3]
			];
		If[verts === {}, {}, Join @@ verts]
	];

volumeBoundsVertices3D[bbox_] :=
	{{bbox[[1]], bbox[[3]], bbox[[5]]}, {bbox[[2]], bbox[[4]], bbox[[6]]}};

allVolumeVertices3D[volumes_List] :=
	Module[{verts},
		verts =
			Cases[
				volumes,
				v_Association /; KeyExistsQ[v, "bbox"] :> volumeBoundsVertices3D[
					v["bbox"]
				]
			];
		If[verts === {}, {}, Join @@ verts]
	];

allVertices3D[g_] :=
	Join[
		allMeshVertices3D[graphics3DMeshes[g]],
		allLineVertices3D[graphics3DLines[g]],
		allVolumeVertices3D[graphics3DVolumes[g]]
	];

normalizeSize3D[is_] :=
	Which[
		MatchQ[is, {_?NumericQ, _?NumericQ}],
			N[is],
		NumericQ[is],
			{N[is], N[is]},
		True,
			{400., 400.}
	];

size3D[g_Graphics3D] :=
	Module[{
			is = ImageSize /. AbsoluteOptions[g, ImageSize]
		},
		normalizeSize3D[is]
	];
size3D[opts_] := normalizeSize3D[Lookup[Association[opts], ImageSize, 400]];

viewPoint3D[g_] :=
	Module[{
			vp = Quiet[ViewPoint /. AbsoluteOptions[g, ViewPoint]]
		},
		If[MatchQ[vp, {_?NumericQ, _?NumericQ, _?NumericQ}], N[vp], {1.3, -2.4, 2.}]
	];

viewVertical3D[g_] :=
	Module[{
			vv = ViewVertical /. AbsoluteOptions[g, ViewVertical]
		},
		If[MatchQ[vv, {_?NumericQ, _?NumericQ, _?NumericQ}], N[vv], {0., 0., 1.}]
	];

viewAngle3D[g_] :=
	FirstCase[
		{ViewAngle /. AbsoluteOptions[g, ViewAngle]},
		n_?NumericQ :> N[n],
		Null,
		Infinity
	];

boxRatios3D[g_] :=
	Module[{
			br = BoxRatios /. AbsoluteOptions[g, BoxRatios]
		},
		If[MatchQ[br, {_?NumericQ, _?NumericQ, _?NumericQ}], N[br], {1., 1., 1.}]
	];

(* The resolved numeric plot range {x0,x1,y0,y1,z0,z1}: this, not the tight
   geometry bounding box, is the box BoxRatios shapes -- so an explicit PlotRange
   wider than the geometry doesn't anisotropically stretch the contents. Missing
   when AbsoluteOptions can't resolve a numeric range (the runtime then falls
   back to the geometry bounds). *)
plotRange3D[g_] :=
	Module[{
			pr = PlotRange /. AbsoluteOptions[g, PlotRange]
		},
		If[
			MatchQ[
				pr,
				{
					{_?NumericQ, _?NumericQ},
					{_?NumericQ, _?NumericQ},
					{_?NumericQ, _?NumericQ}
				}
			],
			N[Flatten[pr]],
			Missing["NoPlotRange"]
		]
	];

(* ---- axes ------------------------------------------------------------- *)
(*
 * Everything an axis/box/grid needs is resolved here from the *actual*
 * Graphics3D options via AbsoluteOptions -- per-axis on/off, line + text
 * colours, label text, the kernel's own tick positions/labels, the box and
 * face grids. Nothing stylistic is invented; when an option supplies no colour
 * we fall back to the graphic's own default (black), never an arbitrary one.
 * The Three.js runtime consumes this verbatim and only does geometry (which
 * box edge carries each axis for the current camera, billboarded CSS2D text).
 *)
(* {bx,by,bz} from True | False | partial list, padding with the default *)
normalizeTriple3D[True, _] := {True, True, True};
normalizeTriple3D[False, _] := {False, False, False};
normalizeTriple3D[None, d_] := {d, d, d};
normalizeTriple3D[Automatic, d_] := {d, d, d};
normalizeTriple3D[l_List, d_] := PadRight[l, 3, d];
normalizeTriple3D[x_, _] := {x, x, x};

(* colour for `key` (LineColor / FontColor) out of a directive, else any bare
   colour in it, else the kernel default black -- never an invented colour *)
axesColorHex3D[dir_, key_] :=
	Module[{flat = Flatten[{dir}], c},
		c = FirstCase[flat, (key -> col_) :> col, Missing[], Infinity];
		If[MissingQ[c],
			c = FirstCase[flat, col_ /; colorSpecQ[col] :> col, Missing[], Infinity]
		];
		If[colorSpecQ[c], colorToSvg[c]["rgb"], "#000000"]
	];

(* font directives -> a compact CSS-ish style association (unset keys dropped) *)
textStyleAssoc3D[dirs_, fallbackHex_] :=
	Module[{
			flat = Flatten[{dirs}],
			col,
			sz,
			fam,
			wt,
			sl,
			out = <||>
		},
		col =
			FirstCase[
				flat,
				(FontColor -> c_) :> c,
				FirstCase[flat, c_ /; colorSpecQ[c] :> c, Missing[], Infinity],
				Infinity
			];
		out["color"] = If[colorSpecQ[col], colorToSvg[col]["rgb"], fallbackHex];
		sz = FirstCase[flat, (FontSize -> s_?NumericQ) :> s, Missing[], Infinity];
		If[NumericQ[sz], out["fontSize"] = N[sz]];
		fam = FirstCase[flat, (FontFamily -> f_String) :> f, Missing[], Infinity];
		If[StringQ[fam], out["fontFamily"] = fam];
		wt = FirstCase[flat, (FontWeight -> w_) :> w, Missing[], Infinity];
		If[wt === Bold || wt === "Bold", out["fontWeight"] = "bold"];
		sl = FirstCase[flat, (FontSlant -> s_) :> s, Missing[], Infinity];
		If[sl === Italic || sl === "Italic", out["fontStyle"] = "italic"];
		out
	];

(* a string label arrives box-encoded -- the box form of "x" is the literal
   3-char string "x" (quotes included). Un-quote it back to plain text. *)
deboxString3D[s_String] :=
	If[StringLength[s] >= 2 && StringStartsQ[s, "\""] && StringEndsQ[s, "\""],
		StringReplace[StringTake[s, {2, -2}], {"\\\"" -> "\"", "\\\\" -> "\\"}],
		s
	];

(* label / tick expressions -> a plain display string. Labels arrive as nested
   typesetting boxes that differ by producer (plain Graphics3D gives
   FormBox["x"], Plot3D gives FormBox[TagBox["x", HoldForm], ...]), so peel the
   wrapper boxes and concatenate RowBox content down to the string leaves. *)
boxToText3D[FormBox[x_, ___]] := boxToText3D[x];
boxToText3D[TagBox[x_, ___]] := boxToText3D[x];
boxToText3D[StyleBox[x_, ___]] := boxToText3D[x];
boxToText3D[InterpretationBox[x_, ___]] := boxToText3D[x];
boxToText3D[HoldForm[x_]] := boxToText3D[x];
boxToText3D[Style[x_, ___]] := boxToText3D[x];
boxToText3D[RowBox[l_List]] := StringJoin[ boxToText3D /@ l];
boxToText3D[SuperscriptBox[a_, b_]] :=
	StringJoin[ boxToText3D[a], "^", boxToText3D[b]];
boxToText3D[SubscriptBox[a_, b_]] :=
	StringJoin[ boxToText3D[a], "_", boxToText3D[b]];
boxToText3D[s_String] := deboxString3D[s];
boxToText3D[n_?NumericQ] := ToString[n];
boxToText3D[x_] := ToString[x, InputForm];

labelText3D[e_] := boxToText3D[e];

axisLabelSpec3D[None, _, _] := Null;
axisLabelSpec3D[Null, _, _] := Null;
axisLabelSpec3D[expr_, fallbackHex_, labelStyleDirs_] :=
	Module[{
			bare = expr //. FormBox[x_, _] :> x,
			inlineDirs
		},
		inlineDirs = If[MatchQ[bare, _Style], Rest[List @@ bare], {}];
		<|
			"text"  -> labelText3D[expr],
			"style" -> textStyleAssoc3D[
				Join[Flatten[{labelStyleDirs}], inlineDirs],
				fallbackHex
			]
		|>
	];

(* one axis's resolved ticks: {value, label, length} ; minor ticks keep "" *)
tickLabel3D[s_String] := s;
tickLabel3D[lbl_] := labelText3D[lbl];

tickEntry3D[{v_?NumericQ, lbl_, {pos_, ___}, ___}] :=
	<|"value" -> N[v], "label" -> tickLabel3D[lbl], "length" -> N[pos]|>;
tickEntry3D[{v_?NumericQ, lbl_, ___}] :=
	<|"value" -> N[v], "label" -> tickLabel3D[lbl], "length" -> 0.|>;

axisTicks3D[ts_List] := Map[tickEntry3D, Cases[ts, {_?NumericQ, __}]];
axisTicks3D[_] := {};

(* AxesEdge -> per-axis {s1,s2} (explicit) or Null (dynamic, camera-chosen) *)
edgeEntry3D[{a_, b_}] /; (a =!= Automatic && b =!= Automatic) := {a, b};
edgeEntry3D[_] := Null;

resolveEdges3D[l_List] /; Length[l] === 3 := edgeEntry3D /@ l;
resolveEdges3D[_] := {Null, Null, Null};

(* FaceGrids face spec {ex,ey,ez} (one non-zero) -> {normal axis, side} *)
faceGridSpec3D[{x_, y_, z_}] :=
	Module[{v = {x, y, z}, pos},
		pos = FirstPosition[v, n_ /; NumericQ[n] && n =!= 0, {0}][[1]];
		If[pos === 0, Nothing, <|"normal" -> pos - 1, "side" -> Sign[v[[pos]]]|>]
	];
faceGridSpec3D[Rule[face_, _]] := faceGridSpec3D[face];
faceGridSpec3D[_] := Nothing;

resolveFaceGrids3D[None] := {};
resolveFaceGrids3D[All] :=
	Flatten[Table[<|"normal" -> n, "side" -> s|>, {n, 0, 2}, {s, {-1, 1}}], 1];
resolveFaceGrids3D[l_List] := faceGridSpec3D /@ l;
resolveFaceGrids3D[_] := {};

axes3D[g_] :=
	Module[{
			axesOpt,
			show,
			boxedOpt,
			boxStyleOpt,
			fgOpt,
			fgStyleOpt,
			fgFaces,
			axStyle,
			axStyleTriple,
			colors,
			fontColors,
			labelOpt,
			labelStyle,
			labels,
			ticksOpt,
			ticks,
			tkStyleOpt,
			tkStyleTriple,
			tickStyles,
			edges,
			box,
			faceGrids
		},
		axesOpt = Axes /. AbsoluteOptions[g, Axes];
		show = normalizeTriple3D[axesOpt, False];
		boxedOpt = Boxed /. AbsoluteOptions[g, Boxed];
		boxStyleOpt = BoxStyle /. AbsoluteOptions[g, BoxStyle];
		fgOpt = FaceGrids /. AbsoluteOptions[g, FaceGrids];
		fgFaces = resolveFaceGrids3D[fgOpt];
		(* nothing to draw -> let the caller omit the whole "axes" block *)
		If[!Or @@ (TrueQ /@ show) && !TrueQ[boxedOpt] && fgFaces === {},
			Return[Missing["NoAxes"]]
		];
		axStyle = AxesStyle /. AbsoluteOptions[g, AxesStyle];
		axStyleTriple =
			Which[
				ListQ[axStyle] && Length[axStyle] === 3,
					axStyle,
				axStyle === {} || axStyle === Automatic || axStyle === None,
					{{}, {}, {}},
				True,
					{axStyle, axStyle, axStyle}
			];
		colors = axesColorHex3D[#, LineColor]& /@ axStyleTriple;
		fontColors = axesColorHex3D[#, FontColor]& /@ axStyleTriple;
		labelOpt = AxesLabel /. AbsoluteOptions[g, AxesLabel];
		labelStyle = LabelStyle /. AbsoluteOptions[g, LabelStyle];
		labels =
			MapThread[
				axisLabelSpec3D[#1, #2, labelStyle]&,
				{normalizeTriple3D[labelOpt, None], fontColors}
			];
		ticksOpt = Ticks /. AbsoluteOptions[g, Ticks];
		ticks =
			axisTicks3D /@ If[ListQ[ticksOpt] && Length[ticksOpt] === 3,
				ticksOpt,
				{None, None, None}
			];
		tkStyleOpt = TicksStyle /. AbsoluteOptions[g, TicksStyle];
		tkStyleTriple =
			Which[
				ListQ[tkStyleOpt] && Length[tkStyleOpt] === 3,
					tkStyleOpt,
				tkStyleOpt === {} || tkStyleOpt === Automatic || tkStyleOpt === None,
					{{}, {}, {}},
				True,
					{tkStyleOpt, tkStyleOpt, tkStyleOpt}
			];
		tickStyles = MapThread[textStyleAssoc3D, {tkStyleTriple, fontColors}];
		edges = resolveEdges3D[AxesEdge /. AbsoluteOptions[g, AxesEdge]];
		box =
			<|
				"show"  -> TrueQ[boxedOpt],
				"color" -> axesColorHex3D[boxStyleOpt, LineColor]
			|>;
		fgStyleOpt = FaceGridsStyle /. AbsoluteOptions[g, FaceGridsStyle];
		faceGrids =
			<|
				"faces" -> fgFaces,
				"color" -> If[
					fgStyleOpt === {} || fgStyleOpt === None || fgStyleOpt === Automatic,
					box["color"],
					axesColorHex3D[fgStyleOpt, LineColor]
				]
			|>;
		<|
			"show"       -> show,
			"colors"     -> colors,
			"labels"     -> labels,
			"ticks"      -> ticks,
			"tickStyles" -> tickStyles,
			"edges"      -> edges,
			"box"        -> box,
			"faceGrids"  -> faceGrids
		|>
	];
