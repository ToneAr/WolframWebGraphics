PackageExported[
	{
		ToWebGraphics,
		WebGraphicsRuntimeStyle,
		WebGraphics3DRuntimeScript,
		WebGraphics3DInlineScript,
		WebGraphics2DRuntimeScript,
		WebGraphics2DInlineScript,
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
			{ToWebGraphicsError -> mainErrorHandler}
		]
	);

(* ::Section:: *) (* Public Runtime Helpers *)
(* -------------------------------------------------------------------------- *)
(* ::Subsection:: *) (* CreateWebGraphicsRuntime *)
(* Description:  Description
 * Return:       ReturnPattern
 *)
CreateWebGraphicsRuntime // Options = {Options[Export] // Splice}
CreateWebGraphicsRuntime[opts : OptionsPattern[]] :=
	CreateWebGraphicsRuntime[FileNameJoin[{Directory[], "wgx-runtime"}], opts];
CreateWebGraphicsRuntime[dir_String, opts : OptionsPattern[]] :=
	Module[{fileBag = Internal`Bag[]},
		Enclose[
			If[!DirectoryQ[dir], Confirm @ CreateDirectory[dir]];
			Function[
				Internal`StuffBag[
					fileBag,
					Export[FileNameJoin[{dir, #1}], #2, "Text"],
					Sequence @@ FilterRules[{opts}, Options[Export]]
				]
			] @@@ {
				{"wgx.css", WebGraphicsRuntimeStyle[]},
				{"wgx-runtime.js", WebGraphicsRuntimeScript[]},
				{"wgx-runtime-lib-2d.js", WebGraphics2DRuntimeScript[]},
				{"wgx-runtime-lib-3d.js", WebGraphics3DRuntimeScript[]}
			};
			Internal`BagPart[fileBag, All]
		]
	];

WebGraphicsRuntimeStyle[] := WebGraphicsRuntimeStyle[] = $wgxStyle;

WebGraphicsRuntimeScript[] :=
	WebGraphicsRuntimeScript[] =
		Import[
			PacletObject["ToneAr/WebGraphics"]["AssetLocation", "wgx-runtime.js"],
			"Text"
		];

WebGraphics2DInlineScript[] :=
	WebGraphics2DInlineScript[] =
		Import[
			PacletObject["ToneAr/WebGraphics"]["AssetLocation", "wgx-lib-2d.js"],
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

WebGraphics3DInlineScript[] :=
	WebGraphics3DInlineScript[] =
		Import[
			PacletObject["ToneAr/WebGraphics"]["AssetLocation", "wgx-lib-3d.js"],
			"Text"
		];

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