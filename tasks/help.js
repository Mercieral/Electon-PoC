module.exports = function(grunt) {
	grunt.registerTask('?', function() {
		console.log('The following tasks are available:');
		console.log('`grunt build_dev` builds a development version of the application that uses a local instance of ' +
			'the services. Requires org with name `testOrg1` and admin with email `tester@greenlight.guru`.');
		console.log('`grunt build_debug` builds the production version of the application, only it doesn\'t minify ' +
			'the scripts, making it easier to debug a production issue.');
		console.log('`grunt build_production` builds the production version of the application, ' +
			'including minification.');
		console.log('`grunt develop` will build the development version of the app, and continue to keep it updated ' +
			'as changes are made to the source files.');
		console.log('`node server <mode>` will build the app and serve it on port 8000. The mode parameter can be ' +
			'blank for production, `staging` for debug mode or `development` for development mode.');
	});
};