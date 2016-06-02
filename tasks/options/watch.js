module.exports = {
	options: {
		nospawn: true
	},

	templates: {
		files: ['src/app/hbs/**/*.hbs'],
		tasks: ['clean:templates', 'ember_handlebars:all']
	},

	app: {
		files: ['src/app/js/**/*.js'],
		tasks: ['clean:app', 'transpile']
	},

	css: {
		files: ['src/app/css/**/*.scss'],
		tasks: ['clean:css', 'build_app_css']
	},

	site_pages: {
		files: ['src/site/templates/**/*.html', 'src/site/templates/**/*.hbs'],
		tasks: ['build_site_pages']
	},

	static_assets: {
		files: ['src/site/fonts/**/*', 'src/site/images/**/*', 'src/site/javascripts/**/*'],
		tasks: ['copy_assets']
	},

	tests: {
		files: ['test/app/**/*.js'],
		tasks: ['concat:tests']
	}
};