window.Highlighter = (function(window, document, $, undefined) {

	"use strict";

	function Highlighter(identifier, element) {
		this.element = $.createElement(document.body, 'div');
		this.highlighting = null;

		if (element) this.highlightElement(element);

		if (identifier[0] == '.') this.element.className = identifier.slice(1);
		else this.element.id = identifier.slice(1);
	}

	Highlighter.prototype = {
		
		hide : function() {
			$.css(this.element, { display : 'none' });
		},

		show : function() {
			$.css(this.element, { display : 'block' });
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
		}

	};

	return Highlighter;
	
}(window, document, __$));
