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
	let split = str.split(' ');
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
    return function(){

        const asyncValue = this.get(dependentKey);

        if(!asyncValue){
            return lastValue;
        }

        if(Array.isArray(asyncValue)){
            const unfulfilledPromise = asyncValue.some((individualValue) => {
                return individualValue.then && !individualValue.isFulfilled;
            });

            if(unfulfilledPromise) {
                Promise.all(asyncValue).then(() => {
                    this.notifyPropertyChange(propertyName);
                });
            }else{
                lastValue = asyncValue.map((individualValue)=>{
                    return individualValue.then ? individualValue.get('content') : individualValue;
                });
            }
        }else{
            if(asyncValue.then){
                if(!asyncValue.isFulfilled){
                    asyncValue.then(()=>{
                        this.notifyPropertyChange(propertyName);
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
