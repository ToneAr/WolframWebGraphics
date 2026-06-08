(* wl-disable-file DocCommentInputMismatch *)
serialize[
	GeometricTransformation[prim_, aff : {{{_, _}, {_, _}}, {_, _}}],
	props_
] :=
	geomTransformWrap[prim, geomTransformPixelMatrix[aff], props];
serialize[GeometricTransformation[prim_, TransformationFunction[m_]], props_] :=
	geomTransformWrap[prim, geomTransformPixelMatrix[m], props];
serialize[
	GeometricTransformation[
		prim_,
		m_ /; MatchQ[m, {{_, _, _}, {_, _, _}, {_, _, _}}]
	],
	props_
] :=
	geomTransformWrap[prim, geomTransformPixelMatrix[m], props];
serialize[Rotate[prim_, theta_?NumericQ], props_] :=
	serialize[GeometricTransformation[prim, RotationTransform[theta]], props];
serialize[
	Rotate[prim_, theta_?NumericQ, center : {_?NumericQ, _?NumericQ}],
	props_
] :=
	serialize[
		GeometricTransformation[prim, RotationTransform[theta, center]],
		props
	];
(* ---- static reduction of interactivity wrappers ---------------------- *)
serialize[HoldPattern[DynamicModule[_, body_, ___]], props_] :=
	serialize[body, props];
serialize[LightDarkSwitched[light_], props_] := serialize[light, props];
serialize[LightDarkSwitched[light_, _], props_] := serialize[light, props];
serialize[LightDarkSwitched[a_Association], props_] :=
	serialize[chartingUnwrap[LightDarkSwitched[a]], props];
(*
 * a Dynamic whose argument is a primitive/expr -> render that argument.
 * A bare Dynamic[symbol] used purely as state contributes nothing.
 * Quiet the FrontEndObject::notavail message: Dynamic holds its first arg, so
 * extracting and evaluating it (e.g. If[CurrentValue[MouseOver], ...]) tries
 * to call the FrontEnd in headless mode. The result is still correct (the
 * else-branch of any MouseOver If is the static geometry).
 *)
serialize[Dynamic[sym_Symbol, ___], props_] := Null;
serialize[Dynamic[expr_, ___], props_] :=
	Quiet[serialize[expr, props], {FrontEndObject::notavail}];
(*
 * If gated on a click-state symbol (unset -> False) collapses to the else
 * branch; evaluate when the condition is determinate, else take the default.
 *)
serialize[If[cond_, t_, f_], props_] /;
	(TrueQ[cond] || cond === False || cond === Null) :=
	serialize[If[TrueQ[cond], t, f], props];
serialize[If[_, _, f_], props_] := serialize[f, props];
serialize[If[_, t_], props_] := Null;
serialize[Charting`DelayedMouseEffect[prim_, eff_, ___], props_] :=
	chartEffectElement[prim, chartEffectAttrs["hover", eff], props];
serialize[Charting`DelayedClickEffect[prim_, eff_, dyn_, ___], props_] :=
	chartEffectElement[
		prim,
		Join[chartEffectAttrs["click", eff], clickGroupAttr[dyn]],
		props
	];
serialize[Charting`DelayedClickEffect[prim_, eff_], props_] :=
	chartEffectElement[prim, chartEffectAttrs["click", eff], props];
(* tolerate a missing effect (1-arg form): render the base unchanged *)
serialize[Charting`DelayedClickEffect[prim_], props_] := serialize[prim, props];
serialize[Charting`DelayedMouseEffect[prim_], props_] := serialize[prim, props];
