#!/usr/bin/env wolframscript
(* Reproduce: do 2D interactive elements survive the gallery template path? *)
here = DirectoryName[$InputFileName];
PacletDirectoryLoad[ParentDirectory[here]];
Needs["ToneAr`WebGraphics`"];

interactive =
	BarChart[{3, 1, 4, 1, 5}, ChartLabels -> {"a", "b", "c", "d", "e"}];

(* --- Path A: individual inline (IncludeRuntime -> True) --- *)
inlineXml = ToWebGraphics[interactive, "IncludeRuntime" -> True];
inlineStr = ExportString[inlineXml, "XML"];
Print["=== INLINE (IncludeRuntime->True) ==="];
Print["has <script ...: ", StringContainsQ[inlineStr, "<script"]];
Print["has data-wgx-: ", StringContainsQ[inlineStr, "data-wgx-"]];
Print["root id wgx: ", StringContainsQ[inlineStr, "id=\"wgx"]];

(* --- Path B: gallery template (IncludeRuntime -> False) --- *)
examples = {{"Bars", "desc", interactive, ""}};

html =
	XMLTemplate[
		File @
		PacletObject["ToneAr/WebGraphics"]["AssetLocation", "demo.template.html"]
	][
		<|
			"version"    -> PacletObject["ToneAr/WebGraphics"]["Version"],
			"demo-style" -> "<style>/*x*/</style>",
			"rt-style"   -> StringJoin["<style>", WebGraphicsRuntimeStyle[], "</style>"],
			"lib2d"      -> StringJoin["<script>", WebGraphics2DInlineScript[], "</script>"],
			"lib3d"      -> "",
			"examples"   -> examples
		|>
	];

galleryStr = ExportString[ExportForm[html, "HTML"], "String"];

Export[FileNameJoin[{here, "repro-gallery-out.html"}], galleryStr, "Text"];

Print["\n=== GALLERY (IncludeRuntime->False) ==="];
Print["length: ", StringLength[galleryStr]];
Print["has literal <script>: ", StringContainsQ[galleryStr, "<script>"]];
Print["has escaped &lt;script&gt;: ", StringContainsQ[galleryStr, "&lt;script&gt;"]];
Print["has data-wgx-: ", StringContainsQ[galleryStr, "data-wgx-"]];
Print["has escaped data-wgx (in text): ", StringContainsQ[galleryStr, "&lt;svg"]];
Print["root id wgx: ", StringContainsQ[galleryStr, "id=\"wgx"]];
Print["new SVGRuntime present: ", StringContainsQ[galleryStr, "SVGRuntime"] || StringContainsQ[galleryStr, "querySelectorAll"]];

(* show the <head> region around the lib2d script *)
headIdx = First[StringPosition[galleryStr, "</title>"], {0, 0}][[1]];
Print["\n--- head excerpt (around lib2d) ---"];
Print[StringTake[galleryStr, {Max[1, headIdx], Min[StringLength[galleryStr], headIdx + 220]}]];
