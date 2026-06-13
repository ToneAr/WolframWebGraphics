import SVGRuntime from "./SVGRuntime";

/**
 * Inline bootstrap for the 2D SVG runtime.
 *
 * Built (ES, but exporting nothing and bundling its imports) into
 * `wgx-lib-2d.js`, which the paclet inlines verbatim into a classic <script>
 * inside each interactive SVG -- or once per page when IncludeRuntime -> False.
 * Because no `import`/`export` survives in the bundled output, it runs as a
 * plain classic script and self-boots, mirroring the old hand-written runtime:
 * it constructs an SVGRuntime over the whole document (which hydrates every
 * interactive element), runs SSR population, and wires the coordinate-readout
 * tool for any `.wgx-curve` plots.
 *
 * The pure `SVGRuntime` class stays side-effect free so the auto-dispatch
 * entry (`index.ts`) and tests can import it without booting anything.
 */
function boot(): void {
	const runtime = new SVGRuntime(document);
	runtime.populate();
	for (const svg of runtime.elements) {
		runtime.initializeCoordinateTool(svg);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
	boot();
}
