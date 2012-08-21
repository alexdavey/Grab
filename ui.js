(function(window, document, grab, $, undefined) {

	"use strict";

	var tracking = false,
		confirmedElements = [],
		extrapolatedElements = [],
		selectedElements = [];

	function toggleTracking() {
		if (tracking) {
			add.innerText = 'Add';
			Selection.hide();
		} else {
			add.innerText = 'Stop';
			Selection.show();
		}
		tracking = !tracking;
	}

	function startAnalysis() {
		var model = grab.toModel(grab.same(selectedElements)),
			elements = grab.find(model),
			extrapolated = _.difference(elements, selectedElements);

		clearSelection(extrapolatedElements);

		_.each(extrapolated, addExtrapolation);
	}

	function isMenuElement(target) {
		return target === controls || target === add || 
			target === remove || target === analyse;
	}

	function addElement(element) {
		var Selected = new Highlighter('.grab-selected', element);
		selectedElements.push(element);
		confirmedElements.push(Selected);

		if (confirmedElements.length > 2) startAnalysis();
	}

	function addExtrapolation(element) {
		var Selected = new Highlighter('.grab-extrapolated', element);
		extrapolatedElements.push(Selected);
	}

	function clearSelection(selection) {
		_.invoke(selection, 'destroy');
		selection = [];
	}

	var Selection = new Highlighter('#grab-currentSelection'),
		controls = $.createElement(document.body, 'div'),
		addControl = _.bind($.createElement, $, controls, 'button');

	var add = addControl('Add'),
		remove = addControl('Remove'),
		analyse = addControl('Analyse');
	
	controls.id = 'grab-controls';

	add.addEventListener('click', toggleTracking, false);
	remove.addEventListener('click', toggleTracking, false);
	analyse.addEventListener('click', startAnalysis, false);

	document.addEventListener('mousedown', function(e) {
		if (!tracking || isMenuElement(e.target)) return;
		addElement(e.target);
		e.preventDefault();
	}, false);

	document.addEventListener('mousemove', function(e) {
		if (tracking) Selection.highlightElement(e.target);
	}, false);

}(window, document, __grab, __$));
