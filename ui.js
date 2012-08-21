(function(window, document, grab, $, Selection, undefined) {

	"use strict";

	function toggleTracking() {
		if (tracking) {
			add.innerText = 'Add';
			Current.hide();
		} else {
			add.innerText = 'Stop';
			Current.show();
		}
		tracking = !tracking;
	}

	function startAnalysis() {
		var model = grab.toModel(grab.same(Confirmed.elements)),
			elements = grab.find(model),
			extrapolated = _.difference(elements, Confirmed.elements);

		Extrapolated.clear();
		_.each(extrapolated, Extrapolated.add, Extrapolated);
	}

	function isMenuElement(target) {
		return target === controls || target === add || 
			target === remove || target === analyse;
	}

	function onMouseDown(e) {
		if (!tracking || isMenuElement(e.target)) return;
		Confirmed.add(e.target);
		e.preventDefault();
		if (Confirmed.size() > 2) startAnalysis();
	}

	function onMouseMove(e) {
		if (tracking) Current.highlightElement(e.target);
	}

	var tracking = false,
		Extrapolated = new Selection('.grab-extrapolated'),
		Confirmed = new Selection('.grab-confirmed');

	var Current = new Highlighter('#grab-currentSelection'),
		controls = $.createElement(document.body, 'div'),
		addControl = _.bind($.createElement, $, controls, 'button');

	var add = addControl('Add'),
		remove = addControl('Remove'),
		analyse = addControl('Analyse');
	
	controls.id = 'grab-controls';

	add.addEventListener('click', toggleTracking, false);
	remove.addEventListener('click', toggleTracking, false);
	analyse.addEventListener('click', startAnalysis, false);

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);

}(window, document, __grab, __$, __Selection));
