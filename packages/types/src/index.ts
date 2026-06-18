export type Vec<
	N extends number,
	T extends number[] = [],
> = T["length"] extends N ? T : Vec<N, [...T, number]>;

export type CartesianCoordinates<V extends readonly string[]> = Record<
	V[number],
	number
>;

export type Bounds = Vec<6>;
export type ViewPoint = Vec<3>;
export type ICartesianCoordinates2 = CartesianCoordinates<["x", "y"]>;
export type ICartesianCoordinates3 = CartesianCoordinates<["x", "y", "z"]>;

/**
 * The polygon-edge border resolved from EdgeForm. Wolfram draws a thin black
 * border on every polygon / mesh primitive by default; the runtime computes the
 * feature edges (EdgesGeometry) and draws them in this style. `color` defaults
 * to the kernel's own black. Absent / null on a mesh means no border (EdgeForm
 * [None] or the empty EdgeForm[] Plot3D bakes onto its surface).
 */
export interface IEdgeStyle {
	color: [number, number, number];
	opacity?: number | null;
	width?: number | null;
}

export interface IMeshConfig {
	pos: number[];
	idx: number[];
	norm?: number[];
	/** Per-vertex colours (from VertexColors), flat r,g,b triples. */
	col?: number[] | null;
	uv?: number[] | null;
	tex?: string | null;
	/**
	 * Material resolved from the in-scope directives -- nothing defaulted here.
	 * `color` is the uniform diffuse (when not per-vertex/textured); the runtime
	 * falls back to a neutral diffuse only when this is absent.
	 */
	color?: [number, number, number] | null;
	opacity?: number | null;
	specular?: [number, number, number] | null;
	shininess?: number | null;
	emissive?: [number, number, number] | null;
	/** Polygon edge border (EdgeForm); null / absent => no border drawn. */
	edge?: IEdgeStyle | null;
	/**
	 * Exact analytic feature-edge polylines (model space; each a flat x,y,z list,
	 * closed loops repeat the first point) for cap-bearing curved primitives --
	 * cylinder/cone rims -- where a dihedral threshold on the coarse mesh would
	 * mistake the lateral facets for edges. When present (and `edge` is set) the
	 * runtime draws these instead of computing EdgesGeometry from the mesh.
	 */
	edgePaths?: number[][] | null;
}

export interface ILineConfig {
	/** Segment endpoint positions, flat x,y,z triples. */
	pos: number[];
	/** Optional per-endpoint colours, flat r,g,b triples. */
	col?: number[] | null;
	color?: [number, number, number] | null;
	opacity?: number | null;
	width?: number | null;
	dashing?: number[] | null;
}

export interface IVolumeConfig {
	/** Texture dimensions in Three.js order: width (x), height (y), depth (z). */
	dims: [number, number, number];
	/** Base64-encoded unsigned-byte RGBA voxel data, x fastest. */
	data: string;
	bbox: Bounds;
	interpolate?: boolean;
	samples?: number | null;
}

/**
 * Text styling resolved from LabelStyle / TicksStyle / inline Style. Every
 * field is optional because the WL serializer only emits what the options
 * actually specify (plus a resolved colour) -- nothing is defaulted here.
 */
export interface ITextStyle {
	color?: string;
	fontSize?: number;
	fontFamily?: string;
	fontWeight?: string;
	fontStyle?: string;
}

/** An axis label resolved from AxesLabel (+ LabelStyle / inline Style). */
export interface ILabelSpec {
	text: string;
	style: ITextStyle;
}

/**
 * A single resolved tick: the kernel's own position + label string. Minor
 * ticks carry an empty `label`. `length` is the tick-mark length as the
 * fraction of scene size the kernel chose (majors longer than minors).
 */
export interface ITickSpec {
	value: number;
	label: string;
	length: number;
}

/** The two side signs (-1 | 1) locating an explicit AxesEdge. */
export type AxisEdge = [number, number];

/** A box face to draw a grid on: perpendicular to `normal` (0=x,1=y,2=z). */
export interface IFaceGridSpec {
	normal: 0 | 1 | 2;
	side: -1 | 1;
}

/**
 * The complete axis/box/grid description, fully resolved from the Graphics3D
 * options by the WL serializer (AbsoluteOptions). The runtime renders this
 * verbatim and only computes geometry (which box edge carries each axis for
 * the current camera, CSS2D label placement) -- it invents no colours,
 * labels, or tick positions.
 */
export interface IAxesConfig {
	show: [boolean, boolean, boolean];
	colors: [string, string, string];
	labels: [ILabelSpec | null, ILabelSpec | null, ILabelSpec | null];
	ticks: [ITickSpec[], ITickSpec[], ITickSpec[]];
	tickStyles: [ITextStyle, ITextStyle, ITextStyle];
	edges: [AxisEdge | null, AxisEdge | null, AxisEdge | null];
	box: { show: boolean; color: string };
	faceGrids: { faces: IFaceGridSpec[]; color: string };
}

/**
 * A scene light resolved from the graphic's Lighting option (never hardcoded).
 * `position` is world-space; for directional lights it's a from-position whose
 * direction is what matters. `target`/`angle` apply to spot lights.
 */
export interface ILightConfig {
	type: "ambient" | "directional" | "point" | "spot";
	color: [number, number, number];
	position?: [number, number, number];
	target?: [number, number, number];
	angle?: number;
	/**
	 * When true, `position` is a view-space offset from the scene centre (the
	 * runtime places the light in the camera's own frame, pinned to the viewer)
	 * rather than a world-space point. Set for Wolfram `ImageScaled` lights.
	 */
	view?: boolean;
}

export interface ISceneConfig {
	bbox?: Bounds;
	plotRange?: Bounds;
	vp?: ViewPoint;
	width?: number;
	height?: number;
	meshes?: IMeshConfig[];
	lines?: ILineConfig[];
	volumes?: IVolumeConfig[];
	axes?: IAxesConfig;
	lights?: ILightConfig[];
	boxRatios?: ViewPoint;
	vv?: ViewPoint;
	va?: number;
}

/** A point in SVG user space, paired with its source curve-local coordinates. */
export interface ScreenPoint {
	x: number;
	y: number;
	localX: number;
	localY: number;
}

/** A {@link ScreenPoint} plus its squared distance from the cursor. */
export interface NearestPoint extends ScreenPoint {
	distanceSquared: number;
}

export interface Box {
	x: number;
	y: number;
	width: number;
	height: number;
}

/** The lazily-created SVG nodes that render the coordinate-tool callout. */
export interface CoordinateReadout {
	marker: SVGCircleElement | null;
	labelLeader: SVGPolylineElement | null;
	labelBackground: SVGRectElement | null;
	labelOutline: SVGRectElement | null;
	labelAccent: SVGLineElement | null;
	label: SVGTextElement | null;
}
