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
				return (value != null && value !== "") &&
					(_.isString(value) || _.isNumber(value));
			});
		},

		same : function(models) {
			var base = grab.toModel(models.splice(0, 1)[0]);
			_.each(models, function(model) {
				_.each(base, function(value, key) {
					if (!model[key] || model[key] !== value) {
						delete base[key];
					}
				});		
			});
			return base;
		}
		
	};

	return grab;
	
}());
