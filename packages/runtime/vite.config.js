import { defineConfig } from "vite";
import { readFileSync } from "fs";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const distDir = resolve(__dirname, "dist");
const distSrcDir = resolve(distDir, "src");
const stylesheetFileName = "wgx.css";
const stylesheetPath = resolve(__dirname, "CSS", stylesheetFileName);

function minifyCss(css) {
	return css
		.replace(/\/\*[\s\S]*?\*\//g, "")
		.replace(/\s+/g, " ")
		.replace(/\s*([{}:;,>])\s*/g, "$1")
		.replace(/;}/g, "}")
		.trim();
}

function wgxStylesheetAsset() {
	return {
		name: "wgx-stylesheet-asset",
		generateBundle() {
			const stylesheet = readFileSync(stylesheetPath, "utf8");
			this.emitFile({
				type: "asset",
				fileName: stylesheetFileName,
				source: minifyCss(stylesheet),
			});
		},
	};
}

/*
 * Two build passes produce two distinct shapes of bundle:
 *
 *   external (default) -- ES modules that `export default` their class. The
 *     auto-dispatch entry `wgx-runtime.js` and the libs it dynamically imports
 *     (`wgx-runtime-lib-2d/3d.js`) it loads as real modules. These names match
 *     this package's `exports` map.
 *
 *   inline (WGX_BUILD=inline) -- the self-booting `wgx-lib-2d/3d.js` entries
 *     (`src/2D/inline.ts`, `src/3D/inline.ts`). They export nothing and bundle
 *     their imports, so no `import`/`export` survives in the output and the
 *     paclet can inline them verbatim into a classic <script>.
 */
const isInline = process.env.WGX_BUILD === "inline";

const externalEntry = {
	"wgx-runtime": resolve(__dirname, "src/index.ts"),
	"wgx-runtime-lib-2d": resolve(__dirname, "src/2D/SVGRuntime.ts"),
	"wgx-runtime-lib-3d": resolve(__dirname, "src/3D/ThreeRuntime.ts"),
};

const inlineEntry = {
	"wgx-lib-2d": resolve(__dirname, "src/2D/inline.ts"),
	"wgx-lib-3d": resolve(__dirname, "src/3D/inline.ts"),
};

export default defineConfig({
	plugins: isInline
		? []
		: [
				wgxStylesheetAsset(),
				dts({
					entryRoot: resolve(__dirname, "src"),
					beforeWriteFile(filePath) {
						if (filePath.startsWith(distSrcDir)) {
							return {
								filePath: filePath.replace(distSrcDir, distDir),
							};
						}
					},
				}),
			],
	build: {
		// The inline pass must keep the external pass's output around.
		emptyOutDir: !isInline,
		lib: {
			entry: isInline ? inlineEntry : externalEntry,
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.js`,
		},
		minify: "esbuild",
		terserOptions: {
			module: true,
			compress: true,
			mangle: true,
			format: {
				comments: false,
			},
		},
		rollupOptions: {
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "[name].js",
			},
		},
		sourcemap: false,
	},
});
