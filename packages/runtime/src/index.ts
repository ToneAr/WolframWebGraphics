/**
 * Single entry surface for the WGX web runtime.
 *
 * Boots whichever runtime the current page actually needs, detected from the
 * DOM at load time:
 *   - 3D (Three.js) when there are `[id^="wgx3d"]` mount points
 *   - 2D (SVG) when there are `[id^="wgx"]` nodes (the runtime then hydrates
 *     whichever interactive `data-wgx-*` markers and `.wgx-curve` plots they hold)
 *     OR `[data-wgx-ssr-endpoint]` placeholders, which it fetches, swaps in, and
 *     hydrates — so a server-rendered page only needs to include this one script.
 *
 * Either, both, or neither can be present, so each is gated independently.
 */
const THREE_MOUNT_SELECTOR = "[id^='wgx3d']";
const SVG_MOUNT_SELECTOR = "[id^='wgx'], [data-wgx-ssr-endpoint]";
const THREE_RUNTIME_FILE = "./wgx-runtime-lib-3d.js";
const SVG_RUNTIME_FILE = "./wgx-runtime-lib-2d.js";
const STYLESHEET_FILE = "./wgx.css";
let stylesheetLoad: Promise<void> | undefined;

type SVGRuntimeModule = typeof import("./2D/SVGRuntime");
type ThreeRuntimeModule = typeof import("./3D/ThreeRuntime");

export interface WgxRuntimes {
	three?: InstanceType<ThreeRuntimeModule["default"]>;
	svg?: InstanceType<SVGRuntimeModule["default"]>;
}

function loadStylesheet(fileName: string): Promise<void> {
	const url = new URL(fileName, import.meta.url).href;
	const existingStylesheet = Array.from(
		document.querySelectorAll<HTMLLinkElement>("link[rel='stylesheet']"),
	).find((link) => link.href === url);

	if (existingStylesheet) {
		return Promise.resolve();
	}

	if (stylesheetLoad !== undefined) {
		return stylesheetLoad;
	}

	stylesheetLoad = new Promise((resolve, reject) => {
		const link = document.createElement("link");

		link.rel = "stylesheet";
		link.href = url;
		link.dataset.wgxRuntimeStylesheet = "true";
		link.addEventListener("load", () => {
			resolve();
		});
		link.addEventListener("error", () => {
			stylesheetLoad = undefined;
			reject(new Error(`Failed to load stylesheet: ${url}`));
		});

		document.head.appendChild(link);
	});

	return stylesheetLoad;
}
function loadRuntimeModule<T>(fileName: string): Promise<T> {
	const url = new URL(fileName, import.meta.url).href;
	return import(/* @vite-ignore */ url) as Promise<T>;
}

/** Detect the runtimes the page needs and start them. Safe to call once. */
export function boot(): WgxRuntimes {
	const runtimes: WgxRuntimes = {};

	if (document.querySelector(THREE_MOUNT_SELECTOR)) {
		loadRuntimeModule<ThreeRuntimeModule>(THREE_RUNTIME_FILE)
			.then(({ default: ThreeRuntime }) => {
				loadStylesheet(STYLESHEET_FILE).catch((e) => {
					console.error("Failed to load WGX stylesheet:", e);
				});
				const three = new ThreeRuntime();
				(ThreeRuntime.elements ?? []).forEach((element, index) => {
					three.renderScene(element.id, ThreeRuntime.configs?.[index] ?? {});
				});
				runtimes.three = three;
			})
			.catch((error) => {
				console.error("Failed to load Three.js runtime:", error);
			});
	}

	if (document.querySelector(SVG_MOUNT_SELECTOR)) {
		loadRuntimeModule<SVGRuntimeModule>(SVG_RUNTIME_FILE)
			.then(({ default: SVGRuntime }) => {
				loadStylesheet(STYLESHEET_FILE).catch((e) => {
					console.error("Failed to load WGX stylesheet:", e);
				});
				const svg = new SVGRuntime(document);
				// Fire-and-forget: SSR placeholders hydrate themselves as each
				// fetch settles; inline SVGs are already hydrated by the ctor.
				void svg.populate();
				for (const element of svg.elements) {
					svg.initializeCoordinateTool(element);
				}
				runtimes.svg = svg;
			})
			.catch((error) => {
				console.error("Failed to load SVG runtime:", error);
			});
	}

	return runtimes;
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => boot(), { once: true });
} else {
	boot();
}
