import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { toCreasedNormals } from "three/addons/utils/BufferGeometryUtils.js";
import type {
	Bounds,
	IAxesConfig,
	ICartesianCoordinates3,
	ISceneConfig,
	IMeshConfig,
	IEdgeStyle,
	ILineConfig,
	ILightConfig,
	IVolumeConfig,
} from "@wgx/types";
import Axes3D from "./Axes3D";

const LIGHT_INTENSITY = Math.PI;

const CAMERA_FIT_MARGIN = 1;

const WOLFRAM_SPECULAR_SCALE = 0.35 / LIGHT_INTENSITY;

// Dihedral angle (degrees) above which a shared polygon edge counts as a feature
// edge worth drawing
const EDGE_THRESHOLD_DEG = 45;

// Wolfram colour values are display (sRGB) values; render them at face value
// (like the classic Mathematica renderer) rather than letting THREE treat them
// as linear and re-encode them, which washes/brightens the surface.
THREE.ColorManagement.enabled = false;

interface SceneTransform {
	scale: THREE.Vector3;
	offset: THREE.Vector3;
}

const VOLUME_VERTEX_SHADER = /* glsl */ `
	out vec3 vOrigin;
	out vec3 vDirection;

	void main() {
		vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

		vOrigin = vec3(inverse(modelMatrix) * vec4(cameraPosition, 1.0));
		vDirection = position - vOrigin;
		gl_Position = projectionMatrix * mvPosition;
	}
`;

const VOLUME_FRAGMENT_SHADER = /* glsl */ `
	precision highp float;
	precision highp sampler3D;

	uniform sampler3D uData;
	uniform vec3 uSize;
	uniform float uOpacityScale;
	uniform float uSampleCount;
	uniform float uJitter;

	in vec3 vOrigin;
	in vec3 vDirection;
	out vec4 outColor;

	vec2 hitBox(vec3 origin, vec3 direction) {
		const vec3 boxMin = vec3(-0.5);
		const vec3 boxMax = vec3(0.5);
		vec3 invDirection = 1.0 / direction;
		vec3 tMin = (boxMin - origin) * invDirection;
		vec3 tMax = (boxMax - origin) * invDirection;
		vec3 t1 = min(tMin, tMax);
		vec3 t2 = max(tMin, tMax);
		float tNear = max(max(t1.x, t1.y), t1.z);
		float tFar = min(min(t2.x, t2.y), t2.z);

		return vec2(tNear, tFar);
	}

	float random(vec2 seed) {
		return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
	}

	float correctedAlpha(float alpha, float delta) {
		float referenceStep = delta * max(max(uSize.x, uSize.y), uSize.z);
		float transmittance = 1.0 - clamp(alpha * uOpacityScale, 0.0, 1.0);

		return 1.0 - pow(max(transmittance, 0.0001), referenceStep);
	}

	void main() {
		vec3 rayDirection = normalize(vDirection);
		vec2 bounds = hitBox(vOrigin, rayDirection);

		if (bounds.x > bounds.y) {
			discard;
		}

		bounds.x = max(bounds.x, 0.0);

		vec3 point = vOrigin + bounds.x * rayDirection;
		float rayLength = bounds.y - bounds.x;
		float delta = rayLength / max(uSampleCount, 1.0);
		float offset = random(gl_FragCoord.xy) * delta * uJitter;
		vec4 accumulated = vec4(0.0);
		float t = bounds.x + offset;

		point += rayDirection * offset;

		for (int i = 0; i < 4096; i += 1) {
			if (
				float(i) >= uSampleCount ||
				t > bounds.y ||
				accumulated.a > 0.98
			) {
				break;
			}

			vec4 sampleColor = texture(uData, point + 0.5);
			sampleColor.a = correctedAlpha(sampleColor.a, delta);
			accumulated.rgb +=
				(1.0 - accumulated.a) * sampleColor.rgb * sampleColor.a;
			accumulated.a += (1.0 - accumulated.a) * sampleColor.a;

			t += delta;
			point += rayDirection * delta;
		}

		if (accumulated.a <= 0.01) {
			discard;
		}

		accumulated.rgb /= max(accumulated.a, 0.0001);
		outColor = accumulated;
	}
`;

