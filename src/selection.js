window.__Selection = (function(window, document, undefined) {

	"use strict";

	function Selection(identifier) {
		this.elements = [];
		this.highlighters = [];
		this.identifier = identifier;
	}

	Selection.prototype = {

		size : function() {
			return this.elements.length;
		},
		
		clear : function() {
			_.invoke(this.highlighters, 'destroy');
			this.elements = [];
			this.highlighters = [];
		},

		add : function(element) {
			if (this.contains(element)) return;
			var Selected = new Highlighter(this.identifier, element);
			this.elements.push(element);
			this.highlighters.push(Selected);
		},

		remove : function(element) {
			var index = _.indexOf(this.elements, element);
			this.highlighters[index].destroy();
			this.highlighters.splice(index, 1);
			this.elements.splice(index, 1);
		},

		contains : function(element) {
			return _.contains(this.elements, element);
		},

		reHighlight : function() {
			_.invoke(this.highlighters, 'reHighlight');
		}
		
	};

	return Selection;
	
}(window, document));
