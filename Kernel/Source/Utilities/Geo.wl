PackageScoped[{geoNeedsRasterFallback, $wgxGeoRasterFallback}];

(* file-local flag: when a raster tile is not an axis-aligned rectangle (an
   exotic projection), the whole basemap is flattened to a single raster image
   instead of being drawn per-tile. *)
$wgxGeoRasterFallback = False;

(* a GeoGraphics needs the whole-basemap raster fallback when it contains a
   textured tile whose polygon is not an axis-aligned rectangle *)
geoNeedsRasterFallback[inner_] :=
	MemberQ[
		axisAlignedRectQ[First[#]]& /@ Cases[
			inner,
			{_Texture, Polygon[p_, ___]} :> p,
			Infinity
		],
		False
	];
