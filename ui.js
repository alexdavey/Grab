(function(window, document, grab, $, undefined) {

	"use strict";

	var tracking = false,
		confirmedElements = [],
		extrapolatedElements = [],
		selectedElements = [];

	function startTracking() {
		tracking = true;
		document.addEventListener('mousemove', function(e) {
			if (tracking) Selection.highlightElement(e.target);
		}, false);
	}

	function stopTracking() {
		tracking = false;
		Selection.hide();
	}

	function startAnalysis() {
		var model = grab.toModel(grab.same(selectedElements)),
			elements = grab.find(model);

		console.log(model);
		console.log(elements);

		for (var i = 0, l = elements.length; i < l; i++) {
			if (!_.contains(confirmedElements, elements[i])) {
				addExtrapolation(elements[i]);
			}
		}
	}

	function isMenuElement(target) {
		return target === controls || target === add || 
			target === remove || target === analyse;
	}

	function addElement(element) {
		var Selected = new Highlighter('.grab-selected');
		selectedElements.push(element);
		Selected.highlightElement(element);
		confirmedElements.push(Selected);
	}

	function addExtrapolation(element) {
		var Selected = new Highlighter('.grab-extrapolated');
		Selected.highlightElement(element);
		extrapolatedElements.push(Selected);
	}

	var Selection = new Highlighter('#grab-currentSelection'),
		controls = $.createElement(document.body, 'div'),
		addControl = _.bind($.createElement, $, controls, 'button');

	var add = addControl('add'),
		remove = addControl('remove'),
		analyse = addControl('analyse');
	
	controls.id = 'grab-controls';

	add.addEventListener('click', startTracking, false);
	remove.addEventListener('click', stopTracking, false);
	analyse.addEventListener('click', startAnalysis, false);

	document.addEventListener('mousedown', function(e) {
		if (tracking && !isMenuElement(e.target)) addElement(e.target);
	}, false);

}(window, document, __grab, __$));
