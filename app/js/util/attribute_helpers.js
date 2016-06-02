/**
 * Creates the following methods and properties on the class:
 *
 * property: {propertyName} - The proxy's value, set to `undefined` to reset
 * property: __{propertyName} - The proxy's value that overrides the model's value (or undefined)
 * method: apply{MethodSuffix}Changes - Applies the proxy changes to the model property
 * method: reset{MethodSuffix}Changes - Resets the proxies changes. Can't be done through `set` because of caching
 *
 * @param {String} propertyName
 * @param {Boolean} [shallowProxy=false] If true, signifies that this proxy has no backing property
 * @returns {Mixin}
 */
export function createAttributeProxyMixin(propertyName, shallowProxy = false) {
	let modelPropertyName = `model.${propertyName}`;
	let tempValueName = `__${propertyName}`;
	let dirtyPropertyName = `is${propertyName.capitalize()}Dirty`;
	let applyChangesName = `save${propertyName.capitalize()}`;
	let resetChangesName = `reset${propertyName.capitalize()}`;
	let observeChangesName = `__${propertyName}Changed`;

	let mixin = {};

	mixin[tempValueName] = undefined;

	mixin[dirtyPropertyName] = function() {
		return this.get(tempValueName) !== undefined;
	}.property(tempValueName);

	mixin[resetChangesName] = function() {
		this.set(tempValueName, undefined);
	};

	if (shallowProxy) {
		mixin[propertyName] = function(key, value) {
			//@TODO #emberDeprecated getter/setter v1.12.0
			//@TODO #emberDeprecated http://emberjs.com/deprecations/v1.x/#toc_computed-properties-with-a-shared-getter-and-setter
			if (arguments.length > 1) {
				this.set(tempValueName, value);
				return value;
			}

			return this.get(tempValueName);
		}.property(tempValueName);
	} else {
		mixin[propertyName] = function(key, value) {
			//@TODO #emberDeprecated getter/setter v1.12.0
			//@TODO #emberDeprecated http://emberjs.com/deprecations/v1.x/#toc_computed-properties-with-a-shared-getter-and-setter
			if (arguments.length > 1) {
				if (Em.isEqual(this.get(modelPropertyName), value)) {
					this.set(tempValueName, undefined);
				} else {
					this.set(tempValueName, value);
				}

				return value;
			}

			let tempValue = this.get(tempValueName);
			return (tempValue === undefined ? this.get(modelPropertyName) : tempValue);
		}.property(tempValueName, modelPropertyName);

		mixin[applyChangesName] = function() {
			let tempValue = this.get(tempValueName);

			if (tempValue !== undefined) {
				this.set(modelPropertyName, tempValue);
			}

			this.set(tempValueName, undefined);
		};

		mixin[observeChangesName] = function() {
			let tempValue = this.get(tempValueName);
			let modelValue = this.get(modelPropertyName);

			if (tempValue === modelValue) {
				this.set(tempValueName, undefined);
			}
		}.observes(modelPropertyName);
	}

	return Em.Mixin.create(mixin);
}

export function setAttributeProxy(attributeName) {
	return function(key, value) {
		const model = this.get('model');

		// This seems to happen when the object attached to the proxy gets destroyed.
		if (!model) {
			return;
		}
		
		//@TODO #emberDeprecated getter/setter v1.12.0
		//@TODO #emberDeprecated http://emberjs.com/deprecations/v1.x/#toc_computed-properties-with-a-shared-getter-and-setter
		if (arguments.length > 1) {
			model.set(attributeName, value);
			model.save();
		}

		return model.get(attributeName);
	}.property(`model.${attributeName}`);
}