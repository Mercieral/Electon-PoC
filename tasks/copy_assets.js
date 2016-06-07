var sh = require('sync-exec');

module.exports = function(grunt) {
	grunt.registerTask('copy_assets', function() {
		sh('mkdir -p build/js');
		sh('cp -R app/js/util build/js/util');
		sh('cp app/favicon.ico build/');
		sh('cp app/index.html build/index.html');
        sh('cp app/main.js build/main.js');
        sh('cp app/package.json build/package.json');
		sh('cp app/start-electron.js build/start-electron.js');
		sh('cp -R build_node_modules build/node_modules');
	});
};