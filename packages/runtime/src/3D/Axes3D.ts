import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import type { AxisEdge, Bounds, IAxesConfig, ITextStyle } from "@wgx/types";

/** The two box dimensions an axis's edge is located by (matches AxesEdge). */
const OTHER: readonly [number, number][] = [
	[1, 2],
	[0, 2],
	[0, 1],
];

/** Visual scale converting the kernel's fractional tick lengths to world units. */
const TICK_SCALE = 2.2;
/** Gap (fraction of scene size) from tick tip to its number label. */
const TICK_LABEL_GAP = 0.05;
/** Gap (fraction of scene size) from the axis to its name label. */
const AXIS_LABEL_GAP = 0.13;

interface TickLabel {
	value: number;
	length: number;
	object: CSS2DObject;
}

interface AxisState {
	line: THREE.Line;
	ticks: THREE.LineSegments;
	tickLabels: TickLabel[];
	axisLabel: CSS2DObject | null;
}

/**
 * Renders the axes / box / face-grids of a Graphics3D from the fully-resolved
 * {@link IAxesConfig} the WL serializer produced. All colours, labels and tick
 * positions come straight from that config; this class only does geometry --
 * notably picking, for the current camera, which box edge carries each axis
 * (like Mathematica's AxesEdge -> Automatic) and placing the billboarded CSS2D
 * text. Add {@link group} to the scene and call {@link update} every frame.
 */
export default class Axes3D {
	readonly group = new THREE.Group();
	private readonly config: IAxesConfig;
	private readonly bounds: Bounds;
	private readonly sceneSize: number;
	private readonly center: THREE.Vector3;
	private readonly axisStates: (AxisState | null)[] = [null, null, null];

	constructor(config: IAxesConfig, bounds: Bounds, sceneSize: number) {
		this.config = config;
		this.bounds = bounds;
		this.sceneSize = sceneSize;
		this.center = new THREE.Vector3(
			(bounds[0] + bounds[1]) / 2,
			(bounds[2] + bounds[3]) / 2,
			(bounds[4] + bounds[5]) / 2,
		);
		this.build();
	}

	private minOf(dim: number): number {
		return this.bounds[2 * dim];
	}
	private maxOf(dim: number): number {
		return this.bounds[2 * dim + 1];
	}
	private midOf(dim: number): number {
		return (this.minOf(dim) + this.maxOf(dim)) / 2;
	}
	private sideCoord(dim: number, side: number): number {
		return side < 0 ? this.minOf(dim) : this.maxOf(dim);
	}

	/** A point with each box dimension set explicitly. */
	private point(
		aDim: number,
		aVal: number,
		o1: number,
		s1: number,
		o2: number,
		s2: number,
	): THREE.Vector3 {
		const p = new THREE.Vector3();
		p.setComponent(aDim, aVal);
		p.setComponent(o1, this.sideCoord(o1, s1));
		p.setComponent(o2, this.sideCoord(o2, s2));
		return p;
	}

	/** Outward (away-from-box) direction in the plane perpendicular to axis a. */
	private outward(o1: number, s1: number, o2: number, s2: number): THREE.Vector3 {
		const d = new THREE.Vector3();
		d.setComponent(o1, s1);
		d.setComponent(o2, s2);
		return d.normalize();
	}

	private build(): void {
		if (this.config.box.show) {
			this.buildBox();
		}
		this.buildFaceGrids();
		for (let a = 0; a < 3; a++) {
			if (this.config.show[a]) {
				this.buildAxis(a);
			}
		}
	}

