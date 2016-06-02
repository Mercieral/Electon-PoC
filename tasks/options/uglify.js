module.exports = {
	vendor: {
		options: {
			mangle: false,
			preserveComments: 'some',
			screw_ie8: true
		},

		files: {
			'build/javascripts/vendor_full.js': 'build/javascripts/vendor_full.js',
			'build/javascripts/vendor_minimal.js': 'build/javascripts/vendor_minimal.js'
		}
	},

	app: {
		options: {
			compress: {
				global_defs: {
					DEBUG: false,
					RELEASE: true,
					TEST: false
				},
				sequences: true,
				properties: true,
				drop_debugger: true,
				unsafe: false,
				conditionals: true,
				comparisons: true,
				evaluate: true,
				booleans: true,
				dead_code: true,
				loops: true,
				unused: true,
				hoist_funs: false,
				hoist_vars: false,
				if_return: true,
				join_vars: true,
				cascade: true,
				warnings: true,
				negate_iife: false,
				pure_getters: false,
				pure_funcs: null,
				drop_console: true
			},
			mangle: true,
			preserveComments: false,
			screw_ie8: true
		},

		files: {
			'build/javascripts/templates.js': 'build/javascripts/templates.js',
			'build/javascripts/app.js': 'build/javascripts/app.js'
		}
	},

	app_debug: {
		options: {
			beautify: {
				beautify: true,
				width: 120
			},
			compress: {
				global_defs: {
					DEBUG: false,
					RELEASE: true,
					TEST: false
				},
				sequences: true,
				properties: true,
				drop_debugger: true,
				unsafe: false,
				conditionals: true,
				comparisons: true,
				evaluate: true,
				booleans: true,
				dead_code: true,
				loops: true,
				unused: true,
				hoist_funs: false,
				hoist_vars: false,
				if_return: true,
				join_vars: true,
				cascade: true,
				warnings: true,
				negate_iife: false,
				pure_getters: false,
				pure_funcs: null,
				drop_console: true
			},
			mangle: true,
			preserveComments: false,
			screw_ie8: true
		},

		files: {
			'build/javascripts/templates.js': 'build/javascripts/templates.js',
			'build/javascripts/app.js': 'build/javascripts/app.js'
		}
	}
};