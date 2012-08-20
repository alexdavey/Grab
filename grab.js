window.__grab = (function() {
	
	"use strict";

	function filterObject(object, predicate) {
		var clone = {};
		_.each(object, function(value, key) {
			if (predicate(value, key)) clone[key] = value;
		});
		return clone;
	}

	var grab = {
			
		toModel : function(node) {
			return filterObject(node, function(value, key) {
				return (typeof node[key] != 'undefined' && value !== null && value !== "") &&
					(_.isString(value) || _.isNumber(value));
			});
		},

		same : function(models) {
			var base = grab.toModel(models.splice(0, 1)[0]);
			_.each(models, function(model) {
				_.each(model, function(value, key) {
					if (!base[key] || base[key] !== value) {
						delete base[key];
					}
				});		
			});
			return base;
		}

	};

	return grab;
	
}());
