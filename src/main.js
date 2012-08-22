(function(window, document, grab, $, Selection, undefined) {

	"use strict";
	
	function startAnalysis() {
		Extrapolated.clear();
		if (Confirmed.size() < threshold) return;
		var model = grab.toModel(grab.same(Confirmed.elements)),
			elements = grab.find(model),
			extrapolated = _.difference(elements, Confirmed.elements);

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
		} else {
			Confirmed.remove(target);
		}
		startAnalysis();
	}

	function onMouseMove(e) {
		var target = e.target,
			highlighter;
		if (lastHighlighter) lastHighlighter.setIdentifier(confirmedClass);
		if (!validTarget(target)) return;
		if (control.isOn('select')) {
			Current.highlightElement(target);
		} else if (highlighter = Confirmed.has(target)) {
			highlighter.setIdentifier(removedClass);
			lastHighlighter = highlighter;
		}
	}

	function onMouseUp(e) {
		Screen.hide();
	}

	function showText() {
		if (Confirmed.size() < threshold) return;
		var data = Confirmed.elements.concat(Extrapolated.elements);
		text.value = grab.data(data);
	}

	function onResize() {
		Extrapolated.reHighlight();
		Confirmed.reHighlight();
	}

	var threshold = 2,
		lastHighlighter = null,
		extrapolatedClass = '.grab-extrapolated',
		confirmedClass = '.grab-confirmed',
		currentClass = '#grab-currentSelection',
		screenClass = '#grab-screen',
		removedClass = '.grab-removed';

	var Extrapolated = Selection(extrapolatedClass),
		Confirmed = Selection(confirmedClass);

	var Current = Highlighter(currentClass),
		Screen = Highlighter(screenClass);
	
	var select = control.addToggle('select', 'Stop', 'Select', 
			Current.show, Current.hide, Current);

	var remove = control.addToggle('remove', 'Stop', 'Remove');

	var getText = control.addButton('Get Text', showText),
		text = control.addElement('textarea', '');

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('mouseup', onMouseUp, false);
	window.addEventListener('resize', onResize, false);

}(window, document, __grab, __$, __Selection));
