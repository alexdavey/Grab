window.__grab = (function(window, document, $, undefined) {
	
	"use strict";

	var blacklist = ['protocol'];

	function inBlacklist(value, key) {
		return !_.contains(blacklist, key);
	}

	function filterObject(object, predicate) {
		var clone = {};
		_.each(object, function(value, key) {
			if (predicate(value, key)) clone[key] = value;
		});
		return clone;
	}

	// function intersect(base, model, value, key) {
	// 	if (_.isUndefined(model[key])) delete base[key];
	// 	else if (_.isObject(value) && _.isObject(model[key])) {
	// 		_.each(value, function(value, key) {
	// 			intersect(base[key], model[key], key, value);
	// 		});
	// 	} 
	// 	else if (model[key] !== value) delete base[key];
	// }

	var grab = {
			
		toModel : function(node) {
			var filtered = filterObject(node, inBlacklist);
			return filterObject(filtered, function(value, key) {
				return (value != null && value !== "") &&
					(_.isObject(value) || _.isString(value) || _.isNumber(value));
			});
		},

		same : function(models) {
			var base = grab.toModel(models[0]);
				// intersectBase;
			_.each(_.rest(models), function(model) {
				_.each(base, function(value, key) {
					if (_.isUndefined(model[key]) || model[key] !== value) delete base[key];
				});
				// intersectBase = _.bind(intersect, null, base, model);
				// _.each(base, intersectBase);
			});
			return base;
		},

		match : function(a, b) {
			for (var i in a) {
				if (!a.hasOwnProperty(i)) continue;
				if (!b.hasOwnProperty(i) || b[i] !== a[i]) {
					return false;
				}
			}
			return true;
		},

		data : function(elements) {
			return _.reject(_.pluck(elements, 'innerText'), _.isEmpty).join('\n');
		},

		find : function(model) {
			var matches = [],
				parentNode;

			matches = matches.concat($.getClass(model.className));
			matches = matches.concat($.getTag(model.nodeName));

			if (parentNode = model.parentNode) {
				matches = matches.concat($.getTag(parentNode.nodeName));
				matches = matches.concat($.getClass(parentNode.className));
				matches = matches.concat(parentNode.childNodes);
			}

			return _.filter(matches, _.bind(grab.match, grab, model));
		},

		order : function(matches) {
			var sorted = _.sortBy(matches, function(match) {
				var box = match.getBoundingClientRect();
				return (box.top + window.pageYOffset) + 
						(box.left + window.pageXOffset) / 1000;
			});
		}
		
	};

	return grab;
	
}(window, document, __$));
