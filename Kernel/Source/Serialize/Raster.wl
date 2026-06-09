serialize[Raster[data_List, opts : OptionsPattern[]], props_] :=
	With[{dims = Dimensions[data]},
		rasterSvg[data, {{0, 0}, {dims[[2]], dims[[1]]}}, props]
	];
serialize[
	Raster[
		data_List,
		{{x1_?NumericQ, y1_?NumericQ}, {x2_?NumericQ, y2_?NumericQ}},
		opts___
	],
	props_
] :=
	rasterSvg[data, {{x1, y1}, {x2, y2}}, props];
