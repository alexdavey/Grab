/*globals Selection settings grab*/

window.Collection = (function (window, document, Selection, grab, undefined) {

	"use strict";

	function concat(a, b) {
		return a.concat(b);
	}

	function allElements(collection) {
		return _.chain(collection).pluck('elements').reduce(concat).value();
	}

	function Collection(border) {

		if (!(this instanceof Collection)) {
			return new Collection(border);
		}

		this.ConfirmedList = [];
		this.ExtrapolatedList = [];
		this.NegativeList = [];
		if (border) this.addSelection(border);
	}

	Collection.prototype = {

		extrapolate : function () {
			this.Extrapolated.clear();

			if (this.Confirmed.size() < settings.threshold) return;

			var same = grab.same(this.Confirmed.elements),
				negative = grab.same(this.Negative.elements),
				blacklist = grab.subtract(same, negative),
				elements = grab.find(grab.toModel(same), blacklist),
				extrapolated = _.difference(elements,
									this.Confirmed.elements,
									this.Negative.elements);

			_.each(extrapolated, this.Extrapolated.add, this.Extrapolated);
		},

		clear : function () {
			this.Extrapolated.clear();
			this.Confirmed.clear();
			this.NegativeList.clear();
		},

		clearAll : function () {
			_.invoke(this.ExtrapolatedList, 'clear');
			_.invoke(this.ConfirmedList, 'clear');
			_.invoke(this.NegativeList, 'clear');
		},

		addSelection : function (color) {
			var Confirmed = Selection(settings.confirmedClass, color),
				Extrapolated = Selection(settings.extrapolatedClass, color),
				Negative = Selection(settings.removedClass, color);
			this.ConfirmedList.push(Confirmed);
			this.ExtrapolatedList.push(Extrapolated);
			this.NegativeList.push(Negative);
			this.setActive(this.ConfirmedList.length - 1);
		},

		size : function () {
			return this.ConfirmedList.length;
		},

		addElement : function (element) {
			this.Confirmed.add(element);
		},

		addNegative : function (element) {
			this.Negative.add(element);
			this.Confirmed.remove(element);
		},

		removeElement : function (element) {
			this.Confirmed.remove(element);
		},

		setActive : function (index) {
			this.active = index;
			this.Extrapolated = this.ExtrapolatedList[index];
			this.Confirmed = this.ConfirmedList[index];
			this.Negative = this.NegativeList[index];
		},

		getText : function () {
			if (this.Confirmed.size() < settings.threshold) return;
			var active = this.Confirmed.elements,
				extrapolated = this.Extrapolated.elements,
				ordered = grab.order(active.concat(extrapolated));
			return grab.data(ordered);
		},

		getAllText : function () {
			var active = allElements(this.ConfirmedList),
				extrapolated = allElements(this.ExtrapolatedList),
				ordered = grab.order(active.concat(extrapolated));
			return grab.data(ordered);
		},

		reHighlight : function () {
			_.invoke(this.ExtrapolatedList, 'reHighlight');
			_.invoke(this.ConfirmedList, 'reHighlight');
		}
		
	};

	return Collection;
	
}(window, document, Selection, grab));
