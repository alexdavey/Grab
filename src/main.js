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

	function toggleRemoval() {
		
	}

	function startAnalysis() {
		var model = grab.toModel(grab.same(Confirmed.elements)),
			elements = grab.find(model),
			extrapolated = _.difference(elements, Confirmed.elements);

		Extrapolated.clear();
		_.each(extrapolated, Extrapolated.add, Extrapolated);
	}

	function isClickable(target) {
		return target !== controls && target !== add && 
			target !== getText && /* target !== analyse && */
			target !== text && target !== document.body;
	}

	function onMouseDown(e) {
		var target = e.target;
		if (!tracking || !isClickable(target)) return;
		Screen.highlightElement(target);
		Confirmed.add(target);
		if (Confirmed.size() > 2) startAnalysis();
	}

	function onMouseMove(e) {
		var target = e.target;
		if (tracking && isClickable(target)) {
			Current.highlightElement(target);
		}
	}

	function showText() {
		if (Confirmed.size() < 3) return;
		var data = Confirmed.elements.concat(Extrapolated.elements);
		text.value = grab.data(data);
	}

	function onResize() {
		Current.reHighlight();
		Screen.reHighlight();
		Extrapolated.reHighlight();
		Confirmed.reHighlight();
	}

	var tracking = false,
		Extrapolated = new Selection('.grab-extrapolated'),
		Confirmed = new Selection('.grab-confirmed');

	var Current = new Highlighter('#grab-currentSelection'),
		Screen = new Highlighter('#grab-screen'),
		controls = $.createElement(document.body, 'div'),
		text = $.createElement(controls, 'textarea');

	var addControl = _.bind($.createElement, $, controls, 'button');

	var add = addControl('Add'),
		getText = addControl('Get Text');
		// analyse = addControl('Analyse');
	
	controls.id = 'grab-controls';

	add.addEventListener('click', toggleTracking, false);
	getText.addEventListener('click', showText, false);

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('resize', onResize, false);

}(window, document, __grab, __$, __Selection));
