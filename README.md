# Wolfram WebGraphics

Convert Wolfram Language plots and graphics into portable, **interactive** web
elements.

`ToWebGraphics` turns `Graphics`, `Graphics3D`, `GeoGraphics`, charts and plots
into a self-contained string of HTML/SVG (2D) or a WebGL widget (3D). All the
interactivity — tooltips, mouseover highlights, hyperlinks, a coordinate
read-out on plots, hover/click effects on charts, and orbit controls on 3D
surfaces — is preserved by a small JavaScript runtime that is inlined by
default, so the output can be dropped straight into any web page with no extra
dependencies.

```wl
Needs["ToneAr`WebGraphics`"]

ToWebGraphics[Graphics[Circle[]]]
```

```html
<svg xmlns='http://www.w3.org/2000/svg' width='240' height='239.6176'
     viewBox='0 0 240 239.6176' ...>
  <circle cx='119.5' cy='119.3088' r='114.72' fill='none'
          stroke='#000000' stroke-width='1.3333' />
</svg>
```

---

## Contents

- [Wolfram WebGraphics](#wolfram-webgraphics)
	- [Contents](#contents)
	- [Why](#why)
	- [Installation](#installation)
	- [Quick start](#quick-start)
	- [`ToWebGraphics`](#towebgraphics)
		- [Options](#options)
	- [What is supported](#what-is-supported)
	- [Usage patterns](#usage-patterns)
		- [1. Standalone, fully self-contained](#1-standalone-fully-self-contained)
		- [2. Many graphics on one page (shared runtime)](#2-many-graphics-on-one-page-shared-runtime)
		- [3. Server-side rendering (SSR)](#3-server-side-rendering-ssr)
	- [The JavaScript runtime](#the-javascript-runtime)
	- [Runtime helper functions](#runtime-helper-functions)
	- [Project layout](#project-layout)
	- [Building from source](#building-from-source)
	- [Roadmap](#roadmap)

---

## Why

Wolfram's built-in HTML/CDF export embeds heavyweight players or rasterizes
graphics. WebGraphics instead emits **plain SVG and a tiny dependency-free
runtime**:

- **Portable** — a single string contains the markup, styles and scripts it
  needs. Save it to a file, paste it into a CMS, or return it from an API.
- **Interactive** — `Tooltip`, `Mouseover`, `StatusArea`, `Hyperlink`, plot
  coordinate read-outs and chart hover/click effects all keep working in the
  browser.
- **Lightweight & dedup-aware** — when several graphics share a page, the
  runtime and styles can be inlined just once (or hosted separately).
- **Dashboard-ready** — works standalone, as a shared-runtime page, or with
  server-side rendering driven by an `APIFunction`.

## Installation

The package is a Wolfram paclet named `ToneAr/WebGraphics` (Wolfram Language
15+).

Build it from source and install the archive:

```bash
bun install        # first time **only**
bun run build      # builds the JS runtime + paclet archive into build/Paclet
```

```wl
PacletInstall["build/Paclet/ToneAr__WebGraphics-0.6.0.paclet"]
Needs["ToneAr`WebGraphics`"]
```

> Once published to the Wolfram Paclet Repository you will be able to install it
> directly with `PacletInstall["ToneAr/WebGraphics"]`.

## Quick start

`ToWebGraphics` returns a raw string, so the fastest way to see it is to export
it to a file and open it in a browser:

```wl
Needs["ToneAr`WebGraphics`"]

Export[
  "plot.html",
  ToWebGraphics[Plot[Sin[x], {x, 0, 2 Pi}]],
  "Text"
]
```

Open `plot.html` — you get an interactive plot with a hover coordinate
read-out, and the runtime needed to drive it is inlined automatically.

## `ToWebGraphics`

```
ToWebGraphics[graphics]
```

gives a web-graphic version of `graphics`: a raw string containing SVG (2D) or
an HTML element backed by a WebGL widget (3D), with inline interactivity
scripts.

`graphics` may be any of:

`Graphics` · `Graphics3D` · `GeoGraphics` · `Legended` · `Labeled` ·
`Annotation`

(plus anything that evaluates to one of these — `Plot`, `ListPlot`, `BarChart`,
`Plot3D`, and so on.)

### Options

| Option | Default | Description |
| --- | --- | --- |
| `LightDark` | `Automatic` | Which `LightDarkSwitched` colour scheme to render with. `Automatic` follows `AbsoluteCurrentValue[LightDark]`; set explicitly to `"Light"` or `"Dark"`. |
| `"IncludeRuntime"` | `True` | When `True`, the JS runtime and CSS are inlined once into the output. Set `False` to omit them and supply the runtime yourself (see [shared runtime](#2-many-graphics-on-one-page-shared-runtime)). |

```wl
(* Force dark-mode colours regardless of the current front-end setting *)
ToWebGraphics[
  Graphics[{LightDarkSwitched[Red, Blue], Disk[]}],
  LightDark -> "Dark"
]

(* Emit just the graphic, no inline runtime/styles *)
ToWebGraphics[Graphics[Tooltip[Disk[], "Disk"]], "IncludeRuntime" -> False]
```

## What is supported

**Primitives & styling** — points, lines, polygons, disks, circles, annuli,
sectors, arcs, rounded boxes, arrowheads/caps/joins, geometric transforms,
colours, opacity, dashing, gradient fills and `VertexColors` (Gouraud).

**Text & rasters** — text placement and fonts, `Inset` graphics, and embedded
raster images.

**Interactivity** — `Tooltip` (including graphic labels), `Mouseover`,
`StatusArea`, `Hyperlink`, and an automatic coordinate read-out on plots.

**Plots** — `Plot`, `ListPlot`, `ListLinePlot`, `ParametricPlot`, `LogPlot`,
`ContourPlot`, `VectorPlot`, `DensityPlot`, `RegionPlot`, with `PlotLabel`,
`AxesLabel`, `FrameLabel`, `PlotLegends`, `Legended` and `Labeled`.

**Charts (native, with hover/click effects)** — `BarChart`, `PieChart`
(click to explode wedges), `Histogram`, `BubbleChart`, grouped/legended bars,
`BoxWhiskerChart`, `SectorChart`.

**3D (WebGL / Three.js, drag to orbit)** — `Plot3D`, `ParametricPlot3D`,
`RevolutionPlot3D`, `SphericalPlot3D` and raw `Graphics3D` meshes.

**Geo** — `GeoGraphics`, including raster map tiles, vector basemaps,
country/region highlighting and place labels.

## Usage patterns

### 1. Standalone, fully self-contained

The default. Everything the graphic needs is inlined, so the output is portable
and static. A single WebGraphic can contain any number of interactive elements,
and the runtime/styles are still inlined **only once** — even with `Inset` or
`Show` combining several graphics:

```wl
ToWebGraphics[
  Graphics[{
    Tooltip[Disk[], "Disk"],
    Inset@Graphics[{Tooltip[Circle[], "Circle"]}]
  }]
] // StringCases["<style>" | "<script>"] // Counts
(* <|"<style>" -> 1, "<script>" -> 1|> *)
```

The catch: each **separate** call to `ToWebGraphics` inlines its own copy of the
runtime, so a page built from many independent graphics would ship the runtime
many times over. That is what the next pattern solves.

### 2. Many graphics on one page (shared runtime)

Generate each graphic with `"IncludeRuntime" -> False`, then ship the runtime
**once** for the whole page. `CreateWebGraphicsRuntime` writes the runtime files
to a directory you can host:

```wl
dir = CreateWebGraphicsRuntime[FileNameJoin[{$TemporaryDirectory, "wgx-runtime"}]]

FileNames[All, dir]
(* wgx.css
   wgx-runtime.js
   wgx-runtime-lib-2d.js
   wgx-runtime-lib-3d.js *)
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
    <!-- output of ToWebGraphics[..., "IncludeRuntime" -> False] -->
  </body>
</html>
```

> **CSP note:** the stylesheet and runtime scripts must be served from the
> **same origin** as the page, otherwise the browser's Content Security Policy
> will block them.

### 3. Server-side rendering (SSR)

Serve graphics generated on demand as the page loads. Expose an `APIFunction`
that returns `"HTML"`:

```wl
api = APIFunction[
  {"f" -> {"Sin", "Cos", "Tan"}, "xmax" -> "Number" -> 10},
  ToWebGraphics[
    Plot[ToExpression[#f][x], {x, 0, #xmax}],
    "IncludeRuntime" -> False
  ] &,
  "HTML"
];
```

Then drop **placeholder `<div>`s** into the page. The runtime finds them by
their `data-wgx-ssr-*` attributes, fetches the HTML, swaps it in and hydrates
it:

```html
<div data-wgx-ssr-endpoint="/api/plot"></div>

<div data-wgx-ssr-endpoint="/api/plot"
     data-wgx-ssr-params="f=Cos&xmax=20"></div>
```

| Attribute | Purpose |
| --- | --- |
| `data-wgx-ssr-endpoint` | URL to fetch the WebGraphic HTML from (required). |
| `data-wgx-ssr-params` | Query string appended to the endpoint, e.g. `a=1&b=2`. |
| `data-wgx-ssr-body` | Request body, e.g. `{"a": 1}`. |

Because the page only needs to include `wgx-runtime.js`, a server-rendered
dashboard stays lean — the heavy graphics are produced kernel-side per request.

## The JavaScript runtime

A single entry script, `wgx-runtime.js`, boots only what the page needs,
detected from the DOM at load time:

- **2D (SVG)** runtime loads when there are `[id^="wgx"]` nodes or
  `[data-wgx-ssr-endpoint]` placeholders. It hydrates `data-wgx-*` interactive
  markers and `.wgx-curve` plots, and handles SSR fetch/swap.
- **3D (Three.js)** runtime loads when there are `[id^="wgx3d"]` mount points.

The stylesheet (`wgx.css`) is loaded automatically, and the 2D/3D library
chunks are fetched lazily — a 2D-only page never downloads the Three.js bundle.

## Runtime helper functions

When `"IncludeRuntime" -> False`, these expose the runtime assets so you can
host or inline them yourself:

| Function | Returns |
| --- | --- |
| `CreateWebGraphicsRuntime[dir]` | Writes `wgx.css`, `wgx-runtime.js`, `wgx-runtime-lib-2d.js`, `wgx-runtime-lib-3d.js` into `dir` and returns the path. `CreateWebGraphicsRuntime[]` uses a `wgx-runtime` folder under the current directory. |
| `WebGraphicsRuntimeStyle[]` | The runtime CSS as a string. |
| `WebGraphicsRuntimeScript[]` | The entry runtime JS (`wgx-runtime.js`) as a string. |
| `WebGraphics2DRuntimeScript[]` | The 2D SVG runtime library JS as a string. |
| `WebGraphics3DRuntimeScript[]` | The 3D Three.js runtime library JS as a string. |

## Project layout

This is a [Bun](https://bun.sh) workspace monorepo containing the paclet and its
web runtime:

```
packages/
  paclet/    ToneAr/WebGraphics — the Wolfram paclet
             Kernel/Source/      serializers (Serialize/) + utilities (Utilities/)
             Docs/               reference page + tutorial notebooks
             WebRuntime/         bundled JS/CSS copied in at build time
             Tests/              .wlt tests + demo-gallery generator
  runtime/   @wgx/js-runtime — TypeScript/Vite runtime (2D SVG + 3D Three.js)
  types/     @wgx/types — shared TypeScript types
  react/     @wgx/react-runtime — React bindings (work in progress)
```

## Building from source

Requires [Bun](https://bun.sh) and `wolframscript` on the `PATH`.

```bash
bun install            # install workspace dependencies

bun run build          # build JS runtime + paclet archive (build/Paclet)
bun run js:dev         # run the runtime dev server
bun run js:build       # build only the JS runtime
bun run js:typecheck   # type-check the runtime

bun run lint           # eslint
bun run format         # prettier --write
```

`bun run build` builds the TypeScript runtime, copies the bundles into the
paclet's `WebRuntime/` directory, and produces a `.paclet` archive under
`build/Paclet/`.

## Roadmap

- **React runtime** (`@wgx/react-runtime`) — a `<WGX.Runtime>` provider plus a
  `<WGX.Element>` component that fetches and hydrates WebGraphics, or renders
  pre-fetched HTML:

  ```tsx
  import WGX from "@wgx/react-runtime";

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
