(function() {

	"use strict";

	function highlightElement(e) {
		var target = e.target,
			box = target.getBoundingClientRect();
		css(selection, { 
			display : 'block',
			top : box.top + window.pageYOffset,
			left : box.left + window.pageXOffset,
			width : box.width,
			height : box.height
		});
	}

	function css(element, styles) {
		_.each(styles, function(value, key) {
			element.style[key] = _.isNumber(value) ? value + 'px' : value;
		});
	}

	function createElement(parentNode, name, text, styles) {
		if (!_.isString(text)) {
			styles = text;
			text = '';
		}
		var element = document.createElement(name);
		css(element, styles || {});
		element.innerText = text;
		parentNode.appendChild(element);
		return element;
	}
	
	function startTracking() {
		document.addEventListener('mousemove', highlightElement, false);
	}

	function stopTracking() {
		css(selection, { display : 'hidden' });
		document.removeEventListener('mousemove', highlightElement);
	}

	var controls = createElement(document.body, 'div', {
		position : 'absolute',
		width : 120,
		height : 25,
		background : 'black',
		top : 30,
		right : 30
	});

	var add = createElement(controls, 'button', 'add', {
		
	});

	var remove = createElement(controls, 'button', 'remove', {
		
	});

	var selection = createElement(document.body, 'div', {
		'pointer-events' : 'none',
		display : 'hidden',
		position : 'absolute',
		background : 'blue',
		opacity : '0.5'
	});

	add.addEventListener('click', startTracking, false);
	remove.addEventListener('click', stopTracking, false);

}());
