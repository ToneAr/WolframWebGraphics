import { expect, test, beforeAll } from "bun:test";
import * as THREE from "three";

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

// Wolfram draws a thin border on the FEATURE edges of a polygon / primitive, not
// on its tessellation -- a cube shows its 12 edges (its coplanar triangle
// diagonals are merged away).
test("createMeshEdges draws a cube's 12 feature edges, not its triangulation", async () => {
	const rt = await makeRuntime();
	const seg = rt.createMeshEdges(new THREE.BoxGeometry(1, 1, 1), { color: [0, 0, 0] });
	const pos = seg.geometry.getAttribute("position") as THREE.BufferAttribute;
	expect(pos.count / 2).toBe(12);
});

// The crux of "feature edges only": a 24-sided cylinder's ~15-degree lateral
// facets must be merged (smooth body, no wireframe) leaving only the two cap
// rims (24 + 24). A too-low threshold would also draw the 24 vertical facet
// lines (72 total).
test("createMeshEdges merges a cylinder's smooth facets, keeping only the cap rims", async () => {
	const rt = await makeRuntime();
	const seg = rt.createMeshEdges(
		new THREE.CylinderGeometry(1, 1, 2, 24),
		{ color: [0, 0, 0] },
	);
	const pos = seg.geometry.getAttribute("position") as THREE.BufferAttribute;
	expect(pos.count / 2).toBe(48);
});

// A primitive's radial tessellation gets COARSER as it gets thinner: Wolfram's
// discretiser gives a thin cylinder facets above 20 degrees. Those smooth facets
// must still merge (only the cap rims show, never a vertical wireframe), so the
// threshold has to clear realistic facet angles while keeping the 90-degree cap
// rims. A 30-degree-facet cylinder is the regression case the demo hit.
test("createMeshEdges merges a coarse thin cylinder's facets, keeping only the cap rims", async () => {
	const rt = await makeRuntime();
	const seg = rt.createMeshEdges(
		new THREE.CylinderGeometry(1, 1, 2, 12), // 30-degree facets
		{ color: [0, 0, 0] },
	);
	const pos = seg.geometry.getAttribute("position") as THREE.BufferAttribute;
	expect(pos.count / 2).toBe(24); // two 12-gon cap rims, no vertical lines
});

test("createMeshEdges uses the resolved edge colour", async () => {
	const rt = await makeRuntime();
	const seg = rt.createMeshEdges(new THREE.BoxGeometry(1, 1, 1), { color: [1, 0, 0] });
	const mat = seg.material as THREE.LineBasicMaterial;
	expect([mat.color.r, mat.color.g, mat.color.b]).toEqual([1, 0, 0]);
});

// Cap-bearing curved primitives (cylinder/cone) ship exact analytic rim
// polylines from the serializer; the runtime draws one styled Line per polyline
// (each a closed loop) rather than guessing edges from the coarse mesh.
test("createEdgePathLines draws one styled Line per analytic polyline", async () => {
	const rt = await makeRuntime();
	const loop = [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0]; // closed, 5 points
	const lines = rt.createEdgePathLines([loop, loop], { color: [1, 0, 0] });

	expect(lines.length).toBe(2);
	const pos = lines[0].geometry.getAttribute("position") as THREE.BufferAttribute;
	expect(pos.count).toBe(5);
	const mat = lines[0].material as THREE.LineBasicMaterial;
	expect([mat.color.r, mat.color.g, mat.color.b]).toEqual([1, 0, 0]);
});

test("createMeshEdges makes a translucent border transparent", async () => {
	const rt = await makeRuntime();
	const seg = rt.createMeshEdges(new THREE.BoxGeometry(1, 1, 1), {
		color: [0, 0, 0],
		opacity: 0.4,
	});
	const mat = seg.material as THREE.LineBasicMaterial;
	expect(mat.transparent).toBe(true);
	expect(mat.opacity).toBe(0.4);
});
