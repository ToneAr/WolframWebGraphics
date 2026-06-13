serialize[Text[expr_, {x_?NumericQ, y_?NumericQ}], props_] :=
	textSvg[expr, {x, y}, {0, 0}, props];
serialize[
	Text[
		expr_,
		{x_?NumericQ, y_?NumericQ},
		{ox_?NumericQ, oy_?NumericQ},
		rest___
	],
	props_
] :=
	textSvg[expr, {x, y}, {ox, oy}, props];
serialize[
	Text[
		expr_,
		Offset[{dx_?NumericQ, dy_?NumericQ}, {x_?NumericQ, y_?NumericQ}],
		{ox_?NumericQ, oy_?NumericQ},
		rest___
	],
	props_
] :=
	(*
	 * Text positioned by Offset[{dx,dy},{x,y}]: data point mapped to px then an
	 * absolute pixel shift. WL +dy is up; SVG y is down, so subtract dy.
	 *)
	textSvgPx[expr, {mapX[x] + dx, mapY[y] - dy}, {ox, oy}, props];
serialize[
	Text[expr_, Offset[{dx_?NumericQ, dy_?NumericQ}, {x_?NumericQ, y_?NumericQ}]],
	props_
] :=
	textSvgPx[expr, {mapX[x] + dx, mapY[y] - dy}, {0, 0}, props];
serialize[
	Text[
		expr_,
		pos_?graphicsPointQ,
		ImageScaled[{sx_?NumericQ, sy_?NumericQ}],
		rest___
	],
	props_
] :=
	textSvgPx[expr, pointPx[pos], {2  sx - 1, 2  sy - 1}, props];
serialize[
	Text[expr_, pos_?graphicsPointQ, {ox_?NumericQ, oy_?NumericQ}, rest___],
	props_
] :=
	textSvgPx[expr, pointPx[pos], {ox, oy}, props];
serialize[
	Text[
		expr_,
		pos_?graphicsPointQ,
		{h : Left | Center | Right, v : Bottom | Center | Top},
		rest___
	],
	props_
] :=
	(*
	 * Named alignment offset -- {Center, Bottom}, {Left, Top}, ... -- as emitted
	 * by GeoGraphics place labels.  Map each keyword to the numeric text offset in
	 * [-1, 1] (Left/Bottom -> -1, Center -> 0, Right/Top -> 1) and reuse the
	 * numeric rule.  A scalar Center means centered on both axes.
	 *)
	serialize[
		Text[expr, pos, {textAlignOffset[h], textAlignOffset[v]}, rest],
		props
	];
serialize[Text[expr_, pos_?graphicsPointQ, Center, rest___], props_] :=
	serialize[Text[expr, pos, {0, 0}, rest], props];
serialize[Text[expr_, pos_?graphicsPointQ], props_] :=
	textSvgPx[expr, pointPx[pos], {0, 0}, props];
serialize[Text[expr_, Scaled[{sx_?NumericQ, sy_?NumericQ}], rest___], props_] :=
	serialize[Text[expr, resolveScaledPt[{sx, sy}], rest], props];
