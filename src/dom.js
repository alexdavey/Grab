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
			// The text (and styles) parameters are optional
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
		},

		isMacOs : function () {
			return navigator.appVersion.indexOf('Mac') != -1;
		},

		animate : function (element, property, to, time, callback) {
			var interval,
				styles = element.style,
				from = +styles[property],
				step = (to - from) / (time / 50),
				timeout = setTimeout(function () {
					clearInterval(interval);
					styles[property] = to;
					callback();
				}, time);

			interval = setInterval(function () {
				styles[property] = (from += step);
			}, 50);
		}

	};

}(window, document));
