window.__grab = (function(window, document, undefined) {
	
	"use strict";

	function getClass(className) {
		return document.getElementsByClassName(className);
	}

	function getTag(tagName) {
		return document.getElementsByTagName(tagName);
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
			var base = grab.toModel(models.splice(0, 1)[0]);
			_.each(models, function(model) {
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
			var matches = [];

			matches.concat(getClass(model.className));
			matches.concat(getTag(model.nodeName));

			if (model.parentNode) {
				matches.concat(getTag(model.parentNode.nodeName));
				matches.concat(getClassName(model.parentNode.className));
				matches.concat(model.parentNode.childNodes);
			}

			return _.filter(matches, function(match) {
				return grab.match(model, match);
			});
		}
		
	};

	return grab;
	
}(window, document));
