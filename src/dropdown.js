window.Dropdown = (function(window, document, $, undefined) {

	"use strict";

	var elements, current, fn;

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

		this.elements = elements = [];
		this.colors = [];
		this.styles = [];

		this.element = current = $.createElement(parentNode, 'ul', '');
		this.element.className = settings.dropdownClass.slice(1);
		this.element.addEventListener('click', onClick, false);

		fn = function() { };
		this.addOption(color);
		fn = func;
	}

	Dropdown.prototype = {

		state : function() {
			return _.indexOf(current, elements);
		},
		
		addOption : function(color) {
			if (!color) color = newColor(this.colors);
			var css = toCSSColor(color),
				element = $.createElement(this.element, 'li', '', {
					background : css
				});

			element.className = settings.dropdownChildClass.slice(1);
			this.elements.push(element);

			this.colors.push(color);
			this.styles.push(css);

			this.switchTo(element);
		},

		removeOption : function(index) {
			$.removeElement(this.elements[index]);
			this.elements.splice(index, 1);
		},

		currentCSS : function() {
			return this.styles[this.state()];
		},

		currentColor : function() {
			return this.colors[this.state()];
		},

		switchTo : switchTo,

	};

	Dropdown.toCSSColor = toCSSColor;

	return Dropdown;

}(window, document, __$));
