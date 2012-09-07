/*globals Dropdown */

(function (window, document, $, undefined) {

	"use strict";

	var empty = function () {  };

	var control = window.control = {

		elements : [],

		toggles : {},

		element : $.createElement(document.body, 'div'),

		addElement : function (type, text) {
			var element = $.createElement(control.element, type, text);
			control.elements.push(element);
			return element;
		},

		addButton : function (text, fn) {
			var element = control.addElement('button', text);
			element.addEventListener('click', fn, false);
			return control;
		},

		addToggle : function (name, on, off, onFn, offFn, context) {
			var element = control.addButton(off, _.bind(control.toggle, null, name));
			control.toggles[name] = {
				context : context,
				element : element,
				name : name,
				on : on,
				off : off,
				onFn : onFn || empty,
				offFn : offFn || empty,
				state : false
			};
			return control;
		},

		addDropdown : function (color, fn) {
			return Dropdown(control.element, color, fn);
		},

		toggle : function (name) {
			var toggle = control.toggles[name];
			if (toggle.state) {
				toggle.element.innerText = toggle.off;
				toggle.offFn.call(toggle.context, name);
			} else {
				toggle.element.innerText = toggle.on;
				toggle.onFn.call(toggle.context, name);
			}
			control.onToggle(name, toggle.state);
			toggle.state = !toggle.state;
		},

		onToggle : function (fn) {
			control.onToggle = fn;
		},

		isOn : function (name) {
			return control.toggles[name].state;
		},

		isControl : function (element) {
			return element === control.element ||
					_.contains(control.elements, element);
		},

		show : function () {
			$.show(control.element);
		},

		hide : function () {
			$.hide(control.element);
		},

		toggleVisibility : function () {
			if (control.element.style.display == 'none') control.show();
			else control.hide();
		}

	};

	control.element.id = 'grab-controls';

}(window, document, $));
