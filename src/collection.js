window.Collection = (function(window, document, Selection, grab, undefined) {

	"use strict";

	function Collection() {

		if (!(this instanceof Collection)) {
			return new Collection();
		}

		this.ConfirmedList = [Selection(settings.confirmedClass)];
		this.ExtrapolatedList = [Selection(settings.extrapolatedClass)];
		this.models = [{}];
		this.active = 0;
		this.setActive(this.active);
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

		addElement : function(element) {
			this.Confirmed.add(element);
		},

		removeElement : function(element) {
			this.Confirmed.remove(element);
		},

		setActive : function(index) {
			this.active = index;
			this.Extrapolated = this.ExtrapolatedList[this.active];
			this.Confirmed = this.ConfirmedList[this.active];
		},

		getActive : function() {
			return this.active;
		},

		getText : function() {
			if (this.Confirmed.size() < settings.threshold) return;
			var active = this.Confirmed.elements,
				extrapolated = this.Extrapolated.elements,
				ordered = grab.order(active.concat(extrapolated));
			return grab.data(ordered);
		},

		getAllText : function() {
			var active = this.active;
			_.map(this.ConfirmedList, function(Confirmed, i) {
				setActive(i);
				return this.getText();
			});
			setActive(active);
		},

		reHighlight : function() {
			_.invoke(this.ExtrapolatedList, 'reHighlight');
			_.invoke(this.ConfirmedList, 'reHighlight');
		}
		
	};

	return Collection;
	
}(window, document, __Selection, __grab));
