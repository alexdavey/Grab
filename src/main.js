/*globals grab Selection chrome control Dropdown Collection settings Highlighter Popup*/

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
		
		Overlay.hide();
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
		if (keyCode == 17 || keyCode == 91) {
			modifierDown = true;
			clipboard.select();
		} else if (keyCode == 67 && modifierDown) {
			Overlay.setText(settings.copiedMessage);
		}
	}

	function onKeyUp(e) {
		if (e.keyCode == 17 || e.keyCode == 91) modifierDown = false;
	}

	function showText() {
		clipboard.value = Selections.getAllText() || '';
		Overlay.setText(settings.copyMessage);
	}

	var lastHighlighter = null,
		validStates = ['select', 'remove', 'negative'],
		currentColor = Dropdown.toCSSColor(settings.initialColor);
	
	var modifierDown = false;
	
	var Selections = Collection(currentColor);

	var Current = Highlighter(settings.currentClass),
		Negative = Highlighter(settings.removedClass),
		Screen = Highlighter(settings.screenClass); // Invisible div that prevents clicks
	
	Current.setBorder(currentColor);
	
	control.addToggle('select', 'Stop', 'Select', Current.show, Current.hide, Current);
	control.addToggle('remove', 'Stop', 'Remove');
	control.addToggle('negative', 'Stop', 'Negative');
	control.addButton('Get Text', showText);
	control.addButton('Add selection', addSelection);
	control.addButton('Close', window.toggle);
	control.onToggle(deactivateOthers);

	// var text = control.addElement('textarea', '');
	var	Options = control.addDropdown(settings.initialColor, onSelect),
		Overlay = Popup('').hide();

	var reHighlight = _.bindAll(Selections, 'reHighlight'),
		registerUnload = function () { chrome.extension.sendMessage(''); };
	
	var clipboard = $.createElement(document.body, 'textarea', '');
	clipboard.id = settings.clipboardClass.slice(1);

	$.listen('mousedown', onMouseDown);
	$.listen('mousemove', onMouseMove);
	$.listen('keydown', onKeyDown);
	$.listen('keyup', onKeyUp);
	$.listen(window, 'resize', reHighlight);
	$.listen(window, 'unload', registerUnload);

}(window, document, grab, $, Selection));
