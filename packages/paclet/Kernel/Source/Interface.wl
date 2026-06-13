PackageExported[
	{
		ToWebGraphics,
		WebGraphicsRuntimeStyle,
		WebGraphics3DRuntimeScript,
		WebGraphics2DRuntimeScript,
		WebGraphicsRuntimeScript,
		CreateWebGraphicsRuntime
	}
];

PackageScoped[{serialize, ToWebGraphicsError, ToWebGraphicsNetworkError}];

$$graphicsP =
	_Graphics | _Graphics3D | _GeoGraphics | _Legended | _Labeled | _Annotation;

ToWebGraphics::fail = "``";
ToWebGraphics::ntwerr = "``";
ToWebGraphics // Options = {LightDark -> Automatic, "IncludeRuntime" -> True};
ToWebGraphics[graphics : $$graphicsP, opts : OptionsPattern[]] :=
	(
		$wgxInlineRuntime = TrueQ @ OptionValue["IncludeRuntime"];
		$lightDark =
			Replace[
				OptionValue[LightDark],
				{
					Automatic :> (
						Replace[Quiet[AbsoluteCurrentValue[LightDark]], $Failed -> "Light"]
					),
					"System"  -> "Light"
				}
			];
		CatchExceptions[
			serialize[graphics],
			{
				ToWebGraphicsError        -> mainErrorHandler,
				ToWebGraphicsNetworkError -> networkErrorHandler
			}
		]
	);

(* ::Section:: *) (* Public Runtime Helpers *)
CreateWebGraphicsRuntime[] :=
	CreateWebGraphicsRuntime[FileNameJoin[{Directory[], "wgx-runtime"}]];
CreateWebGraphicsRuntime[dir_String] :=
	Module[{},
		Enclose[
			If[!DirectoryQ[dir], Confirm @ CreateDirectory[dir]];
			Confirm @
			Export[FileNameJoin[{dir, "wgx.css"}], WebGraphicsRuntimeStyle[], "Text"];
			Confirm @
			Export[
				FileNameJoin[{dir, "wgx-runtime.js"}],
				WebGraphicsRuntimeScript[],
				"Text"
			];
			Confirm @
			Export[
				FileNameJoin[{dir, "wgx-runtime-lib-2d.js"}],
				WebGraphics2DRuntimeScript[],
				"Text"
			];
			Confirm @
			Export[
				FileNameJoin[{dir, "wgx-runtime-lib-3d.js"}],
				WebGraphics3DRuntimeScript[],
				"Text"
			];
			dir
		]
	]

WebGraphicsRuntimeStyle[] := WebGraphicsRuntimeStyle[] = $wgxStyle;

WebGraphicsRuntimeScript[] :=
	WebGraphicsRuntimeScript[] =
		Import[
			PacletObject["ToneAr/WebGraphics"]["AssetLocation", "wgx-runtime.js"],
			"Text"
		];

WebGraphics2DRuntimeScript[] :=
	WebGraphics2DRuntimeScript[] =
		Import[
			PacletObject["ToneAr/WebGraphics"][
				"AssetLocation",
				"wgx-runtime-lib-2d.js"
			],
			"Text"
		]

WebGraphics3DRuntimeScript[] :=
	WebGraphics3DRuntimeScript[] =
		Import[
			PacletObject["ToneAr/WebGraphics"][
				"AssetLocation",
				"wgx-runtime-lib-3d.js"
			],
			"Text"
		]

(* ::Section:: *) (* Error Handlers *)
networkErrorHandler[e_] :=
	Switch[e["StatusCode"],
		_Integer,
			Message[
				ToWebGraphics::ntwerr,
				GenerateHTTPResponse[HTTPErrorResponse[e["StatusCode"]]][
					"StatusCodeDescription"
				]
			],
		_,
			Message[
				ToWebGraphics::ntwerr,
				Replace[
					e["Information"],
					Except[_String] -> "Unspecified network error"
				]
			]
	]

mainErrorHandler[e_] :=
	Message[
		ToWebGraphics::fail,
		Replace[e["Information"], Except[_String] -> "Unspecified error"]
	];
