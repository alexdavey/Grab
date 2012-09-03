window.Highlighter = (function (window, document, $, undefined) {

	"use strict";

	function Highlighter(identifier, element, border) {

		// Allow the `new` operator to be missed
		if (!(this instanceof Highlighter)) {
			return new Highlighter(identifier, element, border);
		}

		this.element = $.createElement(document.body, 'div');
		this.highlighting = null;

		if (!border && _.isString(element)) border = element;
		this.setBorder(border);

		if (element) this.highlightElement(element);
		this.setIdentifier(identifier);
	}

	Highlighter.prototype = {
		
		hide : function () {
			$.hide(this.element);
		},

		show : function () {
			$.show(this.element);
		},

		highlightElement : function (element) {
			var box = element.getBoundingClientRect();
			this.highlighting = element;
			this.show();
			$.css(this.element, {
				left : box.left + window.pageXOffset,
				top : box.top + window.pageYOffset,
				width : box.width,
				height : box.height
			});
		},

		// Recalculate the position of the element (usually called when css
		// is recalculated upon window resize)
		reHighlight : function () {
			this.highlightElement(this.highlighting);
		},

		destroy : function () {
			$.removeElement(this.element);
		},

		// Set either class or id based on a '.' or a '#' prefix respectively
		setIdentifier : function (identifier) {
			if (identifier[0] == '.') this.element.className = identifier.slice(1);
			else this.element.id = identifier.slice(1);
		},

		setBorder : function (color) {
			$.css(this.element, { 'border-color' : color });
		}

	};

	return Highlighter;
	
}(window, document, $));
