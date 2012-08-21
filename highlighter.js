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
			$.css(this.element, { display : 'hidden' });
		},

		show : function() {
			$.css(this.element, { display : 'block' });
		},

		move :  function(x, y, width, height) {
			$.css(this.element, {
				top : y,
				left : x,
				width : width,
				height : height
			});
		},

		highlightElement : function(element) {
			var box = element.getBoundingClientRect();
			this.highlighting = element;
			this.move(
				box.left + window.pageXOffset,
				box.top + window.pageYOffset,
				box.width,
				box.height
			);
		}

	};

	return Highlighter;
	
}(window, document, __$));
