PackageScoped[
	{
		$wgxInline3DLib,
		wgx3DLibrary,
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
		viewPoint3D,
		wgx3DWidgetScript,
		scriptSafe,
		wgx3DLibraryTag
	}
]
(*
 * 2D Graphics stays on the SVG backend (Serialize.wl); 3D goes through here:
 * extract meshes from the GraphicsComplex the kernel produces, emit a <div>
 * hosting a Three.js scene with OrbitControls (drag-rotate / zoom / pan).
 * The Three.js + the OrbitControls and runtime source are inlined (CDATA) so
 * the output is self-contained.
 *)
(* ---- inlined library/runtime (read from Resources/, memoised) ---------- *)
(*
 * By default each 3D widget inlines Three.js (self-contained). For a page with
 * several 3D graphics, set $wgxInline3DLib = False and include wgx3DLibraryTag
 * once in the page; widgets then share the single global THREE.
 *)
$wgxInline3DLib = True;

wgx3DLibrary[] :=
	wgx3DLibrary[] =
		StringRiffle[
			Map[
				Import[PacletObject["ToneAr/WebGraphics"]["AssetLocation", #], "Text"]&,
				{"three.min.js", "OrbitControls.js", "ThreeRuntime.js"}
			],
			"\n"
		];

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

meshFromGC[gc_] :=
	Module[{
			verts = gc[[1]],
			norms = First[Cases[gc, (VertexNormals -> v_) :> v, Infinity], None],
			vcol = First[Cases[gc, (VertexColors -> v_) :> v, Infinity], None],
			faces,
			tris,
			cols
		},
		faces = Join @@ Cases[gc[[2]], Polygon[f_] :> f, Infinity];
		tris = Join @@ (fan3D /@ faces);
		cols =
			If[vcol === None || !AllTrue[vcol, colorSpecQ],
				heightColors[verts],
				colorRGB3D /@ vcol
			];
		<|
			"pos" -> roundFlat3D[verts],
			"norm" -> If[norms === None, Null, roundFlat3D[norms]],
			"col" -> roundFlat3D[cols],
			"idx" -> Flatten[tris - 1]
		|>
	];

(* Explicit Polygon[{p1,p2,p3,..}] with inline coords (no GraphicsComplex) *)
meshFromPolygons[polys_] :=
	Module[{verts, tris = {}, k = 0},
		verts = Join @@ (List @@@ polys);
		Do[
			With[{n = Length[polys[[i]][[1]]]},
				tris = Join[tris, fan3D[Range[k + 1, k + n]]];
				k += n
			],
			{i, Length[polys]}
		];
		<|
			"pos" -> roundFlat3D[verts],
			"norm" -> Null,
			"col" -> roundFlat3D[heightColors[verts]],
			"idx" -> Flatten[tris - 1]
		|>
	];

graphics3DMeshes[g_] :=
	Module[{
			gcs = Cases[g, _GraphicsComplex, Infinity],
			polys
		},
		If[gcs =!= {},
			meshFromGC /@ gcs,
			polys =
				Cases[
					g,
					Polygon[p : {{_?NumericQ, _?NumericQ, _?NumericQ}..}],
					Infinity
				];
			If[polys =!= {}, {meshFromPolygons[polys]}, {}]
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
				Polygon[p : {{_?NumericQ, _?NumericQ, _?NumericQ}..}] :> p,
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

(* ---- Three.js widget call (runtime lives in Resources/ThreeRuntime.js) -- *)
wgx3DWidgetScript[elementID_, sceneConfigJson_] :=
	StringJoin[
		"window.WGX3D.renderScene(",
		ExportString[elementID, "RawJSON", "Compact" -> True],
		",",
		sceneConfigJson,
		");"
	];

(* protect against a literal </script in raw JS ending the element early *)
scriptSafe[js_] :=
	StringReplace[js, "</script" -> "<\\/script", IgnoreCase -> True];

wgx3DLibraryTag[] :=
	StringJoin[ "<script>", scriptSafe[wgx3DLibrary[]], "</script>"];