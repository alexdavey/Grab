/*globals Selection settings grab*/

window.Collection = (function (window, document, Selection, grab, undefined) {

	"use strict";

	function concat(a, b) {
		return a.concat(b);
	}

	function allElements(collection) {
		return _.chain(collection).pluck('elements').reduce(concat).value();
	}

	function nDeep(n, object) {
		var tree = {};
		if (n === 1) return _.isObject(object) ? object.toString() : object;
		for (var i in object) {
			if (!object.hasOwnProperty(i)) continue;
			tree[i] = _.isObject(object[i]) ? nDeep(n - 1, object[i]) : object[i];
		}
		return tree;
	}

	function preProcess(domTree) {
		var model = prune(domTree);

		model = {
			zeros : _.keys(_.filterObject(model, _.equals(0))).join(','),
			others : _.filterObject(model, _.not(_.equals(0)))
		};

		return model;
	}

	function arrange(texts) {
		return _.map(texts, _.trim).join('\n');
	}

	var prune = _.bind(nDeep, null, settings.fingerprintDepth);

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
			var confirmed = this.Confirmed.elements,
				negative = this.Negative.elements;

			this.Extrapolated.clear();

			if (this.Confirmed.size() < settings.threshold) return;

			var same = grab.same(confirmed),
				negative = grab.same(negative),
				blacklist = grab.subtract(same, negative),
				elements = grab.find(same, blacklist),
				extrapolated = _.difference(elements, confirmed, negative);

			this.lastModel = { positive : same, negative : blacklist };

			this.fingerprint();

			_.each(extrapolated, this.Extrapolated.add, this.Extrapolated);
		},

		clearAll : function () {
			_.invoke(this.ExtrapolatedList, 'clear');
			_.invoke(this.ConfirmedList, 'clear');
			_.invoke(this.NegativeList, 'clear');
			this.ExtrapolatedList = [];
			this.ConfirmedList = [];
			this.NegativeList = [];
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
			this.Negative.remove(element);
		},

		has : function (element) {
			return this.Confirmed.has(element) || this.Negative.has(element);
		},

		setActive : function (index) {
			this.active = index;
			this.Extrapolated = this.ExtrapolatedList[index];
			this.Confirmed = this.ConfirmedList[index];
			this.Negative = this.NegativeList[index];
		},

		getText : function () {
			if (this.Confirmed.size() < settings.threshold) return;
			var ordered = grab.order(
					this.Confirmed.elements.concat(this.Extrapolated.elements));
			return arrange(grab.data(ordered));
		},

		getAllText : function () {
			var active = allElements(this.ConfirmedList),
				extrapolated = allElements(this.ExtrapolatedList),
				ordered = grab.order(active.concat(extrapolated));
			return arrange(grab.data(ordered));
		},

		reHighlight : function () {
			_.invoke(this.ExtrapolatedList, 'reHighlight');
			_.invoke(this.ConfirmedList, 'reHighlight');
			_.invoke(this.NegativeList, 'reHighlight');
		},

		fingerprint : function () {
			var tree = {
				positive : preProcess(this.lastModel.positive),
				negative : preProcess(this.lastModel.negative)
			};

			return JSON.stringify(JSON.decycle(tree));
		},

		fromFingerprint : function (fingerprint) {
			return JSON.decycle(JSON.parse(fingerprint));
		}
		
	};

	return Collection;
	
}(window, document, Selection, grab));
