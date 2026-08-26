import { expect, test, beforeAll } from "bun:test";
import * as THREE from "three";
import type { IMeshConfig } from "@wgx/types";

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

const IDENTITY: { scale: THREE.Vector3; offset: THREE.Vector3 } = {
	scale: new THREE.Vector3(1, 1, 1),
	offset: new THREE.Vector3(0, 0, 0),
};

// A mesh primitive (Cylinder/Cone/Cuboid) is discretised to a WELDED manifold:
// the rim vertices where a flat cap meets the curved wall are shared between the
// cap faces (axial normal) and the wall faces (radial normal). Smoothing every
// shared normal (plain computeVertexNormals) blends those 90-degree-apart normals,
// which domes the flat cap and bands the wall near the rim. The runtime must
// instead split the normal across that hard crease so each face keeps its own.
//
// This models the rim with a 90-degree fold: a flat "cap" face (normal +z) and a
// "wall" face (normal -y) sharing edge V0-V1. After build, every normal must stay
// axis-aligned (pure +z on the cap, pure -y on the wall) -- a blended rim vertex
// would read as a non-axis-aligned (0, +-0.707, +-0.707) normal.
test("createMeshGeometry keeps a flat cap's rim normals unblended across a hard crease", async () => {
	const rt = await makeRuntime();
	const meshConfig = {
		// V0 (0,0,0) and V1 (1,0,0) are the shared rim edge.
		pos: [
			0, 0, 0, // 0  V0 (rim)
			1, 0, 0, // 1  V1 (rim)
			0, 1, 0, // 2  V2 cap
			1, 1, 0, // 3  V3 cap
			0, 0, -1, // 4  V4 wall
			1, 0, -1, // 5  V5 wall
		],
		// cap (z=0 plane, normal +z), then wall (y=0 plane, normal -y)
		idx: [0, 1, 3, 0, 3, 2, 0, 4, 5, 0, 5, 1],
	} as unknown as IMeshConfig;

	const geometry = rt.createMeshGeometry(meshConfig, IDENTITY);
	const normal = geometry.getAttribute("normal") as THREE.BufferAttribute;

	expect(normal.count).toBeGreaterThan(0);
	for (let i = 0; i < normal.count; i++) {
		const n = new THREE.Vector3().fromBufferAttribute(normal, i);
		const maxComponent = Math.max(Math.abs(n.x), Math.abs(n.y), Math.abs(n.z));
		// A pure face normal has one component at ~1; a blended rim normal would
		// have its largest component at ~0.707.
		expect(maxComponent).toBeGreaterThan(0.99);
	}
});

// A smooth surface (a curved wall whose adjacent facets sit well below the crease
// threshold) must still be smooth-shaded: its shared normals are averaged, so a
// vertex shared by two ~10-degree facets gets their mean, not a hard facet normal.
test("createMeshGeometry still smooth-shades facets below the crease threshold", async () => {
	const rt = await makeRuntime();
	// A shallow "tent": two roof panels meeting along the ridge edge V0-V1 (at
	// y=0,z=0) and sloping down by h in z to +/-y. The dihedral is ~10 degrees
	// (well under the crease threshold), so the shared ridge vertices must get the
	// averaged normal (~ +z), not either panel's tilted (0, +-h, 1) facet normal.
	const h = Math.tan(THREE.MathUtils.degToRad(5)); // ~5-degree slope per panel
	const meshConfig = {
		pos: [
			0, 0, 0, // 0 V0 (ridge)
			1, 0, 0, // 1 V1 (ridge)
			0, 1, -h, // 2 panel 1 (+y) outer
			1, 1, -h, // 3 panel 1 (+y) outer
			0, -1, -h, // 4 panel 2 (-y) outer
			1, -1, -h, // 5 panel 2 (-y) outer
		],
		idx: [0, 1, 3, 0, 3, 2, 0, 4, 5, 0, 5, 1],
	} as unknown as IMeshConfig;

	const geometry = rt.createMeshGeometry(meshConfig, IDENTITY);
	const position = geometry.getAttribute("position") as THREE.BufferAttribute;
	const normal = geometry.getAttribute("normal") as THREE.BufferAttribute;

	// A ridge vertex (y ~ 0) must be smoothed toward +z (mean of the two panels):
	// a hard facet normal would keep the panel's ~0.087 y-component.
	let smoothed = false;
	for (let i = 0; i < normal.count; i++) {
		const p = new THREE.Vector3().fromBufferAttribute(position, i);
		if (Math.abs(p.y) < 1e-6) {
			const n = new THREE.Vector3().fromBufferAttribute(normal, i);
			if (n.z > 0.99 && Math.abs(n.y) < 0.05) {
				smoothed = true;
			}
		}
	}
	expect(smoothed).toBe(true);
});

test("projected textured geometry generates normals without losing UVs", async () => {
	const rt = await makeRuntime();
	const meshConfig = {
		pos: [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		],
		idx: [0, 1, 2],
		tex: "data:image/png;base64,",
		map: "Spherical",
		pbr: {
			roughness: 1,
			metalness: 0,
			emissive: [0, 0, 0],
		},
	} as IMeshConfig;

	const geometry = rt.createMeshGeometry(meshConfig, IDENTITY);
	const position = geometry.getAttribute("position") as THREE.BufferAttribute;
	const normal = geometry.getAttribute("normal") as THREE.BufferAttribute;
	const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;

	expect(normal).toBeDefined();
	expect(normal.count).toBe(position.count);
	expect(uv.count).toBe(position.count);
	for (let i = 0; i < normal.count; i++) {
		const n = new THREE.Vector3().fromBufferAttribute(normal, i);
		expect(n.length()).toBeCloseTo(1, 6);
	}
});
