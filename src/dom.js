(function (window, document, undefined) {
	
	"use strict";

	var $ = window.$ = {
		
		css : function (element, styles) {
			_.each(styles, function (value, key) {
				element.style[key] = _.isNumber(value) ? value + 'px' : value;
			});
		},

		hide : function (element) {
			$.css(element, { display : 'none' });
		},

		show : function (element) {
			$.css(element, { display : 'block' });
		},

		createElement : function (parentNode, name, text, styles) {
			if (!_.isString(text)) {
				styles = text;
				text = '';
			}
			var element = document.createElement(name);
			$.css(element, styles || {});
			element.innerText = text;
			parentNode.appendChild(element);
			return element;
		},

		removeElement : function (element) {
			element.parentNode.removeChild(element);
		},

		getClass : function (className) {
			return _.toArray(document.getElementsByClassName(className));
		},

		getTag : function (tagName) {
			return _.toArray(document.getElementsByTagName(tagName));
		},

		listen : function (object, eventName, callback) {
			if (_.isString(object)) {
				callback = eventName;
				eventName = object;
				object = document;
			}
			return object.addEventListener(eventName, callback, false);
		}

	};

}(window, document));
