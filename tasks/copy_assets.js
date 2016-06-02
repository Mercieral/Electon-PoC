var sh = require('sync-exec');

module.exports = function(grunt) {
	grunt.registerTask('copy_assets', function() {

		sh('mkdir -p build/javascripts');
		sh('cp bower_components/handlebars/handlebars.js build/javascripts/handlebars.js');
		sh('cp bower_components/ember/ember.prod.js build/javascripts/ember.prod.js');
		sh('cp bower_components/ember/ember-template-compiler.js build/javascripts/ember-template-compiler.js');
		sh('cp bower_components/jquery/dist/jquery.js build/javascripts/jquery.js')
		sh('cp app/favicon.ico build/');

	});
};