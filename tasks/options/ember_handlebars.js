var TEMPLATE_PATH = 'app/templates';

String.prototype.startsWith = String.prototype.startsWith || function(prefix) {
	return this.indexOf(prefix) === 0;
};

String.prototype.endsWith = String.prototype.endsWith || function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) >= 0;
};

module.exports = {
	options: {
		processName: function(filename) {
			if (filename.startsWith(TEMPLATE_PATH)) {
				filename = filename.substring(TEMPLATE_PATH.length);
			}

			if (filename.endsWith('.hbs')) {
				filename = filename.substring(0, filename.length - 4);
			}

			filename = filename.replace(/\./g, '/');

			return filename;
		}
	},

	all: {
		src: TEMPLATE_PATH + '**/*.hbs',
		dest: 'build/javascripts/templates.js'
	}
};