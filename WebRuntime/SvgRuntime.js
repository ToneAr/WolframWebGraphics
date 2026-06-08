(function () {
	"use strict";

	var runtimeScript = document.currentScript;
	var ownerSvg = runtimeScript ? runtimeScript.ownerSVGElement : null;
	var activeTooltip = null;
	var svgNamespace = "http://www.w3.org/2000/svg";

	function getEventSvg(event) {
		if (!event || !event.target) {
			return null;
		}
		return event.target.ownerSVGElement || event.target;
	}

	function eventToSvgPoint(svg, event) {
		var point = svg.createSVGPoint();
		point.x = event.clientX;
		point.y = event.clientY;
		return point.matrixTransform(svg.getScreenCTM().inverse());
	}

	function screenVectorToSvg(svg, dx, dy) {
		var inverse = svg.getScreenCTM().inverse();
		var origin = svg.createSVGPoint();
		var point = svg.createSVGPoint();
		var originSvg;
		var pointSvg;

		origin.x = 0;
		origin.y = 0;
		point.x = dx;
		point.y = dy;
		originSvg = origin.matrixTransform(inverse);
		pointSvg = point.matrixTransform(inverse);
		return {
			x: Math.abs(pointSvg.x - originSvg.x),
			y: Math.abs(pointSvg.y - originSvg.y),
		};
	}

	function resizeForeignObjectToContents(foreignObject) {
		var box;
		var content =
			foreignObject.querySelector("math") || foreignObject.firstElementChild;
		var size;
		var svg = foreignObject.ownerSVGElement;

		if (!content || !content.getBoundingClientRect || !svg) {
			return;
		}

		box = content.getBoundingClientRect();
		if (box.width <= 0 || box.height <= 0) {
			return;
		}

		size = screenVectorToSvg(svg, box.width, box.height);
		foreignObject.setAttribute("width", size.x);
		foreignObject.setAttribute("height", size.y);
	}

	function unionBox(a, b) {
		var x1;
		var y1;
		var x2;
		var y2;

		if (!a) {
			return b;
		}

		x1 = Math.min(a.x, b.x);
		y1 = Math.min(a.y, b.y);
		x2 = Math.max(a.x + a.width, b.x + b.width);
		y2 = Math.max(a.y + a.height, b.y + b.height);
		return {
			x: x1,
			y: y1,
			width: x2 - x1,
			height: y2 - y1,
		};
	}

	function tooltipContentBox(tooltip, background) {
		var box = null;
		var childBox;
		var children = tooltip.children;
		var i;

		for (i = 0; i < children.length; i += 1) {
			if (children[i] === background || !children[i].getBBox) {
				continue;
			}
			try {
				childBox = children[i].getBBox();
			} catch (error) {
				continue;
			}
			if (childBox.width > 0 || childBox.height > 0) {
				box = unionBox(box, childBox);
			}
		}

		return box;
	}

	function tooltipBackground(tooltip) {
		var children = tooltip.children;
		var i;

		for (i = 0; i < children.length; i += 1) {
			if (
				children[i].tagName &&
				children[i].tagName.toLowerCase() === "rect" &&
				children[i].classList.contains("wgx-tip-bg")
			) {
				return children[i];
			}
		}

		return null;
	}

	function resizeTooltip(tooltip) {
		var background = tooltipBackground(tooltip);
		var box;
		var foreignObjects = tooltip.getElementsByTagName("foreignObject");
		var i;
		var padX;
		var padY;

		if (!background) {
			return;
		}

		for (i = 0; i < foreignObjects.length; i += 1) {
			resizeForeignObjectToContents(foreignObjects[i]);
		}

		box = tooltipContentBox(tooltip, background);
		if (!box) {
			return;
		}

		padX = Math.max(4, box.x - parseFloat(background.getAttribute("x") || 0));
		padY = Math.max(4, box.y - parseFloat(background.getAttribute("y") || 0));
		background.setAttribute("x", box.x - padX);
		background.setAttribute("y", box.y - padY);
		background.setAttribute("width", box.width + 2 * padX);
		background.setAttribute("height", box.height + 2 * padY);
	}

	function showTooltip(event, tooltipId) {
		var svg = getEventSvg(event);
		var tooltip = svg ? svg.getElementById(tooltipId) : null;
		var shownTooltip;

		if (!tooltip) {
			return;
		}

		activeTooltip = tooltip;
		activeTooltip.__wgxOwnerSvg = svg;
		svg.appendChild(activeTooltip);
		activeTooltip.style.display = "inline";
		resizeTooltip(activeTooltip);
		moveTooltip(event);
		shownTooltip = activeTooltip;
		if (window.requestAnimationFrame) {
			window.requestAnimationFrame(function () {
				if (activeTooltip === shownTooltip) {
					resizeTooltip(shownTooltip);
				}
			});
		}
	}

	function moveTooltip(event) {
		var point;

		if (!activeTooltip) {
			return;
		}

		point = eventToSvgPoint(activeTooltip.__wgxOwnerSvg, event);
		activeTooltip.setAttribute(
			"transform",
			"translate(" + point.x + " " + point.y + ")",
		);
	}

	function hideTooltip() {
		if (!activeTooltip) {
			return;
		}

		activeTooltip.style.display = "none";
		activeTooltip = null;
	}

	function setStatusText(event, statusText) {
		var svg = getEventSvg(event);
		var statusNode = svg ? svg.getElementById("wgx-status") : null;

		if (statusNode) {
			statusNode.textContent = statusText;
		}
	}

	function clearStatusText(event) {
		var svg = getEventSvg(event);
		var statusNode = svg ? svg.getElementById("wgx-status") : null;

		if (statusNode) {
			statusNode.textContent = "";
		}
	}

	function wgxApplyStyle(el, fragment) {
		if (el.__wgxPriorStyle === undefined) {
			el.__wgxPriorStyle = el.getAttribute("style") || "";
		}
		el.setAttribute(
			"style",
			el.__wgxPriorStyle + (el.__wgxPriorStyle ? ";" : "") + fragment,
		);
	}

	function wgxRestoreStyle(el) {
		if (el.__wgxPriorStyle !== undefined) {
			el.setAttribute("style", el.__wgxPriorStyle);
			el.__wgxPriorStyle = undefined;
		}
	}

	// hover applies a restyle (data-wgx-hover) and/or an affine transform
	// (data-wgx-hover-transform); the effect TYPE is chosen on the WL side.
	function wgxHoverOn(event) {
		var el = event.currentTarget || event.target;
		var hoverStyle = el.getAttribute("data-wgx-hover");
		var hoverTransform = el.getAttribute("data-wgx-hover-transform");
		if (hoverStyle) {
			wgxApplyStyle(el, hoverStyle);
		}
		if (hoverTransform) {
			if (el.__wgxPriorTransform === undefined) {
				el.__wgxPriorTransform = el.getAttribute("transform") || "";
			}
			el.setAttribute("transform", hoverTransform);
		}
	}

	function wgxHoverOff(event) {
		var el = event.currentTarget || event.target;
		wgxRestoreStyle(el);
		if (el.__wgxPriorTransform !== undefined) {
			if (el.__wgxPriorTransform) {
				el.setAttribute("transform", el.__wgxPriorTransform);
			} else {
				el.removeAttribute("transform");
			}
			el.__wgxPriorTransform = undefined;
		}
	}

	// apply (on=true) or undo (on=false) a single element's click effect:
	// an affine transform (data-wgx-click) and/or a restyle (data-wgx-click-style).
	function wgxToggleClickEl(el, on) {
		var matrix = el.getAttribute("data-wgx-click");
		var clickStyle = el.getAttribute("data-wgx-click-style");
		if (matrix) {
			if (on) {
				el.setAttribute("transform", matrix);
			} else {
				el.removeAttribute("transform");
			}
		}
		if (clickStyle) {
			if (on) {
				wgxApplyStyle(el, clickStyle);
			} else {
				wgxRestoreStyle(el);
			}
		}
		el.__wgxClicked = on;
	}

	// A pie wedge and its label are separate elements that share a
	// data-wgx-click-group, so clicking either toggles the whole group together
	// (the wedge and its label explode as one). Elements without a group toggle
	// individually.
	function wgxClickToggle(event) {
		var el = event.currentTarget || event.target;
		var on = !el.__wgxClicked;
		var group = el.getAttribute("data-wgx-click-group");
		var members;
		var i;
		if (group) {
			members = (el.ownerSVGElement || el).querySelectorAll(
				'[data-wgx-click-group="' + group + '"]',
			);
			for (i = 0; i < members.length; i += 1) {
				wgxToggleClickEl(members[i], on);
			}
		} else {
			wgxToggleClickEl(el, on);
		}
	}

	function hideCoordinateReadout(readout) {
		if (readout.marker) {
			readout.marker.style.display = "none";
		}
		if (readout.labelLeader) {
			readout.labelLeader.style.display = "none";
		}
		if (readout.labelBackground) {
			readout.labelBackground.style.display = "none";
		}
		if (readout.labelOutline) {
			readout.labelOutline.style.display = "none";
		}
		if (readout.labelAccent) {
			readout.labelAccent.style.display = "none";
		}
		if (readout.label) {
			readout.label.style.display = "none";
		}
	}

	function ensureCoordinateReadout(svg, readout) {
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

		readout.marker = document.createElementNS(svgNamespace, "circle");
		readout.marker.setAttribute("class", "wgx-coord-marker");
		readout.marker.setAttribute("r", "4");
		readout.marker.setAttribute("stroke", "#101a30");
		readout.marker.setAttribute("stroke-width", "1.25");
		readout.marker.setAttribute("vector-effect", "non-scaling-stroke");
		readout.marker.style.display = "none";
		readout.marker.style.pointerEvents = "none";
		svg.appendChild(readout.marker);

		readout.labelLeader = document.createElementNS(svgNamespace, "polyline");
		readout.labelLeader.setAttribute("class", "wgx-coord-leader");
		readout.labelLeader.setAttribute("fill", "none");
		readout.labelLeader.setAttribute("stroke-width", "1.75");
		readout.labelLeader.setAttribute("stroke-linecap", "butt");
		readout.labelLeader.setAttribute("stroke-linejoin", "miter");
		readout.labelLeader.setAttribute("vector-effect", "non-scaling-stroke");
		readout.labelLeader.style.display = "none";
		readout.labelLeader.style.pointerEvents = "none";
		svg.appendChild(readout.labelLeader);

		readout.labelBackground = document.createElementNS(svgNamespace, "rect");
		readout.labelBackground.setAttribute("class", "wgx-coord-box");
		readout.labelBackground.setAttribute("rx", "0");
		readout.labelBackground.setAttribute("ry", "0");
		readout.labelBackground.setAttribute("fill", "#1a1a1a");
		readout.labelBackground.style.display = "none";
		readout.labelBackground.style.pointerEvents = "none";
		svg.appendChild(readout.labelBackground);

		readout.labelOutline = document.createElementNS(svgNamespace, "rect");
		readout.labelOutline.setAttribute("class", "wgx-coord-outline");
		readout.labelOutline.setAttribute("rx", "0");
		readout.labelOutline.setAttribute("ry", "0");
		readout.labelOutline.setAttribute("fill", "none");
		readout.labelOutline.setAttribute("stroke-width", "1.75");
		readout.labelOutline.setAttribute("vector-effect", "non-scaling-stroke");
		readout.labelOutline.style.display = "none";
		readout.labelOutline.style.pointerEvents = "none";
		svg.appendChild(readout.labelOutline);

		readout.labelAccent = document.createElementNS(svgNamespace, "line");
		svg.appendChild(readout.labelAccent);

		readout.label = document.createElementNS(svgNamespace, "text");
		readout.label.setAttribute("class", "wgx-coord-label");
		readout.label.setAttribute("font-size", "12");
		readout.label.setAttribute("font-family", "sans-serif");
		readout.label.setAttribute("fill", "#eaf2ff");
		readout.label.style.display = "none";
		readout.label.style.pointerEvents = "none";
		svg.appendChild(readout.label);
	}

	function getPolylinePoints(polyline) {
		var pointTokens;

		if (polyline.__wgxPoints) {
			return polyline.__wgxPoints;
		}

		pointTokens = polyline.getAttribute("points").trim().split(/\s+/);
		polyline.__wgxPoints = pointTokens.map(function (pointToken) {
			var coordinates = pointToken.split(",");
			return {
				x: parseFloat(coordinates[0]),
				y: parseFloat(coordinates[1]),
			};
		});

		return polyline.__wgxPoints;
	}

	function transformCurvePoint(svg, curveScreenMatrix, svgScreenInverse, point) {
		var svgPoint = svg.createSVGPoint();
		var transformedPoint;

		svgPoint.x = point.x;
		svgPoint.y = point.y;
		transformedPoint =
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

	function nearestPointOnSegment(cursorPoint, startPoint, endPoint) {
		var segmentX = endPoint.x - startPoint.x;
		var segmentY = endPoint.y - startPoint.y;
		var segmentLengthSquared = segmentX * segmentX + segmentY * segmentY;
		var projection = 0;
		var nearestX;
		var nearestY;
		var distanceX;
		var distanceY;

		if (segmentLengthSquared !== 0) {
			projection =
				((cursorPoint.x - startPoint.x) * segmentX +
					(cursorPoint.y - startPoint.y) * segmentY) /
				segmentLengthSquared;
			projection = Math.max(0, Math.min(1, projection));
		}

		nearestX = startPoint.x + projection * segmentX;
		nearestY = startPoint.y + projection * segmentY;
		distanceX = cursorPoint.x - nearestX;
		distanceY = cursorPoint.y - nearestY;

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

	function nearestPointOnPolyline(svg, polyline, cursorPoint) {
		var points = getPolylinePoints(polyline);
		var curveScreenMatrix = polyline.getScreenCTM
			? polyline.getScreenCTM()
			: null;
		var svgScreenInverse = svg.getScreenCTM
			? svg.getScreenCTM().inverse()
			: null;
		var nearestPoint = null;
		var previousPoint;
		var segmentIndex;

		if (points.length < 2) {
			return null;
		}

		previousPoint = transformCurvePoint(
			svg,
			curveScreenMatrix,
			svgScreenInverse,
			points[0],
		);
		for (segmentIndex = 1; segmentIndex < points.length; segmentIndex += 1) {
			var currentPoint = transformCurvePoint(
				svg,
				curveScreenMatrix,
				svgScreenInverse,
				points[segmentIndex],
			);
			var point = nearestPointOnSegment(
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

	function nearestPointOnCircle(svg, circle, cursorPoint) {
		var center;
		var curveScreenMatrix = circle.getScreenCTM ? circle.getScreenCTM() : null;
		var distanceX;
		var distanceY;
		var svgScreenInverse = svg.getScreenCTM
			? svg.getScreenCTM().inverse()
			: null;

		center = transformCurvePoint(
			svg,
			curveScreenMatrix,
			svgScreenInverse,
			{
				x: parseFloat(circle.getAttribute("cx")),
				y: parseFloat(circle.getAttribute("cy")),
			},
		);
		if (!isFinite(center.x) || !isFinite(center.y)) {
			return null;
		}

		distanceX = cursorPoint.x - center.x;
		distanceY = cursorPoint.y - center.y;

		return {
			x: center.x,
			y: center.y,
			localX: center.localX,
			localY: center.localY,
			distanceSquared: distanceX * distanceX + distanceY * distanceY,
		};
	}

	function nearestPointOnCurve(svg, curve, cursorPoint) {
		var tagName = curve.tagName ? curve.tagName.toLowerCase() : "";

		if (tagName === "polyline") {
			return nearestPointOnPolyline(svg, curve, cursorPoint);
		}
		if (tagName === "circle") {
			return nearestPointOnCircle(svg, curve, cursorPoint);
		}

		return null;
	}

	function usablePaint(paint) {
		return (
			paint &&
			paint !== "none" &&
			paint !== "transparent" &&
			paint !== "rgba(0, 0, 0, 0)"
		);
	}

	function getCurveStrokeColor(curve) {
		var computedStyle = window.getComputedStyle
			? window.getComputedStyle(curve)
			: null;
		var styleStroke = computedStyle ? computedStyle.stroke : null;
		var styleFill = computedStyle ? computedStyle.fill : null;
		var attributeStroke = curve.getAttribute("stroke");
		var attributeFill = curve.getAttribute("fill");

		if (usablePaint(styleStroke)) {
			return styleStroke;
		}
		if (usablePaint(attributeStroke)) {
			return attributeStroke;
		}
		if (usablePaint(styleFill)) {
			return styleFill;
		}
		if (usablePaint(attributeFill)) {
			return attributeFill;
		}

		return "#d62728";
	}

	function clamp(value, minimum, maximum) {
		if (maximum < minimum) {
			return minimum;
		}

		return Math.max(minimum, Math.min(maximum, value));
	}

	function getSvgBounds(svg) {
		var height;
		var viewBox = svg.viewBox ? svg.viewBox.baseVal : null;
		var width;

		if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
			return {
				x: viewBox.x,
				y: viewBox.y,
				width: viewBox.width,
				height: viewBox.height,
			};
		}

		width = parseFloat(svg.getAttribute("width"));
		height = parseFloat(svg.getAttribute("height"));
		if (isFinite(width) && isFinite(height) && width > 0 && height > 0) {
			return {
				x: 0,
				y: 0,
				width: width,
				height: height,
			};
		}

		return {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};
	}

	function updateCoordinateCallout(readout, anchorPoint, svg) {
		var bounds = getSvgBounds(svg);
		var box;
		var calloutGapX = 20;
		var calloutGapY = 8;
		var horizontalDirection = 1;
		var height;
		var labelX;
		var labelY;
		var leaderEndX;
		var leaderEndY;
		var leaderJointX;
		var leaderStartX;
		var leaderStartY;
		var paddingX = 6;
		var paddingY = 4;
		var textOffsetX;
		var textOffsetY;
		var verticalDirection = -1;
		var width;
		var x;
		var y;

		labelX = parseFloat(readout.label.getAttribute("x"));
		labelY = parseFloat(readout.label.getAttribute("y"));
		try {
			box = readout.label.getBBox();
		} catch (error) {
			box = {
				x: labelX,
				y: labelY - 11,
				width: readout.label.textContent.length * 7,
				height: 14,
			};
		}

		textOffsetX = box.x - labelX;
		textOffsetY = box.y - labelY;
		width = box.width + 2 * paddingX;
		height = box.height + 2 * paddingY;
		if (
			bounds.width > 0 &&
			anchorPoint.x + calloutGapX + width > bounds.x + bounds.width
		) {
			horizontalDirection = -1;
		}
		if (bounds.height > 0 && anchorPoint.y - height < bounds.y) {
			verticalDirection = 1;
		}

		x =
			horizontalDirection > 0
				? anchorPoint.x + calloutGapX
				: anchorPoint.x - calloutGapX - width;
		y =
			verticalDirection < 0
				? anchorPoint.y - height
				: anchorPoint.y + calloutGapY;
		if (bounds.width > 0) {
			x = clamp(x, bounds.x, bounds.x + bounds.width - width);
		}
		if (bounds.height > 0) {
			y = clamp(y, bounds.y, bounds.y + bounds.height - height);
		}

		readout.label.setAttribute("x", x + paddingX - textOffsetX);
		readout.label.setAttribute("y", y + paddingY - textOffsetY);
		readout.labelBackground.setAttribute("x", x);
		readout.labelBackground.setAttribute("y", y);
		readout.labelBackground.setAttribute("width", width);
		readout.labelBackground.setAttribute("height", height);
		readout.labelOutline.setAttribute("x", x);
		readout.labelOutline.setAttribute("y", y);
		readout.labelOutline.setAttribute("width", width);
		readout.labelOutline.setAttribute("height", height);
		readout.labelAccent.setAttribute("x1", x);
		readout.labelAccent.setAttribute("x2", x + width);
		readout.labelAccent.setAttribute("y1", y);
		readout.labelAccent.setAttribute("y2", y);
		leaderStartX = anchorPoint.x + horizontalDirection * 4;
		leaderStartY = anchorPoint.y;
		leaderEndX = horizontalDirection > 0 ? x : x + width;
		leaderJointX = leaderEndX - horizontalDirection * 5;
		leaderEndY = y + (verticalDirection < 0 ? 0.62 : 0.38) * height;
		readout.labelLeader.setAttribute(
			"points",
			leaderStartX +
				"," +
				leaderStartY +
				" " +
				leaderJointX +
				"," +
				leaderEndY +
				" " +
				leaderEndX +
				"," +
				leaderEndY,
		);
	}

	function initializeCoordinateTool(svg) {
		var curves = svg.getElementsByClassName("wgx-curve");
		var mapScaleX;
		var mapOffsetX;
		var mapScaleY;
		var mapOffsetY;
		var readout = {
			marker: null,
			labelLeader: null,
			labelBackground: null,
			labelOutline: null,
			labelAccent: null,
			label: null,
		};

		if (curves.length === 0) {
			return;
		}

		mapScaleX = parseFloat(svg.getAttribute("data-mapax"));
		mapOffsetX = parseFloat(svg.getAttribute("data-mapbx"));
		mapScaleY = parseFloat(svg.getAttribute("data-mapay"));
		mapOffsetY = parseFloat(svg.getAttribute("data-mapby"));

		function handleMouseMove(event) {
			var cursorPoint = eventToSvgPoint(svg, event);
			var nearestPoint = null;
			var nearestCurve = null;
			var curveIndex;
			var curveColor;

			ensureCoordinateReadout(svg, readout);

			for (curveIndex = 0; curveIndex < curves.length; curveIndex += 1) {
				var curvePoint = nearestPointOnCurve(
					svg,
					curves[curveIndex],
					cursorPoint,
				);

				if (
					curvePoint !== null &&
					(nearestPoint === null ||
						curvePoint.distanceSquared < nearestPoint.distanceSquared)
				) {
					nearestPoint = curvePoint;
					nearestCurve = curves[curveIndex];
				}
			}

			if (nearestPoint === null) {
				hideCoordinateReadout(readout);
				return;
			}

			curveColor = getCurveStrokeColor(nearestCurve);

			readout.marker.setAttribute("cx", nearestPoint.x);
			readout.marker.setAttribute("cy", nearestPoint.y);
			readout.marker.setAttribute("fill", curveColor);
			readout.labelLeader.setAttribute("stroke", curveColor);
			readout.labelOutline.setAttribute("stroke", curveColor);
			readout.labelLeader.style.display = "inline";
			readout.labelBackground.style.display = "inline";
			readout.labelOutline.style.display = "inline";
			readout.labelAccent.style.display = "inline";

			readout.label.textContent =
				((nearestPoint.localX - mapOffsetX) / mapScaleX).toFixed(2) +
				", " +
				((nearestPoint.localY - mapOffsetY) / mapScaleY).toFixed(2);
			readout.label.setAttribute("x", nearestPoint.x + 26);
			readout.label.setAttribute("y", nearestPoint.y - 7);
			readout.label.style.display = "inline";
			updateCoordinateCallout(readout, nearestPoint, svg);
			svg.appendChild(readout.labelLeader);
			svg.appendChild(readout.labelBackground);
			svg.appendChild(readout.labelOutline);
			svg.appendChild(readout.labelAccent);
			svg.appendChild(readout.label);
			readout.marker.style.display = "inline";
			svg.appendChild(readout.marker);
		}

		svg.addEventListener("mousemove", handleMouseMove);
		svg.addEventListener("mouseleave", function () {
			hideCoordinateReadout(readout);
		});
	}

	window.wgxShowTooltip = showTooltip;
	window.wgxMoveTooltip = moveTooltip;
	window.wgxHideTooltip = hideTooltip;
	window.wgxSetStatus = setStatusText;
	window.wgxClearStatus = clearStatusText;
	window.wgxHoverOn = wgxHoverOn;
	window.wgxHoverOff = wgxHoverOff;
	window.wgxClickToggle = wgxClickToggle;

	if (ownerSvg) {
		window.addEventListener("load", function () {
			initializeCoordinateTool(ownerSvg);
		});
	}
})();
