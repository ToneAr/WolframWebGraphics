PackageImport["XML`"];
PackageScoped[
	{
		statusNode,
		runtimeNodes,
		$wgxNeedsRuntime,
		$wgxInlineRuntime,
		$wgxCurve,
		$wgxStyle,
		wgxSvgRuntimeScript,
		wgx3DLibrary,
		wgx3DWidgetScript,
		scriptSafe,
		wgx3DLibraryTag,
		wgx3DWidgetLibraryTag,
		xmlTextEscape
	}
];

(* ::Section:: *) (* SVG *)
(*
 * Private tracker to ensure only one runtime per collection of graphics
 *)
$wgxNeedsRuntime = False;

(*
 * Can be disabled to manually include a single runtime in a page
 *)
$wgxInlineRuntime = True;

(*
 * Set while serialising the content of a plot's HighlightElements annotation,
 * so the data curve(s) inside get marked .wgx-curve for the coordinate tool
 *)
$wgxCurve = False;

(*
 * script/style content escapes only the three XML-significant characters
 * (`&`, `<`, `>`); quotes and everything else stay literal so the JS/CSS reads
 * normally and stays compact.  This keeps the document well-formed XML -- an
 * XML/SVG parser un-escapes the text before the JS engine sees it -- without
 * the over-escaping (`&quot;` everywhere) that a plain string child would get,
 * and without a CDATA section.  `&` is replaced first to avoid double-escaping.
 *)
xmlTextEscape[s_String] :=
	StringReplace[s, {"&" -> "&amp;", "<" -> "&lt;", ">" -> "&gt;"}];

runtimeNodes[props_] :=
	{
		XMLElement["style", {}, {XML`RawXML[xmlTextEscape[$wgxStyle]]}],
		XMLElement[
			"script",
			{},
			{XML`RawXML[xmlTextEscape[wgxSvgRuntimeScript[]]]}
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
			PacletObject["ToneAr/WebGraphics"]["AssetLocation", "wgx-lib-2d.js"],
			"Text"
		];

(* ::Section:: *) (* 3D *)
wgx3DLibrary[] :=
	wgx3DLibrary[] =
		Import[
			PacletObject["ToneAr/WebGraphics"]["AssetLocation", "wgx-lib-3d.js"],
			"Text"
		];

wgx3DWidgetScript[elementID_, sceneConfigJson_] :=
	StringJoin[
		"window.WGX3D.renderScene(",
		ExportString[elementID, "RawJSON", "Compact" -> True],
		",",
		sceneConfigJson,
		");"
	];

(* Protect against a literal </script in raw JS ending the element early *)
scriptSafe[js_] :=
	StringReplace[js, "</script" -> "<\\/script", IgnoreCase -> True];

wgx3DLibraryTag[] :=
	StringJoin[ "<script>", scriptSafe[wgx3DLibrary[]], "</script>"];

wgx3DWidgetLibraryTag[elementID_, sceneConfigJson_] :=
	StringJoin[
		"<script>",
		scriptSafe[wgx3DWidgetScript[elementID, sceneConfigJson]],
		"</script>"
	];
