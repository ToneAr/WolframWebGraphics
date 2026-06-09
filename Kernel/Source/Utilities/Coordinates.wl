(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		xPx,
		yPx,
		wPx,
		hPx,
		pointPx,
		graphicsPointQ,
		graphicsPtsQ,
		ptStr,
		ptsStr,
		openPath,
		closedPath,
		circlePts,
		forkBag,
		styleAttr,
		uid
	}
];
(*
 * SVG y points DOWN and optionsToGlobalSvgProps emits a viewBox whose min-y
 * is -ymax, so every data y is negated here. Text and rasters are positioned
 * at -y but NOT mirrored, so they read the right way up. All attribute values
 * are strings.
 *)
(* Data coordinate -> Pixel string *)
xPx[x_] := makeSvgNumber[mapX[x]];

yPx[y_] := makeSvgNumber[mapY[y]];

(* Data-space length -> Pixel length *)
wPx[d_] := makeSvgNumber[sclX[]  d];

hPx[d_] := makeSvgNumber[sclY[]  d];

pointPx[{x_?NumericQ, y_?NumericQ}] := {mapX[x], mapY[y]};
pointPx[Scaled[{sx_?NumericQ, sy_?NumericQ}]] :=
	pointPx[resolveScaledPt[{sx, sy}]];
pointPx[
	Scaled[{sx_?NumericQ, sy_?NumericQ}, base : {_?NumericQ, _?NumericQ}]
] :=
	pointPx[resolveScaledPt[{sx, sy}, base]];
pointPx[Offset[{dx_?NumericQ, dy_?NumericQ}, base_?graphicsPointQ]] :=
	With[{p = pointPx[base]}, {p[[1]] + dx, p[[2]] - dy}];

graphicsPointQ[{_?NumericQ, _?NumericQ}] := True;
graphicsPointQ[Scaled[{_?NumericQ, _?NumericQ}]] := True;
graphicsPointQ[Scaled[{_?NumericQ, _?NumericQ}, {_?NumericQ, _?NumericQ}]] :=
	True;
graphicsPointQ[Offset[{_?NumericQ, _?NumericQ}, base_?graphicsPointQ]] := True;
graphicsPointQ[_] := False;

graphicsPtsQ[pts_] := MatchQ[pts, {__}] && AllTrue[pts, graphicsPointQ];

ptStr[p_?graphicsPointQ] :=
	With[{px = pointPx[p]},
		StringJoin[ makeSvgNumber[px[[1]]], ",", makeSvgNumber[px[[2]]]]
	];

ptsStr[pts_List] := StringRiffle[ptStr /@ pts, " "];

openPath[pts_] :=
	(* path sub-strings (y already flipped via ptStr) *)
	StringJoin[
		"M ",
		ptStr[First[pts]],
		(StringJoin[ " L ", ptStr[#]])& /@ Rest[pts]
	];

closedPath[pts_] := StringJoin[ openPath[pts], " Z"];

circlePts[{cx_, cy_}, r_, {a1_, a2_}] :=
	(* sampled points along a circular arc, in DATA coordinates *)
	Module[{
			nseg = Max[2, Ceiling[Abs[a2 - a1] / (Pi / 60)]]
		},
		Table[{cx + r  Cos[t], cy + r  Sin[t]}, {t, a1, a2, (a2 - a1) / nseg}]
	];

(* fork the style scope so a group's directives cannot leak to siblings *)
forkBag[props_] := Internal`Bag[Internal`BagPart[props, All]];

styleAttr[props_, type_] := Sequence @@ getCurrentStyleProps[props, type];

uid[prefix_] := CreateUUID[StringJoin[ prefix, "-"]];
