var sh = require('sync-exec');

module.exports = function(grunt) {
	grunt.registerTask('copy_assets', function() {
		sh('mkdir -p build/fonts');
		sh('cp -r src/site/fonts/* build/fonts');

		sh('mkdir -p build/images');
		sh('cp -r src/site/images/* build/images');

		sh('mkdir -p build/javascripts');
		sh('cp -r src/site/javascripts/* build/javascripts');

		sh('mkdir -p build/pages');

		sh('cp src/site/favicon.ico build/');

		//Copy images needed for fancybox library
		sh('mkdir build/images/fancybox');
		sh('cp lib/fancybox/source/blank.gif build/images/fancybox/');
		sh('cp lib/fancybox/source/fancybox_loading.gif build/images/fancybox/');
		sh('cp lib/fancybox/source/fancybox_loading@2x.gif build/images/fancybox/');
		sh('cp lib/fancybox/source/fancybox_overlay.png build/images/fancybox/');
		sh('cp lib/fancybox/source/fancybox_sprite.png build/images/fancybox/');
		sh('cp lib/fancybox/source/fancybox_sprite@2x.png build/images/fancybox/');
	});
};