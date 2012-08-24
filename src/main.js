(function(window, document, grab, $, Selection, undefined) {

	"use strict";

	var threshold = 2,
		lastHighlighter = null,
		extrapolatedClass = '.grab-extrapolated',
		confirmedClass = '.grab-confirmed',
		currentClass = '#grab-currentSelection',
		screenClass = '#grab-screen',
		removedClass = '.grab-removed',
		clipboardClass = '#grab-clipboard';
	
	var currentText = '';

	var Extrapolated = Selection(extrapolatedClass),
		Confirmed = Selection(confirmedClass);

	var Current = Highlighter(currentClass),
		Screen = Highlighter(screenClass); // Invisible div that prevents clicks
	
	control.addToggle('select', 'Stop', 'Select', Current.show, Current.hide, Current);
	control.addToggle('remove', 'Stop', 'Remove');
	control.addButton('Get Text', showText);
	control.addButton('Close', close);

	var text = control.addElement('textarea', '');
	
	var clipboard = $.createElement(document.body, 'textarea', '');
	clipboard.id = clipboardClass.slice(1);

	var dropdown = control.addDropdown();

	function close() {
		control.hide();
		Extrapolated.clear();
		Confirmed.clear();
	}

	function startAnalysis() {
		Extrapolated.clear();

		if (Confirmed.size() < threshold) return;

		var model = grab.toModel(grab.same(Confirmed.elements)),
			elements = grab.find(model),
			extrapolated = _.difference(elements, Confirmed.elements);

		_.each(extrapolated, Extrapolated.add, Extrapolated);
	}

	function validTarget(target) {
		return (control.isOn('select') || control.isOn('remove')) && 
				!control.isControl(target);
	}

	function onMouseDown(e) {
		var target = e.target;

		Screen.hide();
		if (!validTarget(target)) return;
		Screen.highlightElement(target);

		if (control.isOn('select')) Confirmed.add(target);
		else Confirmed.remove(target);

		startAnalysis();
	}

	function onMouseMove(e) {
		var target = e.target,
			highlighter;

		// Reset the color of the last element that was targeted for removal
		if (lastHighlighter) lastHighlighter.setIdentifier(confirmedClass);

		if (!validTarget(target)) return;

		if (control.isOn('select')) {
			Current.highlightElement(target);
		} else if (highlighter = Confirmed.has(target)) {
			Screen.hide();
			highlighter.setIdentifier(removedClass);
			lastHighlighter = highlighter;
		}
	}

	function onKeyDown(e) {
		var keyCode = e.keyCode;
		if (keyCode == 17 || keyCode == 91 || keyCode == 93) {
			clipboard.value = currentText;
			clipboard.select();
		}
	}

	function showText() {
		if (Confirmed.size() < threshold) return;
		var data = Confirmed.elements.concat(Extrapolated.elements);
			ordered = grab.order(data);
		currentText = text.value = grab.data(ordered);
	}

	function onResize() {
		Extrapolated.reHighlight();
		Confirmed.reHighlight();
	}

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);

	document.addEventListener('keydown', onKeyDown, false);

	window.addEventListener('resize', onResize, false);

}(window, document, __grab, __$, __Selection));
