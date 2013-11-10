var Arrangement = (function () {

	"use strict";

	function splitAt(string, indexes) {
		indexes.unshift(0);
		indexes.push(string.length);
		return _.map(indexes, function (index, i) {
			return string.slice(index, indexes[i + 1]);
		});
	}

	function Arrangement() {
		
	}

	Arrangement.prototype = {

		set : function (string, positions) {
			this.sections = splitAt(string, positions);
		},
		
		arrange : function (inputs) {
			
		},

		preview : function (inputs) {
			
		}

	};

	return Arrangement;
	
}());
