<div align="center">
<p>
	<img
		src="packages/paclet/Assets/logo.svg"
		width="104"
		alt="Wolfram WebGraphics logo"
	>
</p>

<h1>Wolfram WebGraphics</h1>

<p>
	<strong>
		Portable, interactive web output for Wolfram Language Graphics.
	</strong>
</p>

<p>
	<a href="https://www.wolframcloud.com/obj/tonya/DeployedResources/Paclet/ToneAr/WebGraphics/">
		Beta Release
	</a>
	.
	<a href="https://www.wolframcloud.com/obj/tonya/WGX/demo-gallery.html">
		Demo Gallery
	</a>
</p>

<p>
	<a href="#installation">Installation</a>
	·
	<a href="#quick-start">Quick Start</a>
	·
	<a href="#runtime-modes">Runtime Modes</a>
	·
	<a href="#building-from-source">Build</a>
</p>

<p>
	<img
		alt="Wolfram Language 15+"
		src="https://img.shields.io/badge/Wolfram%20Language-15%2B-dd1100"
	>
	<img
		alt="TypeScript ~6.0.2"
		src="https://img.shields.io/badge/TypeScript-6.0.2-3178c6"
	>
</p>
</div>

---

`ToWebGraphics` converts Wolfram Language `Graphics`, `Graphics3D`,
`GeoGraphics`, charts, and plots into portable web elements: plain SVG for 2D
graphics and a WebGL widget for 3D graphics.

The output keeps Wolfram interactivity intact, including tooltips, mouseover
highlights, hyperlinks, plot coordinate read-outs, chart hover/click effects,
and orbit controls on 3D surfaces. A small JavaScript runtime is inlined by
default, so a graphic can be dropped straight into a web page with no extra
dependencies.

## Why WebGraphics?

Wolfram's built-in HTML/CDF export can embed heavyweight players or rasterize
graphics. WebGraphics emits plain SVG and a small dependency-free runtime:

- **Portable** - the markup, styles, and scripts can be saved to a file, pasted
  into a CMS, or returned from an API.
- **Interactive** - tooltips, mouseover highlights, status areas, hyperlinks,
  plot coordinate read-outs, and chart interactions keep working in the browser.
- **Lightweight** - the runtime can be inlined for a single graphic or hosted
  once for a page with many graphics.
- **Dashboard-ready** - works standalone, with shared runtime assets, or with
  server-side rendering from the Wolfram kernel.

## Installation
The package is a Wolfram paclet named `ToneAr/WebGraphics` and requires Wolfram
Language 15 or newer.

Build it from source and install the generated archive:

```bash
bun install        # first time only
bun run build      # builds the JS runtime + paclet archive into build/Paclet
```

```wl
PacletInstall["build/Paclet/ToneAr__WebGraphics-0.6.2.paclet"]
Needs["ToneAr`WebGraphics`"]
```

Once published to the Wolfram Paclet Repository, it can be installed directly:

```wl
PacletInstall["ToneAr/WebGraphics"]
```

## Quick Start
`ToWebGraphics` returns a raw string, so the fastest way to inspect the output
is to export it to a file and open it in a browser:

```wl
Needs["ToneAr`WebGraphics`"]

Export[
	"plot.html",
	ToWebGraphics[Plot[Sin[x], {x, 0, 2 Pi}]],
	"Text"
]
```

The generated `plot.html` contains an interactive plot with a hover coordinate
read-out and the runtime needed to drive it.

## API

```wl
ToWebGraphics[graphics]
```

returns a web-graphic version of `graphics`: a raw string containing SVG for 2D
graphics or an HTML element backed by a WebGL widget for 3D graphics.

`graphics` may be any of:

`Graphics` · `Graphics3D` · `GeoGraphics` · `Legended` · `Labeled` ·
`Annotation`

It also accepts expressions that evaluate to one of these forms, including
`Plot`, `ListPlot`, `BarChart`, `Plot3D`, and related plotting functions.

### Options

