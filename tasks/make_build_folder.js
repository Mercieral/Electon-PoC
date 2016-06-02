var sh = require('sync-exec');

module.exports = function(grunt) {
	grunt.registerTask('make_build_folder', function() {
		sh('rm -rf build');
		sh('mkdir build');
	});
};