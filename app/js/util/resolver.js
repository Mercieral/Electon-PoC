function camelizeModuleName(moduleName) {
	return moduleName.replace(/\//g, '_').camelize();
}

function findModule(resolvedName) {
	const moduleNames = window.getModuleNames();

	for (let name of moduleNames) { // jshint ignore:line
		if (camelizeModuleName(name) === resolvedName) {
			return window.require(name);
		}
	}

	return undefined;
}

function tryRequire(name) {
	if (window.hasModule(name)) {
		return window.require(name);
	} else {
		return undefined;
	}
}

export default Em.DefaultResolver.extend({

	resolveOther(parsed) {
		let resolved;

		switch (parsed.type.underscore()) {
			case 'adapter':
				resolved = this.resolveAdapter(parsed);
				break;
			case 'type':
				resolved = this.resolveAttributeType(parsed);
				break;
			case 'component':
				resolved = this.resolveComponent(parsed);
				break;
			case 'mixin':
				resolved = this.resolveMixin(parsed);
				break;
			case 'serializer':
				resolved = this.resolveSerializer(parsed);
				break;
			case 'data_adapter':
				if (parsed.name === 'main') {
					resolved = tryRequire('persistence/data_adapter');
				}

				break;
		}

		if (!resolved) {
			resolved = this._super(parsed);
		}

		return resolved;
	},

	resolveAdapter(parsed) {
		return tryRequire(`persistence/adapters/${parsed.name.underscore()}`);
	},

	resolveAttributeType(parsed) {
		return tryRequire(`persistence/attribute_types/${parsed.name.underscore()}`);
	},

	resolveComponent(parsed) {
		return tryRequire(`components/${parsed.name.underscore()}`);
	},

	resolveController(parsed) {
		return findModule(`controllers${parsed.name.capitalize()}`);
	},

	resolveMixin(parsed) {
		return tryRequire(`mixins/${parsed.name.underscore()}`);
	},

	resolveModel(parsed) {
		return tryRequire(`persistence/models/${parsed.name.underscore()}`);
	},

	resolveRoute(parsed) {
		return findModule(`routes${parsed.name.capitalize()}`);
	},

	resolveSerializer(parsed) {
		return tryRequire(`persistence/serializers/${parsed.name.underscore()}`);
	},

	resolveView(parsed) {
		return findModule(`views${parsed.name.capitalize()}`);
	}

});
