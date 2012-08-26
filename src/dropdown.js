window.Dropdown = (function(window, document, $, undefined) {

	"use strict";

	var elements, current, fn;

	// function textColor(color) {
	// 	var yiq = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
	// 	return yiq >= 128 ? 'black' : 'white';
	// }

	function onClick(e) {
		var target = e.target;
		if (target === current) showAll();
		else switchTo(target);
	}

	function showAll() {
		_.each(elements, $.show);
	}

	function hideAll() {
		_.each(elements, $.hide);
	}

	function switchTo(element) {
		var index;
		if (_.isNumber(element)) {
			index = element;
			element = elements[element];
		} else {
			index = _.indexOf(elements, element);
		}
		current = element;
		hideAll();
		$.show(element);

		fn(index);
	}

	function Dropdown(parentNode, color, func) {

		// Allow the `new` operator to be missed
		if (!(this instanceof Dropdown)) {
			return new Dropdown(parentNode, color, func);
		}

		fn = func;

		this.elements = elements = [];

		this.element = current = $.createElement(parentNode, 'ul', '');
		this.element.className = settings.dropdownClass.slice(1);
		this.element.addEventListener('click', onClick, false);
		this.addOption(color);
	}

	Dropdown.prototype = {

		state : function() {
			return _.indexOf(element, elements);
		},
		
		addOption : function(color) {
			console.log('color', color);
			var element = $.createElement(this.element, 'li', '', {
				background : color
			});
			element.className = settings.dropdownChildClass.slice(1);
			this.elements.push(element);
			this.switchTo(element);
		},

		removeOption : function(index) {
			$.removeElement(this.elements[index]);
			this.elements.splice(index, 1);
		},

		switchTo : function(element) {
			switchTo(element);
		}

	};

	return Dropdown;

}(window, document, __$));
