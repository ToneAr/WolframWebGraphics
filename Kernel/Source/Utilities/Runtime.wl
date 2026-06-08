PackageScoped[
	{
		statusNode,
		runtimeNodes,
		$wgxNeedsRuntime,
		$wgxCurve,
		$wgxStyle,
		wgxSvgRuntimeScript
	}
]

(*
 * Once-per-document interactivity runtime (style + script + status)
 *)
$wgxNeedsRuntime = False;

(*
 * Set while serialising the content of a plot's HighlightElements annotation,
 * so the data curve(s) inside get marked .wgx-curve for the coordinate tool
 *)
$wgxCurve = False;

(*
 * script/style go in CDATA so quotes, <, >, && survive verbatim
 * ExportString would otherwise entity-escape them and break inline-HTML
 * contexts
 *)
runtimeNodes[props_] :=
	{
		XMLElement["style", {}, {XMLObject["CDATASection"][$wgxStyle]}],
		XMLElement[
			"script",
			{},
			{XMLObject["CDATASection"][wgxSvgRuntimeScript[]]}
		],
		statusNode[Lookup[props, "viewBox", Missing[]]]
	};

statusNode[Missing[___]] :=
	XMLElement[
		"text",
		{"id" -> "wgx-status", "class" -> "wgx-status", "x" -> "0", "y" -> "0"},
		{}
	];
statusNode[vb_String] :=
	Module[{c = ToExpression /@ StringSplit[vb]},
		XMLElement[
			"text",
			{
				"id"        -> "wgx-status",
				"class"     -> "wgx-status",
				"x"         -> makeSvgNumber[c[[1]] + 0.02  c[[3]]],
				"y"         -> makeSvgNumber[c[[2]] + 0.97  c[[4]]],
				"font-size" -> makeSvgNumber[ptToUser[10]]
			},
			{}
		]
	];

$wgxStyle =
	compactifyCSS @
	Import[
		PacletObject["ToneAr/WebGraphics"]["AssetLocation", "wgx.css"],
		"Text"
	];

wgxSvgRuntimeScript[] :=
	wgxSvgRuntimeScript[] =
		Import[
			PacletObject["ToneAr/WebGraphics"]["AssetLocation", "SvgRuntime.js"],
			"Text"
		];
