var fs = require('fs');
var sh = require('sync-exec');
var Hanldebars = require('handlebars');

var FULL_RELEASE = [
	'normalize-css',
	'handlebars',
	'ember'
];

var FULL_DEVELOP = FULL_RELEASE.slice();
FULL_DEVELOP.splice(FULL_DEVELOP.indexOf('trackjs'), 1);

var MINIMAL_RELEASE = ['normalize-css', 'jquery', 'trackjs'];
var MINIMAL_DEVELOP = ['normalize-css', 'jquery'];

var MAIN_FILES = {

	'normalize-css': {
		css: ['normalize.css']
	},

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
		concatCss('vendor_full.css', FULL_DEVELOP, false);
		concatCss('vendor_minimal.css', MINIMAL_DEVELOP, false);
		concatJs('vendor_minimal.js', MINIMAL_DEVELOP, false);

		var files = getFiles(FULL_DEVELOP, false).js.map(function(file) {
			return '/' + file;
		});

		writeIndexFile(files, testMode, includeTestem);

		sh('cp -r lib build/');
	}

	grunt.registerTask('bower_debug', function() {
		concatCss('vendor_full.css', FULL_RELEASE, false);
		concatJs('vendor_full.js', FULL_RELEASE, false);
		concatCss('vendor_minimal.css', MINIMAL_RELEASE, false);
		concatJs('vendor_minimal.js', MINIMAL_RELEASE, false);

		writeIndexFile(['/javascripts/vendor_full.js']);
	});

	grunt.registerTask('bower_release', function() {
		concatCss('vendor_full.css', FULL_RELEASE, true);
		concatJs('vendor_full.js', FULL_RELEASE, true);
		concatCss('vendor_minimal.css', MINIMAL_RELEASE, true);
		concatJs('vendor_minimal.js', MINIMAL_RELEASE, true);

		writeIndexFile(['/javascripts/vendor_full.js']);
	});
};

function getFiles(include, minified) {
	var files = {
		js: [],
		css: []
	};

	include.forEach(function(libraryName) {
		files.js = files.js.concat((MAIN_FILES[libraryName].js || []).map(function(file) {
			return 'lib/' + libraryName + '/' + file;
		}));

		files.css = files.css.concat((MAIN_FILES[libraryName].css || []).map(function(file) {
			return 'lib/' + libraryName + '/' + file;
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
	fs.writeFileSync('build/stylesheets/' + outputFile, '');
	getFiles(include, minified).css.forEach(function(file) {
		fs.appendFileSync('build/stylesheets/' + outputFile, fs.readFileSync(file, {encoding: 'utf8'}));
		fs.appendFileSync('build/stylesheets/' + outputFile, '\n\n');
	});
}

function concatJs(outputFile, include, minified) {
	fs.writeFileSync('build/javascripts/' + outputFile, '');
	getFiles(include, minified).js.forEach(function(file) {
		fs.appendFileSync('build/javascripts/' + outputFile, fs.readFileSync(file, {encoding: 'utf8'}));
		fs.appendFileSync('build/javascripts/' + outputFile, ';\n\n');
	});
}

function writeIndexFile(files, testMode, includeTestem) {
    //If using this, be sure to have no ember helpers in index.hbs
	var template = Hanldebars.compile(fs.readFileSync('app/templates/index.hbs', {encoding: 'utf8'}));
	var html = template({files: files, test: !!testMode, testem: !!includeTestem});
	fs.writeFileSync('build/index.html', html);

    //attempt to use Ember's template compiler to provide Ember helper functionality (ex. link-to)
    // var compiler = require('ember-template-compiler');
    // var input = fs.readFileSync('app/templates/index.hbs', {encoding: 'utf8'})
    // var template = compiler.EmberHandlebars.compile(input);
    // var html = template({files: files, test: !!testMode, testem: !!includeTestem});
    // fs.writeFileSync('build/index.html', template);

}
