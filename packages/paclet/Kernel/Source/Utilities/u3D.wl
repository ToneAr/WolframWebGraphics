(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		fan3D,
		colorRGB3D,
		roundFlat3D,
		$heightPalette,
		heightColors,
		meshFromGC,
		meshFromPolygons,
		graphics3DMeshes,
		allVertices3D,
		size3D,
		viewPoint3D
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
fan3D[f_] := Table[{f[[1]], f[[i]], f[[i + 1]]}, {i, 2, Length[f] - 1}];

colorRGB3D[c_] := (List @@ ColorConvert[normalizeColorSpec[c], "RGB"])[[1;;3]];

roundFlat3D[a_] := Flatten[Round[N[a], 1.*^-4]];

$heightPalette =
	{
		RGBColor[0.267, 0.005, 0.329],
		RGBColor[0.128, 0.567, 0.551],
		RGBColor[0.993, 0.906, 0.144]
	};

heightColors[verts_] :=
	Module[{z = verts[[All, 3]], mn, mx, t},
		mn = Min[z]; mx = Max[z];
		t = If[mx <= mn, ConstantArray[0.5, Length[z]], (z - mn) / (mx - mn)];
		Map[colorRGB3D[Blend[$heightPalette, #]]&, t]
	];
heightColors[{}] := {};

meshFromGC[gc_] :=
	Module[{
			verts = gc[[1]],
			norms = First[Cases[gc, (VertexNormals -> v_) :> v, Infinity], None],
			vcol = First[Cases[gc, (VertexColors -> v_) :> v, Infinity], None],
			uv =
				First[Cases[gc, (VertexTextureCoordinates -> v_) :> v, Infinity], None],
			tex = First[Cases[gc[[2]], Texture[img_Image] :> img, Infinity], None],
			faces,
			tris,
			cols,
			hasTexture
		},
		faces = Join @@ Cases[gc[[2]], Polygon[f_] :> f, Infinity];
		tris = Join @@ (fan3D /@ faces);
		cols =
			If[vcol === None || !AllTrue[vcol, colorSpecQ],
				heightColors[verts],
				colorRGB3D /@ vcol
			];
		hasTexture =
			tex =!= None &&
			MatchQ[uv, {{_?NumericQ, _?NumericQ}..}] &&
			Length[uv] === Length[verts];
		<|
			"pos"  -> roundFlat3D[verts],
			"norm" -> If[norms === None, Null, roundFlat3D[norms]],
			"col"  -> If[hasTexture, Null, roundFlat3D[cols]],
			"uv"   -> If[hasTexture, roundFlat3D[uv], Null],
			"tex"  -> If[hasTexture, imageDataURI[tex], Null],
			"idx"  -> Flatten[tris - 1]
		|>
	];

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

(* Explicit Polygon[{p1,p2,p3,..}] with inline coords (no GraphicsComplex) *)
meshFromPolygons[polys : {__Polygon}, tex_ : None] :=
	Module[{tris, verts, uvTris, uv, hasTexture},
		tris =
			If[tex === None,
				Join @@ (trianglesFromPolygon3D /@ polys),
				Join @@ (literalPolygonTriangles /@ polys)
			];
		verts = If[tris === {}, {}, Join @@ tris];
		uvTris = If[tex === None, {}, Join @@ (literalPolygonUVTriangles /@ polys)];
		uv = If[uvTris === {}, {}, Join @@ uvTris];
		hasTexture = tex =!= None && Length[uv] === Length[verts];
		<|
			"pos"  -> roundFlat3D[verts],
			"norm" -> Null,
			"col"  -> If[hasTexture, Null, roundFlat3D[heightColors[verts]]],
			"uv"   -> If[hasTexture, roundFlat3D[uv], Null],
			"tex"  -> If[hasTexture, imageDataURI[tex], Null],
			"idx"  -> Range[0, Length[verts] - 1]
		|>
	];

graphics3DMeshes[g_] :=
	Module[{
			gcs = Cases[g, _GraphicsComplex, Infinity],
			polys,
			tex
		},
		If[gcs =!= {},
			meshFromGC /@ gcs,
			polys =
				Cases[
					g,
					Polygon[p : {{_?NumericQ, _?NumericQ, _?NumericQ}..}, ___],
					Infinity
				];
			tex = First[Cases[g, Texture[img_Image] :> img, Infinity], None];
			If[polys =!= {}, {meshFromPolygons[polys, tex]}, {}]
		]
	];

allVertices3D[g_] :=
	Module[{
			gcs = Cases[g, _GraphicsComplex, Infinity]
		},
		If[gcs =!= {},
			Join @@ (First /@ gcs),
			Join @@ Cases[
				g,
				Polygon[p : {{_?NumericQ, _?NumericQ, _?NumericQ}..}, ___] :> p,
				Infinity
			]
		]
	];

size3D[opts_] :=
	Module[{
			is = Lookup[Association[opts], ImageSize, 400]
		},
		Which[
			MatchQ[is, {_?NumericQ, _?NumericQ}],
				N[is],
			NumericQ[is],
				{N[is], N[is]},
			True,
				{400., 400.}
		]
	];

viewPoint3D[g_] :=
	Module[{
			vp = Quiet[ViewPoint /. AbsoluteOptions[g, ViewPoint]]
		},
		If[MatchQ[vp, {_?NumericQ, _?NumericQ, _?NumericQ}], N[vp], {1.3, -2.4, 2.}]
	];
