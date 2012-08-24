window.Dropdown = (function(window, document, $, undefined) {

	"use strict";

	function Dropdown(parentNode) {

		// Allow the `new` operator to be missed
		if (!(this instanceof Dropdown)) {
			return new Dropdown(parentNode);
		}

		this.element = $.createElement(parentNode, 'select');
		this.elements = [];
		this.state = null;
	}

	Dropdown.prototype = {
		
		addOption : function(name, text, color) {
			return $.createElement(this.element, 'option', text, {
				background : color
			});
		},

		removeOption : function(name) {
			var index = _.indexOf(_.pluck(this.elements, 'value'), name);
			$.removeElement(this.elements[index]);
			this.elements.splice(index, 1);
		}

	};

	return Dropdown;

}(window, document, __$));
