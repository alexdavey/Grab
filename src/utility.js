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

	mapObject : function (object, iterator) {
		var clone = {};
		_.each(object, function (value, key) {
			clone[key] = iterator(value, key);
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
	},

	trim : function (string) {
		if (_.isObject(String.prototype.trim)) return string.trim();
		return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},

	constant : function (value) {
		return _.bind(_.identity, _, value);
	}
	
});
