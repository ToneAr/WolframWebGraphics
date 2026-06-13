(* wl-disable-file DocCommentInputMismatch *)
(* ::Section:: *) (* Graphics *)
serialize[Graphics[prim_, opts : OptionsPattern[Graphics]]] :=
	serialize[Graphics[{prim}, opts]];
serialize[graphics : Graphics[{prims___}, opts : OptionsPattern[Graphics]]] :=
	svgString[svgElement[graphics]];
serialize[Legended[graphics : _Graphics, legend_]] :=
	svgString[svgElementWithLegend[svgElement[graphics], legend]]
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