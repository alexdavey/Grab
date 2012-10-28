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

	function hasOrIsChildElement(collection, target) {
		var depth = settings.bubbleDepth;
		while (!collection.has(target)) {
			if (depth-- < 0 || target === null) return false;
			target = target.parentNode;
		}
		return target;
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
		var target = e.target,
			node;
		
		Overlay.hide();
		Screen.hide();
		if (!validTarget(target)) return;
		Screen.highlightElement(target);

		if (control.isOn('select')) {
			Selections.addElement(target);
		} else {
			node = hasOrIsChildElement(Selections, target);
			if (node) Selections.removeElement(node);
			else Selections.addNegative(target);
		}

		Selections.extrapolate();
	}

	function onMouseMove(e) {
		var Confirmed = Selections.Confirmed,
			target = e.target,
			highlighter = hasOrIsChildElement(Confirmed, target);

		// Reset the color of the last element that was targeted for removal
		if (lastHighlighter) {
			lastHighlighter.setIdentifier(settings.confirmedClass);
		}

		Negative.hide();

		if (!validTarget(target)) return;

		if (control.isOn('select')) {
			Current.highlightElement(target);
		} else if (!highlighter) {
			Negative.highlightElement(target);
		} else {
			highlighter = Confirmed.has(highlighter);
			highlighter.setIdentifier(settings.removedClass);
			lastHighlighter = highlighter;
		}
	}

	function onKeyDown(e) {
		var keyCode = e.keyCode;
		if (keyCode == 17 || keyCode == 91) {
			modifierDown = true;
			clipboard.select();
		} else if (keyCode == 67 && modifierDown) {
			Overlay.setText(settings.copiedMessage);
		} else if (keyCode == 27) {
			control.setAll('off');
			Negative.hide();
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
		validStates = ['select', 'remove'],
		currentColor = Dropdown.toCSSColor(settings.initialColor);
	
	var modifierDown = false;
	
	var Selections = Collection(currentColor);

	var Current = Highlighter(settings.currentClass),
		Negative = Highlighter(settings.removedClass),
		Screen = Highlighter(settings.screenClass); // Div prevents clicks
	
	Current.setBorder(currentColor);
	
	control.addToggle('select', 'Stop', 'Select', Current.show, Current.hide, Current);
	control.addToggle('remove', 'Stop', 'Remove');
	control.addButton('Get Text', showText);
	control.addButton('Add selection', addSelection);
	control.addButton('Close', window.toggle);
	control.onToggle(_.bind(control.setAll, null, 'off'));

	// var text = control.addElement('textarea', '');
	var	Options = control.addDropdown(settings.initialColor, onSelect),
		Overlay = Popup('').hide();
	
	var clipboard = $.createElement(document.body, 'textarea', '');
	clipboard.id = settings.clipboardClass.slice(1);

	$.listen('mousedown', onMouseDown);
	$.listen('mousemove', onMouseMove);
	$.listen('keydown', onKeyDown);
	$.listen('keyup', onKeyUp);
	$.listen(window, 'resize', _.bind(Selections.reHighlight, Selections));
	$.listen(window, 'unload', function () { chrome.extension.sendMessage(''); });

}(window, document, grab, $, Selection));
