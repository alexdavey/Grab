(function(window, document, grab, $, Selection, undefined) {

	"use strict";

	function similarity(a, b) {
		var dR = Math.abs(a.r - b.r),
			dG = Math.abs(a.g - b.g),
			dB = Math.abs(a.b - b.b);
		return dR + dG + dB;
	}

	function newColor(colors) {
		var threshold = settings.similarityThreshold,
			randomColor = {
				r : Math.floor(Math.random() * 255),
				g : Math.floor(Math.random() * 255),
				b : Math.floor(Math.random() * 255)
			};

		var similar = _.all(colors, function(color) {
			return similarity(randomColor, color) < threshold;
		});

		return similar ? newColor(colors) : randomColor;
	}

	function toCSSColor(color) {
		return 'rgb(' + color.r  + ', ' + color.g + ', ' + color.b + ')';
	}

	var lastHighlighter = null;
	
	var currentText = '',
		currentColor = toCSSColor(settings.initialColor);
	
	var colors = [];

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

	colors.push(settings.initialColor);

	var Dropdown = control.addDropdown(currentColor, onSelect);

	function onSelect(index) {
		Current.setBorder(toCSSColor(colors[index] || settings.initalColor));
		Selections.setActive(index);
	}

	function addSelection() {
		var color = newColor(colors),
			css = toCSSColor(color);
		colors.push(color);
		Selections.addSelection(css);
		Dropdown.addOption(css);
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

	function onResize() {
		Selections.reHighlight();
	}

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);

	document.addEventListener('keydown', onKeyDown, false);

	window.addEventListener('resize', onResize, false);

}(window, document, __grab, __$, __Selection));
