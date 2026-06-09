(function () {
	"use strict";

	function getThreeNamespace() {
		if (!window.THREE) {
			throw new Error("WGX3D requires THREE to be loaded first.");
		}

		if (!window.THREE.OrbitControls) {
			throw new Error("WGX3D requires THREE.OrbitControls to be loaded first.");
		}

		return window.THREE;
	}

	function getSceneBounds(sceneConfig) {
		return sceneConfig.bbox || [-1, 1, -1, 1, -1, 1];
	}

	function getSceneCenter(bounds) {
		return {
			x: (bounds[0] + bounds[1]) / 2,
			y: (bounds[2] + bounds[3]) / 2,
			z: (bounds[4] + bounds[5]) / 2,
		};
	}

	function getSceneSize(bounds) {
		return (
			Math.max(
				bounds[1] - bounds[0],
				bounds[3] - bounds[2],
				bounds[5] - bounds[4],
			) || 1
		);
	}

	function getSceneDimension(value) {
		return Number(value) || 400;
	}

	function getViewPoint(sceneConfig) {
		return sceneConfig.vp || [1.3, -2.4, 2];
	}

	function createRenderer(threeNamespace, width, height) {
		var renderer = new threeNamespace.WebGLRenderer({
			antialias: true,
			alpha: true,
		});

		renderer.setPixelRatio(window.devicePixelRatio || 1);
		renderer.setSize(width, height);

		return renderer;
	}

	function createCamera(
		threeNamespace,
		width,
		height,
		center,
		sceneSize,
		viewPoint,
	) {
		var viewPointLength =
			Math.hypot(viewPoint[0], viewPoint[1], viewPoint[2]) || 1;
		var camera = new threeNamespace.PerspectiveCamera(
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

	function createControls(threeNamespace, camera, rendererElement, target) {
		var controls = new threeNamespace.OrbitControls(camera, rendererElement);

		controls.target.set(target.x, target.y, target.z);
		controls.update();

		return controls;
	}

	function addSceneLights(threeNamespace, scene, center, sceneSize) {
		var primaryLight;
		var secondaryLight;

		scene.add(new threeNamespace.AmbientLight(0xffffff, 0.55));

		primaryLight = new threeNamespace.DirectionalLight(0xffffff, 0.6);
		primaryLight.position.set(
			center.x + sceneSize,
			center.y - sceneSize,
			center.z + sceneSize,
		);
		scene.add(primaryLight);

		secondaryLight = new threeNamespace.DirectionalLight(0xffffff, 0.35);
		secondaryLight.position.set(
			center.x - sceneSize,
			center.y + sceneSize,
			center.z + sceneSize * 0.5,
		);
		scene.add(secondaryLight);
	}

	function createMeshGeometry(threeNamespace, meshConfig) {
		var geometry = new threeNamespace.BufferGeometry();

		geometry.setAttribute(
			"position",
			new threeNamespace.Float32BufferAttribute(meshConfig.pos, 3),
		);

		if (meshConfig.norm) {
			geometry.setAttribute(
				"normal",
				new threeNamespace.Float32BufferAttribute(meshConfig.norm, 3),
			);
		}

		if (meshConfig.col) {
			geometry.setAttribute(
				"color",
				new threeNamespace.Float32BufferAttribute(meshConfig.col, 3),
			);
		}

		if (meshConfig.uv) {
			geometry.setAttribute(
				"uv",
				new threeNamespace.Float32BufferAttribute(meshConfig.uv, 2),
			);
		}

		geometry.setIndex(meshConfig.idx);

		if (!meshConfig.norm) {
			geometry.computeVertexNormals();
		}

		return geometry;
	}

	function createMeshMaterial(threeNamespace, meshConfig) {
		var texture = meshConfig.tex
			? new threeNamespace.TextureLoader().load(meshConfig.tex)
			: null;
		var material = new threeNamespace.MeshPhongMaterial({
			map: texture,
			vertexColors: Boolean(meshConfig.col) && !texture,
			side: threeNamespace.DoubleSide,
			flatShading: false,
			shininess: 25,
		});

		if (texture) {
			material.color = new threeNamespace.Color(1, 1, 1);
		} else if (!meshConfig.col) {
			material.color = new threeNamespace.Color(0.36, 0.5, 0.7);
		}

		return material;
	}

	function addSceneMeshes(threeNamespace, scene, meshConfigs) {
		(meshConfigs || []).forEach(function (meshConfig) {
			var geometry = createMeshGeometry(threeNamespace, meshConfig);
			var material = createMeshMaterial(threeNamespace, meshConfig);

			scene.add(new threeNamespace.Mesh(geometry, material));
		});
	}

	function startRenderLoop(renderer, scene, camera, controls) {
		function renderFrame() {
			requestAnimationFrame(renderFrame);
			controls.update();
			renderer.render(scene, camera);
		}

		renderFrame();
	}

	function renderScene(containerId, sceneConfig) {
		var threeNamespace = getThreeNamespace();
		var container = document.getElementById(containerId);
		var width = getSceneDimension(sceneConfig.width);
		var height = getSceneDimension(sceneConfig.height);
		var bounds = getSceneBounds(sceneConfig);
		var center = getSceneCenter(bounds);
		var sceneSize = getSceneSize(bounds);
		var viewPoint = getViewPoint(sceneConfig);
		var renderer;
		var scene;
		var camera;
		var controls;

		if (!container) {
			return;
		}

		renderer = createRenderer(threeNamespace, width, height);
		container.appendChild(renderer.domElement);

		scene = new threeNamespace.Scene();
		camera = createCamera(
			threeNamespace,
			width,
			height,
			center,
			sceneSize,
			viewPoint,
		);
		controls = createControls(
			threeNamespace,
			camera,
			renderer.domElement,
			center,
		);

		addSceneLights(threeNamespace, scene, center, sceneSize);
		addSceneMeshes(threeNamespace, scene, sceneConfig.meshes);
		startRenderLoop(renderer, scene, camera, controls);
	}

	window.WGX3D = window.WGX3D || {};
	window.WGX3D.renderScene = renderScene;
})();
