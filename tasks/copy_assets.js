var sh = require('sync-exec');

module.exports = function(grunt) {
	grunt.registerTask('copy_assets', function() {

		sh('mkdir -p build/javascripts');
		sh('cp bower_components/handlebars/handlebars.js build/javascripts/handlebars.js');
		sh('cp bower_components/ember/ember.prod.js build/javascripts/ember.prod.js');
		sh('cp bower_components/ember/ember-template-compiler.js build/javascripts/ember-template-compiler.js');
		sh('cp bower_components/jquery/dist/jquery.js build/javascripts/jquery.js');
		sh('cp app/favicon.ico build/');
		sh('cp app/index.html build/index.html');
        sh('cp app/main.js build/main.js');
        sh('cp app/package.json build/package.json');
		sh('cp app/start-electron.js build/start-electron.js');
		sh('cp node_modules/request/request.js build/javascripts/request.js');

	});
};