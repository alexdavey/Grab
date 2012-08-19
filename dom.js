(function() {
	
	"use strict";

	var _$ = window.$;

	var $ = window.$ = {
		
		css : function(element, styles) {
			_.each(styles, function(value, key) {
				element.style[key] = _.isNumber(value) ? value + 'px' : value;
			});
		},

		createElement : function(parentNode, name, text, styles) {
			if (!_.isString(text)) {
				styles = text;
				text = '';
			}
			var element = document.createElement(name);
			$.css(element, styles || {});
			element.innerText = text;
			parentNode.appendChild(element);
			return element;
		}

	};

}());
