/*globals grab Selection control Dropdown Collection settings Highlighter*/

(function (window, document, grab, $, Selection, undefined) {

	"use strict";

	function onSelect(index) {
		Current.setBorder(Options.currentCSS());
		Selections.setActive(index);
	}

	function addSelection() {
		Options.addOption();
		Selections.addSelection(Options.currentCSS());
	}

	function close() {
		control.hide();
		Selections.clear();
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

		if (control.isOn('select')) Selections.addElement(target);
		else Selections.removeElement(target);

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
		} else if (highlighter = Selections.Confirmed.has(target)) {
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
		currentText = text.value = Selections.getText() || '';
	}

	var lastHighlighter = null;
	
	var currentText = '',
		currentColor = Dropdown.toCSSColor(settings.initialColor);
	
	var Selections = Collection(currentColor);

	var Current = Highlighter(settings.currentClass),
		Screen = Highlighter(settings.screenClass); // Invisible div that prevents clicks
	
	control.addToggle('select', 'Stop', 'Select', Current.show, Current.hide, Current);
	control.addToggle('remove', 'Stop', 'Remove');
	control.addButton('Get Text', showText);
	control.addButton('Add selection', addSelection);
	control.addButton('Close', close);

	var text = control.addElement('textarea', '');
	
	var clipboard = $.createElement(document.body, 'textarea', '');
	clipboard.id = settings.clipboardClass.slice(1);

	var Options = control.addDropdown(settings.initialColor, onSelect);

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);

	document.addEventListener('keydown', onKeyDown, false);

	window.addEventListener('resize', _.bind(Selections.reHighlight, Selections), false);

}(window, document, grab, $, Selection));
