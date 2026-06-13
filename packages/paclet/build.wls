#!/usr/bin/wolframscript
CL = ResourceFunction["CommandLineTools"];
SetOptions[CL, "POSIX" -> True];
<<"PacletManager`";
<<"PacletTools`";
pacletRoot = DirectoryName[$InputFileName];

runtimeRoot = FileNameJoin[{ParentDirectory @ pacletRoot, "runtime"}];

(* Build runtime if necessary *)
If[Or[!DirectoryQ[FileNameJoin[{runtimeRoot, "dist"}]], CL["Parse", "b"]],
	CL["Log", "INFO", "Building JS runtime"];
	Run[StringJoin[ "bun run --cwd ", runtimeRoot, " build"]] //
	Function[
		If[# =!= 0,
			CL["Log", "FAIL", "JS runtime build failed"];
			Exit[#]
		]
	]
];

(* Copy bundled runtime to paclet root *)
If[!DirectoryQ[FileNameJoin[{pacletRoot, "WebRuntime"}]],
	CL["Log", "INFO", "Creating WebRuntime directory in paclet root"];
	CreateDirectory[
		FileNameJoin[{pacletRoot, "WebRuntime"}],
		CreateIntermediateDirectories -> True
	]
];
(* Clear stale bundles first so renamed/removed entries don't linger *)
FileNames["*.js" | "*.css", FileNameJoin[{pacletRoot, "WebRuntime"}]] //
Map[DeleteFile];
FileNames["*.js" | "*.css", FileNameJoin[{runtimeRoot, "dist"}], Infinity] //
Map[
	CopyFile[
		#,
		FileNameJoin[{pacletRoot, "WebRuntime", FileNameTake[#]}],
		OverwriteTarget -> True
	]&
];

(* Build archive *)
With[{
		buildDir = FileNameJoin[{ParentDirectory[pacletRoot, 2], "build", "Paclet"}]
	},
	If[!DirectoryQ[buildDir],
		CreateDirectory[buildDir, CreateIntermediateDirectories -> True]
	];
	PacletTools`PacletBuild[pacletRoot, buildDir] //
	Function[
		If[FailureQ[#],
			CL["Log", "FAIL", "Paclet build failed"];
			Exit[1]
		]
	]
];

CL["Log", "SUCC", "Build Successful"];