	private buildBox(): void {
		const positions: number[] = [];
		for (let a = 0; a < 3; a++) {
			const [o1, o2] = OTHER[a];
			for (const s1 of [-1, 1]) {
				for (const s2 of [-1, 1]) {
					const p0 = this.point(a, this.minOf(a), o1, s1, o2, s2);
					const p1 = this.point(a, this.maxOf(a), o1, s1, o2, s2);
					positions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
				}
			}
		}
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3),
		);
		const material = new THREE.LineBasicMaterial({
			color: new THREE.Color(this.config.box.color),
		});
		this.group.add(new THREE.LineSegments(geometry, material));
	}

	private buildFaceGrids(): void {
		const { faces, color } = this.config.faceGrids;
		if (faces.length === 0) {
			return;
		}
		const lineColor = new THREE.Color(color);
		for (const face of faces) {
			const positions: number[] = [];
			const [o1, o2] = OTHER[face.normal];
			const fixed = this.sideCoord(face.normal, face.side);
			// grid lines parallel to o2 at each o1 tick, and vice versa
			this.pushGridLines(positions, face.normal, fixed, o1, o2);
			this.pushGridLines(positions, face.normal, fixed, o2, o1);
			if (positions.length === 0) {
				continue;
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute(
				"position",
				new THREE.Float32BufferAttribute(positions, 3),
			);
			this.group.add(
				new THREE.LineSegments(
					geometry,
					new THREE.LineBasicMaterial({ color: lineColor }),
				),
			);
		}
	}

	/** Grid lines on a face: one per major tick of `alongDim`, spanning `spanDim`. */
	private pushGridLines(
		positions: number[],
		normal: number,
		fixed: number,
		alongDim: number,
		spanDim: number,
	): void {
		const spanMin = this.minOf(spanDim);
		const spanMax = this.maxOf(spanDim);
		for (const tick of this.config.ticks[alongDim]) {
			if (tick.label === "") {
				continue;
			}
			const p0 = new THREE.Vector3();
			const p1 = new THREE.Vector3();
			p0.setComponent(normal, fixed);
			p1.setComponent(normal, fixed);
			p0.setComponent(alongDim, tick.value);
			p1.setComponent(alongDim, tick.value);
			p0.setComponent(spanDim, spanMin);
			p1.setComponent(spanDim, spanMax);
			positions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
		}
	}

	private buildAxis(a: number): void {
		const color = new THREE.Color(this.config.colors[a]);
		const ticks = this.config.ticks[a];

		const line = new THREE.Line(
			new THREE.BufferGeometry().setAttribute(
				"position",
				new THREE.Float32BufferAttribute(new Float32Array(6), 3),
			),
			new THREE.LineBasicMaterial({ color }),
		);

		const tickGeometry = new THREE.BufferGeometry();
		tickGeometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(new Float32Array(ticks.length * 6), 3),
		);
		const tickSegments = new THREE.LineSegments(
			tickGeometry,
			new THREE.LineBasicMaterial({ color }),
		);

		const tickLabels: TickLabel[] = [];
		for (const tick of ticks) {
			if (tick.label === "") {
				continue;
			}
			tickLabels.push({
				value: tick.value,
				length: tick.length,
				object: this.makeLabel(tick.label, this.config.tickStyles[a]),
			});
		}

		const labelSpec = this.config.labels[a];
		const axisLabel = labelSpec
			? this.makeLabel(labelSpec.text, labelSpec.style)
			: null;

		this.group.add(line, tickSegments);
		for (const { object } of tickLabels) {
			this.group.add(object);
		}
		if (axisLabel) {
			this.group.add(axisLabel);
		}

		this.axisStates[a] = { line, ticks: tickSegments, tickLabels, axisLabel };
	}

	private makeLabel(text: string, style: ITextStyle): CSS2DObject {
		const el = document.createElement("div");
		el.textContent = text;
		el.style.pointerEvents = "none";
		el.style.whiteSpace = "nowrap";
		if (style.color) {
			el.style.color = style.color;
		}
		if (style.fontSize) {
			el.style.fontSize = `${style.fontSize}px`;
		}
		if (style.fontFamily) {
			el.style.fontFamily = style.fontFamily;
		}
		if (style.fontWeight) {
			el.style.fontWeight = style.fontWeight;
		}
		if (style.fontStyle) {
			el.style.fontStyle = style.fontStyle;
		}
		return new CSS2DObject(el);
	}

	/**
	 * Pick which of the four parallel box edges carries axis `a` for the current
	 * camera: prefer a silhouette edge (one adjoining face visible, one hidden),
	 * then the one lowest on screen (x/y axes) or nearest the camera (z axis).
	 * An explicit AxesEdge from the options overrides this.
	 */
	private chooseEdge(a: number, camera: THREE.Camera): AxisEdge {
		const explicit = this.config.edges[a];
		if (explicit) {
			return explicit;
		}
		const [o1, o2] = OTHER[a];
		const ndc = new THREE.Vector3();
		let best: AxisEdge = [-1, -1];
		let bestScore = -Infinity;
		for (const s1 of [-1, 1]) {
			for (const s2 of [-1, 1]) {
				const silhouette =
					this.faceVisible(o1, s1, camera) !==
					this.faceVisible(o2, s2, camera);
				ndc
					.copy(this.point(a, this.midOf(a), o1, s1, o2, s2))
					.project(camera);
				const placement = a < 2 ? -ndc.y : -ndc.z;
				const score = placement + (silhouette ? 10 : 0);
				if (score > bestScore) {
					bestScore = score;
					best = [s1, s2];
				}
			}
		}
		return best;
	}

	/** Is the box face perpendicular to `dim` at `side` facing the camera? */
	private faceVisible(dim: number, side: number, camera: THREE.Camera): boolean {
		const faceCenter = this.center.clone();
		faceCenter.setComponent(dim, this.sideCoord(dim, side));
		const normal = new THREE.Vector3();
		normal.setComponent(dim, side);
		return normal.dot(camera.position.clone().sub(faceCenter)) > 0;
	}

	update(camera: THREE.Camera): void {
		for (let a = 0; a < 3; a++) {
			const state = this.axisStates[a];
			if (!state) {
				continue;
			}
			const [o1, o2] = OTHER[a];
			const [s1, s2] = this.chooseEdge(a, camera);
			const outward = this.outward(o1, s1, o2, s2);

			const p0 = this.point(a, this.minOf(a), o1, s1, o2, s2);
			const p1 = this.point(a, this.maxOf(a), o1, s1, o2, s2);
			this.setLine(state.line, p0, p1);

			this.updateTicks(state, a, o1, s1, o2, s2, outward);
			this.updateAxisLabel(state, a, o1, s1, o2, s2, outward);
		}
	}

	private setLine(line: THREE.Line, p0: THREE.Vector3, p1: THREE.Vector3): void {
		const attr = line.geometry.getAttribute(
			"position",
		) as THREE.BufferAttribute;
		attr.setXYZ(0, p0.x, p0.y, p0.z);
		attr.setXYZ(1, p1.x, p1.y, p1.z);
		attr.needsUpdate = true;
	}

	private updateTicks(
		state: AxisState,
		a: number,
		o1: number,
		s1: number,
		o2: number,
		s2: number,
		outward: THREE.Vector3,
	): void {
		const attr = state.ticks.geometry.getAttribute(
			"position",
		) as THREE.BufferAttribute;
		const ticks = this.config.ticks[a];
		const tip = new THREE.Vector3();
		ticks.forEach((tick, i) => {
			const base = this.point(a, tick.value, o1, s1, o2, s2);
			tip
				.copy(outward)
				.multiplyScalar(tick.length * this.sceneSize * TICK_SCALE)
				.add(base);
			attr.setXYZ(2 * i, base.x, base.y, base.z);
			attr.setXYZ(2 * i + 1, tip.x, tip.y, tip.z);
		});
		attr.needsUpdate = true;

		const gap = this.sceneSize * TICK_LABEL_GAP;
		for (const tickLabel of state.tickLabels) {
			const base = this.point(a, tickLabel.value, o1, s1, o2, s2);
			const offset = tickLabel.length * this.sceneSize * TICK_SCALE + gap;
			tickLabel.object.position
				.copy(outward)
				.multiplyScalar(offset)
				.add(base);
		}
	}

	private updateAxisLabel(
		state: AxisState,
		a: number,
		o1: number,
		s1: number,
		o2: number,
		s2: number,
		outward: THREE.Vector3,
	): void {
		if (!state.axisLabel) {
			return;
		}
		const base = this.point(a, this.midOf(a), o1, s1, o2, s2);
		state.axisLabel.position
			.copy(outward)
			.multiplyScalar(this.sceneSize * AXIS_LABEL_GAP)
			.add(base);
	}
}