| Option             | Default     | Description |
| ------------------ | ----------- | --- |
| `LightDark`        | `Automatic` | Which `LightDarkSwitched` colour scheme to render with. `Automatic` follows `AbsoluteCurrentValue[LightDark]`; set explicitly to `"Light"` or `"Dark"`. |
| `"IncludeRuntime"` | `True`      | When `True`, the JS runtime and CSS are inlined once into the output. Set `False` to omit them and supply the runtime yourself. |

```wl
(* Force dark-mode colours regardless of the current front-end setting *)
ToWebGraphics[
	Graphics[{LightDarkSwitched[Red, Blue], Disk[]}],
	LightDark -> "Dark"
]

(* Emit just the graphic, no inline runtime/styles *)
ToWebGraphics[
	Graphics[Tooltip[Disk[], "Disk"]],
	"IncludeRuntime" -> False
]
```

## Runtime Modes
### Standalone Output
This is the default. Everything the graphic needs is inlined, so the output is
portable and static. A single WebGraphic can contain any number of interactive
elements, and the runtime/styles are still inlined only once, even with `Inset`
or `Show` combining several graphics:

```wl
ToWebGraphics[
	Graphics[{
		Tooltip[Disk[], "Disk"],
		Inset @ Graphics[{Tooltip[Circle[], "Circle"]}]
	}]
] // StringCases["<style>" | "<script>"] // Counts
(* Out[1]:=
	<|
		"<style>"  -> 1,
		"<script>" -> 1
	|>
*)
```

Each separate call to `ToWebGraphics` inlines its own copy of the runtime. For a
page built from many independent graphics, use the shared runtime mode.

### Shared Runtime

Generate each graphic with `"IncludeRuntime" -> False`, then ship the runtime
once for the whole page. `CreateWebGraphicsRuntime` writes the runtime files to
a directory you can host:

```wl
dir = CreateWebGraphicsRuntime["/tmp/wgx-runtime"];
FileNames[All, dir]
(* Out[1]:=
	{
		"/tmp/wgx-runtime/wgx.css",
		"/tmp/wgx-runtime/wgx-runtime.js",
		"/tmp/wgx-runtime/wgx-runtime-lib-2d.js",
		"/tmp/wgx-runtime/wgx-runtime-lib-3d.js"
	}
*)
```

Reference `wgx-runtime.js` once in the page `<head>`, then inline as many
runtime-free graphics as you like:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Dashboard</title>
		<script type="module" src="./wgx-runtime/wgx-runtime.js"></script>
	</head>
	<body>
		<!-- Output of ToWebGraphics[..., "IncludeRuntime" -> False] -->
	</body>
