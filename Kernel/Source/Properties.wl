(* wl-disable-file DocCommentInputMismatch *)
(* ============================================================= *)
(*  SVG style + global-option resolution                         *)
(* ============================================================= *)
(* ---- coordinate model (set by optionsToGlobalSvgProps) -----------------
   Everything is emitted in PIXEL space: the <svg> uses viewBox "0 0 w h" at
   1:1, so "user units" == CSS px and stroke widths / font sizes are absolute.
   Data coordinates are mapped to pixels by the affine mapX/mapY:

       px = mapAx*dataX + mapBx        py = mapAy*dataY + mapBy

   With a numeric PlotRange optionsToGlobalSvgProps fits the data range into
   the (optionally margined) pixel box; mapAy is negative (SVG y points down).
   Default (no range) is identity in x and a pure y-flip, so a bare primitive
   serialises in px-like data coords exactly as before.                      *)
$mapAx = 1.;

$mapBx = 0.;

$mapAy = -1.;

$mapBy = 0.;

$plotDataRange = {{0., 1.}, {0., 1.}}; (* data box, for Scaled resolution *)

resolveScaledPt // PackageScoped;
resolveScaledDelta // PackageScoped;

resolveScaledDelta[{sx_, sy_}] :=
	With[{
			xr = $plotDataRange[[1]],
			yr = $plotDataRange[[2]]
		},
		{sx  (xr[[2]] - xr[[1]]), sy  (yr[[2]] - yr[[1]])}
	];

resolveScaledPt[{sx_, sy_}] :=
	With[{
			xr = $plotDataRange[[1]],
			yr = $plotDataRange[[2]]
		},
		{xr[[1]] + sx  (xr[[2]] - xr[[1]]), yr[[1]] + sy  (yr[[2]] - yr[[1]])}
	];
resolveScaledPt[delta : {_, _}, base : {_, _}] :=
	base + resolveScaledDelta[delta];

$svgImageWidth = 360.; (* px width, for width-fraction sizes *)

$ptToPx = 96. / 72.; (* CSS pt -> px *)

mapX // PackageScoped;
mapY // PackageScoped;
resetMap // PackageScoped;
setMap // PackageScoped;

mapX[x_] := $mapAx * x + $mapBx;

mapY[y_] := $mapAy  y + $mapBy;

resetMap[] :=
	(
		$mapAx = 1.;
		$mapBx = 0.;
		$mapAy = -1.;
		$mapBy = 0.;
		$plotDataRange = {{0., 1.}, {0., 1.}};
	);

setMap[{{x1_, x2_}, {y1_, y2_}}, {l_, r_, b_, t_}, w_, h_] :=
	(
		$mapAx = (w - l - r) / (x2 - x1);
		$mapBx = l - x1 * $mapAx;
		$mapAy = -(h - t - b) / (y2 - y1);
		$mapBy = t - y2 * $mapAy;
		$plotDataRange = {{x1, x2}, {y1, y2}};
	);

(* px per data unit (positive); used for radii / tick lengths *)
sclX // PackageScoped;
sclY // PackageScoped;
sclX[] := Abs[$mapAx];

sclY[] := Abs[$mapAy];

(* save/restore the whole coordinate state around nested graphics *)
getMapState // PackageScoped;
setMapState // PackageScoped;
getMapState[] :=
	{$mapAx, $mapBx, $mapAy, $mapBy, $svgImageWidth, $plotDataRange};

setMapState[{ax_, bx_, ay_, by_, iw_, pdr_}] :=
	(
		$mapAx = ax;
		$mapBx = bx;
		$mapAy = ay;
		$mapBy = by;
		$svgImageWidth = iw;
		$plotDataRange = pdr;
	);

fracToUser // PackageScoped;
fracToUser[f_] := f * $svgImageWidth; (* width-fraction -> px *)

ptToUser // PackageScoped;
ptToUser[pt_] := pt * $ptToPx; (* pt -> px *)

(* Format a number for SVG: at most 4 decimal places, no trailing zeros,
   and crucially NO trailing dot. ToString[realNumber] is unsafe here -- it
   prints integer-valued reals as e.g. "270." and clamps to ~6 sig figs, and
   SVG parsers reject coordinate tokens like "270." (silently dropping the
   whole element). So build the decimal string from a scaled integer. *)
