window.grab = (function (window, document, $, undefined) {

	"use strict";

	// List of node properties that generally do not indicate the content
	// of the node, but confuse the matching function
	var blacklist = ['protocol'];

	function inBlacklist(value, key) {
		return !_.contains(blacklist, key);
	}

	// Functions identically to _.filter except returns an object
	function filterObject(object, predicate) {
		var clone = {};
		_.each(object, function (value, key) {
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

	function compare(base, models, iterator) {
		_.each(models, function (model) {
			_.each(base, function (value, key) {
				iterator(model, key, value);
			});
		});
	}

	var grab = {
			
		// Reduces a node to a simple object with all superfluous values
		// removed, first by removing any keys in the blacklist, then any
		// undefined/null or empty string values
		toModel : function (node) {
			var filtered = filterObject(node, inBlacklist);
			return filterObject(filtered, function (value, key) {
				return (value !== null && value !== undefined && value !== "") &&
					(_.isObject(value) || _.isString(value) || _.isNumber(value));
			});
		},

		// Returns the intersection of all models passed to it, that is the
		// set of properties and values that all of the models share.
		same : function (models) {
			var base = grab.toModel(models[0]);
			compare(base, _.rest(models), function (model, key, value) {
				if (model[key] !== value) delete base[key];
			});
			return base;
		},

		// Remove the properties of one model from the other
		subtract : function (model, negative) {
			var keys = _.keys(negative);
			_.each(keys, function (key) {
				delete model[key];
			});
			return model;
		},

		// Simple predicate determines if all key/value pairs in object a
		// are also in object b, however not all of b's values have to be in a
		subset : function (a, b) {
			for (var i in a) {
				if (!a.hasOwnProperty(i)) continue;
				if (!b.hasOwnProperty(i) || b[i] !== a[i]) {
					return false;
				}
			}
			return true;
		},

		// Returns the innerText values of all of elements, with empty lines
		// removed and the lines remaining joined with newlines
		data : function (elements) {
			return _.reject(_.pluck(elements, 'innerText'), _.isEmpty).join('\n');
		},

		// Extracts a list of potential matches based on the properties of
		// the model it is given and filters out those which do not match
		find : function (model) {
			var matches = [],
				parentNode;

			matches = matches.concat($.getClass(model.className));
			matches = matches.concat($.getTag(model.nodeName));

			if (parentNode = model.parentNode) {
				matches = matches.concat($.getTag(parentNode.nodeName));
				matches = matches.concat($.getClass(parentNode.className));
				matches = matches.concat(parentNode.childNodes);
			}

			return _.filter(matches, _.bind(grab.subset, grab, model));
		},

		// Sorts the elements based on thier position in the window, first by
		// y value, then by x value
		order : function (matches) {
			return _.sortBy(matches, function (match) {
				var box = match.getBoundingClientRect();
				return (box.top + window.pageYOffset) +
						(box.left + window.pageXOffset) / 1000;
			});
		}
		
	};

	return grab;

}(window, document, $));
