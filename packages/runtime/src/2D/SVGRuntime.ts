import type {
	Box,
	CoordinateReadout,
	ICartesianCoordinates2,
	NearestPoint,
	ScreenPoint,
} from "@wgx/types";

export default class SVGRuntime {
	static svgNamespace = "http://www.w3.org/2000/svg";
	elements: SVGSVGElement[] = [];
	ssrElements: HTMLDivElement[] = [];
	/** The tooltip currently shown, and the SVG that owns it. */
	activeTooltip: SVGGElement | null = null;
	activeTooltipSvg: SVGSVGElement | null = null;
	/** Per-element style/transform saved before a hover or click effect. */
	priorStyles = new WeakMap<Element, string>();
	priorTransforms = new WeakMap<Element, string>();
	/** Per-element click-toggle state, and parsed polyline point caches. */
	clicked = new WeakMap<Element, boolean>();
	polylinePoints = new WeakMap<SVGPolylineElement, ICartesianCoordinates2[]>();
	constructor(document: Document) {
		this.ssrElements = Array.from(
			document.querySelectorAll<HTMLDivElement>("div[data-wgx-ssr-endpoint]"),
		)
		this.elements = Array.from(
			document.querySelectorAll<SVGSVGElement>("svg[id^='wgx']"),
		);
		this.hydrate();
	}
	/**
	 * Fetch every SSR placeholder's content, swap it into the DOM, and hydrate
	 * the SVG that replaces it (binding its interactive markers and wiring the
	 * coordinate tool) — so a page only needs to include the orchestrator for
	 * server-rendered graphics to come alive. Resolves once every placeholder
	 * has settled (each independently; one failure doesn't sink the rest).
	 * @returns a promise that settles when all placeholders are processed
	 */
	populate(): Promise<void> {
		const pending: Promise<void>[] = [];
		for (const ssrElement of this.ssrElements) {
			const endpoint = ssrElement.getAttribute("data-wgx-ssr-endpoint");
			if (!endpoint) {
				continue;
			}
			const params = ssrElement.getAttribute("data-wgx-ssr-params") ?? "";
			const body = ssrElement.getAttribute("data-wgx-ssr-body") ?? null;
			const headers = ssrElement.getAttribute("data-wgx-ssr-headers");
			let parsedHeaders: HeadersInit | undefined;
			try {
				parsedHeaders = headers ? (JSON.parse(headers) as HeadersInit) : undefined;
			} catch (error) {
				console.error("Invalid SSR headers, skipping element:", error);
				continue;
			}
			const request = new Request(
				`${endpoint}${params ? `?${params}` : ""}`,
				{
					method: "POST",
					body: body ?? undefined,
					headers: parsedHeaders ? new Headers(parsedHeaders) : undefined,
				}
			);
			pending.push(
				fetch(request)
					.then((res) => {
						if (!res.ok) {
							throw new Error(
								`SSR request failed: ${res.status} ${res.statusText}`,
							);
						}
						return res.text();
					})
					.then((svgText) => {
						const svgDoc = new DOMParser().parseFromString(
							svgText,
							"image/svg+xml",
						);
						if (svgDoc.querySelector("parsererror")) {
							throw new Error("SSR response was not valid SVG");
						}
						// I don't love this double cast but i lazy
						const svgElement = svgDoc.documentElement as unknown as SVGSVGElement;
						ssrElement.replaceWith(svgElement);
						this.elements.push(svgElement);
						// Bring the freshly injected SVG to life. hydrate() is
						// idempotent (skips `[data-wgx-hydrated]`), so re-running it
						// over the whole element list only touches the new node.
						this.hydrate();
						this.initializeCoordinateTool(svgElement);
					})
					.catch((error) => {
						console.error("Failed to populate SSR content:", error);
					}),
			);
		}
		return Promise.all(pending).then(() => undefined);
	}
	/**
	 * Bind all interactive element event listeners
	 */
	hydrate(): void {
		this.hydrateClickAreas();
		this.hydrateHoverAreas();
		this.hydrateStatusAreas();
		this.hydrateTooltips();
	}
	// hydrateId(id: string, listenerConfig: ListenerConfig): void {
	// 	this.elements.forEach((svg) => {
	// 		const interactiveElements = svg.querySelectorAll<SVGElement>(
	// 			`[data-wgx-config="${id}"]`,
	// 		);
	// 		interactiveElements.forEach((element) => {
	// 			Object.entries(listenerConfig).forEach(([key, callback]) => {
	// 				element.addEventListener(key, callback);
	// 			});
	// 		});
	// 	});
	// }
	/**
	 * Bind all click area event listeners
	 */
	hydrateClickAreas(): void {
		this.elements.forEach((svg) => {
			const clickAreas = svg.querySelectorAll<SVGGElement>(
				"[data-wgx-click]:not([data-wgx-hydrated]),[data-wgx-click-style]:not([data-wgx-hydrated])",
			);
			if (!clickAreas) {
				return;
			}
			for (const clickArea of clickAreas) {
				clickArea.addEventListener("click", (event) => {
					this.wgxClickToggle(event);
				});
				clickArea.setAttribute("data-wgx-hydrated", "true");
			}
		});
	}
	/**
	 * Bind all hover area event listeners
	 */
	hydrateHoverAreas(): void {
		this.elements.forEach((svg) => {
			const hoverAreas = svg.querySelectorAll<SVGGElement>(
				"[data-wgx-hover]:not([data-wgx-hydrated]),[data-wgx-hover-transform]:not([data-wgx-hydrated])",
			);
			if (!hoverAreas) {
				return;
			}
			for (const hoverArea of hoverAreas) {
				hoverArea.addEventListener("mouseover", (event) => {
					this.wgxHoverOn(event);
				});
				hoverArea.addEventListener("mouseout", (event) => {
					this.wgxHoverOff(event);
				});
				hoverArea.setAttribute("data-wgx-hydrated", "true");
			}
		});
	}
	/**
	 * Bind all status area event listeners
	 */
	hydrateStatusAreas(): void {
		this.elements.forEach((svg) => {
			const statusAreas = svg.querySelectorAll<SVGGElement>(
				"[data-wgx-status-id]:not([data-wgx-hydrated])",
			);
			for (const statusArea of statusAreas) {
				// The label rides on the status-area element itself (mirroring the
				// hover/click hydrators); `data-wgx-status-id` is just the marker the
				// selector keys off, not a reference to some other node.
				const label = statusArea.getAttribute("data-wgx-status-text") ?? "";
				statusArea.addEventListener("mouseover", (event) => {
					this.setStatusText(event, label);
				});
				statusArea.addEventListener("mouseout", (event) => {
					this.clearStatusText(event);
				});
				statusArea.setAttribute("data-wgx-hydrated", "true");
			}
		});
	}
	/**
	 * Bind all tooltip element event listeners
	 */
	hydrateTooltips(): void {
		this.elements.forEach((svg) => {
			const tooltips = svg.querySelectorAll<SVGGElement>(
				"[data-wgx-tooltip-id]:not([data-wgx-hydrated])",
			);
			for (const tooltipGroup of tooltips) {
				const tooltipId = tooltipGroup.getAttribute("data-wgx-tooltip-id");
				if (!tooltipId) {
					continue;
				}
				const tooltipElement = tooltipId ? svg.getElementById(tooltipId) : null;
				if (tooltipElement) {
					tooltipGroup.addEventListener("mouseover", (event) => {
						this.showTooltip(event, tooltipId);
					});
					tooltipGroup.addEventListener("mousemove", (event) => {
						this.moveTooltip(event);
					});
					tooltipGroup.addEventListener("mouseout", () => {
						this.hideTooltip();
					});
					tooltipGroup.setAttribute("data-wgx-hydrated", "true");
				}
			}
		});
	}
	/**
	 * Get the SVG element that is the target of a given event, if any.
	 * @param event The event whose target SVG element to find
	 */
	getEventTarget(event: Event): HTMLElement | null {
		return (event?.target as HTMLElement) ?? null;
	}
	/**
	 * Convert a mouse event's client coordinates to SVG coordinates by
	 * creating an SVGPoint, setting its coordinates to the event's clientX
	 * and clientY, and applying the inverse of the SVG's screen CTM to the
	 * point.
	 * @param svg   The SVG element whose coordinate system to convert to
	 * @param event The mouse event to convert
	 */
	eventToPoint(svg: SVGSVGElement, event: MouseEvent): ICartesianCoordinates2 {
		const point = svg.createSVGPoint();
		point.x = event.clientX;
		point.y = event.clientY;
		const screenCTM = svg.getScreenCTM();
		const local = screenCTM
			? point.matrixTransform(screenCTM.inverse())
			: point;
		return { x: local.x, y: local.y };
	}
	/**
	 * Convert a vector in screen coordinates (e.g. from getBoundingClientRect)
	 * to SVG coordinates, by applying the inverse of the SVG's screen CTM to
	 * the vector's endpoints and returning the difference.
	 * @param svg The SVG element whose coordinate system to convert to
	 * @param dx  The x component of the vector in screen coordinates
	 * @param dy  The y component of the vector in screen coordinates
	 */
	screenVectorToSvg(
		svg: SVGSVGElement,
		dx: number,
		dy: number,
	): ICartesianCoordinates2 {
		const inverse = svg.getScreenCTM()?.inverse();
		const origin = svg.createSVGPoint();
		const point = svg.createSVGPoint();
		origin.x = 0;
		origin.y = 0;
		point.x = dx;
		point.y = dy;
		const originSvg = inverse ? origin.matrixTransform(inverse) : origin;
		const pointSvg = inverse ? point.matrixTransform(inverse) : point;
		return {
			x: Math.abs(pointSvg.x - originSvg.x),
			y: Math.abs(pointSvg.y - originSvg.y),
		};
	}
	/**
	 * Resize a foreignObject to fit its content, which is assumed to be either
	 * a single MathML <math> element or a single HTML element.
	 * @param foreignObject The foreignObject to resize
	 */
	resizeForeignObjectToContents(foreignObject: SVGForeignObjectElement): void {
		const content =
			foreignObject.querySelector("math") ?? foreignObject.firstElementChild;
		const svg = foreignObject.ownerSVGElement;
		if (!content?.getBoundingClientRect || !svg) {
			return;
		}
		const box = content.getBoundingClientRect();
		if (box.width <= 0 || box.height <= 0) {
			return;
		}
		const size = this.screenVectorToSvg(svg, box.width, box.height);
		foreignObject.setAttribute("width", size.x.toString());
		foreignObject.setAttribute("height", size.y.toString());
	}
	unionBox(a: DOMRect | null, b: DOMRect): DOMRect {
		if (!a) {
			return b;
		}
		const x1 = Math.min(a.x, b.x);
		const y1 = Math.min(a.y, b.y);
		const x2 = Math.max(a.x + a.width, b.x + b.width);
		const y2 = Math.max(a.y + a.height, b.y + b.height);
		return new DOMRect(x1, y1, x2 - x1, y2 - y1);
	}
	tooltipContentBox(
		tooltip: SVGGElement,
		background: SVGRectElement,
	): DOMRect | null {
		let box: DOMRect | null = null;
		for (const child of tooltip.children) {
			if (child === background || !(child instanceof SVGGraphicsElement)) {
				continue;
			}
			if (!child.getBBox) {
				continue;
			}
			const childBox = child.getBBox();
			if (childBox.width > 0 || childBox.height > 0) {
				box = this.unionBox(box, childBox);
			}
		}
		return box;
	}
	/**
	 * Resolve the SVG element that owns the target of an event (or the target
	 * itself when it is the root SVG).
	 * @param event The event whose owning SVG element to find
	 */
	getEventSvg(event: Event): SVGSVGElement | null {
		const target = event?.target as SVGElement | null;
		if (!target) {
			return null;
		}
		return target.ownerSVGElement ?? (target as SVGSVGElement);
	}
	/**
	 * Find a tooltip's background rect, identified by the `wgx-tip-bg` class.
	 * @param tooltip The tooltip group to search
	 */
	tooltipBackground(tooltip: SVGGElement): SVGRectElement | null {
		for (const child of tooltip.children) {
			if (
				child.tagName.toLowerCase() === "rect" &&
				child.classList.contains("wgx-tip-bg")
			) {
				return child as SVGRectElement;
			}
		}
		return null;
	}
	/**
	 * Resize a tooltip's background rect to wrap its content, after first
	 * sizing any foreignObjects (e.g. MathML) the content contains.
	 * @param tooltip The tooltip group to resize
	 */
	resizeTooltip(tooltip: SVGGElement): void {
		const background = this.tooltipBackground(tooltip);
		if (!background) {
			return;
		}
		const foreignObjects = tooltip.getElementsByTagName("foreignObject");
		for (const foreignObject of foreignObjects) {
			this.resizeForeignObjectToContents(foreignObject);
		}
		const box = this.tooltipContentBox(tooltip, background);
		if (!box) {
			return;
		}
		const padX = Math.max(
			4,
			box.x - parseFloat(background.getAttribute("x") ?? "0"),
		);
		const padY = Math.max(
			4,
			box.y - parseFloat(background.getAttribute("y") ?? "0"),
		);
		background.setAttribute("x", String(box.x - padX));
		background.setAttribute("y", String(box.y - padY));
		background.setAttribute("width", String(box.width + 2 * padX));
		background.setAttribute("height", String(box.height + 2 * padY));
	}
	/**
	 * Show the tooltip with the given id, reparenting it onto its SVG so it
	 * renders on top, then sizing and positioning it at the cursor.
	 * @param event     The mouse event that triggered the tooltip
	 * @param tooltipId The id of the tooltip group to show
	 */
	showTooltip(event: Event, tooltipId: string): void {
		const svg = this.getEventSvg(event);
		const tooltip = (svg?.getElementById(tooltipId) ??
			null) as SVGGElement | null;
		if (!svg || !tooltip) {
			return;
		}
		this.activeTooltip = tooltip;
		this.activeTooltipSvg = svg;
		svg.appendChild(tooltip);
		tooltip.style.display = "inline";
		this.resizeTooltip(tooltip);
		this.moveTooltip(event);
		const shownTooltip = tooltip;
		window.requestAnimationFrame(() => {
			if (this.activeTooltip === shownTooltip) {
				this.resizeTooltip(shownTooltip);
			}
		});
	}
	/**
	 * Move the active tooltip to follow the cursor.
	 * @param event The mouse event to track
	 */
	moveTooltip(event: Event): void {
		if (!this.activeTooltip || !this.activeTooltipSvg) {
			return;
		}
		const point = this.eventToPoint(this.activeTooltipSvg, event as MouseEvent);
		this.activeTooltip.setAttribute(
			"transform",
			`translate(${point.x} ${point.y})`,
		);
	}
	/** Hide and forget the active tooltip. */
	hideTooltip(): void {
		if (!this.activeTooltip) {
			return;
		}
		this.activeTooltip.style.display = "none";
		this.activeTooltip = null;
		this.activeTooltipSvg = null;
	}
	/**
	 * Set the text of the SVG's status line (the `wgx-status` element).
	 * @param event      The event whose SVG to update
	 * @param statusText The text to display
	 */
	setStatusText(event: Event, statusText: string): void {
		const svg = this.getEventSvg(event);
		const statusNode = svg?.getElementById("wgx-status") ?? null;
		if (statusNode) {
			statusNode.textContent = statusText;
		}
	}
	/**
	 * Clear the SVG's status line.
	 * @param event The event whose SVG to update
	 */
	clearStatusText(event: Event): void {
		const svg = this.getEventSvg(event);
		const statusNode = svg?.getElementById("wgx-status") ?? null;
		if (statusNode) {
			statusNode.textContent = "";
		}
	}
	/**
	 * Append a style fragment to an element, remembering its prior `style`
	 * attribute (once) so it can be restored later.
	 * @param element  The element to restyle
	 * @param fragment The CSS declarations to append
	 */
	wgxApplyStyle(element: Element, fragment: string): void {
		if (!this.priorStyles.has(element)) {
			this.priorStyles.set(element, element.getAttribute("style") ?? "");
		}
		const prior = this.priorStyles.get(element) ?? "";
		element.setAttribute("style", prior + (prior ? ";" : "") + fragment);
	}
	/**
	 * Restore the `style` attribute saved by {@link wgxApplyStyle}.
	 * @param element The element to restore
	 */
	wgxRestoreStyle(element: Element): void {
		if (this.priorStyles.has(element)) {
			element.setAttribute("style", this.priorStyles.get(element) ?? "");
			this.priorStyles.delete(element);
		}
	}
	/**
	 * Apply an element's hover effect: a restyle (`data-wgx-hover`) and/or an
	 * affine transform (`data-wgx-hover-transform`). The effect type is chosen
	 * on the WL side.
	 * @param event The mouseover event
	 */
	wgxHoverOn(event: Event): void {
		const element = (event.currentTarget ?? event.target) as Element;
		const hoverStyle = element.getAttribute("data-wgx-hover");
		const hoverTransform = element.getAttribute("data-wgx-hover-transform");
		if (hoverStyle) {
			this.wgxApplyStyle(element, hoverStyle);
		}
		if (hoverTransform) {
			if (!this.priorTransforms.has(element)) {
				this.priorTransforms.set(
					element,
					element.getAttribute("transform") ?? "",
				);
			}
			element.setAttribute("transform", hoverTransform);
		}
	}
	/**
	 * Undo the hover effect applied by {@link wgxHoverOn}.
	 * @param event The mouseout event
	 */
	wgxHoverOff(event: Event): void {
		const element = (event.currentTarget ?? event.target) as Element;
		this.wgxRestoreStyle(element);
		if (this.priorTransforms.has(element)) {
			const prior = this.priorTransforms.get(element) ?? "";
			if (prior) {
				element.setAttribute("transform", prior);
			} else {
				element.removeAttribute("transform");
			}
			this.priorTransforms.delete(element);
		}
	}
	/**
	 * Apply (`on=true`) or undo (`on=false`) a single element's click effect:
	 * an affine transform (`data-wgx-click`) and/or a restyle
	 * (`data-wgx-click-style`).
	 * @param element The element to toggle
	 * @param on      Whether to apply or undo the effect
	 */
	wgxToggleClickEl(element: Element, on: boolean): void {
		const matrix = element.getAttribute("data-wgx-click");
		const clickStyle = element.getAttribute("data-wgx-click-style");
		if (matrix) {
			if (on) {
				element.setAttribute("transform", matrix);
			} else {
				element.removeAttribute("transform");
			}
		}
		if (clickStyle) {
			if (on) {
				this.wgxApplyStyle(element, clickStyle);
			} else {
				this.wgxRestoreStyle(element);
			}
		}
		this.clicked.set(element, on);
	}
	/**
	 * Toggle an element's click effect. Elements sharing a
	 * `data-wgx-click-group` (e.g. a pie wedge and its label) toggle together;
	 * ungrouped elements toggle individually.
	 * @param event The click event
	 */
	wgxClickToggle(event: Event): void {
		const element = (event.currentTarget ?? event.target) as Element;
		const on = !this.clicked.get(element);
		const group = element.getAttribute("data-wgx-click-group");
		if (group) {
			const root = (element as SVGElement).ownerSVGElement ?? element;
			const members = root.querySelectorAll(
				`[data-wgx-click-group="${group}"]`,
			);
			members.forEach((member) => this.wgxToggleClickEl(member, on));
		} else {
			this.wgxToggleClickEl(element, on);
		}
	}
	/**
	 * Hide every node of a coordinate-tool readout.
	 * @param readout The readout to hide
	 */
	hideCoordinateReadout(readout: CoordinateReadout): void {
		const parts = [
			readout.marker,
			readout.labelLeader,
			readout.labelBackground,
			readout.labelOutline,
			readout.labelAccent,
			readout.label,
		];
		for (const part of parts) {
			if (part) {
				part.style.display = "none";
			}
		}
	}
	/**
	 * Lazily create the SVG nodes of a coordinate-tool readout (marker, leader,
	 * label box, outline, accent and text), appending them to the SVG.
	 * @param svg     The SVG to host the readout
	 * @param readout The readout whose nodes to ensure exist
	 */
	ensureCoordinateReadout(
		svg: SVGSVGElement,
		readout: CoordinateReadout,
	): void {
		if (
			readout.marker &&
			readout.labelLeader &&
			readout.labelBackground &&
			readout.labelOutline &&
			readout.labelAccent &&
			readout.label
		) {
			return;
		}
		const ns = SVGRuntime.svgNamespace;

		const marker = document.createElementNS(ns, "circle") as SVGCircleElement;
		marker.setAttribute("class", "wgx-coord-marker");
		marker.setAttribute("r", "4");
		marker.setAttribute("stroke", "#101a30");
		marker.setAttribute("stroke-width", "1.25");
		marker.setAttribute("vector-effect", "non-scaling-stroke");
		marker.style.display = "none";
		marker.style.pointerEvents = "none";
		svg.appendChild(marker);
		readout.marker = marker;

		const labelLeader = document.createElementNS(
			ns,
			"polyline",
		) as SVGPolylineElement;
		labelLeader.setAttribute("class", "wgx-coord-leader");
		labelLeader.setAttribute("fill", "none");
		labelLeader.setAttribute("stroke-width", "1.75");
		labelLeader.setAttribute("stroke-linecap", "butt");
		labelLeader.setAttribute("stroke-linejoin", "miter");
		labelLeader.setAttribute("vector-effect", "non-scaling-stroke");
		labelLeader.style.display = "none";
		labelLeader.style.pointerEvents = "none";
		svg.appendChild(labelLeader);
		readout.labelLeader = labelLeader;

		const labelBackground = document.createElementNS(
			ns,
			"rect",
		) as SVGRectElement;
		labelBackground.setAttribute("class", "wgx-coord-box");
		labelBackground.setAttribute("rx", "0");
		labelBackground.setAttribute("ry", "0");
		labelBackground.setAttribute("fill", "#1a1a1a");
		labelBackground.style.display = "none";
		labelBackground.style.pointerEvents = "none";
		svg.appendChild(labelBackground);
		readout.labelBackground = labelBackground;

		const labelOutline = document.createElementNS(ns, "rect") as SVGRectElement;
		labelOutline.setAttribute("class", "wgx-coord-outline");
		labelOutline.setAttribute("rx", "0");
		labelOutline.setAttribute("ry", "0");
		labelOutline.setAttribute("fill", "none");
		labelOutline.setAttribute("stroke-width", "1.75");
		labelOutline.setAttribute("vector-effect", "non-scaling-stroke");
		labelOutline.style.display = "none";
		labelOutline.style.pointerEvents = "none";
		svg.appendChild(labelOutline);
		readout.labelOutline = labelOutline;

		const labelAccent = document.createElementNS(ns, "line") as SVGLineElement;
		svg.appendChild(labelAccent);
		readout.labelAccent = labelAccent;

		const label = document.createElementNS(ns, "text") as SVGTextElement;
		label.setAttribute("class", "wgx-coord-label");
		label.setAttribute("font-size", "12");
		label.setAttribute("font-family", "sans-serif");
		label.setAttribute("fill", "#eaf2ff");
		label.style.display = "none";
		label.style.pointerEvents = "none";
		svg.appendChild(label);
		readout.label = label;
	}
	/**
	 * Parse and cache a polyline's `points` attribute as an array of points.
	 * @param polyline The polyline whose points to read
	 */
	getPolylinePoints(polyline: SVGPolylineElement): ICartesianCoordinates2[] {
		const cached = this.polylinePoints.get(polyline);
		if (cached) {
			return cached;
		}
		const pointTokens = (polyline.getAttribute("points") ?? "")
			.trim()
			.split(/\s+/);
		const points = pointTokens.map((pointToken) => {
			const coordinates = pointToken.split(",");
			return {
				x: parseFloat(coordinates[0]),
				y: parseFloat(coordinates[1]),
			};
		});
		this.polylinePoints.set(polyline, points);
		return points;
	}
	/**
	 * Map a curve-local point into the SVG's user space, by going through the
	 * curve's screen CTM and back through the SVG's inverse screen CTM. Keeps
	 * the original local coordinates for later readout.
	 * @param svg              The SVG whose user space to map into
	 * @param curveScreenMatrix The curve's screen CTM (or null)
	 * @param svgScreenInverse  The inverse of the SVG's screen CTM (or null)
	 * @param point            The curve-local point to map
	 */
	transformCurvePoint(
		svg: SVGSVGElement,
		curveScreenMatrix: DOMMatrix | null,
		svgScreenInverse: DOMMatrix | null,
		point: ICartesianCoordinates2,
	): ScreenPoint {
		const svgPoint = svg.createSVGPoint();
		svgPoint.x = point.x;
		svgPoint.y = point.y;
		const transformedPoint =
			curveScreenMatrix && svgScreenInverse
				? svgPoint
						.matrixTransform(curveScreenMatrix)
						.matrixTransform(svgScreenInverse)
				: svgPoint;
		return {
			x: transformedPoint.x,
			y: transformedPoint.y,
			localX: point.x,
			localY: point.y,
		};
	}
	/**
	 * Find the closest point to the cursor on a line segment, clamped to the
	 * segment's endpoints, interpolating its local coordinates.
	 * @param cursorPoint The cursor position in SVG user space
	 * @param startPoint  The segment start
	 * @param endPoint    The segment end
	 */
	nearestPointOnSegment(
		cursorPoint: ICartesianCoordinates2,
		startPoint: ScreenPoint,
		endPoint: ScreenPoint,
	): NearestPoint {
		const segmentX = endPoint.x - startPoint.x;
		const segmentY = endPoint.y - startPoint.y;
		const segmentLengthSquared = segmentX * segmentX + segmentY * segmentY;
		let projection = 0;
		if (segmentLengthSquared !== 0) {
			projection =
				((cursorPoint.x - startPoint.x) * segmentX +
					(cursorPoint.y - startPoint.y) * segmentY) /
				segmentLengthSquared;
			projection = Math.max(0, Math.min(1, projection));
		}
		const nearestX = startPoint.x + projection * segmentX;
		const nearestY = startPoint.y + projection * segmentY;
		const distanceX = cursorPoint.x - nearestX;
		const distanceY = cursorPoint.y - nearestY;
		return {
			x: nearestX,
			y: nearestY,
			localX:
				startPoint.localX + projection * (endPoint.localX - startPoint.localX),
			localY:
				startPoint.localY + projection * (endPoint.localY - startPoint.localY),
			distanceSquared: distanceX * distanceX + distanceY * distanceY,
		};
	}
	/**
	 * Find the closest point to the cursor along a polyline curve.
	 * @param svg         The SVG whose user space to work in
	 * @param polyline    The polyline curve
	 * @param cursorPoint The cursor position in SVG user space
	 */
	nearestPointOnPolyline(
		svg: SVGSVGElement,
		polyline: SVGPolylineElement,
		cursorPoint: ICartesianCoordinates2,
	): NearestPoint | null {
		const points = this.getPolylinePoints(polyline);
		if (points.length < 2) {
			return null;
		}
		const curveScreenMatrix = polyline.getScreenCTM();
		const svgScreenInverse = svg.getScreenCTM()?.inverse() ?? null;
		let nearestPoint: NearestPoint | null = null;
		let previousPoint = this.transformCurvePoint(
			svg,
			curveScreenMatrix,
			svgScreenInverse,
			points[0],
		);
		for (
			let segmentIndex = 1;
			segmentIndex < points.length;
			segmentIndex += 1
		) {
			const currentPoint = this.transformCurvePoint(
				svg,
				curveScreenMatrix,
				svgScreenInverse,
				points[segmentIndex],
			);
			const point = this.nearestPointOnSegment(
				cursorPoint,
				previousPoint,
				currentPoint,
			);
			if (
				nearestPoint === null ||
				point.distanceSquared < nearestPoint.distanceSquared
			) {
				nearestPoint = point;
			}
			previousPoint = currentPoint;
		}
		return nearestPoint;
	}
	/**
	 * Treat a circle marker as a single snap point at its center.
	 * @param svg         The SVG whose user space to work in
	 * @param circle      The circle curve
	 * @param cursorPoint The cursor position in SVG user space
	 */
	nearestPointOnCircle(
		svg: SVGSVGElement,
		circle: SVGCircleElement,
		cursorPoint: ICartesianCoordinates2,
	): NearestPoint | null {
		const curveScreenMatrix = circle.getScreenCTM();
		const svgScreenInverse = svg.getScreenCTM()?.inverse() ?? null;
		const center = this.transformCurvePoint(
			svg,
			curveScreenMatrix,
			svgScreenInverse,
			{
				x: parseFloat(circle.getAttribute("cx") ?? ""),
				y: parseFloat(circle.getAttribute("cy") ?? ""),
			},
		);
		if (!isFinite(center.x) || !isFinite(center.y)) {
			return null;
		}
		const distanceX = cursorPoint.x - center.x;
		const distanceY = cursorPoint.y - center.y;
		return {
			x: center.x,
			y: center.y,
			localX: center.localX,
			localY: center.localY,
			distanceSquared: distanceX * distanceX + distanceY * distanceY,
		};
	}
	/**
	 * Dispatch to the nearest-point routine for a curve's tag (polyline or
	 * circle); other shapes are not snapped to.
	 * @param svg         The SVG whose user space to work in
	 * @param curve       The curve element
	 * @param cursorPoint The cursor position in SVG user space
	 */
	nearestPointOnCurve(
		svg: SVGSVGElement,
		curve: Element,
		cursorPoint: ICartesianCoordinates2,
	): NearestPoint | null {
		const tagName = curve.tagName.toLowerCase();
		if (tagName === "polyline") {
			return this.nearestPointOnPolyline(
				svg,
				curve as SVGPolylineElement,
				cursorPoint,
			);
		}
		if (tagName === "circle") {
			return this.nearestPointOnCircle(
				svg,
				curve as SVGCircleElement,
				cursorPoint,
			);
		}
		return null;
	}
	/**
	 * Whether a paint value is a real, visible color (not none/transparent).
	 * @param paint The paint string to test
	 */
	usablePaint(paint: string | null): paint is string {
		return (
			!!paint &&
			paint !== "none" &&
			paint !== "transparent" &&
			paint !== "rgba(0, 0, 0, 0)"
		);
	}
	/**
	 * Pick a representative color for a curve, preferring stroke over fill and
	 * computed style over attributes, falling back to a default red.
	 * @param curve The curve whose color to read
	 */
	getCurveStrokeColor(curve: Element): string {
		const computedStyle = window.getComputedStyle(curve);
		const styleStroke = computedStyle.stroke;
		const styleFill = computedStyle.fill;
		const attributeStroke = curve.getAttribute("stroke");
		const attributeFill = curve.getAttribute("fill");
		if (this.usablePaint(styleStroke)) {
			return styleStroke;
		}
		if (this.usablePaint(attributeStroke)) {
			return attributeStroke;
		}
		if (this.usablePaint(styleFill)) {
			return styleFill;
		}
		if (this.usablePaint(attributeFill)) {
			return attributeFill;
		}
		return "#d62728";
	}
	/**
	 * Clamp a value to a range, returning the minimum when the range is empty.
	 * @param value   The value to clamp
	 * @param minimum The lower bound
	 * @param maximum The upper bound
	 */
	clamp(value: number, minimum: number, maximum: number): number {
		if (maximum < minimum) {
			return minimum;
		}
		return Math.max(minimum, Math.min(maximum, value));
	}
	/**
	 * Get an SVG's user-space bounds, from its viewBox if set, otherwise its
	 * width/height attributes, otherwise an empty box.
	 * @param svg The SVG to measure
	 */
	getSvgBounds(svg: SVGSVGElement): Box {
		const viewBox = svg.viewBox.baseVal;
		if (viewBox.width > 0 && viewBox.height > 0) {
			return {
				x: viewBox.x,
				y: viewBox.y,
				width: viewBox.width,
				height: viewBox.height,
			};
		}
		const width = parseFloat(svg.getAttribute("width") ?? "");
		const height = parseFloat(svg.getAttribute("height") ?? "");
		if (isFinite(width) && isFinite(height) && width > 0 && height > 0) {
			return { x: 0, y: 0, width, height };
		}
		return { x: 0, y: 0, width: 0, height: 0 };
	}
	/**
	 * Lay out the coordinate-tool callout (label box, outline, accent and
	 * leader) next to an anchor point, flipping and clamping to stay inside the
	 * SVG bounds.
	 * @param readout     The readout to position
	 * @param anchorPoint The point the callout points at
	 * @param svg         The SVG that bounds the callout
	 */
	updateCoordinateCallout(
		readout: CoordinateReadout,
		anchorPoint: NearestPoint,
		svg: SVGSVGElement,
	): void {
		const { label, labelBackground, labelOutline, labelAccent, labelLeader } =
			readout;
		if (
			!label ||
			!labelBackground ||
			!labelOutline ||
			!labelAccent ||
			!labelLeader
		) {
			return;
		}
		const bounds = this.getSvgBounds(svg);
		const calloutGapX = 20;
		const calloutGapY = 8;
		const paddingX = 6;
		const paddingY = 4;
		let horizontalDirection = 1;
		let verticalDirection = -1;
		const labelX = parseFloat(label.getAttribute("x") ?? "");
		const labelY = parseFloat(label.getAttribute("y") ?? "");
		let box: Box;
		try {
			box = label.getBBox();
		} catch {
			box = {
				x: labelX,
				y: labelY - 11,
				width: (label.textContent ?? "").length * 7,
				height: 14,
			};
		}
		const textOffsetX = box.x - labelX;
		const textOffsetY = box.y - labelY;
		const width = box.width + 2 * paddingX;
		const height = box.height + 2 * paddingY;
		if (
			bounds.width > 0 &&
			anchorPoint.x + calloutGapX + width > bounds.x + bounds.width
		) {
			horizontalDirection = -1;
		}
		if (bounds.height > 0 && anchorPoint.y - height < bounds.y) {
			verticalDirection = 1;
		}
		let x =
			horizontalDirection > 0
				? anchorPoint.x + calloutGapX
				: anchorPoint.x - calloutGapX - width;
		let y =
			verticalDirection < 0
				? anchorPoint.y - height
				: anchorPoint.y + calloutGapY;
		if (bounds.width > 0) {
			x = this.clamp(x, bounds.x, bounds.x + bounds.width - width);
		}
		if (bounds.height > 0) {
			y = this.clamp(y, bounds.y, bounds.y + bounds.height - height);
		}
		label.setAttribute("x", String(x + paddingX - textOffsetX));
		label.setAttribute("y", String(y + paddingY - textOffsetY));
		labelBackground.setAttribute("x", String(x));
		labelBackground.setAttribute("y", String(y));
		labelBackground.setAttribute("width", String(width));
		labelBackground.setAttribute("height", String(height));
		labelOutline.setAttribute("x", String(x));
		labelOutline.setAttribute("y", String(y));
		labelOutline.setAttribute("width", String(width));
		labelOutline.setAttribute("height", String(height));
		labelAccent.setAttribute("x1", String(x));
		labelAccent.setAttribute("x2", String(x + width));
		labelAccent.setAttribute("y1", String(y));
		labelAccent.setAttribute("y2", String(y));
		const leaderStartX = anchorPoint.x + horizontalDirection * 4;
		const leaderStartY = anchorPoint.y;
		const leaderEndX = horizontalDirection > 0 ? x : x + width;
		const leaderJointX = leaderEndX - horizontalDirection * 5;
		const leaderEndY = y + (verticalDirection < 0 ? 0.62 : 0.38) * height;
		labelLeader.setAttribute(
			"points",
			`${leaderStartX},${leaderStartY} ${leaderJointX},${leaderEndY} ${leaderEndX},${leaderEndY}`,
		);
	}
	/**
	 * Wire up the live coordinate-readout tool for an SVG that contains
	 * `wgx-curve` elements: on mousemove, snap to the nearest curve point and
	 * show its data-space coordinates; on mouseleave, hide the readout.
	 * @param svg The SVG to attach the tool to
	 */
	initializeCoordinateTool(svg: SVGSVGElement): void {
		const curves = svg.getElementsByClassName("wgx-curve");
		if (curves.length === 0) {
			return;
		}
		const mapScaleX = parseFloat(svg.getAttribute("data-mapax") ?? "");
		const mapOffsetX = parseFloat(svg.getAttribute("data-mapbx") ?? "");
		const mapScaleY = parseFloat(svg.getAttribute("data-mapay") ?? "");
		const mapOffsetY = parseFloat(svg.getAttribute("data-mapby") ?? "");
		const readout: CoordinateReadout = {
			marker: null,
			labelLeader: null,
			labelBackground: null,
			labelOutline: null,
			labelAccent: null,
			label: null,
		};

		const handleMouseMove = (event: MouseEvent): void => {
			const cursorPoint = this.eventToPoint(svg, event);
			let nearestPoint: NearestPoint | null = null;
			let nearestCurve: Element | null = null;

			this.ensureCoordinateReadout(svg, readout);

			for (const curve of curves) {
				const curvePoint = this.nearestPointOnCurve(svg, curve, cursorPoint);
				if (
					curvePoint !== null &&
					(nearestPoint === null ||
						curvePoint.distanceSquared < nearestPoint.distanceSquared)
				) {
					nearestPoint = curvePoint;
					nearestCurve = curve;
				}
			}

			if (nearestPoint === null || nearestCurve === null) {
				this.hideCoordinateReadout(readout);
				return;
			}

			const {
				marker,
				labelLeader,
				labelBackground,
				labelOutline,
				labelAccent,
				label,
			} = readout;
			if (
				!marker ||
				!labelLeader ||
				!labelBackground ||
				!labelOutline ||
				!labelAccent ||
				!label
			) {
				return;
			}

			const curveColor = this.getCurveStrokeColor(nearestCurve);
			marker.setAttribute("cx", String(nearestPoint.x));
			marker.setAttribute("cy", String(nearestPoint.y));
			marker.setAttribute("fill", curveColor);
			labelLeader.setAttribute("stroke", curveColor);
			labelOutline.setAttribute("stroke", curveColor);
			labelLeader.style.display = "inline";
			labelBackground.style.display = "inline";
			labelOutline.style.display = "inline";
			labelAccent.style.display = "inline";

			label.textContent = `${((nearestPoint.localX - mapOffsetX) / mapScaleX).toFixed(2)}, ${((nearestPoint.localY - mapOffsetY) / mapScaleY).toFixed(2)}`;
			label.setAttribute("x", String(nearestPoint.x + 26));
			label.setAttribute("y", String(nearestPoint.y - 7));
			label.style.display = "inline";
			this.updateCoordinateCallout(readout, nearestPoint, svg);
			svg.appendChild(labelLeader);
			svg.appendChild(labelBackground);
			svg.appendChild(labelOutline);
			svg.appendChild(labelAccent);
			svg.appendChild(label);
			marker.style.display = "inline";
			svg.appendChild(marker);
		};

		svg.addEventListener("mousemove", handleMouseMove);
		svg.addEventListener("mouseleave", () => {
			this.hideCoordinateReadout(readout);
		});
	}
}
