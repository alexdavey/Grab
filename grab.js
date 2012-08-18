(function() {
	
	"use strict";

	function filterObject(object, predicate) {
		var clone = {};
		_.each(object, function(value, key) {
			if (predicate(value, key)) clone[key] = value;
		});
		return clone;
	}

	var select = document.getElementById('select');

	function toModel(node) {
		console.dir(node);
		return filterObject(node, function(value, key) {
			return (typeof node[key] != 'undefined' && value !== null && value !== "") &&
				(_.isString(value) || _.isNumber(value));
		});
	}

	function same(models) {
		var base = toModel(models.splice(0, 1)[0]);
		console.log('before', base);
		_.each(models, function(model) {
			_.each(model, function(value, key) {
				if (!base[key] || base[key] !== value) {
					delete base[key];
				}
			});		
		});
		return base;
	}

	var images = document.getElementsByTagName('img');
	images = [].slice.call(images);
	console.dir(same(images));

}());
