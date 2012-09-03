/*globals settings */

window.Dropdown = (function (window, document, $, undefined) {

	"use strict";

	var elements, current, currentIndex, fn;

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

		var similar = _.all(colors, function (color) {
			return similarity(randomColor, color) < threshold;
		});

		return similar ? newColor(colors) : randomColor;
	}

	function toCSSColor(color) {
		return 'rgb(' + color.r  + ', ' + color.g + ', ' + color.b + ')';
	}

	function onClick(e) {
		if (e.target === current) _.each(elements, $.show);
		else switchTo(e.target);
	}

	function switchTo(element) {
		var index = _.indexOf(elements, element);
		current = element;
		currentIndex = index;
		_.each(elements, $.hide);
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

		// Hack to prevent first addOption() from firing a switchTo callback
		fn = function () { };
		this.addOption(color);
		fn = func;
	}

	Dropdown.prototype = {

		state : function () {
			return _.indexOf(current, elements);
		},
		
		addOption : function (color) {
			if (!color) color = newColor(this.colors);
			var css = toCSSColor(color),
				element = $.createElement(this.element, 'li', '', {
					background : css
				});

			element.className = settings.dropdownChildClass.slice(1);
			this.elements.push(element);

			this.colors.push(color);
			this.styles.push(css);

			switchTo(element);
		},

		removeOption : function (index) {
			$.removeElement(this.elements[index]);
			this.elements.splice(index, 1);
		},

		currentCSS : function () {
			return this.styles[currentIndex];
		},

		currentColor : function () {
			return this.colors[currentIndex];
		}

	};

	Dropdown.toCSSColor = toCSSColor;

	return Dropdown;

}(window, document, $));
