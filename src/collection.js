window.Collection = (function(window, document, Selection, grab, undefined) {

	"use strict";

	function Collection(border) {

		if (!(this instanceof Collection)) {
			return new Collection(border);
		}

		this.ConfirmedList = [];
		this.ExtrapolatedList = [];
		if (border) this.addSelection(border);
	}

	Collection.prototype = {

		extrapolate : function() {
			this.Extrapolated.clear();

			if (this.Confirmed.size() < settings.threshold) return;

			var same = grab.same(this.Confirmed.elements),
				elements = grab.find(grab.toModel(same)),
				extrapolated = _.difference(elements, this.Confirmed.elements);

			_.each(extrapolated, this.Extrapolated.add, this.Extrapolated);
		},

		clear : function() {
			this.Extrapolated.clear();
			this.Confirmed.clear();
		},

		clearAll : function() {
			_.invoke(this.ExtrapolatedList, 'clear');
			_.invoke(this.ConfirmedList, 'clear');
		},

		addSelection : function(color) {
			var Confirmed = Selection(settings.confirmedClass, color),
				Extrapolated = Selection(settings.extrapolatedClass, color);
			this.ConfirmedList.push(Confirmed);
			this.ExtrapolatedList.push(Extrapolated);
			this.setActive(this.ConfirmedList.length - 1);
		},

		removeSelection : function() {
			
		},

		size : function() {
			return this.ConfirmedList.length;
		},

		addElement : function(element) {
			this.Confirmed.add(element);
		},

		removeElement : function(element) {
			this.Confirmed.remove(element);
		},

		setActive : function(index) {
			this.active = index;
			this.Extrapolated = this.ExtrapolatedList[index];
			this.Confirmed = this.ConfirmedList[index];
		},

		getText : function() {
			if (this.Confirmed.size() < settings.threshold) return;
			var active = this.Confirmed.elements,
				extrapolated = this.Extrapolated.elements,
				ordered = grab.order(active.concat(extrapolated));
			return grab.data(ordered);
		},

		getAllText : function() {
			var active = this.active,
			texts = _.map(this.ConfirmedList, function(Confirmed, i) {
				setActive(i);
				return this.getText();
			});
			setActive(active);
			return texts;
		},

		reHighlight : function() {
			_.invoke(this.ExtrapolatedList, 'reHighlight');
			_.invoke(this.ConfirmedList, 'reHighlight');
		}
		
	};

	return Collection;
	
}(window, document, __Selection, __grab));
