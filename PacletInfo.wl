PacletObject[
	<|
		"Name"        -> "ToneAr/WebGraphics",
		"Version"     -> "0.5.0",
		"Description" -> "Interactive Wolfram Web Graphics",
		"Extensions"  -> {
			{"Kernel", "Root" -> "Kernel", "Context" -> "ToneAr`WebGraphics`"},
			{
				"Asset",
				"Root"   -> "Resources",
				"Assets" -> {
					{"wgx.css", "CSS/wgx.css"},
					{"three.min.js", "JS/three.min.js"},
					{"OrbitControls.js", "JS/OrbitControls.js"},
					{"demo.template.html", "HTML/demo.template.html"},
					{"demo.css", "CSS/demo.css"}
				}
			},
			{
				"Asset",
				"Root"   -> "WebRuntime",
				"Assets" -> {
					{"SvgRuntime.js", "SvgRuntime.js"},
					{"ThreeRuntime.js", "ThreeRuntime.js"}
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
