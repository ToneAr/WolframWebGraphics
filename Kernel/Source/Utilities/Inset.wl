(* wl-disable-file DocCommentInputMismatch *)
PackageScoped[
	{
		insetPositionPx,
		insetTargetSize,
		insetHorizontal,
		insetVertical,
		insetAnchor,
		insetGraphic
	}
];

insetPositionPx[{x_?NumericQ, y_?NumericQ}] := {mapX[x], mapY[y]};
insetPositionPx[
	Offset[{dx_?NumericQ, dy_?NumericQ}, {x_?NumericQ, y_?NumericQ}]
] :=
	{mapX[x] + dx, mapY[y] - dy};
insetPositionPx[_] := Missing[];

insetTargetSize[Automatic, wh_] := wh;
insetTargetSize[{w_?NumericQ, h_?NumericQ}, _] := {sclX[]  w, sclY[]  h};
insetTargetSize[s_?NumericQ, _] := {sclX[]  s, sclY[]  s};
insetTargetSize[_, wh_] := wh;

insetHorizontal[Left] = 0;
insetHorizontal[Center] = 0.5;
insetHorizontal[Right] = 1;
insetHorizontal[_] = 0.5;

insetVertical[Bottom] = 0;
insetVertical[Center] = 0.5;
insetVertical[Top] = 1;
insetVertical[_] = 0.5;

insetAnchor[{x_, y_}] := {insetHorizontal[x], insetVertical[y]};
insetAnchor[Center] := {0.5, 0.5};
insetAnchor[_] := {0.5, 0.5};

insetGraphic[g_, posPx_, opos_, size_] :=
	Module[{
			inner,
			attrs,
			children,
			wh,
			target,
			scale,
			anchor,
			pos
		},
		inner = svgElement[g];
		{attrs, children} =
			inner /. XMLElement["svg", a_, c_] :> {Association[a], c};
		wh = ToExpression /@ Lookup[attrs, {"width", "height"}, {"0", "0"}];
		target = insetTargetSize[size, wh];
		scale = target / wh;
		anchor = insetAnchor[opos];
		pos = posPx - {anchor[[1]]  target[[1]], (1 - anchor[[2]])  target[[2]]};
		XMLElement[
			"g",
			{
				"transform" ->
					StringJoin[
						"translate(",
						makeSvgNumber[pos[[1]]],
						" ",
						makeSvgNumber[pos[[2]]],
						") scale(",
						makeSvgNumber[scale[[1]]],
						" ",
						makeSvgNumber[scale[[2]]],
						")"
					]
			},
			DeleteCases[children, Null]
		]
	];