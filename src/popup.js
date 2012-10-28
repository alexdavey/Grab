/*globals settings */

window.Popup = (function (window, document, undefined) {

	"use strict";

	function center(element) {
		var box = element.getBoundingClientRect();
		$.css(element, {
			'margin-left' : -box.width / 2,
			'margin-top' : -box.height / 2
		});
	}

	function Popup(text) {

		if (!(this instanceof Popup)) return new Popup(text);

		this.element = $.createElement(document.body, 'div');
		this.element.className = settings.popupClass.slice(1);
		this.setText(text);
	}

	Popup.prototype = {
		
		show : function () {
			$.show(this.element);
			center(this.element);
			return this;
		},

		hide : function () {
			$.hide(this.element);
			return this;
		},

		setText : function (newText) {
			this.element.textContent = this.text = newText;
			this.show();
			setTimeout(_.bind(this.fadeOut, this), 3000);
			return this;
		},

		fadeOut : function () {
			var that = this;
			this.element.style.opacity = 1;
			$.animate(this.element, 'opacity', 0, 1000, function () {
				that.hide();
				that.element.style.opacity = 1;
			});
		}

	};

	return Popup;
	
}(window, document));
