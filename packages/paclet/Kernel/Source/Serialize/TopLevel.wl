(* wl-disable-file DocCommentInputMismatch *)
(* ::Section:: *) (* Graphics *)
serialize[Graphics[prim_, opts : OptionsPattern[Graphics]]] :=
	serialize[Graphics[{prim}, opts]];
serialize[graphics : Graphics[{prims___}, opts : OptionsPattern[Graphics]]] :=
	svgString[svgElement[graphics]];
serialize[Legended[graphics : _Graphics, legend_]] :=
	svgString[svgElementWithLegend[svgElement[graphics], legend]];
serialize[Labeled[graphics : _Graphics, label_, pos_ : Top, ___]] :=
	svgString[svgElementWithLabel[svgElement[graphics], label, pos]];
(* ::Section:: *) (* GeoGraphics *)
(*
 * GeoGraphics support:
 *
 * An evaluated GeoGraphics holds a fully-projected, plain Graphics as its
 * first argument -- the kernel has already done the map projection, fetched the
 * tiles, and decomposed everything into ordinary 2D primitives wrapped in 7
 * Annotation layers (GeoBackground, UserInput, GeoGridLines, GeoAxes,
 * GeoScaleBar, GeoLabels, metadata).  So we render that inner Graphics through
 * the existing Graphics->SVG pipeline.  Raster basemap tiles are drawn as
 * {Texture[Image[...]], Polygon[corners, VertexTextureCoordinates -> uv]} and
 * are handled by the shared textured-polygon serializer.  The inner Graphics
 * already carries a numeric PlotRange, so the pixel map engages automatically
 * and the outer <svg> viewport clips tiles that extend past the range.
 *)
serialize[GeoGraphics[inner_Graphics, ___]] :=
	Block[{
			$wgxGeoRasterFallback = geoNeedsRasterFallback[inner]
		},
		svgString[svgElement[inner]]
	];
serialize[Legended[GeoGraphics[inner_Graphics, ___], legend_]] :=
	Block[{
			$wgxGeoRasterFallback = geoNeedsRasterFallback[inner]
		},
		svgString[svgElementWithLegend[svgElement[inner], legend]]
	];
serialize[Labeled[GeoGraphics[inner_Graphics, ___], label_, pos_ : Top, ___]] :=
	Block[{
			$wgxGeoRasterFallback = geoNeedsRasterFallback[inner]
		},
		svgString[svgElementWithLabel[svgElement[inner], label, pos]]
	];
serialize[Annotation[content_, "GeoBackground", ___], props_] /;
	TrueQ[$wgxGeoRasterFallback] :=
	rasterizedGraphicsElement[content, props];
(* ::Section:: *) (* Graphics3D *)
serialize[g : Graphics3D[___]] :=
	(*
	 * A 3D widget is an HTML/JS fragment (canvas + Three.js), not XML, so it is
	 * returned as a ready-to-embed HTML String -- unlike 2D, which returns
	 * SymbolicXML for ExportString[#, "XML"]&.
	 *)
	Module[{
			meshes,
			lines,
			volumes,
			verts,
			imageSize,
			boundingBox,
			viewPoint,
			viewVertical,
			viewAngle,
			boxRatios,
			plotRange,
			elementID = uid["wgx3d"],
			axesConfig,
			sceneConfig,
			sceneConfigJson
		},
		meshes = graphics3DMeshes[g];
		lines = graphics3DLines[g];
		volumes = graphics3DVolumes[g];
		verts =
			Join[
				allMeshVertices3D[meshes],
				allLineVertices3D[lines],
				allVolumeVertices3D[volumes]
			];
		imageSize = size3D[g];
		boundingBox =
			If[verts === {},
				{-1., 1., -1., 1., -1., 1.},
				Flatten[MinMax /@ Transpose[verts]]
			];
		viewPoint = viewPoint3D[g];
		viewVertical = viewVertical3D[g];
		viewAngle = viewAngle3D[g];
		boxRatios = boxRatios3D[g];
		plotRange = plotRange3D[g];
		axesConfig = axes3D[g];
		sceneConfig =
			<|
				"width" -> imageSize[[1]],
				"height" -> imageSize[[2]],
				"meshes" -> meshes,
				"lines" -> lines,
				"volumes" -> volumes,
				"bbox" -> boundingBox,
				(* the box BoxRatios shapes; fall back to the geometry bounds when
				   AbsoluteOptions can't resolve a numeric range *)
				"plotRange" -> If[MissingQ[plotRange], boundingBox, plotRange],
				"vp" -> viewPoint,
				"vv" -> viewVertical,
				"boxRatios" -> boxRatios,
				"lights" -> lights3D[g, boundingBox]
			|>;
		If[NumericQ[viewAngle],
			sceneConfig["va"] = viewAngle
		];
		(* axes3D returns Missing when there is nothing to draw -- omit the key *)
		If[!MissingQ[axesConfig],
			sceneConfig["axes"] = axesConfig
		];
		sceneConfigJson =
			ExportString[sceneConfig, "RawJSON", "Compact" -> True];
		XMLTemplate[
			"<div
				id=\"`elId`\"
				class=\"wgx3d\"
				style=\"width:`w`px;height:`h`px\"
			>
				<wolfram:slot id=\"threeLib3D\" />
				<wolfram:slot id=\"widgetLib3D\" />
			</div>"
		][<|
			"elId"        -> elementID,
			"w"           -> Round[imageSize[[1]]],
			"h"           -> Round[imageSize[[2]]],
			"threeLib3D"  -> If[TrueQ[$wgxInlineRuntime], wgx3DLibraryTag[], ""],
			"widgetLib3D" -> wgx3DWidgetLibraryTag[elementID, sceneConfigJson]
		|>]
	];
