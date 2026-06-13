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

export interface IMeshConfig {
	pos: number[];
	idx: number[];
	norm?: number[];
	col?: number[];
	uv?: number[];
	tex?: string;
}

export interface ISceneConfig {
	bbox?: Bounds;
	vp?: ViewPoint;
	width?: number;
	height?: number;
	meshes?: IMeshConfig[];
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
