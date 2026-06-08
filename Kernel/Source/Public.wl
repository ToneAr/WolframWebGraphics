ExportWebGraphics // PackageExported;
ExportWebGraphics::fail = "``";
ExportWebGraphics[graphics_Graphics, fmt_String] :=
	Module[{},
		CatchExceptions[
			serialize[graphics],
			ExportWebGraphicsFail -> mainErrorHandler
		]
	];

mainErrorHandler[e_] :=
	Message[
		ExportWebGraphics::fail,
		Replace[e["Information"], Except[_String] -> "Unspecified error"]
	];

ExportWebGraphicsFail // PackageScoped;
