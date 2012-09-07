/*globals grab Selection chrome control Dropdown Collection settings Highlighter*/

(function (window, document, grab, $, Selection, undefined) {

	"use strict";

	window.toggle = function () {
		control.toggleVisibility();
		if (!Selections.size()) return;
		Selections.clearAll();
		Screen.destroy();
		Current.destroy();
	};

	function deactivateOthers(name, state) {
		if (state) return;
		_.each(control.toggles, function (toggle) {
			if (toggle.state && toggle.name != name) {
				control.toggle(toggle.name);
			}
		});
	}

	function onSelect(index) {
		Current.setBorder(Options.currentCSS());
		Selections.setActive(index);
	}

	function addSelection() {
		Options.addOption();
		Selections.addSelection(Options.currentCSS());
	}

	function validTarget(target) {
		return _.any(validStates, control.isOn) && !control.isControl(target);
	}

	function onMouseDown(e) {
		var target = e.target;

		Screen.hide();
		if (!validTarget(target)) return;
		Screen.highlightElement(target);

		if (control.isOn('select')) {
			Selections.addElement(target);
		} else if (control.isOn('remove')) {
			Selections.removeElement(target) ||
			Selections.removeElement(target.parentNode) ||
			Selections.removeElement(target.parentNode.parentNode);
		} else {
			Selections.addNegative(target);
		}

		Selections.extrapolate();
	}

	function onMouseMove(e) {
		var Confirmed = Selections.Confirmed,
			target = e.target,
			highlighter = Confirmed.has(target) ||
							Confirmed.has(target.parentNode) ||
							Confirmed.has(target.parentNode.parentNode);

		// Reset the color of the last element that was targeted for removal
		if (lastHighlighter) {
			lastHighlighter.setIdentifier(settings.confirmedClass);
		}

		Negative.hide();

		if (!validTarget(target)) return;

		if (control.isOn('select')) {
			Current.highlightElement(target);
		} else if (control.isOn('remove')) {
			if (!highlighter) return;
			highlighter.setIdentifier(settings.removedClass);
			lastHighlighter = highlighter;
		} else {
			Negative.highlightElement(target);
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
		currentText = text.value = Selections.getAllText() || '';
	}

	var lastHighlighter = null,
		validStates = ['select', 'remove', 'negative'],
		currentText = '',
		currentColor = Dropdown.toCSSColor(settings.initialColor);
	
	var Selections = Collection(currentColor);

	var Current = Highlighter(settings.currentClass),
		Negative = Highlighter(settings.removedClass),
		Screen = Highlighter(settings.screenClass); // Invisible div that prevents clicks
	
	Current.setBorder(currentColor);
	
	control
		.addToggle('select', 'Stop', 'Select', Current.show, Current.hide, Current)
		.addToggle('remove', 'Stop', 'Remove')
		.addToggle('negative', 'Stop', 'Negative')
		.addButton('Get Text', showText)
		.addButton('Add selection', addSelection)
		.addButton('Close', toggle)
		.onToggle(deactivateOthers);

	var text = control.addElement('textarea', ''),
		Options = control.addDropdown(settings.initialColor, onSelect);

	var reHighlight = _.bindAll(Selections, 'reHighlight'),
		registerUnload = function () { chrome.extension.sendMessage(''); };
	
	var clipboard = $.createElement(document.body, 'textarea', '');
	clipboard.id = settings.clipboardClass.slice(1);

	$.listen('mousedown', onMouseDown);
	$.listen('mousemove', onMouseMove);
	$.listen('keydown', onKeyDown);
	$.listen(window, 'resize', reHighlight);
	$.listen(window, 'unload', registerUnload);

}(window, document, grab, $, Selection));
