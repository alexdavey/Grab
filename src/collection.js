window.Collection = (function(window, document, Selection, grab, undefined) {

	"use strict";

	function Collection() {

		if (!(this instanceof Collection)) {
			return new Collection();
		}

		this.Confirmed = [Selection(settings.confirmedClass)];
		this.Extrapolated = [Selection(settings.extrapolatedClass)];
		this.models = [{}];
		this.active = 0;
	}

	Collection.prototype = {

		extrapolate : function() {
			this.Extrapolated[this.active].clear();

			if (this.Confirmed[this.active].size() < settings.threshold) return;

			var same = grab.same(this.Confirmed[this.active].elements),
				elements = grab.find(grab.toModel(same)),
				extrapolated = _.difference(elements, this.Confirmed[this.active].elements);

			_.each(extrapolated, this.Extrapolated[this.active].add, this.Extrapolated[this.active]);
		},

		clear : function() {
			this.Extrapolated[this.active].clear();
			this.Confirmed[this.active].clear();
		},

		addElement : function(element) {
			this.Confirmed[this.active].add(element);
		},

		removeElement : function(element) {
			this.Confirmed[this.active].remove(element);
		},

		setActive : function(index) {
			this.active = index;
		},

		getActive : function() {
			return this.active;
		},

		getConfirmed : function() {
			return this.Confirmed[this.active];
		},

		getExtrapolated : function() {
			return this.Extrapolated[this.active];
		},

		getText : function() {
			var Confirmed = this.Confirmed[this.active];
			if (Confirmed.size() < settings.threshold) return;
			var activeElements = Confirmed.elements,
				extrapolateElements = this.Extrapolated[this.active].elements,
				ordered = grab.order(activeElements.concat(extrapolateElements));
			return grab.data(ordered);
		},

		reHighlight : function() {
			_.invoke(this.Extrapolated, 'reHighlight');
			_.invoke(this.Confirmed, 'reHighlight');
		}
		
	};

	return Collection;
	
}(window, document, __Selection, __grab));
