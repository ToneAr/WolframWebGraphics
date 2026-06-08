(* wl-disable-file DocCommentInputMismatch *)
serialize[g : Graphics3D[___]] :=
	(*
	 * A 3D widget is an HTML/JS fragment (canvas + Three.js), not XML, so it is
	 * returned as a ready-to-embed HTML String -- unlike 2D, which returns
	 * SymbolicXML for ExportString[#, "XML"]&.
	 *)
	Module[{
			opts = Cases[Apply[List, g], _Rule | _RuleDelayed],
			meshes,
			verts,
			imageSize,
			boundingBox,
			viewPoint,
			elementID = uid["wgx3d"],
			sceneConfigJson
		},
		meshes = graphics3DMeshes[g];
		verts = allVertices3D[g];
		imageSize = size3D[opts];
		boundingBox =
			If[verts === {},
				{-1., 1., -1., 1., -1., 1.},
				Flatten[MinMax /@ Transpose[verts]]
			];
		viewPoint = viewPoint3D[g];
		sceneConfigJson =
			ExportString[
				<|
					"width" -> imageSize[[1]],
					"height" -> imageSize[[2]],
					"meshes" -> meshes,
					"bbox" -> boundingBox,
					"vp" -> viewPoint
				|>,
				"RawJSON",
				"Compact" -> True
			];
		StringJoin[
			"<div id=\"",
			elementID,
			"\" class=\"wgx3d\" style=\"width:",
			ToString[Round[imageSize[[1]]]],
			"px;height:",
			ToString[Round[imageSize[[2]]]],
			"px\">",
			If[TrueQ[$wgxInline3DLib], wgx3DLibraryTag[], ""],
			"<script>",
			scriptSafe[wgx3DWidgetScript[elementID, sceneConfigJson]],
			"</script></div>"
		]
	];