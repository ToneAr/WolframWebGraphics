import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type {
	Bounds,
	ICartesianCoordinates3,
	ISceneConfig,
	IMeshConfig,
} from "@wgx/types";

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
	getSceneDimension(value: number | undefined): number {
		const dimension = Number(value);
		return dimension === 0 || Number.isNaN(dimension) ? 400 : dimension;
	}
	getViewPoint(sceneConfig: ISceneConfig): [number, number, number] {
		return sceneConfig.vp ?? [1.3, -2.4, 2];
	}
	createRenderer(width: number, height: number) {
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});

		renderer.setPixelRatio(window.devicePixelRatio || 1);
		renderer.setSize(width, height);

		return renderer;
	}
	createCamera(
		width: number,
		height: number,
		center: { x: number; y: number; z: number },
		sceneSize: number,
		viewPoint: [number, number, number],
	) {
		const viewPointMagnitude = Math.hypot(
			viewPoint[0],
			viewPoint[1],
			viewPoint[2],
		);
		const viewPointLength =
			viewPointMagnitude === 0 ? 1 : viewPointMagnitude;
		const camera = new THREE.PerspectiveCamera(
			35,
			width / height,
			sceneSize * 0.01,
			sceneSize * 100,
		);

		camera.up.set(0, 0, 1);
		camera.position.set(
			center.x + (viewPoint[0] / viewPointLength) * sceneSize * 2.2,
			center.y + (viewPoint[1] / viewPointLength) * sceneSize * 2.2,
			center.z + (viewPoint[2] / viewPointLength) * sceneSize * 2.2,
		);

		return camera;
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
	addSceneLights(
		scene: THREE.Scene,
		center: { x: number; y: number; z: number },
		sceneSize: number,
	) {
		scene.add(new THREE.AmbientLight(0xffffff, 0.55));

		const primaryLight = new THREE.DirectionalLight(0xffffff, 0.6);
		primaryLight.position.set(
			center.x + sceneSize,
			center.y - sceneSize,
			center.z + sceneSize,
		);
		scene.add(primaryLight);

		const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.35);
		secondaryLight.position.set(
			center.x - sceneSize,
			center.y + sceneSize,
			center.z + sceneSize * 0.5,
		);
		scene.add(secondaryLight);
	}
	createMeshGeometry(meshConfig: IMeshConfig) {
		const geometry = new THREE.BufferGeometry();

		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(meshConfig.pos, 3),
		);

		if (meshConfig.norm) {
			geometry.setAttribute(
				"normal",
				new THREE.Float32BufferAttribute(meshConfig.norm, 3),
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

		if (!meshConfig.norm) {
			geometry.computeVertexNormals();
		}

		return geometry;
	}
	createMeshMaterial(meshConfig: IMeshConfig) {
		const texture = meshConfig.tex
			? new THREE.TextureLoader().load(meshConfig.tex)
			: null;
		const material = new THREE.MeshPhongMaterial({
			map: texture,
			vertexColors: Boolean(meshConfig.col) && !texture,
			side: THREE.DoubleSide,
			flatShading: false,
			shininess: 25,
		});

		if (texture) {
			material.color = new THREE.Color(1, 1, 1);
		} else if (!meshConfig.col) {
			material.color = new THREE.Color(0.36, 0.5, 0.7);
		}

		return material;
	}
	addSceneMeshes(scene: THREE.Scene, meshConfigs?: IMeshConfig[]) {
		(meshConfigs ?? []).forEach((meshConfig) => {
			const geometry = this.createMeshGeometry(meshConfig);
			const material = this.createMeshMaterial(meshConfig);

			scene.add(new THREE.Mesh(geometry, material));
		});
	}
	startRenderLoop(
		renderer: THREE.WebGLRenderer,
		scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		controls: OrbitControls,
	) {
		function renderFrame() {
			requestAnimationFrame(renderFrame);
			controls.update();
			renderer.render(scene, camera);
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
		const bounds = this.getSceneBounds(sceneConfig);
		const center = this.getSceneCenter(bounds);
		const sceneSize = this.getSceneSize(bounds);
		const viewPoint = this.getViewPoint(sceneConfig);
		const renderer = this.createRenderer(width, height);
		container.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		const camera = this.createCamera(width, height, center, sceneSize, viewPoint);
		const controls = this.createControls(camera, renderer.domElement, center);

		this.addSceneLights(scene, center, sceneSize);
		this.addSceneMeshes(scene, sceneConfig.meshes);
		this.startRenderLoop(renderer, scene, camera, controls);
	}
}

// (function () {
// 	"use strict";

// 	function getThreeNamespace() {
// 		if (!window.THREE) {
// 			throw new Error("WGX3D requires THREE to be loaded first.");
// 		}

// 		if (!window.THREE.OrbitControls) {
// 			throw new Error("WGX3D requires THREE.OrbitControls to be loaded first.");
// 		}

// 		return window.THREE;
// 	}

// 	function getSceneBounds(sceneConfig) {
// 		return sceneConfig.bbox || [-1, 1, -1, 1, -1, 1];
// 	}

// 	function getSceneCenter(bounds) {
// 		return {
// 			x: (bounds[0] + bounds[1]) / 2,
// 			y: (bounds[2] + bounds[3]) / 2,
// 			z: (bounds[4] + bounds[5]) / 2,
// 		};
// 	}

// 	function getSceneSize(bounds) {
// 		return (
// 			Math.max(
// 				bounds[1] - bounds[0],
// 				bounds[3] - bounds[2],
// 				bounds[5] - bounds[4],
// 			) || 1
// 		);
// 	}

// 	function getSceneDimension(value) {
// 		return Number(value) || 400;
// 	}

// 	function getViewPoint(sceneConfig) {
// 		return sceneConfig.vp || [1.3, -2.4, 2];
// 	}

// 	function createRenderer(threeNamespace, width, height) {
// 		var renderer = new threeNamespace.WebGLRenderer({
// 			antialias: true,
// 			alpha: true,
// 		});

// 		renderer.setPixelRatio(window.devicePixelRatio || 1);
// 		renderer.setSize(width, height);

// 		return renderer;
// 	}

// 	function createCamera(
// 		threeNamespace,
// 		width,
// 		height,
// 		center,
// 		sceneSize,
// 		viewPoint,
// 	) {
// 		var viewPointLength =
// 			Math.hypot(viewPoint[0], viewPoint[1], viewPoint[2]) || 1;
// 		var camera = new threeNamespace.PerspectiveCamera(
// 			35,
// 			width / height,
// 			sceneSize * 0.01,
// 			sceneSize * 100,
// 		);

// 		camera.up.set(0, 0, 1);
// 		camera.position.set(
// 			center.x + (viewPoint[0] / viewPointLength) * sceneSize * 2.2,
// 			center.y + (viewPoint[1] / viewPointLength) * sceneSize * 2.2,
// 			center.z + (viewPoint[2] / viewPointLength) * sceneSize * 2.2,
// 		);

// 		return camera;
// 	}

// 	function createControls(threeNamespace, camera, rendererElement, target) {
// 		var controls = new threeNamespace.OrbitControls(camera, rendererElement);

// 		controls.target.set(target.x, target.y, target.z);
// 		controls.update();

// 		return controls;
// 	}

// 	function addSceneLights(threeNamespace, scene, center, sceneSize) {
// 		var primaryLight;
// 		var secondaryLight;

// 		scene.add(new threeNamespace.AmbientLight(0xffffff, 0.55));

// 		primaryLight = new threeNamespace.DirectionalLight(0xffffff, 0.6);
// 		primaryLight.position.set(
// 			center.x + sceneSize,
// 			center.y - sceneSize,
// 			center.z + sceneSize,
// 		);
// 		scene.add(primaryLight);

// 		secondaryLight = new threeNamespace.DirectionalLight(0xffffff, 0.35);
// 		secondaryLight.position.set(
// 			center.x - sceneSize,
// 			center.y + sceneSize,
// 			center.z + sceneSize * 0.5,
// 		);
// 		scene.add(secondaryLight);
// 	}

// 	function createMeshGeometry(threeNamespace, meshConfig) {
// 		var geometry = new threeNamespace.BufferGeometry();

// 		geometry.setAttribute(
// 			"position",
// 			new threeNamespace.Float32BufferAttribute(meshConfig.pos, 3),
// 		);

// 		if (meshConfig.norm) {
// 			geometry.setAttribute(
// 				"normal",
// 				new threeNamespace.Float32BufferAttribute(meshConfig.norm, 3),
// 			);
// 		}

// 		if (meshConfig.col) {
// 			geometry.setAttribute(
// 				"color",
// 				new threeNamespace.Float32BufferAttribute(meshConfig.col, 3),
// 			);
// 		}

// 		if (meshConfig.uv) {
// 			geometry.setAttribute(
// 				"uv",
// 				new threeNamespace.Float32BufferAttribute(meshConfig.uv, 2),
// 			);
// 		}

// 		geometry.setIndex(meshConfig.idx);

// 		if (!meshConfig.norm) {
// 			geometry.computeVertexNormals();
// 		}

// 		return geometry;
// 	}

// 	function createMeshMaterial(threeNamespace, meshConfig) {
// 		var texture = meshConfig.tex
// 			? new threeNamespace.TextureLoader().load(meshConfig.tex)
// 			: null;
// 		var material = new threeNamespace.MeshPhongMaterial({
// 			map: texture,
// 			vertexColors: Boolean(meshConfig.col) && !texture,
// 			side: threeNamespace.DoubleSide,
// 			flatShading: false,
// 			shininess: 25,
// 		});

// 		if (texture) {
// 			material.color = new threeNamespace.Color(1, 1, 1);
// 		} else if (!meshConfig.col) {
// 			material.color = new threeNamespace.Color(0.36, 0.5, 0.7);
// 		}

// 		return material;
// 	}

// 	function addSceneMeshes(threeNamespace, scene, meshConfigs) {
// 		(meshConfigs || []).forEach(function (meshConfig) {
// 			var geometry = createMeshGeometry(threeNamespace, meshConfig);
// 			var material = createMeshMaterial(threeNamespace, meshConfig);

// 			scene.add(new threeNamespace.Mesh(geometry, material));
// 		});
// 	}

// 	function startRenderLoop(renderer, scene, camera, controls) {
// 		function renderFrame() {
// 			requestAnimationFrame(renderFrame);
// 			controls.update();
// 			renderer.render(scene, camera);
// 		}

// 		renderFrame();
// 	}

// 	function renderScene(containerId, sceneConfig) {
// 		var threeNamespace = getThreeNamespace();
// 		var container = document.getElementById(containerId);
// 		var width = getSceneDimension(sceneConfig.width);
// 		var height = getSceneDimension(sceneConfig.height);
// 		var bounds = getSceneBounds(sceneConfig);
// 		var center = getSceneCenter(bounds);
// 		var sceneSize = getSceneSize(bounds);
// 		var viewPoint = getViewPoint(sceneConfig);
// 		var renderer;
// 		var scene;
// 		var camera;
// 		var controls;

// 		if (!container) {
// 			return;
// 		}

// 		renderer = createRenderer(threeNamespace, width, height);
// 		container.appendChild(renderer.domElement);

// 		scene = new threeNamespace.Scene();
// 		camera = createCamera(
// 			threeNamespace,
// 			width,
// 			height,
// 			center,
// 			sceneSize,
// 			viewPoint,
// 		);
// 		controls = createControls(
// 			threeNamespace,
// 			camera,
// 			renderer.domElement,
// 			center,
// 		);

// 		addSceneLights(threeNamespace, scene, center, sceneSize);
// 		addSceneMeshes(threeNamespace, scene, sceneConfig.meshes);
// 		startRenderLoop(renderer, scene, camera, controls);
// 	}

// 	function hydrate() {
// 		var elements = document.querySelectorAll("[id^='wgx3d']");
// 		elements.forEach(function (element) {

// 		});
// 	}

// 	window.WGX3D = window.WGX3D || {};
// 	window.WGX3D.renderScene = renderScene;
// })();
