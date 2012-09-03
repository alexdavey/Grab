/*globals Highlighter */

window.Selection = (function (window, document, undefined) {

	"use strict";

	function Selection(identifier, border) {

		if (!(this instanceof Selection)) {
			return new Selection(identifier, border);
		}

		this.elements = [];
		this.highlighters = [];
		this.identifier = identifier;
		this.border = border;
	}

	Selection.prototype = {

		size : function () {
			return this.elements.length;
		},
		
		clear : function () {
			_.invoke(this.highlighters, 'destroy');
			this.elements = [];
			this.highlighters = [];
		},

		add : function (element) {
			if (this.has(element)) return;
			var Selected = Highlighter(this.identifier, element, this.border);
			this.elements.push(element);
			this.highlighters.push(Selected);
		},

		remove : function (element) {
			var index = _.indexOf(this.elements, element);
			if (index == -1) return false;

			this.highlighters[index].destroy();
			this.highlighters.splice(index, 1);
			this.elements.splice(index, 1);
			return true;
		},

		has : function (element) {
			var index = _.indexOf(this.elements, element);
			return index == -1 ? false : this.highlighters[index];
		},

		reHighlight : function () {
			_.invoke(this.highlighters, 'reHighlight');
		}
		
	};

	return Selection;
	
}(window, document));
