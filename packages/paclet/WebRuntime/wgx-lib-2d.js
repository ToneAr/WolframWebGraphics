var L = class B {
  static svgNamespace = "http://www.w3.org/2000/svg";
  elements = [];
  ssrElements = [];
  activeTooltip = null;
  activeTooltipSvg = null;
  priorStyles = /* @__PURE__ */ new WeakMap();
  priorTransforms = /* @__PURE__ */ new WeakMap();
  clicked = /* @__PURE__ */ new WeakMap();
  polylinePoints = /* @__PURE__ */ new WeakMap();
  constructor(t) {
    this.ssrElements = Array.from(t.querySelectorAll("div[data-wgx-ssr-endpoint]")), this.elements = Array.from(t.querySelectorAll("svg[id^='wgx']")), this.hydrate();
  }
  populate() {
    const t = [];
    for (const e of this.ssrElements) {
      const i = e.getAttribute("data-wgx-ssr-endpoint");
      if (!i) continue;
      const r = e.getAttribute("data-wgx-ssr-params") ?? "", n = e.getAttribute("data-wgx-ssr-body") ?? null, s = e.getAttribute("data-wgx-ssr-headers");
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
      t.push(fetch(c).then((l) => {
        if (!l.ok) throw new Error(`SSR request failed: ${l.status} ${l.statusText}`);
        return l.text();
      }).then((l) => {
        const u = new DOMParser().parseFromString(l, "image/svg+xml");
        if (u.querySelector("parsererror")) throw new Error("SSR response was not valid SVG");
        const a = u.documentElement;
        e.replaceWith(a), this.elements.push(a), this.hydrate(), this.initializeCoordinateTool(a);
      }).catch((l) => {
        console.error("Failed to populate SSR content:", l);
      }));
    }
    return Promise.all(t).then(() => {
    });
  }
  hydrate() {
    this.hydrateClickAreas(), this.hydrateHoverAreas(), this.hydrateStatusAreas(), this.hydrateTooltips();
  }
  hydrateClickAreas() {
    this.elements.forEach((t) => {
      const e = t.querySelectorAll("[data-wgx-click]:not([data-wgx-hydrated]),[data-wgx-click-style]:not([data-wgx-hydrated])");
      if (e)
        for (const i of e)
          i.addEventListener("click", (r) => {
            this.wgxClickToggle(r);
          }), i.setAttribute("data-wgx-hydrated", "true");
    });
  }
  hydrateHoverAreas() {
    this.elements.forEach((t) => {
      const e = t.querySelectorAll("[data-wgx-hover]:not([data-wgx-hydrated]),[data-wgx-hover-transform]:not([data-wgx-hydrated])");
      if (e)
        for (const i of e)
          i.addEventListener("mouseover", (r) => {
            this.wgxHoverOn(r);
          }), i.addEventListener("mouseout", (r) => {
            this.wgxHoverOff(r);
          }), i.setAttribute("data-wgx-hydrated", "true");
    });
  }
  hydrateStatusAreas() {
    this.elements.forEach((t) => {
      const e = t.querySelectorAll("[data-wgx-status-id]:not([data-wgx-hydrated])");
      for (const i of e) {
        const r = i.getAttribute("data-wgx-status-id");
        if (!r) continue;
        const n = r ? t.getElementById(r) : null;
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
    this.elements.forEach((t) => {
      const e = t.querySelectorAll("[data-wgx-tooltip-id]:not([data-wgx-hydrated])");
      for (const i of e) {
        const r = i.getAttribute("data-wgx-tooltip-id");
        r && r && t.getElementById(r) && (i.addEventListener("mouseover", (n) => {
          this.showTooltip(n, r);
        }), i.addEventListener("mousemove", (n) => {
          this.moveTooltip(n);
        }), i.addEventListener("mouseout", () => {
          this.hideTooltip();
        }), i.setAttribute("data-wgx-hydrated", "true"));
      }
    });
  }
  getEventTarget(t) {
    return t?.target ?? null;
  }
  eventToPoint(t, e) {
    const i = t.createSVGPoint();
    i.x = e.clientX, i.y = e.clientY;
    const r = t.getScreenCTM(), n = r ? i.matrixTransform(r.inverse()) : i;
    return {
      x: n.x,
      y: n.y
    };
  }
  screenVectorToSvg(t, e, i) {
    const r = t.getScreenCTM()?.inverse(), n = t.createSVGPoint(), s = t.createSVGPoint();
    n.x = 0, n.y = 0, s.x = e, s.y = i;
    const o = r ? n.matrixTransform(r) : n, c = r ? s.matrixTransform(r) : s;
    return {
      x: Math.abs(c.x - o.x),
      y: Math.abs(c.y - o.y)
    };
  }
  resizeForeignObjectToContents(t) {
    const e = t.querySelector("math") ?? t.firstElementChild, i = t.ownerSVGElement;
    if (!e?.getBoundingClientRect || !i) return;
    const r = e.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    const n = this.screenVectorToSvg(i, r.width, r.height);
    t.setAttribute("width", n.x.toString()), t.setAttribute("height", n.y.toString());
  }
  unionBox(t, e) {
    if (!t) return e;
    const i = Math.min(t.x, e.x), r = Math.min(t.y, e.y), n = Math.max(t.x + t.width, e.x + e.width), s = Math.max(t.y + t.height, e.y + e.height);
    return new DOMRect(i, r, n - i, s - r);
  }
  tooltipContentBox(t, e) {
    let i = null;
    for (const r of t.children) {
      if (r === e || !(r instanceof SVGGraphicsElement) || !r.getBBox) continue;
      const n = r.getBBox();
      (n.width > 0 || n.height > 0) && (i = this.unionBox(i, n));
    }
    return i;
  }
  getEventSvg(t) {
    const e = t?.target;
    return e ? e.ownerSVGElement ?? e : null;
  }
  tooltipBackground(t) {
    for (const e of t.children) if (e.tagName.toLowerCase() === "rect" && e.classList.contains("wgx-tip-bg")) return e;
    return null;
  }
  resizeTooltip(t) {
    const e = this.tooltipBackground(t);
    if (!e) return;
    const i = t.getElementsByTagName("foreignObject");
    for (const o of i) this.resizeForeignObjectToContents(o);
    const r = this.tooltipContentBox(t, e);
    if (!r) return;
    const n = Math.max(4, r.x - parseFloat(e.getAttribute("x") ?? "0")), s = Math.max(4, r.y - parseFloat(e.getAttribute("y") ?? "0"));
    e.setAttribute("x", String(r.x - n)), e.setAttribute("y", String(r.y - s)), e.setAttribute("width", String(r.width + 2 * n)), e.setAttribute("height", String(r.height + 2 * s));
  }
  showTooltip(t, e) {
    const i = this.getEventSvg(t), r = i?.getElementById(e) ?? null;
    if (!i || !r) return;
    this.activeTooltip = r, this.activeTooltipSvg = i, i.appendChild(r), r.style.display = "inline", this.resizeTooltip(r), this.moveTooltip(t);
    const n = r;
    window.requestAnimationFrame(() => {
      this.activeTooltip === n && this.resizeTooltip(n);
    });
  }
  moveTooltip(t) {
    if (!this.activeTooltip || !this.activeTooltipSvg) return;
    const e = this.eventToPoint(this.activeTooltipSvg, t);
    this.activeTooltip.setAttribute("transform", `translate(${e.x} ${e.y})`);
  }
  hideTooltip() {
    this.activeTooltip && (this.activeTooltip.style.display = "none", this.activeTooltip = null, this.activeTooltipSvg = null);
  }
  setStatusText(t, e) {
    const i = this.getEventSvg(t)?.getElementById("wgx-status") ?? null;
    i && (i.textContent = e);
  }
  clearStatusText(t) {
    const e = this.getEventSvg(t)?.getElementById("wgx-status") ?? null;
    e && (e.textContent = "");
  }
  wgxApplyStyle(t, e) {
    this.priorStyles.has(t) || this.priorStyles.set(t, t.getAttribute("style") ?? "");
    const i = this.priorStyles.get(t) ?? "";
    t.setAttribute("style", i + (i ? ";" : "") + e);
  }
  wgxRestoreStyle(t) {
    this.priorStyles.has(t) && (t.setAttribute("style", this.priorStyles.get(t) ?? ""), this.priorStyles.delete(t));
  }
  wgxHoverOn(t) {
    const e = t.currentTarget ?? t.target, i = e.getAttribute("data-wgx-hover"), r = e.getAttribute("data-wgx-hover-transform");
    i && this.wgxApplyStyle(e, i), r && (this.priorTransforms.has(e) || this.priorTransforms.set(e, e.getAttribute("transform") ?? ""), e.setAttribute("transform", r));
  }
  wgxHoverOff(t) {
    const e = t.currentTarget ?? t.target;
    if (this.wgxRestoreStyle(e), this.priorTransforms.has(e)) {
      const i = this.priorTransforms.get(e) ?? "";
      i ? e.setAttribute("transform", i) : e.removeAttribute("transform"), this.priorTransforms.delete(e);
    }
  }
  wgxToggleClickEl(t, e) {
    const i = t.getAttribute("data-wgx-click"), r = t.getAttribute("data-wgx-click-style");
    i && (e ? t.setAttribute("transform", i) : t.removeAttribute("transform")), r && (e ? this.wgxApplyStyle(t, r) : this.wgxRestoreStyle(t)), this.clicked.set(t, e);
  }
  wgxClickToggle(t) {
    const e = t.currentTarget ?? t.target, i = !this.clicked.get(e), r = e.getAttribute("data-wgx-click-group");
    r ? (e.ownerSVGElement ?? e).querySelectorAll(`[data-wgx-click-group="${r}"]`).forEach((n) => this.wgxToggleClickEl(n, i)) : this.wgxToggleClickEl(e, i);
  }
  hideCoordinateReadout(t) {
    const e = [
      t.marker,
      t.labelLeader,
      t.labelBackground,
      t.labelOutline,
      t.labelAccent,
      t.label
    ];
    for (const i of e) i && (i.style.display = "none");
  }
  ensureCoordinateReadout(t, e) {
    if (e.marker && e.labelLeader && e.labelBackground && e.labelOutline && e.labelAccent && e.label) return;
    const i = B.svgNamespace, r = document.createElementNS(i, "circle");
    r.setAttribute("class", "wgx-coord-marker"), r.setAttribute("r", "4"), r.setAttribute("stroke", "#101a30"), r.setAttribute("stroke-width", "1.25"), r.setAttribute("vector-effect", "non-scaling-stroke"), r.style.display = "none", r.style.pointerEvents = "none", t.appendChild(r), e.marker = r;
    const n = document.createElementNS(i, "polyline");
    n.setAttribute("class", "wgx-coord-leader"), n.setAttribute("fill", "none"), n.setAttribute("stroke-width", "1.75"), n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "miter"), n.setAttribute("vector-effect", "non-scaling-stroke"), n.style.display = "none", n.style.pointerEvents = "none", t.appendChild(n), e.labelLeader = n;
    const s = document.createElementNS(i, "rect");
    s.setAttribute("class", "wgx-coord-box"), s.setAttribute("rx", "0"), s.setAttribute("ry", "0"), s.setAttribute("fill", "#1a1a1a"), s.style.display = "none", s.style.pointerEvents = "none", t.appendChild(s), e.labelBackground = s;
    const o = document.createElementNS(i, "rect");
    o.setAttribute("class", "wgx-coord-outline"), o.setAttribute("rx", "0"), o.setAttribute("ry", "0"), o.setAttribute("fill", "none"), o.setAttribute("stroke-width", "1.75"), o.setAttribute("vector-effect", "non-scaling-stroke"), o.style.display = "none", o.style.pointerEvents = "none", t.appendChild(o), e.labelOutline = o;
    const c = document.createElementNS(i, "line");
    t.appendChild(c), e.labelAccent = c;
    const l = document.createElementNS(i, "text");
    l.setAttribute("class", "wgx-coord-label"), l.setAttribute("font-size", "12"), l.setAttribute("font-family", "sans-serif"), l.setAttribute("fill", "#eaf2ff"), l.style.display = "none", l.style.pointerEvents = "none", t.appendChild(l), e.label = l;
  }
  getPolylinePoints(t) {
    const e = this.polylinePoints.get(t);
    if (e) return e;
    const i = (t.getAttribute("points") ?? "").trim().split(/\s+/).map((r) => {
      const n = r.split(",");
      return {
        x: parseFloat(n[0]),
        y: parseFloat(n[1])
      };
    });
    return this.polylinePoints.set(t, i), i;
  }
  transformCurvePoint(t, e, i, r) {
    const n = t.createSVGPoint();
    n.x = r.x, n.y = r.y;
    const s = e && i ? n.matrixTransform(e).matrixTransform(i) : n;
    return {
      x: s.x,
      y: s.y,
      localX: r.x,
      localY: r.y
    };
  }
  nearestPointOnSegment(t, e, i) {
    const r = i.x - e.x, n = i.y - e.y, s = r * r + n * n;
    let o = 0;
    s !== 0 && (o = ((t.x - e.x) * r + (t.y - e.y) * n) / s, o = Math.max(0, Math.min(1, o)));
    const c = e.x + o * r, l = e.y + o * n, u = t.x - c, a = t.y - l;
    return {
      x: c,
      y: l,
      localX: e.localX + o * (i.localX - e.localX),
      localY: e.localY + o * (i.localY - e.localY),
      distanceSquared: u * u + a * a
    };
  }
  nearestPointOnPolyline(t, e, i) {
    const r = this.getPolylinePoints(e);
    if (r.length < 2) return null;
    const n = e.getScreenCTM(), s = t.getScreenCTM()?.inverse() ?? null;
    let o = null, c = this.transformCurvePoint(t, n, s, r[0]);
    for (let l = 1; l < r.length; l += 1) {
      const u = this.transformCurvePoint(t, n, s, r[l]), a = this.nearestPointOnSegment(i, c, u);
      (o === null || a.distanceSquared < o.distanceSquared) && (o = a), c = u;
    }
    return o;
  }
  nearestPointOnCircle(t, e, i) {
    const r = e.getScreenCTM(), n = t.getScreenCTM()?.inverse() ?? null, s = this.transformCurvePoint(t, r, n, {
      x: parseFloat(e.getAttribute("cx") ?? ""),
      y: parseFloat(e.getAttribute("cy") ?? "")
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
  nearestPointOnCurve(t, e, i) {
    const r = e.tagName.toLowerCase();
    return r === "polyline" ? this.nearestPointOnPolyline(t, e, i) : r === "circle" ? this.nearestPointOnCircle(t, e, i) : null;
  }
  usablePaint(t) {
    return !!t && t !== "none" && t !== "transparent" && t !== "rgba(0, 0, 0, 0)";
  }
  getCurveStrokeColor(t) {
    const e = window.getComputedStyle(t), i = e.stroke, r = e.fill, n = t.getAttribute("stroke"), s = t.getAttribute("fill");
    return this.usablePaint(i) ? i : this.usablePaint(n) ? n : this.usablePaint(r) ? r : this.usablePaint(s) ? s : "#d62728";
  }
  clamp(t, e, i) {
    return i < e ? e : Math.max(e, Math.min(i, t));
  }
  getSvgBounds(t) {
    const e = t.viewBox.baseVal;
    if (e.width > 0 && e.height > 0) return {
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height
    };
    const i = parseFloat(t.getAttribute("width") ?? ""), r = parseFloat(t.getAttribute("height") ?? "");
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
  updateCoordinateCallout(t, e, i) {
    const { label: r, labelBackground: n, labelOutline: s, labelAccent: o, labelLeader: c } = t;
    if (!r || !n || !s || !o || !c) return;
    const l = this.getSvgBounds(i), u = 20, a = 8, m = 6, p = 4;
    let g = 1, f = -1;
    const b = parseFloat(r.getAttribute("x") ?? ""), A = parseFloat(r.getAttribute("y") ?? "");
    let d;
    try {
      d = r.getBBox();
    } catch {
      d = {
        x: b,
        y: A - 11,
        width: (r.textContent ?? "").length * 7,
        height: 14
      };
    }
    const w = d.x - b, v = d.y - A, h = d.width + 2 * m, S = d.height + 2 * p;
    l.width > 0 && e.x + u + h > l.x + l.width && (g = -1), l.height > 0 && e.y - S < l.y && (f = 1);
    let y = g > 0 ? e.x + u : e.x - u - h, x = f < 0 ? e.y - S : e.y + a;
    l.width > 0 && (y = this.clamp(y, l.x, l.x + l.width - h)), l.height > 0 && (x = this.clamp(x, l.y, l.y + l.height - S)), r.setAttribute("x", String(y + m - w)), r.setAttribute("y", String(x + p - v)), n.setAttribute("x", String(y)), n.setAttribute("y", String(x)), n.setAttribute("width", String(h)), n.setAttribute("height", String(S)), s.setAttribute("x", String(y)), s.setAttribute("y", String(x)), s.setAttribute("width", String(h)), s.setAttribute("height", String(S)), o.setAttribute("x1", String(y)), o.setAttribute("x2", String(y + h)), o.setAttribute("y1", String(x)), o.setAttribute("y2", String(x));
    const M = e.x + g * 4, O = e.y, C = g > 0 ? y : y + h, F = C - g * 5, k = x + (f < 0 ? 0.62 : 0.38) * S;
    c.setAttribute("points", `${M},${O} ${F},${k} ${C},${k}`);
  }
  initializeCoordinateTool(t) {
    const e = t.getElementsByClassName("wgx-curve");
    if (e.length === 0) return;
    const i = parseFloat(t.getAttribute("data-mapax") ?? ""), r = parseFloat(t.getAttribute("data-mapbx") ?? ""), n = parseFloat(t.getAttribute("data-mapay") ?? ""), s = parseFloat(t.getAttribute("data-mapby") ?? ""), o = {
      marker: null,
      labelLeader: null,
      labelBackground: null,
      labelOutline: null,
      labelAccent: null,
      label: null
    }, c = (l) => {
      const u = this.eventToPoint(t, l);
      let a = null, m = null;
      this.ensureCoordinateReadout(t, o);
      for (const v of e) {
        const h = this.nearestPointOnCurve(t, v, u);
        h !== null && (a === null || h.distanceSquared < a.distanceSquared) && (a = h, m = v);
      }
      if (a === null || m === null) {
        this.hideCoordinateReadout(o);
        return;
      }
      const { marker: p, labelLeader: g, labelBackground: f, labelOutline: b, labelAccent: A, label: d } = o;
      if (!p || !g || !f || !b || !A || !d) return;
      const w = this.getCurveStrokeColor(m);
      p.setAttribute("cx", String(a.x)), p.setAttribute("cy", String(a.y)), p.setAttribute("fill", w), g.setAttribute("stroke", w), b.setAttribute("stroke", w), g.style.display = "inline", f.style.display = "inline", b.style.display = "inline", A.style.display = "inline", d.textContent = `${((a.localX - r) / i).toFixed(2)}, ${((a.localY - s) / n).toFixed(2)}`, d.setAttribute("x", String(a.x + 26)), d.setAttribute("y", String(a.y - 7)), d.style.display = "inline", this.updateCoordinateCallout(o, a, t), t.appendChild(g), t.appendChild(f), t.appendChild(b), t.appendChild(A), t.appendChild(d), p.style.display = "inline", t.appendChild(p);
    };
    t.addEventListener("mousemove", c), t.addEventListener("mouseleave", () => {
      this.hideCoordinateReadout(o);
    });
  }
};
function E() {
  const T = new L(document);
  T.populate();
  for (const t of T.elements) T.initializeCoordinateTool(t);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", E, { once: !0 }) : E();