</html>
```

> [!NOTE]
> The stylesheet and runtime scripts must be served from the same
> origin as the page, otherwise the browser's Content Security Policy will block
> them.

### Server-Side Rendering
Serve graphics generated on demand as the page loads. Expose an `APIFunction`
that returns `"HTML"`:

```wl
api =
	APIFunction[{
			"f" -> {"Sin", "Cos", "Tan"},
			"xmax" -> "Number" -> 10
		},
		ToWebGraphics[
			Plot[ToExpression[#f][x], {x, 0, #xmax}],
			"IncludeRuntime" -> False
		] &,
		"HTML"
	];
```

Then drop placeholder `<div>` elements into the page. The runtime finds them by
their `data-wgx-ssr-*` attributes, fetches the HTML, swaps it in, and hydrates
it:

```html
<div data-wgx-ssr-endpoint="/api/plot"></div>

<div
	data-wgx-ssr-endpoint="/api/plot"
	data-wgx-ssr-params="f=Cos&xmax=20"
></div>
```

| Attribute               | Purpose |
| ----------------------- | ------- |
| `data-wgx-ssr-endpoint` | URL to fetch the WebGraphic HTML from. Required. |
| `data-wgx-ssr-params`   | Query string appended to the endpoint, for example `a=1&b=2`. |
| `data-wgx-ssr-body`     | Request body, for example `{"a": 1}`. |

Because the page only needs to include `wgx-runtime.js`, a server-rendered
dashboard stays lean. The graphics are produced kernel-side per request.

> [!IMPORTANT]
> On Wolfram Cloud, the page, API, and every runtime asset are separate
> `CloudObject`s. Making the page and API public does not make
> `wgx-runtime.js`, its lazily loaded `wgx-runtime-lib-*.js` files, or `wgx.css`
> public. Public pages must grant public permission to all runtime objects; an
> otherwise successful request returns the Wolfram sign-in page instead of
> JavaScript, leaving the SSR placeholders inert.
>
> ```wl
> Scan[
> 	SetPermissions[#, "Public"] &,
> 	CloudObjects["/tmp/wgx-runtime/*"]
> ]
> ```

## JavaScript Runtime
A single entry script, `wgx-runtime.js`, boots only what the page needs,
detected from the DOM at load time:

- **2D SVG runtime** loads when there are `[id^="wgx"]` nodes or
  `[data-wgx-ssr-endpoint]` placeholders. It hydrates `data-wgx-*` interactive
  markers and `.wgx-curve` plots, and handles SSR fetch/swap.
- **3D runtime** loads when there are `[id^="wgx3d"]` mount points.

The stylesheet (`wgx.css`) is loaded automatically, and the 2D/3D library chunks
are fetched lazily. A 2D-only page never downloads the Three.js bundle.

### Runtime Helpers
When `"IncludeRuntime" -> False`, these functions expose the runtime assets so
you can host or inline them yourself:

| Function                        | Returns |
| ------------------------------- | ------- |
| `CreateWebGraphicsRuntime[dir]` | Writes `wgx.css`, `wgx-runtime.js`, `wgx-runtime-lib-2d.js`, and `wgx-runtime-lib-3d.js` into `dir` and returns the path. `CreateWebGraphicsRuntime[]` uses a `wgx-runtime` folder under the current directory. |
| `WebGraphicsRuntimeStyle[]`     | The runtime CSS as a string. |
| `WebGraphicsRuntimeScript[]`    | The entry runtime JS (`wgx-runtime.js`) as a string. |
| `WebGraphics2DRuntimeScript[]`  | The 2D SVG runtime library JS as a string. |
| `WebGraphics3DRuntimeScript[]`  | The 3D Three.js runtime library JS as a string. |

## Roadmap
- **Dynamic `LightDark` Support** - Retain both branches of `LightDarkSwitched` in
  final WebGraphics with exposed surface for easily switching between them.
  ```wl
  ToWebGraphics[
      Graphics[{LightDarkSwitched[Black, White], Circle[]}],
      LightDark -> "Light"
  ]
  (* Out[1]:=
      <svg ...>
        <style>
          :root {
            color-scheme: light dark;
            --stroke-1a2b3c4d5e: light-dark(#000000, #ffffff);
          }
        </style>
        <circle
          data-theme-id="theme-1a2b3c4d5e"
          cx='179.5'
          cy='179.2128'
          r='172.3200'
          fill='none'
          stroke='var(--stroke-1a2b3c4d5e)'
          stroke-width='1.3333'
        />
      </svg>
  *)
  ```
- **React runtime** (`@wgx/react`) - a `<WGX.Runtime>` provider plus a
  `<WGX.Element>` component that fetches and hydrates WebGraphics, or renders
  pre-fetched HTML:

  ```tsx
  import WGX from "@wgx/react";

  function Dashboard() {
    return (
      <WGX.Runtime>
        <WGX.Element
          endpoint="/api/plot/"
          config={{ params: { x: 1 }, body: JSON.stringify({ y: 2 }) }}
        />
        <WGX.Element html={preFetched} />
      </WGX.Runtime>
    );
  }
  ```
- **Full `Graphics3D` support** - Extended 3D support of more primitives and
  Options.
- **Limited Dynamic Support** - Some support for `Dynamic` constructs including
  `Manipulate` by re-binding simple dynamic variables in JS.
