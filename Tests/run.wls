#!/usr/bin/env wolframscript
(* Load the WebGraphics paclet from this repo and run the unit tests. *)
testsDir = DirectoryName[$InputFileName];

repo = ParentDirectory[testsDir];

PacletDirectoryLoad[repo];
Needs["ToneAr`WebGraphics`"];

report = TestReport[FileNameJoin[{testsDir, "SerializeTests.wlt"}]];

results = Values[report["TestResults"]];

failed = Select[results, #["Outcome"] =!= "Success"&];

Print["============================================"];
Print[
	"WebGraphics tests: ",
	report["TestsSucceededCount"],
	" passed, ",
	report["TestsFailedCount"],
	" failed (of ",
	Length[results],
	")"
];
Print["============================================"];

If[failed =!= {},
	Print["FAILURES:"];
	Scan[
		Print[
			"  [",
			#["Outcome"],
			"] ",
			#["TestID"],
			"\n     expected: ",
			#["ExpectedOutput"],
			"\n     actual:   ",
			#["ActualOutput"]
		]&,
		failed
	]
];

Exit[If[TrueQ[report["AllTestsSucceeded"]], 0, 1]];