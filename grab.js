window.__grab = (function(window, document, undefined) {
	
	"use strict";

	function getClass(className) {
		return _.toArray(document.getElementsByClassName(className));
	}

	function getTag(tagName) {
		return _.toArray(document.getElementsByTagName(tagName));
	}

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
			var base = grab.toModel(models[0]);
			_.each(_.rest(models), function(model) {
				_.each(base, function(value, key) {
					if (!model[key] || model[key] !== value) {
						delete base[key];
					}
				});		
			});
			return base;
		},

		match : function(a, b) {
			for (var i in a) {
				if (!a.hasOwnProperty(i)) continue;
				if (!b.hasOwnProperty(i) || b[i] !== a[i])  return false;
			}
			return true;
		},

		find : function(model) {
			var matches = [],
				parentNode;

			matches = matches.concat(getClass(model.className));
			matches = matches.concat(getTag(model.nodeName));

			if (parentNode = model.parentNode) {
				console.log('parentNode');
				matches = matches.concat(getTag(parentNode.nodeName));
				matches = matches.concat(getClassName(parentNode.className));
				matches = matches.concat(parentNode.childNodes);
			}

			return _.filter(matches, _.bind(grab.match, grab, model));
		}
		
	};

	return grab;
	
}(window, document));
