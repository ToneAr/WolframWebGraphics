var O = class k {
  static svgNamespace = "http://www.w3.org/2000/svg";
  elements = [];
  ssrElements = [];
  activeTooltip = null;
  activeTooltipSvg = null;
  priorStyles = /* @__PURE__ */ new WeakMap();
  priorTransforms = /* @__PURE__ */ new WeakMap();
  clicked = /* @__PURE__ */ new WeakMap();
  polylinePoints = /* @__PURE__ */ new WeakMap();
  constructor(e) {
    this.ssrElements = Array.from(e.querySelectorAll("div[data-wgx-ssr-endpoint]")), this.elements = Array.from(e.querySelectorAll("svg[id^='wgx']")), this.hydrate();
  }
  populate() {
    const e = [];
    for (const t of this.ssrElements) {
      const i = t.getAttribute("data-wgx-ssr-endpoint");
      if (!i) continue;
      const r = t.getAttribute("data-wgx-ssr-params") ?? "", n = t.getAttribute("data-wgx-ssr-body") ?? null, s = t.getAttribute("data-wgx-ssr-headers");
      let o;
      try {
        o = s ? JSON.parse(s) : void 0;
      } catch (l) {
        console.error("Invalid SSR headers, skipping element:", l);
        continue;
      }
      const c = new Request(`${i}${r ? `?${r}` : ""}`, {
        method: "POST",
        body: n ?? void 0,
        headers: o ? new Headers(o) : void 0
      });
      e.push(fetch(c).then((l) => {
        if (!l.ok) throw new Error(`SSR request failed: ${l.status} ${l.statusText}`);
        return l.text();
      }).then((l) => {
        const u = new DOMParser().parseFromString(l, "image/svg+xml");
        if (u.querySelector("parsererror")) throw new Error("SSR response was not valid SVG");
        const a = u.documentElement;
        t.replaceWith(a), this.elements.push(a), this.hydrate(), this.initializeCoordinateTool(a);
      }).catch((l) => {
        console.error("Failed to populate SSR content:", l);
      }));
    }
    return Promise.all(e).then(() => {
    });
  }
  hydrate() {
    this.hydrateClickAreas(), this.hydrateHoverAreas(), this.hydrateStatusAreas(), this.hydrateTooltips();
  }
  hydrateClickAreas() {
    this.elements.forEach((e) => {
      const t = e.querySelectorAll("[data-wgx-click]:not([data-wgx-hydrated]),[data-wgx-click-style]:not([data-wgx-hydrated])");
      if (t)
        for (const i of t)
          i.addEventListener("click", (r) => {
            this.wgxClickToggle(r);
          }), i.setAttribute("data-wgx-hydrated", "true");
    });
  }
  hydrateHoverAreas() {
    this.elements.forEach((e) => {
      const t = e.querySelectorAll("[data-wgx-hover]:not([data-wgx-hydrated]),[data-wgx-hover-transform]:not([data-wgx-hydrated])");
      if (t)
        for (const i of t)
          i.addEventListener("mouseover", (r) => {
            this.wgxHoverOn(r);
          }), i.addEventListener("mouseout", (r) => {
            this.wgxHoverOff(r);
          }), i.setAttribute("data-wgx-hydrated", "true");
    });
  }
  hydrateStatusAreas() {
    this.elements.forEach((e) => {
      const t = e.querySelectorAll("[data-wgx-status-id]:not([data-wgx-hydrated])");
      for (const i of t) {
        const r = i.getAttribute("data-wgx-status-id");
        if (!r) continue;
        const n = r ? e.getElementById(r) : null;
        if (n) {
          const s = n.getAttribute("data-wgx-status-text") ?? "";
          i.addEventListener("mouseover", (o) => {
            this.setStatusText(o, s);
          }), i.addEventListener("mouseout", (o) => {
            this.clearStatusText(o);
          }), i.setAttribute("data-wgx-hydrated", "true");
        }
      }
    });
  }
  hydrateTooltips() {
    this.elements.forEach((e) => {
      const t = e.querySelectorAll("[data-wgx-tooltip-id]:not([data-wgx-hydrated])");
      for (const i of t) {
        const r = i.getAttribute("data-wgx-tooltip-id");
        r && r && e.getElementById(r) && (i.addEventListener("mouseover", (n) => {
          this.showTooltip(n, r);
        }), i.addEventListener("mousemove", (n) => {
          this.moveTooltip(n);
        }), i.addEventListener("mouseout", () => {
          this.hideTooltip();
        }), i.setAttribute("data-wgx-hydrated", "true"));
      }
    });
  }
  getEventTarget(e) {
    return e?.target ?? null;
  }
  eventToPoint(e, t) {
    const i = e.createSVGPoint();
    i.x = t.clientX, i.y = t.clientY;
    const r = e.getScreenCTM(), n = r ? i.matrixTransform(r.inverse()) : i;
    return {
      x: n.x,
      y: n.y
    };
  }
  screenVectorToSvg(e, t, i) {
    const r = e.getScreenCTM()?.inverse(), n = e.createSVGPoint(), s = e.createSVGPoint();
    n.x = 0, n.y = 0, s.x = t, s.y = i;
    const o = r ? n.matrixTransform(r) : n, c = r ? s.matrixTransform(r) : s;
    return {
      x: Math.abs(c.x - o.x),
      y: Math.abs(c.y - o.y)
    };
  }
  resizeForeignObjectToContents(e) {
    const t = e.querySelector("math") ?? e.firstElementChild, i = e.ownerSVGElement;
    if (!t?.getBoundingClientRect || !i) return;
    const r = t.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    const n = this.screenVectorToSvg(i, r.width, r.height);
    e.setAttribute("width", n.x.toString()), e.setAttribute("height", n.y.toString());
  }
  unionBox(e, t) {
    if (!e) return t;
    const i = Math.min(e.x, t.x), r = Math.min(e.y, t.y), n = Math.max(e.x + e.width, t.x + t.width), s = Math.max(e.y + e.height, t.y + t.height);
    return new DOMRect(i, r, n - i, s - r);
  }
  tooltipContentBox(e, t) {
    let i = null;
    for (const r of e.children) {
      if (r === t || !(r instanceof SVGGraphicsElement) || !r.getBBox) continue;
      const n = r.getBBox();
      (n.width > 0 || n.height > 0) && (i = this.unionBox(i, n));
    }
    return i;
  }
  getEventSvg(e) {
    const t = e?.target;
    return t ? t.ownerSVGElement ?? t : null;
  }
  tooltipBackground(e) {
    for (const t of e.children) if (t.tagName.toLowerCase() === "rect" && t.classList.contains("wgx-tip-bg")) return t;
    return null;
  }
  resizeTooltip(e) {
    const t = this.tooltipBackground(e);
    if (!t) return;
    const i = e.getElementsByTagName("foreignObject");
    for (const o of i) this.resizeForeignObjectToContents(o);
    const r = this.tooltipContentBox(e, t);
    if (!r) return;
    const n = Math.max(4, r.x - parseFloat(t.getAttribute("x") ?? "0")), s = Math.max(4, r.y - parseFloat(t.getAttribute("y") ?? "0"));
    t.setAttribute("x", String(r.x - n)), t.setAttribute("y", String(r.y - s)), t.setAttribute("width", String(r.width + 2 * n)), t.setAttribute("height", String(r.height + 2 * s));
  }
  showTooltip(e, t) {
    const i = this.getEventSvg(e), r = i?.getElementById(t) ?? null;
    if (!i || !r) return;
    this.activeTooltip = r, this.activeTooltipSvg = i, i.appendChild(r), r.style.display = "inline", this.resizeTooltip(r), this.moveTooltip(e);
    const n = r;
    window.requestAnimationFrame(() => {
      this.activeTooltip === n && this.resizeTooltip(n);
    });
  }
  moveTooltip(e) {
    if (!this.activeTooltip || !this.activeTooltipSvg) return;
    const t = this.eventToPoint(this.activeTooltipSvg, e);
    this.activeTooltip.setAttribute("transform", `translate(${t.x} ${t.y})`);
  }
  hideTooltip() {
    this.activeTooltip && (this.activeTooltip.style.display = "none", this.activeTooltip = null, this.activeTooltipSvg = null);
  }
  setStatusText(e, t) {
    const i = this.getEventSvg(e)?.getElementById("wgx-status") ?? null;
    i && (i.textContent = t);
  }
  clearStatusText(e) {
    const t = this.getEventSvg(e)?.getElementById("wgx-status") ?? null;
    t && (t.textContent = "");
  }
  wgxApplyStyle(e, t) {
    this.priorStyles.has(e) || this.priorStyles.set(e, e.getAttribute("style") ?? "");
    const i = this.priorStyles.get(e) ?? "";
    e.setAttribute("style", i + (i ? ";" : "") + t);
  }
  wgxRestoreStyle(e) {
    this.priorStyles.has(e) && (e.setAttribute("style", this.priorStyles.get(e) ?? ""), this.priorStyles.delete(e));
  }
  wgxHoverOn(e) {
    const t = e.currentTarget ?? e.target, i = t.getAttribute("data-wgx-hover"), r = t.getAttribute("data-wgx-hover-transform");
    i && this.wgxApplyStyle(t, i), r && (this.priorTransforms.has(t) || this.priorTransforms.set(t, t.getAttribute("transform") ?? ""), t.setAttribute("transform", r));
  }
  wgxHoverOff(e) {
    const t = e.currentTarget ?? e.target;
    if (this.wgxRestoreStyle(t), this.priorTransforms.has(t)) {
      const i = this.priorTransforms.get(t) ?? "";
      i ? t.setAttribute("transform", i) : t.removeAttribute("transform"), this.priorTransforms.delete(t);
    }
  }
  wgxToggleClickEl(e, t) {
    const i = e.getAttribute("data-wgx-click"), r = e.getAttribute("data-wgx-click-style");
    i && (t ? e.setAttribute("transform", i) : e.removeAttribute("transform")), r && (t ? this.wgxApplyStyle(e, r) : this.wgxRestoreStyle(e)), this.clicked.set(e, t);
  }
  wgxClickToggle(e) {
    const t = e.currentTarget ?? e.target, i = !this.clicked.get(t), r = t.getAttribute("data-wgx-click-group");
    r ? (t.ownerSVGElement ?? t).querySelectorAll(`[data-wgx-click-group="${r}"]`).forEach((n) => this.wgxToggleClickEl(n, i)) : this.wgxToggleClickEl(t, i);
  }
  hideCoordinateReadout(e) {
    const t = [
      e.marker,
      e.labelLeader,
      e.labelBackground,
      e.labelOutline,
      e.labelAccent,
      e.label
    ];
    for (const i of t) i && (i.style.display = "none");
  }
  ensureCoordinateReadout(e, t) {
    if (t.marker && t.labelLeader && t.labelBackground && t.labelOutline && t.labelAccent && t.label) return;
    const i = k.svgNamespace, r = document.createElementNS(i, "circle");
    r.setAttribute("class", "wgx-coord-marker"), r.setAttribute("r", "4"), r.setAttribute("stroke", "#101a30"), r.setAttribute("stroke-width", "1.25"), r.setAttribute("vector-effect", "non-scaling-stroke"), r.style.display = "none", r.style.pointerEvents = "none", e.appendChild(r), t.marker = r;
    const n = document.createElementNS(i, "polyline");
    n.setAttribute("class", "wgx-coord-leader"), n.setAttribute("fill", "none"), n.setAttribute("stroke-width", "1.75"), n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "miter"), n.setAttribute("vector-effect", "non-scaling-stroke"), n.style.display = "none", n.style.pointerEvents = "none", e.appendChild(n), t.labelLeader = n;
    const s = document.createElementNS(i, "rect");
    s.setAttribute("class", "wgx-coord-box"), s.setAttribute("rx", "0"), s.setAttribute("ry", "0"), s.setAttribute("fill", "#1a1a1a"), s.style.display = "none", s.style.pointerEvents = "none", e.appendChild(s), t.labelBackground = s;
    const o = document.createElementNS(i, "rect");
    o.setAttribute("class", "wgx-coord-outline"), o.setAttribute("rx", "0"), o.setAttribute("ry", "0"), o.setAttribute("fill", "none"), o.setAttribute("stroke-width", "1.75"), o.setAttribute("vector-effect", "non-scaling-stroke"), o.style.display = "none", o.style.pointerEvents = "none", e.appendChild(o), t.labelOutline = o;
    const c = document.createElementNS(i, "line");
    e.appendChild(c), t.labelAccent = c;
    const l = document.createElementNS(i, "text");
    l.setAttribute("class", "wgx-coord-label"), l.setAttribute("font-size", "12"), l.setAttribute("font-family", "sans-serif"), l.setAttribute("fill", "#eaf2ff"), l.style.display = "none", l.style.pointerEvents = "none", e.appendChild(l), t.label = l;
  }
  getPolylinePoints(e) {
    const t = this.polylinePoints.get(e);
    if (t) return t;
    const i = (e.getAttribute("points") ?? "").trim().split(/\s+/).map((r) => {
      const n = r.split(",");
      return {
        x: parseFloat(n[0]),
        y: parseFloat(n[1])
      };
    });
    return this.polylinePoints.set(e, i), i;
  }
  transformCurvePoint(e, t, i, r) {
    const n = e.createSVGPoint();
    n.x = r.x, n.y = r.y;
    const s = t && i ? n.matrixTransform(t).matrixTransform(i) : n;
    return {
      x: s.x,
      y: s.y,
      localX: r.x,
      localY: r.y
    };
  }
  nearestPointOnSegment(e, t, i) {
    const r = i.x - t.x, n = i.y - t.y, s = r * r + n * n;
    let o = 0;
    s !== 0 && (o = ((e.x - t.x) * r + (e.y - t.y) * n) / s, o = Math.max(0, Math.min(1, o)));
    const c = t.x + o * r, l = t.y + o * n, u = e.x - c, a = e.y - l;
    return {
      x: c,
      y: l,
      localX: t.localX + o * (i.localX - t.localX),
      localY: t.localY + o * (i.localY - t.localY),
      distanceSquared: u * u + a * a
    };
  }
  nearestPointOnPolyline(e, t, i) {
    const r = this.getPolylinePoints(t);
    if (r.length < 2) return null;
    const n = t.getScreenCTM(), s = e.getScreenCTM()?.inverse() ?? null;
    let o = null, c = this.transformCurvePoint(e, n, s, r[0]);
    for (let l = 1; l < r.length; l += 1) {
      const u = this.transformCurvePoint(e, n, s, r[l]), a = this.nearestPointOnSegment(i, c, u);
      (o === null || a.distanceSquared < o.distanceSquared) && (o = a), c = u;
    }
    return o;
  }
  nearestPointOnCircle(e, t, i) {
    const r = t.getScreenCTM(), n = e.getScreenCTM()?.inverse() ?? null, s = this.transformCurvePoint(e, r, n, {
      x: parseFloat(t.getAttribute("cx") ?? ""),
      y: parseFloat(t.getAttribute("cy") ?? "")
    });
    if (!isFinite(s.x) || !isFinite(s.y)) return null;
    const o = i.x - s.x, c = i.y - s.y;
    return {
      x: s.x,
      y: s.y,
      localX: s.localX,
      localY: s.localY,
      distanceSquared: o * o + c * c
    };
  }
  nearestPointOnCurve(e, t, i) {
    const r = t.tagName.toLowerCase();
    return r === "polyline" ? this.nearestPointOnPolyline(e, t, i) : r === "circle" ? this.nearestPointOnCircle(e, t, i) : null;
  }
  usablePaint(e) {
    return !!e && e !== "none" && e !== "transparent" && e !== "rgba(0, 0, 0, 0)";
  }
  getCurveStrokeColor(e) {
    const t = window.getComputedStyle(e), i = t.stroke, r = t.fill, n = e.getAttribute("stroke"), s = e.getAttribute("fill");
    return this.usablePaint(i) ? i : this.usablePaint(n) ? n : this.usablePaint(r) ? r : this.usablePaint(s) ? s : "#d62728";
  }
  clamp(e, t, i) {
    return i < t ? t : Math.max(t, Math.min(i, e));
  }
  getSvgBounds(e) {
    const t = e.viewBox.baseVal;
    if (t.width > 0 && t.height > 0) return {
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    };
    const i = parseFloat(e.getAttribute("width") ?? ""), r = parseFloat(e.getAttribute("height") ?? "");
    return isFinite(i) && isFinite(r) && i > 0 && r > 0 ? {
      x: 0,
      y: 0,
      width: i,
      height: r
    } : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
  updateCoordinateCallout(e, t, i) {
    const { label: r, labelBackground: n, labelOutline: s, labelAccent: o, labelLeader: c } = e;
    if (!r || !n || !s || !o || !c) return;
    const l = this.getSvgBounds(i), u = 20, a = 8, m = 6, p = 4;
    let g = 1, b = -1;
    const f = parseFloat(r.getAttribute("x") ?? ""), A = parseFloat(r.getAttribute("y") ?? "");
    let d;
    try {
      d = r.getBBox();
    } catch {
      d = {
        x: f,
        y: A - 11,
        width: (r.textContent ?? "").length * 7,
        height: 14
      };
    }
    const w = d.x - f, v = d.y - A, h = d.width + 2 * m, S = d.height + 2 * p;
    l.width > 0 && t.x + u + h > l.x + l.width && (g = -1), l.height > 0 && t.y - S < l.y && (b = 1);
    let y = g > 0 ? t.x + u : t.x - u - h, x = b < 0 ? t.y - S : t.y + a;
    l.width > 0 && (y = this.clamp(y, l.x, l.x + l.width - h)), l.height > 0 && (x = this.clamp(x, l.y, l.y + l.height - S)), r.setAttribute("x", String(y + m - w)), r.setAttribute("y", String(x + p - v)), n.setAttribute("x", String(y)), n.setAttribute("y", String(x)), n.setAttribute("width", String(h)), n.setAttribute("height", String(S)), s.setAttribute("x", String(y)), s.setAttribute("y", String(x)), s.setAttribute("width", String(h)), s.setAttribute("height", String(S)), o.setAttribute("x1", String(y)), o.setAttribute("x2", String(y + h)), o.setAttribute("y1", String(x)), o.setAttribute("y2", String(x));
    const E = t.x + g * 4, B = t.y, T = g > 0 ? y : y + h, M = T - g * 5, C = x + (b < 0 ? 0.62 : 0.38) * S;
    c.setAttribute("points", `${E},${B} ${M},${C} ${T},${C}`);
  }
  initializeCoordinateTool(e) {
    const t = e.getElementsByClassName("wgx-curve");
    if (t.length === 0) return;
    const i = parseFloat(e.getAttribute("data-mapax") ?? ""), r = parseFloat(e.getAttribute("data-mapbx") ?? ""), n = parseFloat(e.getAttribute("data-mapay") ?? ""), s = parseFloat(e.getAttribute("data-mapby") ?? ""), o = {
      marker: null,
      labelLeader: null,
      labelBackground: null,
      labelOutline: null,
      labelAccent: null,
      label: null
    }, c = (l) => {
      const u = this.eventToPoint(e, l);
      let a = null, m = null;
      this.ensureCoordinateReadout(e, o);
      for (const v of t) {
        const h = this.nearestPointOnCurve(e, v, u);
        h !== null && (a === null || h.distanceSquared < a.distanceSquared) && (a = h, m = v);
      }
      if (a === null || m === null) {
        this.hideCoordinateReadout(o);
        return;
      }
      const { marker: p, labelLeader: g, labelBackground: b, labelOutline: f, labelAccent: A, label: d } = o;
      if (!p || !g || !b || !f || !A || !d) return;
      const w = this.getCurveStrokeColor(m);
      p.setAttribute("cx", String(a.x)), p.setAttribute("cy", String(a.y)), p.setAttribute("fill", w), g.setAttribute("stroke", w), f.setAttribute("stroke", w), g.style.display = "inline", b.style.display = "inline", f.style.display = "inline", A.style.display = "inline", d.textContent = `${((a.localX - r) / i).toFixed(2)}, ${((a.localY - s) / n).toFixed(2)}`, d.setAttribute("x", String(a.x + 26)), d.setAttribute("y", String(a.y - 7)), d.style.display = "inline", this.updateCoordinateCallout(o, a, e), e.appendChild(g), e.appendChild(b), e.appendChild(f), e.appendChild(A), e.appendChild(d), p.style.display = "inline", e.appendChild(p);
    };
    e.addEventListener("mousemove", c), e.addEventListener("mouseleave", () => {
      this.hideCoordinateReadout(o);
    });
  }
};
export {
  O as default
};
