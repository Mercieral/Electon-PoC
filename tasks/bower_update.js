var sh = require('sync-exec');

module.exports = function(grunt) {
	grunt.registerTask('bower_update', function() {
		console.log('Updating bower components...');
		sh('bower cache clean');
		sh('bower update');
	});
};