export default class ThreeRuntime {
	static elements: HTMLElement[] | undefined = undefined;
	static configs: ISceneConfig[] | undefined = undefined;
	constructor() {
		ThreeRuntime.elements = Array.from(
			document.querySelectorAll<HTMLElement>("[id^='wgx3d']"),
		);
		ThreeRuntime.configs = ThreeRuntime.elements.map((element: HTMLElement) => {
			const config = element.getAttribute("data-wgx3d-config");
			return config ? (JSON.parse(config) as ISceneConfig) : {};
		});
	}
	getSceneBounds(sceneConfig: ISceneConfig): Bounds {
		return sceneConfig.bbox ?? [-1, 1, -1, 1, -1, 1];
	}
	getScenePlotRange(sceneConfig: ISceneConfig): Bounds {
		// The plot range is the box BoxRatios shapes (as in Wolfram). When the
		// serializer didn't supply one, fall back to the geometry bounds so the
		// scale stays uniform (the box is shown at its true aspect ratio).
		return sceneConfig.plotRange ?? this.getSceneBounds(sceneConfig);
	}
	getSceneCenter(bounds: Bounds): ICartesianCoordinates3 {
		return {
			x: (bounds[0] + bounds[1]) / 2,
			y: (bounds[2] + bounds[3]) / 2,
			z: (bounds[4] + bounds[5]) / 2,
		};
	}
	getSceneSize(bounds: Bounds): number {
		const sceneSize = Math.max(
			bounds[1] - bounds[0],
			bounds[3] - bounds[2],
			bounds[5] - bounds[4],
		);

		return sceneSize === 0 ? 1 : sceneSize;
	}
	getBoundingRadius(bounds: Bounds): number {
		const [extentX, extentY, extentZ] = this.getSceneExtents(bounds);
		const radius = 0.5 * Math.hypot(extentX, extentY, extentZ);

		// Never let a near-degenerate (flat / collinear) box collapse the fit.
		return Math.max(radius, this.getSceneSize(bounds) * 0.5);
	}
	getSceneExtents(bounds: Bounds): [number, number, number] {
		return [
			Math.max(bounds[1] - bounds[0], Number.EPSILON),
			Math.max(bounds[3] - bounds[2], Number.EPSILON),
			Math.max(bounds[5] - bounds[4], Number.EPSILON),
		];
	}
	getBoxRatios(sceneConfig: ISceneConfig): [number, number, number] {
		const ratios = sceneConfig.boxRatios ?? [1, 1, 1];
		return ratios.map((ratio) =>
			Number.isFinite(ratio) && ratio > 0 ? ratio : 1,
		) as [number, number, number];
	}
	createSceneTransform(
		bounds: Bounds,
		boxRatios: [number, number, number],
		plotRange: Bounds,
	) {
		// BoxRatios shapes the *plot range* box (as in Wolfram), not the tight
		// geometry box, so the per-axis scale depends only on BoxRatios and the
		// plot-range spans -- never on how tightly the geometry fills the range.
		// When BoxRatios -> Automatic resolves to the plot-range spans the scale
		// is uniform, so spheres / cylinders keep their true (circular) cross
		// sections; a deliberate distortion like Plot3D's {1,1,0.4} is preserved.
		const refSpans = this.getSceneExtents(plotRange);
		const maxRef = Math.max(...refSpans);
		const maxRatio = Math.max(...boxRatios);
		const targetExtents = boxRatios.map((ratio) => (maxRef * ratio) / maxRatio);
		const center = this.getSceneCenter(bounds);
		const scale = new THREE.Vector3(
			targetExtents[0] / refSpans[0],
			targetExtents[1] / refSpans[1],
			targetExtents[2] / refSpans[2],
		);
		const offset = new THREE.Vector3(
			center.x * (1 - scale.x),
			center.y * (1 - scale.y),
			center.z * (1 - scale.z),
		);

		return { scale, offset };
	}
	transformValue(value: number, dim: number, transform: SceneTransform) {
		return (
			value * transform.scale.getComponent(dim) +
			transform.offset.getComponent(dim)
		);
	}
	transformPoint(
		point: [number, number, number],
		transform: SceneTransform,
	): [number, number, number] {
		return [
			this.transformValue(point[0], 0, transform),
			this.transformValue(point[1], 1, transform),
			this.transformValue(point[2], 2, transform),
		];
	}
	transformDirection(
		direction: [number, number, number],
		transform: SceneTransform,
	) {
		const vector = new THREE.Vector3(
			direction[0] * transform.scale.x,
			direction[1] * transform.scale.y,
			direction[2] * transform.scale.z,
		);

		return vector.lengthSq() === 0
			? new THREE.Vector3(0, 0, 1)
			: vector.normalize();
	}
	transformBounds(bounds: Bounds, transform: SceneTransform): Bounds {
		return [
			this.transformValue(bounds[0], 0, transform),
			this.transformValue(bounds[1], 0, transform),
			this.transformValue(bounds[2], 1, transform),
			this.transformValue(bounds[3], 1, transform),
			this.transformValue(bounds[4], 2, transform),
			this.transformValue(bounds[5], 2, transform),
		];
	}
	transformFlatPositions(values: number[], transform: SceneTransform) {
		const out = new Array<number>(values.length);
		for (let i = 0; i < values.length; i += 3) {
			out[i] = this.transformValue(values[i], 0, transform);
			out[i + 1] = this.transformValue(values[i + 1], 1, transform);
			out[i + 2] = this.transformValue(values[i + 2], 2, transform);
		}
		return out;
	}
	transformFlatNormals(values: number[], transform: SceneTransform) {
		const out = new Array<number>(values.length);
		for (let i = 0; i < values.length; i += 3) {
			const x = values[i] / transform.scale.x;
			const y = values[i + 1] / transform.scale.y;
			const z = values[i + 2] / transform.scale.z;
			const length = Math.hypot(x, y, z) || 1;
			out[i] = x / length;
			out[i + 1] = y / length;
			out[i + 2] = z / length;
		}
		return out;
	}
	getSceneDimension(value: number | undefined): number {
		const dimension = Number(value);
		return dimension === 0 || Number.isNaN(dimension) ? 400 : dimension;
	}
	getViewPoint(sceneConfig: ISceneConfig): [number, number, number] {
		return sceneConfig.vp ?? [1.3, -2.4, 2];
	}
	getViewVertical(sceneConfig: ISceneConfig): [number, number, number] {
		return sceneConfig.vv ?? [0, 0, 1];
	}
	getViewAngle(sceneConfig: ISceneConfig): number | undefined {
		const angle = Number(sceneConfig.va);
		return Number.isFinite(angle) && angle > 0 ? angle : undefined;
	}
	createRenderer(width: number, height: number) {
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});

		renderer.setPixelRatio(window.devicePixelRatio || 1);
		renderer.setSize(width, height);
		renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

		return renderer;
	}
	createCamera(
		width: number,
		height: number,
		center: { x: number; y: number; z: number },
		sceneSize: number,
		boundingRadius: number,
		viewPoint: [number, number, number],
		viewVertical: THREE.Vector3,
		viewAngle?: number,
	) {
		const viewPointMagnitude = Math.hypot(
			viewPoint[0],
			viewPoint[1],
			viewPoint[2],
		);
		const viewPointLength =
			viewPointMagnitude === 0 ? 1 : viewPointMagnitude;
		const fov = viewAngle ? THREE.MathUtils.radToDeg(viewAngle) : 35;
		const camera = new THREE.PerspectiveCamera(
			fov,
			width / height,
			sceneSize * 0.01,
			sceneSize * 100,
		);

		// Pull the camera back to the distance at which the scene's bounding
		// sphere fits within the *narrower* of the horizontal / vertical field of
		// view, so portrait and landscape widgets both frame the whole scene.
		// Replaces the old fixed 2.2*sceneSize, which framed the scene too tightly
		// and clipped the box edges and axis labels.
		const verticalFov = THREE.MathUtils.degToRad(fov);
		const aspect = width / height;
		const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
		const limitingHalfFov = Math.min(verticalFov, horizontalFov) / 2;
		const distance =
			(boundingRadius * CAMERA_FIT_MARGIN) / Math.sin(limitingHalfFov);

		camera.up.copy(viewVertical);
		camera.position.set(
			center.x + (viewPoint[0] / viewPointLength) * distance,
			center.y + (viewPoint[1] / viewPointLength) * distance,
			center.z + (viewPoint[2] / viewPointLength) * distance,
		);

		return camera;
	}
	createLabelRenderer(width: number, height: number) {
		const labelRenderer = new CSS2DRenderer();

		labelRenderer.setSize(width, height);
		labelRenderer.domElement.style.position = "absolute";
		labelRenderer.domElement.style.top = "0";
		labelRenderer.domElement.style.left = "0";
		labelRenderer.domElement.style.pointerEvents = "none";

		return labelRenderer;
	}
	createControls(
		camera: THREE.PerspectiveCamera,
		rendererElement: HTMLElement,
		target: { x: number; y: number; z: number },
	) {
		const controls = new OrbitControls(camera, rendererElement);

		controls.target.set(target.x, target.y, target.z);
		controls.update();

		return controls;
	}

	cameraLocalPoint(
		camera: THREE.PerspectiveCamera,
		point: [number, number, number],
	) {
		camera.updateMatrixWorld(true);
		return camera.worldToLocal(new THREE.Vector3(...point));
	}

	sceneCenterTuple(center: { x: number; y: number; z: number }) {
		return [center.x, center.y, center.z] as [number, number, number];
	}

	// Lights are parented to the camera so they stay pinned to the viewer (as in
	// Wolfram). A light's position resolves to a point in the camera's own frame:
	// a `view` light's `position` is a view-space offset from the scene centre, so
	// it is placed at the camera-local centre plus that offset (scaled to the
	// scene); a world light's `position` is a scene point converted to the camera
	// frame. The scene centre lies on the view axis, so view lights track rotation.
	lightLocalPosition(
		camera: THREE.PerspectiveCamera,
		light: ILightConfig,
		center: { x: number; y: number; z: number },
		sceneSize: number,
		transform: SceneTransform,
	): THREE.Vector3 {
		const centerLocal = this.cameraLocalPoint(
			camera,
			this.sceneCenterTuple(center),
		);

		if (light.view) {
			const offset = new THREE.Vector3(...(light.position ?? [0, 0, 1]));
			return centerLocal.add(offset.multiplyScalar(sceneSize));
		}

		const positionWorld = light.position
			? this.transformPoint(light.position, transform)
			: ([center.x, center.y, center.z + sceneSize] as [
					number,
					number,
					number,
				]);

		return this.cameraLocalPoint(camera, positionWorld);
	}
	addConfiguredLight(
		scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		light: ILightConfig,
		center: { x: number; y: number; z: number },
		sceneSize: number,
		transform: SceneTransform,
	) {
		const color = new THREE.Color(...light.color);
		// A view light always aims at the scene centre; a world light at its
		// resolved target (or the scene centre when none is given).
		const targetLocal =
			light.view || !light.target
				? this.cameraLocalPoint(camera, this.sceneCenterTuple(center))
				: this.cameraLocalPoint(
						camera,
						this.transformPoint(light.target, transform),
					);
		const position = () =>
			this.lightLocalPosition(camera, light, center, sceneSize, transform);

		switch (light.type) {
			case "ambient":
				scene.add(new THREE.AmbientLight(color, LIGHT_INTENSITY));
				break;
			case "directional": {
				const directional = new THREE.DirectionalLight(color, LIGHT_INTENSITY);

				directional.position.copy(position());
				directional.target.position.copy(targetLocal);
				camera.add(directional);
				camera.add(directional.target);
				break;
			}
			case "point": {
				const point = new THREE.PointLight(color, LIGHT_INTENSITY);

				point.position.copy(position());
				camera.add(point);
				break;
			}
			case "spot": {
				const spot = new THREE.SpotLight(color, LIGHT_INTENSITY);

				spot.position.copy(position());
				spot.target.position.copy(targetLocal);
				if (light.angle != null) {
					spot.angle = light.angle;
				}
				camera.add(spot);
				camera.add(spot.target);
				break;
			}
		}
	}
	addSceneLights(
		scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		center: { x: number; y: number; z: number },
		sceneSize: number,
		transform: SceneTransform,
		lights?: ILightConfig[],
	) {
		// Use the lights the WL serializer resolved from the Lighting option.
		// (An empty array is honoured -- Lighting -> None means no lights.)
		if (lights) {
			for (const light of lights) {
				this.addConfiguredLight(
					scene,
					camera,
					light,
					center,
					sceneSize,
					transform,
				);
			}
			return;
		}

		// Fallback for configs without resolved lighting.
		scene.add(new THREE.AmbientLight(0xffffff, 0.55));

		const primaryLight = new THREE.DirectionalLight(0xffffff, 0.6);
		// Keep fallback lights viewer-relative too, matching the resolved path.
		primaryLight.position.copy(
			this.cameraLocalPoint(camera, [
				center.x + sceneSize,
				center.y - sceneSize,
				center.z + sceneSize,
			]),
		);
		primaryLight.target.position.copy(
			this.cameraLocalPoint(camera, this.sceneCenterTuple(center)),
		);
		camera.add(primaryLight);
		camera.add(primaryLight.target);

		const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.35);
		secondaryLight.position.copy(
			this.cameraLocalPoint(camera, [
				center.x - sceneSize,
				center.y + sceneSize,
				center.z + sceneSize * 0.5,
			]),
		);
		secondaryLight.target.position.copy(
			this.cameraLocalPoint(camera, this.sceneCenterTuple(center)),
		);
		camera.add(secondaryLight);
		camera.add(secondaryLight.target);
	}
	createMeshGeometry(meshConfig: IMeshConfig, transform: SceneTransform) {
		const geometry = new THREE.BufferGeometry();

		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(
				this.transformFlatPositions(meshConfig.pos, transform),
				3,
			),
		);

		if (meshConfig.norm) {
			geometry.setAttribute(
				"normal",
				new THREE.Float32BufferAttribute(
					this.transformFlatNormals(meshConfig.norm, transform),
					3,
				),
			);
		}

		if (meshConfig.col) {
			geometry.setAttribute(
				"color",
				new THREE.Float32BufferAttribute(meshConfig.col, 3),
			);
		}

		if (meshConfig.uv) {
			geometry.setAttribute(
				"uv",
				new THREE.Float32BufferAttribute(meshConfig.uv, 2),
			);
		}

		geometry.setIndex(meshConfig.idx);

		if (meshConfig.norm) {
			return geometry;
		}

		// No serializer-supplied normals: the mesh primitives (Cylinder / Cone /
		// Cuboid / ...) are discretised to a welded manifold that carries none.
		// Plain computeVertexNormals would average the normals of EVERY face sharing
		// a vertex, blending across hard feature edges -- a cylinder's rim vertices
		// are shared between the flat cap (axial normal) and the curved wall (radial
		// normal), so smoothing them domes the flat cap and bands the wall near the
		// rim. toCreasedNormals instead splits the normal wherever adjacent faces
		// differ by more than the crease angle, keeping smooth tessellation (sphere,
		// cylinder wall) smooth while shading every real crease (cap rim, cube edge)
		// hard. It groups by vertex position, so it splits the rim even though the
		// mesh welds it. The crease angle is EDGE_THRESHOLD_DEG: the same dihedral
		// that marks a feature edge worth drawing marks a crease worth shading hard.
		return toCreasedNormals(
			geometry,
			THREE.MathUtils.degToRad(EDGE_THRESHOLD_DEG),
		);
	}
	createMeshMaterial(meshConfig: IMeshConfig) {
		const texture = meshConfig.tex
			? new THREE.TextureLoader().load(meshConfig.tex)
			: null;
		const hasVertexColors = Boolean(meshConfig.col) && !texture;
		const opacity = meshConfig.opacity ?? 1;
		const material = new THREE.MeshPhongMaterial({
			map: texture,
			vertexColors: hasVertexColors,
			side: THREE.DoubleSide,
			flatShading: false,
			transparent: opacity < 1,
			opacity,
			polygonOffset: true,
			polygonOffsetFactor: 1,
			polygonOffsetUnits: 1,
		});

		// material properties resolved from Specularity / Glow directives.
		// Wolfram has NO specular highlight unless a Specularity directive asks
		// for one, so a mesh with no resolved specular gets a black (off)
		// specular -- otherwise THREE's default 0x111111 invents a highlight the
		// expression never specified. Specularity's exponent is a Blinn-Phong
		// exponent, the same convention as THREE's shininess, so it passes
		// through directly. The runtime uses Math.PI-scaled lights to keep the
		// diffuse surface close to WL, but THREE's Phong specular responds too
		// strongly to that scale; damp only the specular term.
		material.specular = meshConfig.specular
			? new THREE.Color(...meshConfig.specular).multiplyScalar(
					WOLFRAM_SPECULAR_SCALE,
				)
			: new THREE.Color(0, 0, 0);
		if (meshConfig.shininess != null) {
			material.shininess = meshConfig.shininess;
		}
		if (meshConfig.emissive) {
			material.emissive = new THREE.Color(...meshConfig.emissive);
		}

		// diffuse colour: the resolved directive colour, else a neutral diffuse
		// (white) so the surface is shaped purely by the derived lights -- never
		// an invented colour. Per-vertex colours drive the colour themselves.
		if (meshConfig.color) {
			material.color = new THREE.Color(...meshConfig.color);
		} else if (!hasVertexColors) {
			material.color = new THREE.Color(1, 1, 1);
		}

		return material;
	}
	createEdgeMaterial(edge: IEdgeStyle): THREE.LineBasicMaterial {
		const opacity = edge.opacity ?? 1;
		return new THREE.LineBasicMaterial({
			color: new THREE.Color(...edge.color),
			transparent: opacity < 1,
			opacity,
			linewidth: edge.width ?? 1,
		});
	}
	// The polygon border Wolfram draws by default (EdgeForm), derived from the
	// mesh: only feature edges are drawn (EdgesGeometry past EDGE_THRESHOLD_DEG),
	// so a cube shows its 12 edges while a sphere stays smooth. Exact for flat /
	// smooth meshes; cap-bearing curved primitives use createEdgePathLines instead.
	// The mesh material carries a polygon offset, so these lines sit in front.
	createMeshEdges(
		geometry: THREE.BufferGeometry,
		edge: IEdgeStyle,
	): THREE.LineSegments {
		return new THREE.LineSegments(
			new THREE.EdgesGeometry(geometry, EDGE_THRESHOLD_DEG),
			this.createEdgeMaterial(edge),
		);
	}
	// The serializer's exact analytic rim polylines (one Line per closed loop) for
	// cap-bearing curved primitives (cylinder/cone), where dihedral detection on
	// the coarse mesh would mistake the lateral facets for edges.
	createEdgePathLines(paths: number[][], edge: IEdgeStyle): THREE.Line[] {
		const material = this.createEdgeMaterial(edge);
		return paths.map((path) => {
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute(
				"position",
				new THREE.Float32BufferAttribute(path, 3),
			);
			return new THREE.Line(geometry, material);
		});
	}
	addSceneMeshes(
		scene: THREE.Scene,
		transform: SceneTransform,
		meshConfigs?: IMeshConfig[],
	) {
		(meshConfigs ?? []).forEach((meshConfig) => {
			const geometry = this.createMeshGeometry(meshConfig, transform);
			const material = this.createMeshMaterial(meshConfig);

			scene.add(new THREE.Mesh(geometry, material));

			if (!meshConfig.edge) {
				return;
			}
			if (meshConfig.edgePaths) {
				const transformed = meshConfig.edgePaths.map((path) =>
					this.transformFlatPositions(path, transform),
				);
				for (const line of this.createEdgePathLines(transformed, meshConfig.edge)) {
					scene.add(line);
				}
			} else {
				scene.add(this.createMeshEdges(geometry, meshConfig.edge));
			}
		});
	}
	createLineGeometry(lineConfig: ILineConfig, transform: SceneTransform) {
		const geometry = new THREE.BufferGeometry();

		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(
				this.transformFlatPositions(lineConfig.pos, transform),
				3,
			),
		);

		if (lineConfig.col) {
			geometry.setAttribute(
				"color",
				new THREE.Float32BufferAttribute(lineConfig.col, 3),
			);
		}

		return geometry;
	}
	createLineMaterial(lineConfig: ILineConfig) {
		const hasVertexColors = Boolean(lineConfig.col);
		const opacity = lineConfig.opacity ?? 1;
		const base = {
			color: hasVertexColors
				? new THREE.Color(1, 1, 1)
				: new THREE.Color(...(lineConfig.color ?? [0, 0, 0])),
			vertexColors: hasVertexColors,
			transparent: opacity < 1,
			opacity,
			linewidth: lineConfig.width ?? 1,
			depthWrite: false,
		};

		if (lineConfig.dashing && lineConfig.dashing.length > 0) {
			const dashSize = lineConfig.dashing[0] ?? 1;
			const gapSize = lineConfig.dashing[1] ?? dashSize;
			return new THREE.LineDashedMaterial({ ...base, dashSize, gapSize });
		}

		return new THREE.LineBasicMaterial(base);
	}
	addSceneLines(
		scene: THREE.Scene,
		transform: SceneTransform,
		lineConfigs?: ILineConfig[],
	) {
		(lineConfigs ?? []).forEach((lineConfig) => {
			const geometry = this.createLineGeometry(lineConfig, transform);
			const material = this.createLineMaterial(lineConfig);
			const line = new THREE.LineSegments(geometry, material);

			if (material instanceof THREE.LineDashedMaterial) {
				line.computeLineDistances();
			}
			scene.add(line);
		});
	}
	decodeBase64Bytes(data: string): Uint8Array {
		const binary = window.atob(data);
		const bytes = new Uint8Array(binary.length);

		for (let i = 0; i < binary.length; i += 1) {
			bytes[i] = binary.charCodeAt(i);
		}

		return bytes;
	}
	createVolumeTexture(volumeConfig: IVolumeConfig) {
		const texture = new THREE.Data3DTexture(
			this.decodeBase64Bytes(volumeConfig.data),
			volumeConfig.dims[0],
			volumeConfig.dims[1],
			volumeConfig.dims[2],
		);

		texture.format = THREE.RGBAFormat;
		texture.type = THREE.UnsignedByteType;
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
		texture.wrapR = THREE.ClampToEdgeWrapping;
		texture.minFilter = volumeConfig.interpolate
			? THREE.LinearFilter
			: THREE.NearestFilter;
		texture.magFilter = volumeConfig.interpolate
			? THREE.LinearFilter
			: THREE.NearestFilter;
		texture.unpackAlignment = 1;
		texture.needsUpdate = true;

		return texture;
	}
	getVolumeSampleCount(volumeConfig: IVolumeConfig): number {
		const longestDimension = Math.max(...volumeConfig.dims);
		const automaticSamples = Math.ceil(longestDimension * 3);
		const configuredSamples = Number(volumeConfig.samples);
		const sampleCount =
			Number.isFinite(configuredSamples) && configuredSamples > 0
				? configuredSamples
				: automaticSamples;

		return Math.max(32, Math.min(4096, Math.ceil(sampleCount)));
	}
	createVolumeMaterial(volumeConfig: IVolumeConfig) {
		return new THREE.ShaderMaterial({
			glslVersion: THREE.GLSL3,
			uniforms: {
				uData: { value: this.createVolumeTexture(volumeConfig) },
				uSize: { value: new THREE.Vector3(...volumeConfig.dims) },
				uOpacityScale: { value: 1 },
				uSampleCount: { value: this.getVolumeSampleCount(volumeConfig) },
				uJitter: { value: 0.75 },
			},
			vertexShader: VOLUME_VERTEX_SHADER,
			fragmentShader: VOLUME_FRAGMENT_SHADER,
			side: THREE.BackSide,
			transparent: true,
			depthWrite: false,
		});
	}
	createVolumeMesh(volumeConfig: IVolumeConfig, transform: SceneTransform) {
		const bounds = this.transformBounds(volumeConfig.bbox, transform);
		const sizeX = Math.max(bounds[1] - bounds[0], Number.EPSILON);
		const sizeY = Math.max(bounds[3] - bounds[2], Number.EPSILON);
		const sizeZ = Math.max(bounds[5] - bounds[4], Number.EPSILON);
		const mesh = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			this.createVolumeMaterial(volumeConfig),
		);

		mesh.position.set(
			(bounds[0] + bounds[1]) / 2,
			(bounds[2] + bounds[3]) / 2,
			(bounds[4] + bounds[5]) / 2,
		);
		mesh.scale.set(sizeX, sizeY, sizeZ);

		return mesh;
	}
	addSceneVolumes(
		scene: THREE.Scene,
		transform: SceneTransform,
		volumeConfigs?: IVolumeConfig[],
	) {
		(volumeConfigs ?? []).forEach((volumeConfig) => {
			scene.add(this.createVolumeMesh(volumeConfig, transform));
		});
	}
	transformAxesConfig(
		axesConfig: IAxesConfig,
		transform: SceneTransform,
	): IAxesConfig {
		return {
			...axesConfig,
			ticks: axesConfig.ticks.map((ticks, dim) =>
				ticks.map((tick) => ({
					...tick,
					value: this.transformValue(tick.value, dim, transform),
				})),
			) as IAxesConfig["ticks"],
		};
	}
	startRenderLoop(
		renderer: THREE.WebGLRenderer,
		scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		controls: OrbitControls,
		labelRenderer?: CSS2DRenderer,
		axes?: Axes3D,
	) {
		function renderFrame() {
			requestAnimationFrame(renderFrame);
			controls.update();
			axes?.update(camera);
			renderer.render(scene, camera);
			labelRenderer?.render(scene, camera);
		}

		renderFrame();
	}
	renderScene(containerId: string, sceneConfig: ISceneConfig) {
		const container = document.getElementById(containerId);

		if (!container) {
			return;
		}

		const width = this.getSceneDimension(sceneConfig.width);
		const height = this.getSceneDimension(sceneConfig.height);
		const rawBounds = this.getSceneBounds(sceneConfig);
		const transform = this.createSceneTransform(
			rawBounds,
			this.getBoxRatios(sceneConfig),
			this.getScenePlotRange(sceneConfig),
		);
		const bounds = this.transformBounds(rawBounds, transform);
		const center = this.getSceneCenter(bounds);
		const sceneSize = this.getSceneSize(bounds);
		const boundingRadius = this.getBoundingRadius(bounds);
		const viewPoint = this.getViewPoint(sceneConfig);
		const viewVertical = this.transformDirection(
			this.getViewVertical(sceneConfig),
			transform,
		);
		const viewAngle = this.getViewAngle(sceneConfig);
		const renderer = this.createRenderer(width, height);
		container.style.position = "relative";
		container.appendChild(renderer.domElement);

		const labelRenderer = this.createLabelRenderer(width, height);
		container.appendChild(labelRenderer.domElement);

		const scene = new THREE.Scene();
		const camera = this.createCamera(
			width,
			height,
			center,
			sceneSize,
			boundingRadius,
			viewPoint,
			viewVertical,
			viewAngle,
		);
		const controls = this.createControls(camera, renderer.domElement, center);
		scene.add(camera);

		this.addSceneLights(
			scene,
			camera,
			center,
			sceneSize,
			transform,
			sceneConfig.lights,
		);
		this.addSceneMeshes(scene, transform, sceneConfig.meshes);
		this.addSceneLines(scene, transform, sceneConfig.lines);
		this.addSceneVolumes(scene, transform, sceneConfig.volumes);

		let axes: Axes3D | undefined;
		if (sceneConfig.axes) {
			axes = new Axes3D(
				this.transformAxesConfig(sceneConfig.axes, transform),
				bounds,
				sceneSize,
			);
			scene.add(axes.group);
		}

		this.startRenderLoop(renderer, scene, camera, controls, labelRenderer, axes);
	}
}
