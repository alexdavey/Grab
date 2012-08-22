window.Highlighter = (function(window, document, $, undefined) {

	"use strict";

	function Highlighter(identifier, element) {
		this.element = $.createElement(document.body, 'div');
		this.highlighting = null;

		if (element) this.highlightElement(element);
		this.setIdentifier(identifier);
	}

	Highlighter.prototype = {
		
		hide : function() {
			$.hide(this.element);
		},

		show : function() {
			$.show(this.element);
		},

		highlightElement : function(element) {
			var box = element.getBoundingClientRect();
			this.highlighting = element;
			$.css(this.element, {
				left : box.left + window.pageXOffset,
				top : box.top + window.pageYOffset,
				width : box.width,
				height : box.height
			});
		},

		reHighlight : function() {
			this.highlightElement(this.highlighting);
		},

		destroy : function() {
			$.removeElement(this.element);
		},

		setIdentifier : function(identifier) {
			if (identifier[0] == '.') this.element.className = identifier.slice(1);
			else this.element.id = identifier.slice(1);
		}

	};

	return Highlighter;
	
}(window, document, __$));
