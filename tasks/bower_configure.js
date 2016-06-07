var fs = require('fs');
var sh = require('sync-exec');
var Hanldebars = require('handlebars');

var FULL_RELEASE = [
	'handlebars',
	'ember'
];

var FULL_DEVELOP = FULL_RELEASE.slice();
FULL_DEVELOP.splice(FULL_DEVELOP.indexOf('trackjs'), 1);

var MINIMAL_RELEASE = ['jquery', 'trackjs'];
var MINIMAL_DEVELOP = ['normalize-css', 'jquery'];

var MAIN_FILES = {

	'jquery': {
		js: ['dist/jquery.js']
	},

	'handlebars': {
		js: ['handlebars.runtime.js']
	},

	'ember': {
		js: ['ember.js']
	},
};

///////////////////////////////////////

module.exports = function(grunt) {
	grunt.registerTask('bower_develop', function() {
		bowerDevelop(false, false);
	});

	grunt.registerTask('bower_test', function() {
		bowerDevelop(true, false);
	});

	grunt.registerTask('bower_karma', function() {
		bowerDevelop(true, false);
	});

	function bowerDevelop(testMode, includeTestem) {
		// concatCss('vendor_full.css', FULL_DEVELOP, false);
		// concatCss('vendor_minimal.css', MINIMAL_DEVELOP, false);
		// concatJs('vendor_minimal.js', MINIMAL_DEVELOP, false);
        //
		// sh('cp -r lib build/');
	}

	grunt.registerTask('bower_debug', function() {
		concatCss('vendor_full.css', FULL_RELEASE, false);
		concatJs('vendor_full.js', FULL_RELEASE, false);
		concatCss('vendor_minimal.css', MINIMAL_RELEASE, false);
		concatJs('vendor_minimal.js', MINIMAL_RELEASE, false);


	});

	grunt.registerTask('bower_release', function() {
		concatCss('vendor_full.css', FULL_RELEASE, true);
		concatJs('vendor_full.js', FULL_RELEASE, true);
		concatCss('vendor_minimal.css', MINIMAL_RELEASE, true);
		concatJs('vendor_minimal.js', MINIMAL_RELEASE, true);

		writeIndexFile(['/js/util//vendor_full.js']);
	});
};

function getFiles(include, minified) {
	var files = {
		js: [],
		css: []
	};

	include.forEach(function(libraryName) {
		files.js = files.js.concat((MAIN_FILES[libraryName].js || []).map(function(file) {
			return 'js/util/' + libraryName + '/' + file;
		}));

		files.css = files.css.concat((MAIN_FILES[libraryName].css || []).map(function(file) {
			return 'js/util/' + libraryName + '/' + file;
		}));
	});

	if (minified) {
		files.js = files.js.map(function(file) {
			var min = file.replace(/\.js$/, '.min.js');
			return (fs.existsSync(min) ? min : file);
		});

		files.css = files.css.map(function(file) {
			var min = file.replace(/\.css$/, '.min.css');
			return (fs.existsSync(min) ? min : file);
		});
	}

	return files;
}

function concatCss(outputFile, include, minified) {
	fs.writeFileSync('build/css/' + outputFile, '');
	getFiles(include, minified).css.forEach(function(file) {
		fs.appendFileSync('build/css/' + outputFile, fs.readFileSync(file, {encoding: 'utf8'}));
		fs.appendFileSync('build/css/' + outputFile, '\n\n');
	});
}

function concatJs(outputFile, include, minified) {
	fs.writeFileSync('build/js/util' + outputFile, '');
	getFiles(include, minified).js.forEach(function(file) {
		fs.appendFileSync('build/js/util' + outputFile, fs.readFileSync(file, {encoding: 'utf8'}));
		fs.appendFileSync('build/js/util' + outputFile, ';\n\n');
	});
}

function writeIndexFile(files, testMode, includeTestem) {
    //If using this, be sure to have no ember helpers in index.html
	var template = Hanldebars.compile(fs.readFileSync('app/templates/index.html', {encoding: 'utf8'}));
	var html = template({files: files, test: !!testMode, testem: !!includeTestem});
	fs.writeFileSync('build/index.html', html);

}
