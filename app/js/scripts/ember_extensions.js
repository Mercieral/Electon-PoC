Em.View.reopen({
	attributeBindings: ['title', 'tabindex', 'data-icon']
});

Em.LinkView.reopen({
	attributeBindings: ['href', 'title', 'rel', 'data-icon', 'tabindex']
});

Em.computed.sortBy = Em.computed.sortBy || function(dependentKey, sortKey) {
	return Em.computed.sort(dependentKey, (a, b) => Em.get(a, sortKey) < Em.get(b, sortKey) ? -1 : 1);
};

Em.computed.transform = function(dependentKey, transform, inverse = null) {
	if (inverse) {
		return function(key, value) {
			//@TODO #emberDeprecated getter/setter v1.12.0
			//@TODO #emberDeprecated http://emberjs.com/deprecations/v1.x/#toc_computed-properties-with-a-shared-getter-and-setter
			if (arguments.length > 1) {
				this.set(dependentKey, inverse.call(this, value));
				return value;
			}

			return transform.call(this, this.get(dependentKey));
		}.property(dependentKey);
	} else {
		return function() {
			return transform.call(this, this.get(dependentKey));
		}.property(dependentKey).readOnly();
	}
};

Em.Set.reopen({

	including(object) {
		let set = this.copy();
		set.addObject(object);
		return set;
	},

	includingAll(objects) {
		let set = this.copy();
		set.addObjects(objects);
		return set;
	},

	withoutAll(items) {
		const ret = this.copy();
		ret.removeObjects(items);
		return ret;
	}

});

Em.TextField.reopen({
	click: function() {
		const bubbles = this.get('clickBubbles');
		return (bubbles !== false);
	}
});

Em.Handlebars.registerHelper('group', function(options) {
	let data = options.data;
	let fn = options.fn;
	let view = data.view;

	let childView = view.createChildView(Em._MetamorphView, {
		context: Em.get(view, 'context'),

		template: function(context, options) {
			options.data.insideGroup = true;
			return fn(context, options);
		}
	});

	view.appendChild(childView);
});

Em.Set.reopen({

	/**
	 * Replaces Ember method to remove deprecation warning.
	 */
	init(items) {
		const deprecate = Em.deprecate;
		Em.deprecate = (() => {});

		this._super();

		Em.deprecate = deprecate;

		if (items) {
			this.addObjects(items);
		}
	}

});
