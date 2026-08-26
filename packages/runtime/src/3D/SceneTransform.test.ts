import { expect, test, beforeAll } from "bun:test";
import type { Bounds } from "@wgx/types";

// ThreeRuntime's constructor touches the DOM; stub the minimum so the module
// and class can be imported/instantiated in a headless test.
beforeAll(() => {
	(globalThis as unknown as { document: unknown }).document = {
		querySelectorAll: () => [],
	};
	(globalThis as unknown as { window: unknown }).window = { devicePixelRatio: 1 };
});

async function makeRuntime() {
	const { default: ThreeRuntime } = await import("./ThreeRuntime");
	return new ThreeRuntime();
}

// The user's demo Graphics3D: an explicit PlotRange wider than the geometry on
// y and z, with BoxRatios -> Automatic (which Wolfram resolves to the PlotRange
// spans {6.8, 2.2, 1.8}). The geometry must NOT be anisotropically stretched --
// a cylinder/cone cross-section has to stay circular, so the per-axis scale must
// be uniform.
const GEOMETRY_BBOX: Bounds = [-2.7189, 3.6794, -0.679, 0.6776, -0.58, 0.62];
const PLOT_RANGE: Bounds = [-2.9, 3.9, -1.1, 1.1, -0.9, 0.9];
const AUTOMATIC_BOX_RATIOS: [number, number, number] = [6.8, 2.2, 1.8];

test("BoxRatios -> Automatic keeps the scene scale uniform (no oval shapes)", async () => {
	const rt = await makeRuntime();
	const transform = rt.createSceneTransform(
		GEOMETRY_BBOX,
		AUTOMATIC_BOX_RATIOS,
		PLOT_RANGE,
	);

	expect(transform.scale.x).toBeCloseTo(transform.scale.y, 6);
	expect(transform.scale.y).toBeCloseTo(transform.scale.z, 6);
	// Automatic box ratios equal the plot-range spans, so the box is shown at
	// its true aspect ratio: the transform is the identity.
	expect(transform.scale.x).toBeCloseTo(1, 6);
	expect(transform.offset.x).toBeCloseTo(0, 6);
	expect(transform.offset.y).toBeCloseTo(0, 6);
	expect(transform.offset.z).toBeCloseTo(0, 6);
});

test("a circular cylinder cross-section stays circular (not oval) under the transform", async () => {
	const rt = await makeRuntime();
	const transform = rt.createSceneTransform(
		GEOMETRY_BBOX,
		AUTOMATIC_BOX_RATIOS,
		PLOT_RANGE,
	);

	// The user's cylinder: axis along z, radius 0.36, centred at x=0.65. Its
	// cross-section is a circle in the x-y plane -- sample it and push the points
	// through the real position transform the runtime applies to mesh vertices.
	const radius = 0.36;
	const cx = 0.65;
	const flat: number[] = [];
	for (let i = 0; i < 64; i++) {
		const a = (2 * Math.PI * i) / 64;
		flat.push(cx + radius * Math.cos(a), radius * Math.sin(a), 0);
	}
	const out = rt.transformFlatPositions(flat, transform);

	const xs: number[] = [];
	const ys: number[] = [];
	for (let i = 0; i < out.length; i += 3) {
		xs.push(out[i]);
		ys.push(out[i + 1]);
	}
	const xExtent = Math.max(...xs) - Math.min(...xs);
	const yExtent = Math.max(...ys) - Math.min(...ys);

	// Circular: the x and y diameters must match (a stretched y would read as an
	// oval). Pre-fix this ratio was ~1.53.
	expect(yExtent / xExtent).toBeCloseTo(1, 6);
});

test("explicit BoxRatios distort relative to the plot range (Plot3D style)", async () => {
	const rt = await makeRuntime();
	// Plot3D-style box: plot range spans {10,10,1.757}, BoxRatios {1,1,0.4}.
	const bounds: Bounds = [0, 10, 0, 10, -0.757, 1];
	const plotRange: Bounds = [0, 10, 0, 10, -0.757, 1];
	const transform = rt.createSceneTransform(bounds, [1, 1, 0.4], plotRange);

	// x and y share a span and ratio, so they scale together; z is compressed to
	// 0.4 of that proportion (relative to its own span).
	expect(transform.scale.x).toBeCloseTo(transform.scale.y, 6);
	const zSpan = 1 - -0.757;
	const expectedZ = (10 * 0.4) / zSpan;
	expect(transform.scale.z).toBeCloseTo(expectedZ, 6);
});
