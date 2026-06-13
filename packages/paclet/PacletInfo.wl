(* ::Package:: *)
PacletObject[
	<|
		"Name"           -> "ToneAr/WebGraphics",
		"Description"    -> "Interactive Wolfram Web Graphics",
		"Creator"        -> "Antonis Aristeidou",
		"PublisherID"    -> "ToneAr",
		"Version"        -> "0.6.0",
		"WolframVersion" -> "15+",
		"PrimaryContext" -> "ToneAr`WebGraphics`",
		"Extensions"     -> {
			{
				"Kernel",
				"Root"    -> "Kernel",
				"Context" -> "ToneAr`WebGraphics`",
				"Symbols" -> {"ToneAr`WebGraphics`ToWebGraphics"}
			},
			{"Documentation", "Root" -> "Docs"},
			{
				"Asset",
				"Root"   -> "Assets",
				"Assets" -> {
					{"demo.template.html", "demo.template.html"},
					{"demo.css", "demo.css"}
				}
			},
			{
				"Asset",
				"Root"   -> "WebRuntime",
				"Assets" -> {
					{"wgx.css", "wgx.css"},
					{"wgx-lib-2d.js", "wgx-lib-2d.js"},
					{"wgx-lib-3d.js", "wgx-lib-3d.js"},
					{"wgx-runtime.js", "wgx-runtime.js"},
					{"wgx-runtime-lib-2d.js", "wgx-runtime-lib-2d.js"},
					{"wgx-runtime-lib-3d.js", "wgx-runtime-lib-3d.js"}
				}
			},
			{
				"Asset",
				"Root"   -> "Tests",
				"Assets" -> {
					{"generate-demo.wls", "generate-demo.wls"},
					{"run.wls", "run.wls"},
					{"SerializeTests.wlt", "SerializeTests.wlt"}
				}
			}
		}
	|>
]