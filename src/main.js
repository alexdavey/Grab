(function(window, document, grab, $, Selection, undefined) {

	"use strict";
	
	function startAnalysis() {
		var model = grab.toModel(grab.same(Confirmed.elements)),
			elements = grab.find(model),
			extrapolated = _.difference(elements, Confirmed.elements);

		Extrapolated.clear();
		_.each(extrapolated, Extrapolated.add, Extrapolated);
	}

	function validTarget(target) {
		return (control.isOn('select') || control.isOn('remove'))
				&& !control.isControl(target);
	}

	function onMouseDown(e) {
		var target = e.target;
		if (!validTarget(target)) return;
		if (control.isOn('select')) {
			Screen.highlightElement(target);
			Confirmed.add(target);
			if (Confirmed.size() >= threshold) startAnalysis();
		} else {
			Confirmed.remove(target);
		}
	}

	function onMouseMove(e) {
		var target = e.target,
			highlighter;
		console.log(Confirmed);
		if (lastHighlighter) lastHighlighter.setIdentifier('.grab-confirmed');
		if (!validTarget(target)) return;
		if (control.isOn('select')) {
			Current.highlightElement(target);
		} else if (highlighter = Confirmed.has(target)) {
			highlighter.setIdentifier('.grab-removed');
			lastHighlighter = highlighter;
		}
	}

	function showText() {
		if (Confirmed.size() < threshold) return;
		var data = Confirmed.elements.concat(Extrapolated.elements);
		text.value = grab.data(data);
	}

	function onResize() {
		Current.reHighlight();
		Screen.reHighlight();
		Extrapolated.reHighlight();
		Confirmed.reHighlight();
	}

	var threshold = 2,
		lastHighlighter = null;

	var Extrapolated = new Selection('.grab-extrapolated'),
		Confirmed = new Selection('.grab-confirmed');

	var Current = new Highlighter('#grab-currentSelection'),
		Screen = new Highlighter('#grab-screen');
	
	var select = control.addToggle('select', 'Stop', 'Select', 
			Current.show, Current.hide, Current);

	var remove = control.addToggle('remove', 'Stop', 'Remove');

	var getText = control.addButton('Get Text', showText),
		text = control.addElement('textarea', '');

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('resize', onResize, false);

}(window, document, __grab, __$, __Selection));
