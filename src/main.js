(function(window, document, grab, $, Selection, undefined) {

	"use strict";

	var lastHighlighter = null;
	
	var currentText = '';

	var Selections = Collection();

	// var Extrapolated = Selection(extrapolatedClass),
	// 	Confirmed = Selection(confirmedClass);

	var Current = Highlighter(settings.currentClass),
		Screen = Highlighter(settings.screenClass); // Invisible div that prevents clicks
	
	control.addToggle('select', 'Stop', 'Select', Current.show, Current.hide, Current);
	control.addToggle('remove', 'Stop', 'Remove');
	control.addButton('Get Text', showText);
	control.addButton('Close', close);

	var text = control.addElement('textarea', '');
	
	var clipboard = $.createElement(document.body, 'textarea', '');
	clipboard.id = settings.clipboardClass.slice(1);

	var dropdown = control.addDropdown();

	function close() {
		control.hide();
		Selections.clear();
		// Extrapolated.clear();
		// Confirmed.clear();
	}

	// function startAnalysis() {
	// 	Extrapolated.clear();

	// 	if (Confirmed.size() < threshold) return;

	// 	var model = grab.toModel(grab.same(Confirmed.elements)),
	// 		elements = grab.find(model),
	// 		extrapolated = _.difference(elements, Confirmed.elements);

	// 	_.each(extrapolated, Extrapolated.add, Extrapolated);
	// }

	function validTarget(target) {
		return (control.isOn('select') || control.isOn('remove')) && 
				!control.isControl(target);
	}

	function onMouseDown(e) {
		var target = e.target;

		Screen.hide();
		if (!validTarget(target)) return;
		Screen.highlightElement(target);

		if (control.isOn('select')) Selections.addElement(target);
		else Selections.removeElement(target);

		// startAnalysis();
		Selections.extrapolate();
	}

	function onMouseMove(e) {
		var target = e.target,
			highlighter;

		// Reset the color of the last element that was targeted for removal
		if (lastHighlighter) {
			lastHighlighter.setIdentifier(settings.confirmedClass);
		}

		if (!validTarget(target)) return;

		if (control.isOn('select')) {
			Current.highlightElement(target);
		} else if (highlighter = Selections.getConfirmed().has(target)) {
			Screen.hide();
			highlighter.setIdentifier(settings.removedClass);
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
	// 	if (Confirmed.size() < threshold) return;
	// 	var data = Confirmed.elements.concat(Extrapolated.elements);
	// 		ordered = grab.order(data);
		currentText = text.value = Selections.getText();
	}

	// function onResize() {
	// 	Extrapolated.reHighlight();
	// 	Confirmed.reHighlight();
	// }
	
	function onResize() {
		Selections.reHighlight();
	}

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);

	document.addEventListener('keydown', onKeyDown, false);

	window.addEventListener('resize', onResize, false);

}(window, document, __grab, __$, __Selection));
