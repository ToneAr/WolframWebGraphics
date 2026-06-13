import type { ISceneConfig } from "@wgx/types";
import ThreeRuntime from "./ThreeRuntime";

/**
 * Inline bootstrap for the 3D (Three.js) runtime.
 *
 * Built (ES, exporting nothing, Three.js bundled in) into `wgx-lib-3d.js`,
 * which the paclet inlines once per page (deduped) ahead of the per-widget
 * `window.WGX3D.renderScene(...)` calls. Running as a classic script, it
 * synchronously exposes the renderer entry point those calls expect, so they
 * resolve regardless of script ordering.
 */
declare global {
	interface Window {
		WGX3D?: {
			renderScene: (containerId: string, sceneConfig: ISceneConfig) => void;
		};
	}
}

if (!window.WGX3D) {
	const runtime = new ThreeRuntime();
	window.WGX3D = {
		renderScene: (containerId, sceneConfig) =>
			runtime.renderScene(containerId, sceneConfig),
	};
}
