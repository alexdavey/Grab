(function(window, document, $, undefined) {

	"use strict";

	var empty = function() {  };

	var control = window.control = {

		elements : [],

		toggles : [],

		element : $.createElement(document.body, 'div'),

		addElement : function(type, text) {
			var element = $.createElement(control.element, type, text);
			control.elements.push(element);
			return element;
		},

		addButton : function(text, fn) {
			var element = control.addElement('button', text);
			element.addEventListener('click', fn, false);
			return element;
		},

		addToggle : function(name, on, off, onFn, offFn, context) {
			var element = control.addButton(off, _.bind(control.toggle, null, name));
			return (control.toggles[name] = ({
				context : context,
				element : element,
				name : name,
				on : on,
				off : off,
				onFn : onFn || empty,
				offFn : offFn || empty,
				state : false
			}));
		},

		addDropdown : function() {
			return Dropdown(this.element);
		},

		toggle : function(name) {
			var toggle = control.toggles[name];
			if (toggle.state) {
				toggle.element.innerText = toggle.off;
				toggle.offFn.call(toggle.context);
			} else {
				toggle.element.innerText = toggle.on;
				toggle.onFn.call(toggle.context);
			}
			toggle.state = !toggle.state;
		},

		isOn : function(name) {
			return control.toggles[name].state;
		},

		isControl : function(element) {
			return element === control.element ||
					_.contains(control.elements, element);
		},

		show : function() {
			$.show(control.element);
		},

		hide : function() {
			$.hide(control.element);
		}

	};

	control.element.id = 'grab-controls';

}(window, document, __$));
