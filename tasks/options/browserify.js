var BROWSERIFY_SOURCE_FILES = [
	'node_modules/password_constable/dist/index.js'
];

module.exports = {
	passwordBundle: {
		files: {
			'build/javascripts/password_bundle.js': ['node_modules/password-constable/dist/index.js']
		},
		options: {
			transform: [['uglifyify', {'global': true}]],
			browserifyOptions: {
				standalone: 'password-constable'
			}

		}
	}
};