makeSvgNumber // PackageScoped;
makeSvgNumber[x_?NumericQ] :=
	StringReplace[
		ToString[Round[x, 0.0001] // InputForm],
		{
			(* Remove Trailing decimal points *)
			"." ~~ EndOfString -> "",
			"." ~~ d : Repeated[DigitCharacter, {1, 4}] ~~ ___ :> StringJoin[ ".", d]
		}
	]
makeSvgNumber[x_] := ToString[x];

xmlEsc[s_String] :=
	StringReplace[
		s,
		{"&" -> "&amp;", "\"" -> "&quot;", "<" -> "&lt;", ">" -> "&gt;"}
	];
xmlEsc[x_] := xmlEsc[ToString[x, InputForm]];

(* every WL color normalised through ColorConvert -> {hex, alpha} *)
colorSpecQ // PackageScoped;
colorSpecQ[_?ColorQ] := True;
colorSpecQ[{_?NumericQ, _?NumericQ, _?NumericQ}] := True;
colorSpecQ[{_?NumericQ, _?NumericQ, _?NumericQ, _?NumericQ}] := True;
colorSpecQ[_] := False;

normalizeColorSpec // PackageScoped;
normalizeColorSpec[col_?ColorQ] := col;
normalizeColorSpec[{r_?NumericQ, g_?NumericQ, b_?NumericQ}] :=
	RGBColor[Clip[{r, g, b}, {0, 1}]];
normalizeColorSpec[{r_?NumericQ, g_?NumericQ, b_?NumericQ, a_?NumericQ}] :=
	RGBColor[Clip[{r, g, b, a}, {0, 1}]];

colorToSvg // PackageScoped;
colorToSvg[col_?colorSpecQ] :=
	Module[{
			c = ColorConvert[normalizeColorSpec[col], "RGB"],
			r,
			g,
			b,
			a
		},
		{r, g, b} = Round[255  (List @@ c)[[1;;3]]];
		a = If[Length[c] >= 4, c[[4]], 1.];
		<|
			"rgb" ->
				StringJoin[ "#", IntegerString[Clip[#, {0, 255}], 16, 2]& /@ {r, g, b}],
			"alpha" -> a
		|>
	];

(* ---- symbolic-size tables ---------------------------------------------- *)
symbolicPt[Tiny] = 0.25;
symbolicPt[Small] = 0.5;
symbolicPt[Medium] = 1.;
symbolicPt[Large] = 2.;
symbolicPt[Automatic] = 1.;
symbolicPt[_] = 1.;

symbolicImage[Tiny] = 100.; symbolicImage[Small] = 180.;
symbolicImage[Medium] = 360.; symbolicImage[Large] = 720.;
symbolicImage[_] = 360.;

capToSvg["Butt"] = "butt"; capToSvg[None] = "butt";
capToSvg["Round"] = "round";
capToSvg["Square"] = "square";
capToSvg[_] = "butt";

joinToSvg["Round"] = "round";
joinToSvg["Bevel"] = "bevel";
joinToSvg["Miter"] = "miter";
joinToSvg[_] = "miter";

(* ---- directive -> resolved-dimension converters ------------------------ *)
thicknessToUser[Thickness[t_?NumericQ]] := fracToUser[t];
thicknessToUser[Thickness[s_]] := ptToUser[symbolicPt[s]];
thicknessToUser[AbsoluteThickness[t_?NumericQ]] := ptToUser[t];
thicknessToUser[AbsoluteThickness[s_]] := ptToUser[symbolicPt[s]];

dashingToUser[Dashed] := {fracToUser[0.025], fracToUser[0.01]};
dashingToUser[Dotted] := {fracToUser[0.01]};
dashingToUser[DotDashed] :=
	{fracToUser[0.025], fracToUser[0.01], fracToUser[0.01], fracToUser[0.01]};
dashingToUser[Dashing[None]] := None;
dashingToUser[Dashing[ds_List, ___]] := fracToUser /@ ds;
dashingToUser[Dashing[d_?NumericQ, ___]] := {fracToUser[d]};
dashingToUser[Dashing[s_, ___]] := {ptToUser[symbolicPt[s]]};
dashingToUser[AbsoluteDashing[ds_List, ___]] := ptToUser /@ ds;
dashingToUser[AbsoluteDashing[d_?NumericQ, ___]] := {ptToUser[d]};
dashingToUser[AbsoluteDashing[s_, ___]] := {ptToUser[symbolicPt[s]]};

(* radius in user units; PointSize fraction is a *diameter* *)
pointRadius[PointSize[s_?NumericQ]] := fracToUser[s] / 2;
pointRadius[PointSize[s_]] := ptToUser[symbolicPt[s]] / 2;
pointRadius[AbsolutePointSize[p_?NumericQ]] := ptToUser[p] / 2;
pointRadius[AbsolutePointSize[s_]] := ptToUser[symbolicPt[s]] / 2;

(* ---- the style state we fold the directive bag into -------------------- *)
$emptyStyle // PackageScoped;
applyDirective // PackageScoped;
$emptyStyle =
	<|
		"Color" -> Missing[],
		"Opacity" -> Missing[],
		"StrokeWidth" -> Missing[],
		"Dashing" -> Missing[],
		"LineCap" -> Missing[],
		"LineJoin" -> Missing[],
		"MiterLimit" -> Missing[],
		"PointRadius" -> Missing[],
		"Arrowheads" -> Missing[],
		"Filling" -> Missing[],
		"FontSize" -> Missing[],
		"FontFamily" -> Missing[],
		"FontWeight" -> Missing[],
		"FontSlant" -> Missing[],
		"FontColor" -> Missing[],
		"Underline" -> Missing[]
	|>;

$fullStyle := <|$emptyStyle, "Face" -> Missing[], "Edge" -> Missing[]|>;

chooseMissing[a_, b_] := If[MissingQ[a], b, a];

applyOpacity[st_, Opacity[a_]] := <|st, "Opacity" -> a|>;
applyOpacity[st_, Opacity[a_, c_]] := <|st, "Opacity" -> a, "Color" -> c|>;

applyJoin[st_, JoinForm[{"Miter", lim_}]] :=
	<|st, "LineJoin" -> "miter", "MiterLimit" -> lim|>;
applyJoin[st_, JoinForm[j_, lim_]] :=
	<|st, "LineJoin" -> joinToSvg[j], "MiterLimit" -> lim|>;
applyJoin[st_, JoinForm[j_]] := <|st, "LineJoin" -> joinToSvg[j]|>;

(* EdgeForm/FaceForm spec -> None (paint off) | resolved sub-style *)
parseSub[(EdgeForm | FaceForm)[None]] := None;
parseSub[(EdgeForm | FaceForm)[Automatic]] := $emptyStyle;
parseSub[(EdgeForm | FaceForm)[]] := $emptyStyle;
parseSub[(EdgeForm | FaceForm)[spec_]] :=
	Fold[applyDirective, $emptyStyle, {spec}];

applyDirective[st_, d_] :=
	Which[
		ColorQ[d],
		<|st, "Color" -> d|>,
		MatchQ[d, _LightDarkSwitched],
		applyDirective[st, chartingUnwrap[d]],
		MatchQ[d, _Opacity],
		applyOpacity[st, d],
		MatchQ[d, _Thickness | _AbsoluteThickness],
		<|st, "StrokeWidth" -> thicknessToUser[d]|>,
		MatchQ[d, _Dashing | _AbsoluteDashing | _Dashed | _Dotted | _DotDashed],
		<|st, "Dashing" -> dashingToUser[d]|>,
		MatchQ[d, _PointSize | _AbsolutePointSize],
		<|st, "PointRadius" -> pointRadius[d]|>,
		MatchQ[d, _CapForm],
		<|st, "LineCap" -> capToSvg[First[d]]|>,
		MatchQ[d, _JoinForm],
		applyJoin[st, d],
		MatchQ[d, _EdgeForm],
		<|st, "Edge" -> parseSub[d]|>,
		MatchQ[d, _FaceForm],
		<|st, "Face" -> parseSub[d]|>,
		MatchQ[d, _StrokeForm],
		Fold[applyDirective, st, List @@ d],
		MatchQ[d, _Arrowheads],
		<|st, "Arrowheads" -> d|>,
		MatchQ[d, _LinearGradientFilling | _RadialGradientFilling],
		<|st, "Filling" -> d|>,
		(* font directives (appear as graphics directives or Style[] specs) *)
		MatchQ[d, HoldPattern[FontSize -> _]],
		<|st, "FontSize" -> Last[d]|>,
		MatchQ[d, HoldPattern[FontFamily -> _]],
		<|st, "FontFamily" -> Last[d]|>,
		MatchQ[d, HoldPattern[FontWeight -> _]],
		<|st, "FontWeight" -> Last[d]|>,
		MatchQ[d, HoldPattern[FontSlant -> _]],
		<|st, "FontSlant" -> Last[d]|>,
		MatchQ[d, HoldPattern[FontColor -> _]],
		<|st, "FontColor" -> Last[d]|>,
		MatchQ[d, HoldPattern[LineColor -> _]],
		<|st, "Color" -> Last[d]|>,
		MatchQ[d, HoldPattern[GraphicsColor -> _]],
		<|st, "Color" -> Last[d], "FontColor" -> Last[d]|>,
		NumericQ[d],
		<|st, "FontSize" -> d|>,
		d === Bold,
		<|st, "FontWeight" -> "Bold"|>,
		d === Italic,
		<|st, "FontSlant" -> "Italic"|>,
		d === Plain,
		<|st, "FontWeight" -> "Normal", "FontSlant" -> "Normal"|>,
		d === Underlined,
		<|st, "Underline" -> True|>,
		MatchQ[d, _Directive],
		Fold[applyDirective, st, List @@ d],
		MatchQ[d, _List],
		Fold[applyDirective, st, d],
		True,
		st (* ignore unknown / geometry *)
	];

styleItems[bag_] :=
	If[Head[bag] === Internal`Bag, Internal`BagPart[bag, All], bag];

resolveStyleState[bag_] := Fold[applyDirective, $fullStyle, styleItems[bag]];

(* ---- emit attribute associations (only non-defaults) ------------------- *)
emitFill[a_, col_, op_] :=
	If[MissingQ[col],
		a,
		Module[{c = colorToSvg[col], o, a2},
			o = (op /. _Missing -> 1.) * c["alpha"];
			a2 = <|a, "fill" -> c["rgb"]|>;
			If[o < 1, a2["fill-opacity"] = makeSvgNumber[o]];
			a2
		]
	];

emitStroke[a_, s_] :=
	Module[{a2 = a, c, o, d = s["Dashing"]},
		If[!MissingQ[s["Color"]],
			c = colorToSvg[s["Color"]];
			o = (s["Opacity"] /. _Missing -> 1.) * c["alpha"];
			a2["stroke"] = c["rgb"];
			If[o < 1, a2["stroke-opacity"] = makeSvgNumber[o]]
		];
		If[!MissingQ[s["StrokeWidth"]],
			a2["stroke-width"] = makeSvgNumber[s["StrokeWidth"]]
		];
		If[ListQ[d],
			a2["stroke-dasharray"] = StringRiffle[makeSvgNumber /@ d, ","]
		];
		If[!MissingQ[s["LineCap"]], a2["stroke-linecap"] = s["LineCap"]];
		If[!MissingQ[s["LineJoin"]], a2["stroke-linejoin"] = s["LineJoin"]];
		If[!MissingQ[s["MiterLimit"]],
			a2["stroke-miterlimit"] = makeSvgNumber[s["MiterLimit"]]
		];
		a2
	];

(* edge sub-style falls back to the main directive scope for unset fields *)
mergeEdge[edge_, st_] :=
	<|
		"Color" -> chooseMissing[edge["Color"], st["Color"]],
		"Opacity" -> chooseMissing[edge["Opacity"], st["Opacity"]],
		(* hairline default so an edge with no Thickness isn't 1 user unit wide *)
		"StrokeWidth" -> Replace[
			chooseMissing[edge["StrokeWidth"], st["StrokeWidth"]],
			_Missing :> ptToUser[1.]
		],
		"Dashing" -> chooseMissing[edge["Dashing"], st["Dashing"]],
		"LineCap" -> chooseMissing[edge["LineCap"], st["LineCap"]],
		"LineJoin" -> chooseMissing[edge["LineJoin"], st["LineJoin"]],
		"MiterLimit" -> chooseMissing[edge["MiterLimit"], st["MiterLimit"]]
	|>;

styleAttrs[st_, "Filled"] :=
	Module[
		{a = <||>, face = st["Face"], edge = st["Edge"]},
		(* face / fill *)
		Which[ face === None, a = <|a, "fill" -> "none"|>, AssociationQ[face], a = emitFill[a, chooseMissing[face["Color"], st["Color"]], chooseMissing[face["Opacity"], st["Opacity"]]], True, a = emitFill[a, st["Color"], st["Opacity"]]];  (* bare colour fills *)
		(* edge / stroke: only present when EdgeForm was given *)
		Which[
			edge === None,
			Null, (* explicit no edge *)
			AssociationQ[edge],
			a = emitStroke[a, mergeEdge[edge, st]],
			True,
			Null
		]; (* WL default: no edge *)
		a
	];
styleAttrs[st_, "Stroke"] :=
	Module[{a = <|"fill" -> "none"|>},
		emitStroke[
			a,
			<|
				"Color" -> chooseMissing[
					st["Color"],
					Black
				], (* WL lines default black *)
				"Opacity" -> st["Opacity"],
				"StrokeWidth" -> chooseMissing[
					st["StrokeWidth"],
					ptToUser[1.]
				], (* ~1pt hairline default *)
				"Dashing" -> st["Dashing"],
				"LineCap" -> st["LineCap"],
				"LineJoin" -> st["LineJoin"],
				"MiterLimit" -> st["MiterLimit"]
			|>
		]
	];
styleAttrs[st_, "Point"] :=
	emitFill[<||>, chooseMissing[st["Color"], Black], st["Opacity"]];
styleAttrs[st_, _] := styleAttrs[st, "Filled"]; (* sane fallback *)

buildAttrs[a_Association] :=
	StringRiffle[KeyValueMap[StringJoin[ #1, "=\"", xmlEsc[#2], "\""]&, a], " "];

(* bonus: Point geometry needs the resolved radius (it's not an attribute) *)
getCurrentPointRadius // PackageScoped;
getCurrentPointRadius[bag_] :=
	Replace[resolveStyleState[bag]["PointRadius"], _Missing :> fracToUser[0.008]];

imageSizeToWH[{w_?NumericQ, h_?NumericQ}] := {N[w], N[h]};
imageSizeToWH[{w_?NumericQ, _}] := {N[w], Missing[]};
imageSizeToWH[n_?NumericQ] := {N[n], Missing[]};
imageSizeToWH[s_Symbol] := {symbolicImage[s], Missing[]};
imageSizeToWH[_] := {360., Missing[]};

getCurrentStyleProps // PackageScoped;
getCurrentStyleProps[bag_] := getCurrentStyleProps[bag, "Filled"];
getCurrentStyleProps[bag_, type_String] :=
	Normal[ToString /@ styleAttrs[resolveStyleState[bag], type]];

(* ---- text / font resolution ------------------------------------------- *)
symbolicFont[Tiny] = 8.;
symbolicFont[Small] = 9.;
symbolicFont[Medium] = 12.;
symbolicFont[Large] = 16.;
symbolicFont[Automatic] = 12.;
symbolicFont[_] = 12.;

fontSizeToUser[s_?NumericQ] := ptToUser[s];
fontSizeToUser[Scaled[f_]] := fracToUser[f];
fontSizeToUser[s_] := ptToUser[symbolicFont[s]];

fontWeightToSvg[w_?NumericQ] := ToString[Round[w]];
fontWeightToSvg[w_] :=
	Switch[w,
		Bold | "Bold",
			"bold",
		Plain | "Plain",
			"normal",
		_,
			ToLowerCase[ToString[w]]
	];

fontSlantToSvg[s_] :=
	Switch[s, Italic | "Italic" | "Oblique", "italic", _, "normal"];

(* extra specs let Text[Style[expr, ...]] feed font options into resolution *)
getCurrentTextProps // PackageScoped;
getCurrentTextProps[bag_] := getCurrentTextProps[bag, {}];
getCurrentTextProps[bag_, extra_List] :=
	Module[{
			st = Fold[applyDirective, resolveStyleState[bag], extra],
			a
		},
		a =
			emitFill[
				<||>,
				chooseMissing[st["FontColor"], chooseMissing[st["Color"], Black]],
				st["Opacity"]
			];
		a["font-size"] =
			makeSvgNumber[fontSizeToUser[chooseMissing[st["FontSize"], 12]]];
		If[!MissingQ[st["FontFamily"]],
			a["font-family"] = ToString[st["FontFamily"]]
		];
		If[!MissingQ[st["FontWeight"]],
			a["font-weight"] = fontWeightToSvg[st["FontWeight"]]
		];
		If[!MissingQ[st["FontSlant"]],
			a["font-style"] = fontSlantToSvg[st["FontSlant"]]
		];
		If[st["Underline"] === True, a["text-decoration"] = "underline"];
		Normal[ToString /@ a]
	];

(* the active gradient-fill directive (LinearGradientFilling/...), or None *)
getCurrentFilling // PackageScoped;
getCurrentFilling[bag_] :=
	Replace[resolveStyleState[bag]["Filling"], _Missing -> None];

(* the active Arrowheads directive, or Automatic *)
getCurrentArrowheads // PackageScoped;
getCurrentArrowheads[bag_] :=
	Replace[resolveStyleState[bag]["Arrowheads"], _Missing -> Automatic];

axisLabelMarginSpecs[o_] :=
	Flatten[{Replace[Lookup[o, LabelStyle, {}], None | Automatic -> {}]}];

axisLabelPixelWidth[label_, o_] :=
	Module[{content, specs, textProps},
		{content, specs} = textExtract[label];
		textProps =
			getCurrentTextProps[
				Internal`Bag[],
				Join[{FontSize -> 12}, axisLabelMarginSpecs[o], specs]
			];
		First[labelApproxSize[content, textProps]]
	];

axisLabelRightExtra[o_, w_, base_] :=
	Module[{labels = Lookup[o, AxesLabel, None], width},
		If[!MatchQ[labels, {_, _}] || MatchQ[labels[[1]], None | Automatic],
			0.06 * w,
			width = axisLabelPixelWidth[labels[[1]], o];
			Max[0.06 * w, width + ptToUser[8] - base]
		]
	];

tickMarginTupleQ[x_] := MatchQ[x, {_?NumericQ, ___}];
tickMarginSpecPairQ[x_] :=
	ListQ[x] && Length[x] === 2 && !tickMarginTupleQ[x];

tickLabelMissingQ[label_] :=
	label === "" ||
	MatchQ[
		label,
		None | Automatic | Missing[___] | Spacer[___] | {} | {None..} |
			{{None..}..}
	];

styleMarginRuleQ[_Rule | _RuleDelayed] := True;
styleMarginRuleQ[_] := False;
styleMarginRuleListQ[x_List] := AllTrue[x, styleMarginRuleQ];
styleMarginPairQ[x_List] :=
	Length[x] === 2 && !styleMarginRuleListQ[x] && Head[x] =!= Directive;
styleMarginPairQ[_] := False;

axisMarginSideStyle[spec_, i_] :=
	Module[{s = Replace[spec, None | Automatic -> {}]},
		If[styleMarginPairQ[s], s[[i]], s]
	];

frameMarginSideIndex["Left"] = {1, 1};
frameMarginSideIndex["Right"] = {1, 2};
frameMarginSideIndex["Bottom"] = {2, 1};
frameMarginSideIndex["Top"] = {2, 2};

frameMarginFlatIndex["Bottom"] = 1;
frameMarginFlatIndex["Left"] = 2;
frameMarginFlatIndex["Top"] = 3;
frameMarginFlatIndex["Right"] = 4;

frameMarginSideStyle[spec_, side_] :=
	Module[{s = Replace[spec, None | Automatic -> {}]},
		Which[
			MatchQ[s, {{_, _}, {_, _}}],
				Extract[s, frameMarginSideIndex[side]],
			ListQ[s] && Length[s] === 4 && !styleMarginRuleListQ[s],
				s[[frameMarginFlatIndex[side]]],
			styleMarginPairQ[s],
				If[MemberQ[{"Bottom", "Top"}, side], s[[1]], s[[2]]],
			True,
				s
		]
	];

axisMarginTickSpec[spec_, i_] :=
	If[tickMarginSpecPairQ[spec], spec[[i]], spec];

frameMarginTicksNormalize[Automatic] =
	{{Automatic, Automatic}, {Automatic, Automatic}};
frameMarginTicksNormalize[None] = {{None, None}, {None, None}};
frameMarginTicksNormalize[spec_?frameMarginTicksNestedQ] := spec;
frameMarginTicksNormalize[spec_?tickMarginSpecPairQ] :=
	{{spec[[2]], spec[[2]]}, {spec[[1]], spec[[1]]}};
frameMarginTicksNormalize[spec_] := {{spec, spec}, {spec, spec}};

frameMarginTicksNestedQ[spec_] :=
	ListQ[spec] && Length[spec] === 2 && AllTrue[spec, tickMarginSpecPairQ];

frameMarginSideEnabled[frame_, "Left"] := frame[[1, 1]];
frameMarginSideEnabled[frame_, "Right"] := frame[[1, 2]];
frameMarginSideEnabled[frame_, "Bottom"] := frame[[2, 1]];
frameMarginSideEnabled[frame_, "Top"] := frame[[2, 2]];

frameMarginSideTickSpec[ticks_, "Left"] := ticks[[1, 1]];
frameMarginSideTickSpec[ticks_, "Right"] := ticks[[1, 2]];
frameMarginSideTickSpec[ticks_, "Bottom"] := ticks[[2, 1]];
frameMarginSideTickSpec[ticks_, "Top"] := ticks[[2, 2]];

frameMarginSideTicks[ticks_, {{x1_, x2_}, {y1_, y2_}}, side_] :=
	Switch[
		side,
		"Bottom" | "Top",
			axisTickList[ticks, {x1, x2}, 8],
		"Left" | "Right",
			axisTickList[ticks, {y1, y2}, 5]
	];

tickLabelMarginSize[label_, styles_] :=
	Module[{content, specs, textProps},
		If[tickLabelMissingQ[label],
			{0, 0},
			{content, specs} = textExtract[label];
			textProps =
				getCurrentTextProps[
					Internal`Bag[],
					Join[{FontSize -> 9}, Flatten[{styles}], specs]
				];
			labelApproxSize[content, textProps]
		]
	];

tickSideNormalSize["Bottom" | "Top", {_, h_}] := h;
tickSideNormalSize["Left" | "Right", {w_, _}] := w;
tickSideTangentSize["Bottom" | "Top", {w_, _}] := w;
tickSideTangentSize["Left" | "Right", {_, h_}] := h;

tickMarginOne[tick_, side_, styles_] :=
	Module[{size, outside, labelOffset, normal, tangent},
		size = tickLabelMarginSize[tick[[2]], {styles, tick[[4]]}];
		outside = fracToUser[Max[0, tick[[3, 1]]]];
		labelOffset =
			If[tickLabelMissingQ[tick[[2]]],
				0,
				fracToUser[Max[Abs /@ tick[[3]]]] + 7
			];
		normal =
			Max[outside, labelOffset + tickSideNormalSize[side, size]];
		tangent =
			If[tickLabelMissingQ[tick[[2]]],
				0,
				tickSideTangentSize[side, size] / 2
			];
		Switch[
			side,
			"Bottom",
				{tangent, tangent, normal, 0},
			"Top",
				{tangent, tangent, 0, normal},
			"Left",
				{normal, 0, tangent, tangent},
			"Right",
				{0, normal, tangent, tangent}
		]
	];

maxMargins[items_List] :=
	If[items === {}, {0, 0, 0, 0}, Max /@ Transpose[items]];

tickSideMargins[ticks_, side_, styles_] :=
	maxMargins[tickMarginOne[#, side, styles]& /@ ticks];

axisOriginForMargins[o_, {{x1_, x2_}, {y1_, y2_}}] :=
	Module[{origin = Lookup[o, AxesOrigin, Automatic]},
		If[MatchQ[origin, {_?NumericQ, _?NumericQ}],
			{Clip[origin[[1]], {x1, x2}], Clip[origin[[2]], {y1, y2}]},
			{If[x1 <= 0 <= x2, 0, x1], If[y1 <= 0 <= y2, 0, y1]}
		]
	];

axisTickMargins[o_, pr : {{x1_, _}, {y1_, _}}] :=
	Module[{axes, ticks, axisStyle, tickStyle, origin, xMargins, yMargins},
		axes = axisNormalize[Lookup[o, Axes, False]];
		If[axes === {False, False},
			{0, 0, 0, 0},
			ticks = Lookup[o, Ticks, Automatic];
			axisStyle = Lookup[o, AxesStyle, {}];
			tickStyle = Lookup[o, TicksStyle, {}];
			origin = axisOriginForMargins[o, pr];
			xMargins =
				If[axes[[1]],
					tickSideMargins[
						axisTickList[axisMarginTickSpec[ticks, 1], pr[[1]], 8],
						"Bottom",
						{
							axisMarginSideStyle[axisStyle, 1],
							axisMarginSideStyle[tickStyle, 1]
						}
					],
					{0, 0, 0, 0}
				];
			yMargins =
				If[axes[[2]],
					tickSideMargins[
						axisTickList[axisMarginTickSpec[ticks, 2], pr[[2]], 5],
						"Left",
						{
							axisMarginSideStyle[axisStyle, 2],
							axisMarginSideStyle[tickStyle, 2]
						}
					],
					{0, 0, 0, 0}
				];
			If[origin[[2]] > y1 + 10^-10, xMargins[[3]] = 0];
			If[origin[[1]] > x1 + 10^-10, yMargins[[1]] = 0];
			maxMargins[{xMargins, yMargins}]
		]
	];

frameTickMargins[o_, pr_] :=
	Module[{frame, ticks, frameStyle, tickStyle, sideMargins},
		frame = frameNormalize[Lookup[o, Frame, False]];
		If[!TrueQ[Or @@ Flatten[frame]],
			{0, 0, 0, 0},
			ticks = frameMarginTicksNormalize[Lookup[o, FrameTicks, Automatic]];
			frameStyle = Lookup[o, FrameStyle, {}];
			tickStyle = Lookup[o, FrameTicksStyle, {}];
			sideMargins =
				Function[
					side,
					If[TrueQ[frameMarginSideEnabled[frame, side]],
						tickSideMargins[
							frameMarginSideTicks[
								frameMarginSideTickSpec[ticks, side],
								pr,
								side
							],
							side,
							{
								frameMarginSideStyle[frameStyle, side],
								frameMarginSideStyle[tickStyle, side]
							}
						],
						{0, 0, 0, 0}
					]
				] /@ {"Bottom", "Top", "Left", "Right"};
			maxMargins[sideMargins]
		]
	];

tickDecorationMargins[o_, pr_] :=
	maxMargins[{axisTickMargins[o, pr], frameTickMargins[o, pr]}];

constrainMarginPair[{a_, b_}, total_] :=
	Module[{limit = Max[total - 1, 1], sum = a + b},
		If[sum <= limit || sum <= 0, {a, b}, {a, b}  limit / sum]
	];

constrainMargins[{l_, r_, b_, t_}, w_, h_] :=
	Join[
		constrainMarginPair[{l, r}, w],
		constrainMarginPair[{b, t}, h]
	];

optionsToGlobalSvgProps // PackageScoped;
optionsToGlobalSvgProps[opts_List] :=
	Module[{
			o = Association[opts],
			w,
			h,
			pr,
			xr = Missing[],
			yr = Missing[],
			aspect,
			bg,
			attrs,
			rest,
			axisOn,
			hasPlotLabel,
			hasAxesLabel,
			hasFrameLabel,
			baseMargins,
			labelMargins,
			tickMargins,
			margins
		},
		attrs =
			<|
				"xmlns" -> "http://www.w3.org/2000/svg",
				"xmlns:xlink" -> "http://www.w3.org/1999/xlink"
			|>;
		(* ImageSize -> width/height (px) *)
		{w, h} = imageSizeToWH[Lookup[o, ImageSize, Automatic]];
		(* PlotRange -> data ranges (only when fully numeric) *)
		pr = Lookup[o, PlotRange, Automatic];
		If[MatchQ[pr, {{_?NumericQ, _?NumericQ}, {_?NumericQ, _?NumericQ}}],
			{xr, yr} = pr
		];
		(* AspectRatio -> fill in a missing height *)
		aspect = Lookup[o, AspectRatio, Automatic];
		If[MissingQ[h],
			h =
				Which[
					NumericQ[aspect],
						w * aspect,
					ListQ[xr] && (xr[[2]] - xr[[1]] != 0),
						w * (yr[[2]] - yr[[1]]) / (xr[[2]] - xr[[1]]),
					True,
						w
				]
		];
		attrs["width"] = makeSvgNumber[w];
		attrs["height"] = makeSvgNumber[h];
		$svgImageWidth = N[w];
		(* leave room for axis/frame labels when they will be drawn *)
		axisOn =
			!FreeQ[Lookup[o, Axes, False], True] ||
			!FreeQ[Lookup[o, Frame, False], True];
		hasPlotLabel = !MatchQ[Lookup[o, PlotLabel, None], None | Automatic];
		hasAxesLabel =
			!MatchQ[Lookup[o, AxesLabel, None], None | Automatic | {None..}];
		hasFrameLabel =
			!MatchQ[Lookup[o, FrameLabel, None], None | Automatic | {None..}];
		baseMargins =
			{
				If[axisOn, 0.12 * w, 0.],
				If[axisOn, 0.04 * w, 0.],
				If[axisOn, 0.1 * h, 0.],
				If[axisOn, 0.05 * h, 0.]
			};
		labelMargins =
			{
				If[hasAxesLabel || hasFrameLabel, 0.06 * w, 0.],
				Max[
					If[hasFrameLabel, 0.06 * w, 0.],
					If[hasAxesLabel, axisLabelRightExtra[o, w, baseMargins[[2]]], 0.]
				],
				If[hasAxesLabel || hasFrameLabel, 0.06 * h, 0.],
				If[hasPlotLabel || hasAxesLabel || hasFrameLabel, 0.08 * h, 0.]
			};
		tickMargins =
			If[ListQ[xr],
				tickDecorationMargins[o, {xr, yr}],
				{0, 0, 0, 0}
			];
		margins = MapThread[Max, {baseMargins, tickMargins}] + labelMargins;
		margins = constrainMargins[margins, w, h];
		(* fit the data range into the pixel box; viewBox is the pixel box at 1:1.
		   With no numeric PlotRange, fall back to the identity/y-flip map. *)
		If[ListQ[xr],
			setMap[{xr, yr}, margins, w, h];
			attrs["viewBox"] = StringRiffle[makeSvgNumber /@ {0, 0, w, h}, " "];
			attrs["overflow"] = "visible";
			attrs["preserveAspectRatio"] = "none";
			(* px -> data inverse (data = (px - b)/a) for the JS coordinate tool *)
			attrs["data-mapax"] = makeSvgNumber[$mapAx];
			attrs["data-mapbx"] = makeSvgNumber[$mapBx];
			attrs["data-mapay"] = makeSvgNumber[$mapAy];
			attrs["data-mapby"] = makeSvgNumber[$mapBy],
			resetMap[]
		];
		(* Background -> canvas fill *)
		bg = Lookup[o, Background, None];
		If[ColorQ[bg],
			attrs["style"] = StringJoin[ "background-color:", colorToSvg[bg]["rgb"]]
		];
		(* pass through genuinely custom options as data-<name>; the standard
		   layout / styling options below are consumed or are noise *)
		rest =
			KeyDrop[
				o,
				{
					ImageSize,
					PlotRange,
					AspectRatio,
					Background,
					Axes,
					AxesOrigin,
					AxesLabel,
					AxesStyle,
					Ticks,
					TicksStyle,
					Frame,
					FrameTicks,
					FrameLabel,
					FrameStyle,
					FrameTicksStyle,
					GridLines,
					GridLinesStyle,
					Method,
					PlotRangePadding,
					PlotRangeClipping,
					ImagePadding,
					DisplayFunction,
					PlotInteractivity,
					DefaultBaseStyle,
					PlotLabel,
					LabelStyle,
					FormatType,
					BaseStyle,
					ColorOutput,
					ContentSelectable,
					PlotTheme,
					PlotRangeClipPlanesStyle
				}
			];
		KeyValueMap[
			(
				attrs[StringJoin[ "data-", ToLowerCase[SymbolName[#1]]]] =
					ToString[#2, InputForm]
			)&,
			rest
		];
		attrs
	];
