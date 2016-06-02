var es6transpiler = require('es6-transpiler');

module.exports = {
	tests: {
		options: {
			process: function(src, filePath) {
				var es5contents = es6transpiler.run({
					filename: filePath,
					disallowUnknownReferences: false
				});

				if (es5contents.errors.length > 0) {
					console.error('Errors while transpiling:');
					es5contents.errors.forEach(function(error) {
						console.error(error);
					});

					throw new Error();
				} else {
					return '(function() {\n\n' + es5contents.src + '\n\n})();\n';
				}
			}
		},

		src: ['test/app/setup.js', 'test/app/**/*.js'],
		dest: 'build/javascripts/tests.js'
	}
};