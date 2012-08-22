(function(window, document, grab, $, Selection, undefined) {

	"use strict";
	
	function startAnalysis() {
		var model = grab.toModel(grab.same(Confirmed.elements)),
			elements = grab.find(model),
			extrapolated = _.difference(elements, Confirmed.elements);

		Extrapolated.clear();
		_.each(extrapolated, Extrapolated.add, Extrapolated);
	}

	function onMouseDown(e) {
		var target = e.target;
		if (!control.isOn('select') || control.isControl(target)) return;
		Screen.highlightElement(target);
		Confirmed.add(target);
		if (Confirmed.size() > 2) startAnalysis();
	}

	function onMouseMove(e) {
		var target = e.target;
		if (control.isOn('select') && !control.isControl(target)) {
			console.log(target);
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

	var Extrapolated = new Selection('.grab-extrapolated'),
		Confirmed = new Selection('.grab-confirmed');

	var Current = new Highlighter('#grab-currentSelection'),
		Screen = new Highlighter('#grab-screen');
	
	var select = control.addToggle('select', 'Stop', 'Select', 
			Current.show, Current.hide, Current);

	var getText = control.addButton('Get Text', showText),
		text = control.addElement('textarea', '');

	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('resize', onResize, false);

}(window, document, __grab, __$, __Selection));
