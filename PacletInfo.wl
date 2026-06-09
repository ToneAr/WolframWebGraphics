(* ::Package:: *)
PacletObject[
	<|
		"Name"           -> "ToneAr/WebGraphics",
		"Description"    -> "Interactive Wolfram Web Graphics",
		"Creator"        -> "Antonis Aristeidou",
		"PublisherID"    -> "ToneAr",
		"Version"        -> "0.5.1",
		"WolframVersion" -> "15+",
		"PrimaryContext" -> "ToneAr`WebGraphics`",
		"Extensions"     -> {
			{
				"Kernel",
				"Root"    -> "Kernel",
				"Context" -> "ToneAr`WebGraphics`",
				"Symbols" -> {"ToneAr`WebGraphics`ToWebGraphics"}
			},
			{"Documentation"},
			{
				"Asset",
				"Root"   -> "Resources",
				"Assets" -> {
					{"demo.template.html", "demo.template.html"},
					{"demo.css", "demo.css"}
				}
			},
			{
				"Asset",
				"Root"   -> "WebRuntime",
				"Assets" -> {
					{"SvgRuntime.js", "SvgRuntime.js"},
					{"ThreeRuntime.js", "ThreeRuntime.js"},
					{"three.min.js", "three.min.js"},
					{"OrbitControls.js", "OrbitControls.js"},
					{"wgx.css", "wgx.css"}
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
