"use strict";

_.mixin({

	// Functions identically to _.filter except returns an object
	filterObject : function (object, predicate) {
		var clone = {};
		_.each(object, function (value, key) {
			if (predicate(value, key)) clone[key] = value;
		});
		return clone;
	},
	
	equals : function (a) {
		return function (b) {
			return b === a;
		};
	},

	not : function (fn) {
		return function () {
			return !fn.apply(null, _.toArray(arguments));
		};
	}
	
});
