(function(window, document, grab, undefined) {

	"use strict";

	var tracking = false,
		selectedElements = [];

	function highlightElement(e) {
		var target = e.target,
			box = target.getBoundingClientRect();
		$.css(selection, { 
			display : 'block',
			top : box.top + window.pageYOffset,
			left : box.left + window.pageXOffset,
			width : box.width,
			height : box.height
		});
	}

	function startTracking() {
		tracking = true;
		document.addEventListener('mousemove', highlightElement, false);
	}

	function stopTracking() {
		tracking = false;
		$.css(selection, { display : 'hidden' });
		document.removeEventListener('mousemove', highlightElement);
	}

	function startAnalysis() {
		var model = grab.toModel(grab.same(selectedElements));
		console.log(model);
		console.log(grab.find(model));
	}

	function isMenuElement(target) {
		return target === controls || target === add || 
			target === remove || target === analyse;
	}

	var controls = $.createElement(document.body, 'div'),
		selection = $.createElement(document.body, 'div');

	var addControl = _.bind($.createElement, $, controls, 'button');

	var add = addControl('add'),
		remove = addControl('remove'),
		analyse = addControl('analyse');
	
	controls.id = 'grab-controls';
	selection.id = 'grab-currentSelection';

	add.addEventListener('click', startTracking, false);
	remove.addEventListener('click', stopTracking, false);
	analyse.addEventListener('click', startAnalysis, false);

	document.addEventListener('mousedown', function(e) {
		var target = e.target;
		if (!tracking || isMenuElement(e.target)) return;
		selectedElements.push(target);
	}, false);

}(window, document, __grab));
