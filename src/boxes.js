"use strict";

var Arrangement = (function () {

	var url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

	var elementTypes = {

		text : function (element) {
			return element.innerText.length > 0;
		},

		image : function (element) {
			return element.style['background-image'] !== '';
		},

		link : function (element) {
			return element.tagName.toLowerCase() == 'a';
		},

		url : function (element) {
			return url.test(element.textContent);
		}

	};

	// Recursively traverse the element's parents to determine whether it
	// is the child of a table and if so returns the table element
	function isInATable(element) {

		var node = element;

		while (node !== document) {
			if (node.tagName.toLowerCase() == 'table') return node;
			node = node.parentNode;
		}

		return null;
	}

	// Guesses how the elements are arranged, based on if the elements are:
	// 1. All children of a table
	// 2. Have similar x or y values
	// 3. Are in repeating groups of similar x or y values
	// 4. A body of text
	// Returns a 1 or 2D array with the elements
	function guessLayout(elements) {
		
	}

	// Return an object containing all possible types and a 1 or a 0 if
	// they could match that type
	function elementType(element) {
		return _.mapObject(elementTypes, function (test) {
			return test(element);
		});
	}

	function Arrangement(elements) {
		this.elements = elements;
		this.overlay = $.createElement(document.body, 'div', {
			background : 'whitesmoke'
		});
	}

	Arrangement.prototype = {
		
		// Returns an object with the number of elements that may have a
		// particular type, as determined by the corresponding type-guessing
		// members of Arrangement
		guessType : function () {

			// Initialise each type in elementTypes to 0
			var initial = _.mapObject(elementTypes, _.constant(0));
			
			// Iterate over all elements, call the corresponding
			// type-guessing function for each element and add the results
			// to the count
			return _.reduce(this.elements, function (memo, element) {

				_.each(elementType(element), function (count, name) {
					memo[name] += count;
				});

				return memo;

			}, initial);

		},

		display : function () {
			this.overlay.style.display = 'block';
		},

		hide : function () {
			this.overlay.style.display = 'hidden';
		}

	};

	return Arrangement;

}());
