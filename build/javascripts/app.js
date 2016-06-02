console.log('App Version: ');

(function() {

Em.View.reopen({
	attributeBindings: ['title', 'tabindex', 'data-icon']
});

Em.LinkView.reopen({
	attributeBindings: ['href', 'title', 'rel', 'data-icon', 'tabindex']
});

Em.computed.sortBy = Em.computed.sortBy || function(dependentKey, sortKey) {
	return Em.computed.sort(dependentKey, function(a, b)  {return Em.get(a, sortKey) < Em.get(b, sortKey) ? -1 : 1});
};

Em.computed.transform = function(dependentKey, transform) {var inverse = arguments[2];if(inverse === void 0)inverse = null;
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

	including: function(object) {
		var set = this.copy();
		set.addObject(object);
		return set;
	},

	includingAll: function(objects) {
		var set = this.copy();
		set.addObjects(objects);
		return set;
	},

	withoutAll: function(items) {
		var ret = this.copy();
		ret.removeObjects(items);
		return ret;
	}

});

Em.TextField.reopen({
	click: function() {
		var bubbles = this.get('clickBubbles');
		return (bubbles !== false);
	}
});

Em.Handlebars.registerHelper('group', function(options) {
	var data = options.data;
	var fn = options.fn;
	var view = data.view;

	var childView = view.createChildView(Em._MetamorphView, {
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
	init: function(items) {
		var deprecate = Em.deprecate;
		Em.deprecate = (function()  {});

		this._super();

		Em.deprecate = deprecate;

		if (items) {
			this.addObjects(items);
		}
	}

});


})();
(function() {

var modules = {};
var moduleNames = [];
var moduleCache = {};
var isEvaluating = {};

// We don't want these overridden by another module system

Object.defineProperty(window, 'define', {
	value: function(name, fn) {
		modules[name] = fn;

		if (moduleNames.indexOf(name) < 0) {
			moduleNames.push(name);
		}
	}
});

Object.defineProperty(window, 'require', {
	value: function(name) {
		if (isEvaluating[name]) {
			throw new Error(("A circular dependency was detected."));
		}

		if (!moduleCache[name]) {
			if (!modules[name]) {
				throw new Error(("Cannot find module: " + name));
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

})();

define('app', function() {
var module = { exports: {} };

require('util/offline');
require('util/helpers');

var logError = require('util/error').logError;
Em.onerror = function(error)  {return logError(error)};

// Create Application
var App = window.App = Ember.Application.create();


// Store
App.Store = null;

// Router
var routeMap = require('router').routeMap;
App.Router.map(routeMap);
App.Router.reopen({
    location: 'history'
});


return module.exports;
});

define('router', function() {
var module = { exports: {} };

var Ember = require('ember');

var Router = Ember.Router.extend({

});

Router.map(function() {
    this.route('documents');
    this.route('about');
});

module.exports = Router;

return module.exports;
});

define('routes/index', function() {
var module = { exports: {} };



return module.exports;
});

define('util/attribute_helpers', function() {
var module = { exports: {} };

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
function createAttributeProxyMixin(propertyName) {var shallowProxy = arguments[1];if(shallowProxy === void 0)shallowProxy = false;
	var modelPropertyName = ("model." + propertyName);
	var tempValueName = ("__" + propertyName);
	var dirtyPropertyName = (("is" + (propertyName.capitalize())) + "Dirty");
	var applyChangesName = ("save" + (propertyName.capitalize()));
	var resetChangesName = ("reset" + (propertyName.capitalize()));
	var observeChangesName = (("__" + propertyName) + "Changed");

	var mixin = {};

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

			var tempValue = this.get(tempValueName);
			return (tempValue === undefined ? this.get(modelPropertyName) : tempValue);
		}.property(tempValueName, modelPropertyName);

		mixin[applyChangesName] = function() {
			var tempValue = this.get(tempValueName);

			if (tempValue !== undefined) {
				this.set(modelPropertyName, tempValue);
			}

			this.set(tempValueName, undefined);
		};

		mixin[observeChangesName] = function() {
			var tempValue = this.get(tempValueName);
			var modelValue = this.get(modelPropertyName);

			if (tempValue === modelValue) {
				this.set(tempValueName, undefined);
			}
		}.observes(modelPropertyName);
	}

	return Em.Mixin.create(mixin);
} module.exports.createAttributeProxyMixin = createAttributeProxyMixin;

function setAttributeProxy(attributeName) {
	return function(key, value) {
		var model = this.get('model');

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
	}.property(("model." + attributeName));
} module.exports.setAttributeProxy = setAttributeProxy;

return module.exports;
});

define('util/dialogs', function() {
var module = { exports: {} };

// Using the application route is a workaround. But I think that modal dialogs should be separate from Ember.

function showDialog(templateName) {var controller = arguments[1];if(controller === void 0)controller = undefined;var backgroundClose = arguments[2];if(backgroundClose === void 0)backgroundClose = true;
	closeDialog();

	var applicationRoute = App.__container__.lookup('route:application');

	applicationRoute.render(("dialogs/" + templateName), {
		into: 'application',
		outlet: 'dialog',
		controller: controller
	});

	if (backgroundClose) {
		Em.run.scheduleOnce('afterRender', function()  {
			$('.modal-background').click(function(e)  {
				var content = $('.modal-content');
				if (!content.is(e.target) && content.has(e.target).length <= 0) {
					closeDialog();
				}
			});

			$('.modal-background .close-button').click(function()  {
				closeDialog();
			});
		});
	}
} module.exports.showDialog = showDialog;

function closeDialog() {
	var applicationRoute = App.__container__.lookup('route:application');
	applicationRoute.disconnectOutlet({ outlet: 'dialog', parentView: 'application' });
} module.exports.closeDialog = closeDialog;

return module.exports;
});

define('util/helpers', function() {
var module = { exports: {} };

var momentString = function(datetime, format) {
	if (typeof datetime === 'number' || datetime instanceof Date) {
		return new Handlebars.SafeString(window.moment(datetime).format(format));
	} else {
		return '';
	}
};

var momentStringUtc = function(datetime, format) {
	if (typeof datetime === 'number' || datetime instanceof Date) {
		return new Handlebars.SafeString(window.moment(datetime).utc().format(format));
	} else {
		return '';
	}
};

Em.Handlebars.helper('moment-format', function(datetime, format) {
	return momentString(datetime, format);
});

Em.Handlebars.helper('moment-format-utc', function(datetime, format) {
	return momentStringUtc(datetime, format);
});

Em.Handlebars.helper('capitalize', function(str) {
	if (!str) {
		return '';
	}
	return str.capitalize();
});

Em.Handlebars.helper('pascalize', function(str) {
	if(!str) {
		return '';
	}
	var split = str.split(' ');
	for (var i = 0; i < split.length; i++) {
		split[i] = split[i].charAt(0).toUpperCase() + split[i].substr(1)
	}
	return split.join(' ');
});

Em.Handlebars.helper('breaklines', function(str) {
	str = Handlebars.Utils.escapeExpression(str);
	str = str.replace(/(\r\n|\n|\r)/gm, '<br>');
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
    switch (operator)
    {
        case "==":
            return (v1==v2)?options.fn(this):options.inverse(this);

        case "!=":
            return (v1!=v2)?options.fn(this):options.inverse(this);

        case "===":
            return (v1===v2)?options.fn(this):options.inverse(this);

        case "!==":
            return (v1!==v2)?options.fn(this):options.inverse(this);

        case "&&":
            return (v1&&v2)?options.fn(this):options.inverse(this);

        case "||":
            return (v1||v2)?options.fn(this):options.inverse(this);

        case "<":
            return (v1<v2)?options.fn(this):options.inverse(this);

        case "<=":
            return (v1<=v2)?options.fn(this):options.inverse(this);

        case ">":
            return (v1>v2)?options.fn(this):options.inverse(this);

        case ">=":
         return (v1>=v2)?options.fn(this):options.inverse(this);

        default:
            return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
    }
});

//extending the ember api to make this ubiquitous across the app
Em.computed.alias.async = function computedAliasAsyncHelper(propertyName, dependentKey){
    var lastValue;
    return function(){var this$0 = this;

        var asyncValue = this.get(dependentKey);

        if(!asyncValue){
            return lastValue;
        }

        if(Array.isArray(asyncValue)){
            var unfulfilledPromise = asyncValue.some(function(individualValue)  {
                return individualValue.then && !individualValue.isFulfilled;
            });

            if(unfulfilledPromise) {
                Promise.all(asyncValue).then(function()  {
                    this$0.notifyPropertyChange(propertyName);
                });
            }else{
                lastValue = asyncValue.map(function(individualValue){
                    return individualValue.then ? individualValue.get('content') : individualValue;
                });
            }
        }else{
            if(asyncValue.then){
                if(!asyncValue.isFulfilled){
                    asyncValue.then(function(){
                        this$0.notifyPropertyChange(propertyName);
                    });
                }else{
                    lastValue = asyncValue.get('content');
                }
            }else {
                lastValue = asyncValue;
            }
        }

        return lastValue;

    }.property(dependentKey);
};


return module.exports;
});

define('util/resolver', function() {
var module = { exports: {} };

function camelizeModuleName(moduleName) {
	return moduleName.replace(/\//g, '_').camelize();
}

function findModule(resolvedName) {var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;
	var moduleNames = window.getModuleNames();

	$D$0 = GET_ITER$0(moduleNames);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? moduleNames.length : void 0);for (var name ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){name = ($D$2 ? moduleNames[$D$0++] : $D$1["value"]); // jshint ignore:line
		if (camelizeModuleName(name) === resolvedName) {
			return window.require(name);
		}
	};$D$0 = $D$1 = $D$2 = void 0;

	return undefined;
}

function tryRequire(name) {
	if (window.hasModule(name)) {
		return window.require(name);
	} else {
		return undefined;
	}
}

module.exports = Em.DefaultResolver.extend({

	resolveOther: function(parsed) {
		var resolved;

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

	resolveAdapter: function(parsed) {
		return tryRequire(("persistence/adapters/" + (parsed.name.underscore())));
	},

	resolveAttributeType: function(parsed) {
		return tryRequire(("persistence/attribute_types/" + (parsed.name.underscore())));
	},

	resolveComponent: function(parsed) {
		return tryRequire(("components/" + (parsed.name.underscore())));
	},

	resolveController: function(parsed) {
		return findModule(("controllers" + (parsed.name.capitalize())));
	},

	resolveMixin: function(parsed) {
		return tryRequire(("mixins/" + (parsed.name.underscore())));
	},

	resolveModel: function(parsed) {
		return tryRequire(("persistence/models/" + (parsed.name.underscore())));
	},

	resolveRoute: function(parsed) {
		return findModule(("routes" + (parsed.name.capitalize())));
	},

	resolveSerializer: function(parsed) {
		return tryRequire(("persistence/serializers/" + (parsed.name.underscore())));
	},

	resolveView: function(parsed) {
		return findModule(("views" + (parsed.name.capitalize())));
	}

});


return module.exports;
});

define('util/route_helpers', function() {
var module = { exports: {} };


function modelTransition(modelFunc){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            return modelFunc().then(resolve, reject);
        },0);
    });
} module.exports.modelTransition = modelTransition;


function transitionModel(modelFunc){
    return function(params) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var model = modelFunc(params);
                if(model.then){
                    model.then(resolve, reject);
                }else{
                    resolve(model);
                }
            }, 0);
        });
    };
} module.exports.transitionModel = transitionModel;

var getParentRoute = module.exports.getParentRoute = function(routeName)  {return routeName.split('.').slice(0, -1).join('.')};


return module.exports;
});

require('app');