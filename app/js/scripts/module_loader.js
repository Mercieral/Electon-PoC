const modules = {};
const moduleNames = [];
const moduleCache = {};
const isEvaluating = {};

// We don't want these overridden by another module system

Object.defineProperty(window, 'define', {
	value: function(name, fn) {
		modules[name] = fn;

		if (moduleNames.indexOf(name) < 0) {
			moduleNames.push(name);
		}
	}
});

Object.defineProperty(window, 'myrequire', {
	value: function(name) {
		if (isEvaluating[name]) {
			throw new Error(`A circular dependency was detected.`);
		}

		if (!moduleCache[name]) {
			if (!modules[name]) {
				throw new Error(`Cannot find module: ${name}`);
			}

			isEvaluating[name] = true;
			moduleCache[name] = modules[name]();
			isEvaluating[name] = false;
			delete modules[name];
		}

		return moduleCache[name];
	}
});

Object.defineProperty(window, 'hasModule', {
	value: function(name) {
		return !!(moduleCache[name] || modules[name]);
	}
});

Object.defineProperty(window, 'getModuleNames', {
	value: function() {
		return moduleNames.slice();
	}
});