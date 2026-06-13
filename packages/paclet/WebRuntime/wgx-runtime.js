var c = "[id^='wgx3d']", u = "[id^='wgx'], [data-wgx-ssr-endpoint]", m = "./wgx-runtime-lib-3d.js", h = "./wgx-runtime-lib-2d.js", d = "./wgx.css", l;
function a(n) {
  const e = new URL(n, import.meta.url).href;
  return Array.from(document.querySelectorAll("link[rel='stylesheet']")).find((t) => t.href === e) ? Promise.resolve() : l || (l = new Promise((t, r) => {
    const o = document.createElement("link");
    o.rel = "stylesheet", o.href = e, o.dataset.wgxRuntimeStylesheet = "true", o.addEventListener("load", () => {
      t();
    }), o.addEventListener("error", () => {
      l = void 0, r(/* @__PURE__ */ new Error(`Failed to load stylesheet: ${e}`));
    }), document.head.appendChild(o);
  }), l);
}
function i(n) {
  return import(
    /* @vite-ignore */
    new URL(n, import.meta.url).href
  );
}
function s() {
  const n = {};
  return document.querySelector(c) && i(m).then(({ default: e }) => {
    a(d).catch((r) => {
      console.error("Failed to load WGX stylesheet:", r);
    });
    const t = new e();
    (e.elements ?? []).forEach((r, o) => {
      t.renderScene(r.id, e.configs?.[o] ?? {});
    }), n.three = t;
  }).catch((e) => {
    console.error("Failed to load Three.js runtime:", e);
  }), document.querySelector(u) && i(h).then(({ default: e }) => {
    a(d).catch((r) => {
      console.error("Failed to load WGX stylesheet:", r);
    });
    const t = new e(document);
    t.populate();
    for (const r of t.elements) t.initializeCoordinateTool(r);
    n.svg = t;
  }).catch((e) => {
    console.error("Failed to load SVG runtime:", e);
  }), n;
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => s(), { once: !0 }) : s();
export {
  s as boot
};
