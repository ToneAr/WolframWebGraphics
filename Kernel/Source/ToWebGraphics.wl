serialize // PackageScoped;
ToWebGraphicsError // PackageScoped;
ToWebGraphicsNetworkError // PackageScoped;

ToWebGraphics // PackageExported;
ToWebGraphics::fail = "``";
ToWebGraphics::ntwerr = "``";
ToWebGraphics // Options = {LightDark -> Automatic};
ToWebGraphics[
	graphics : _Graphics | _Graphics3D | _GeoGraphics,
	opts : OptionsPattern[]
] :=
	(
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
