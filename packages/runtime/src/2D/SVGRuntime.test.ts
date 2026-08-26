import { expect, test } from "bun:test";
import SVGRuntime from "./SVGRuntime";

interface FakeElement {
	attributes: Map<string, string>;
	listeners: string[];
	addEventListener(type: string, listener: EventListener): void;
	getAttribute(name: string): string | null;
	setAttribute(name: string, value: string): void;
}

function fakeElement(initialAttributes: Record<string, string> = {}): FakeElement {
	const attributes = new Map(Object.entries(initialAttributes));
	return {
		attributes,
		listeners: [],
		addEventListener(type: string): void {
			this.listeners.push(type);
		},
		getAttribute(name: string): string | null {
			return attributes.get(name) ?? null;
		},
		setAttribute(name: string, value: string): void {
			attributes.set(name, value);
		},
	};
}

test("hydrates every interaction on a composed chart element exactly once", () => {
	const target = fakeElement({
		"data-wgx-click": "matrix(1 0 0 1 1 1)",
		"data-wgx-hover": "fill:red",
		"data-wgx-status-id": "status-1",
		"data-wgx-status-text": "value",
		"data-wgx-tooltip-id": "tip-1",
	});
	const tooltip = fakeElement();
	const svg = {
		querySelectorAll(selector: string): FakeElement[] {
			const hydrationMarker = selector.match(/data-wgx-[a-z]+-hydrated/)?.[0];
			return hydrationMarker && target.attributes.has(hydrationMarker)
				? []
				: [target];
		},
		getElementById(id: string): FakeElement | null {
			return id === "tip-1" ? tooltip : null;
		},
	};
	const document = {
		querySelectorAll(selector: string): unknown[] {
			return selector.startsWith("svg") ? [svg] : [];
		},
	};
	const runtime = new SVGRuntime(document as unknown as Document);

	// Rehydrating after another SSR response must not duplicate listeners.
	runtime.hydrate();

	expect(target.attributes.get("data-wgx-click-hydrated")).toBe("true");
	expect(target.attributes.get("data-wgx-hover-hydrated")).toBe("true");
	expect(target.attributes.get("data-wgx-status-hydrated")).toBe("true");
	expect(target.attributes.get("data-wgx-tooltip-hydrated")).toBe("true");
	expect(target.listeners.filter((type) => type === "click")).toHaveLength(1);
	expect(target.listeners.filter((type) => type === "mouseover")).toHaveLength(3);
	expect(target.listeners.filter((type) => type === "mouseout")).toHaveLength(3);
	expect(target.listeners.filter((type) => type === "mousemove")).toHaveLength(1);
});

test("recovers an unmarked Cloud plot curve without promoting axis segments", () => {
	const classes: string[] = [];
	const curve = {
		getAttribute: (name: string) =>
			name === "points" ? "0,10 10,0 20,10" : null,
		classList: {
			add: (name: string) => classes.push(name),
		},
	};
	const axis = {
		getAttribute: (name: string) =>
			name === "points" ? "0,10 20,10" : null,
		classList: {
			add: (name: string) => classes.push(name),
		},
	};
	const mapAttributes: Record<string, string> = {
		"data-mapax": "10",
		"data-mapbx": "0",
		"data-mapay": "-10",
		"data-mapby": "10",
	};
	const svg = {
		id: "",
		getElementsByClassName: () => [],
		getAttribute: (name: string) => mapAttributes[name] ?? null,
		querySelectorAll: () => [axis, curve],
	};
	const document = {
		querySelectorAll: () => [],
	};
	const runtime = new SVGRuntime(document as unknown as Document);

	const curves = runtime.getCoordinateCurves(svg as unknown as SVGSVGElement);

	expect(curves).toEqual([curve]);
	expect(classes).toEqual(["wgx-curve"]);
	expect(svg.id).toStartWith("wgx-ssr-");
});

test("extracts an SVG from an HTML SSR response into the live document", () => {
	const parsedSvg = {
		namespaceURI: SVGRuntime.svgNamespace,
	};
	const importedSvg = {} as SVGSVGElement;
	let parsedAs: DOMParserSupportedType | undefined;
	let importedNode: unknown;
	const priorDOMParser = globalThis.DOMParser;

	class FakeDOMParser {
		parseFromString(_source: string, type: DOMParserSupportedType) {
			parsedAs = type;
			return {
				querySelector: (selector: string) =>
					selector === "svg" ? parsedSvg : null,
			};
		}
	}

	(globalThis as unknown as { DOMParser: typeof DOMParser }).DOMParser =
		FakeDOMParser as unknown as typeof DOMParser;
	try {
		const document = {
			querySelectorAll: () => [],
			importNode(node: unknown): SVGSVGElement {
				importedNode = node;
				return importedSvg;
			},
		};
		const runtime = new SVGRuntime(document as unknown as Document);

		expect(runtime.parseSsrSvg("<html><body><svg /></body></html>")).toBe(
			importedSvg,
		);
		expect(parsedAs).toBe("text/html");
		expect(importedNode).toBe(parsedSvg);
	} finally {
		(globalThis as unknown as { DOMParser: typeof DOMParser }).DOMParser =
			priorDOMParser;
	}
});
