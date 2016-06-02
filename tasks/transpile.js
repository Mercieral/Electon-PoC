var fs = require('fs');
var path = require('path');
var sh = require('sync-exec');
var readdir = require('fs-readdir-recursive');
var transform = require('es6-module-jstransform');
var es6transpiler = require('es6-transpiler');

var PATH_TO_JS = path.resolve(process.cwd() + '/app/js');
var OUTPUT_FILE = path.resolve(process.cwd() + '/build/javascripts/app.js');

var LAST_TRANSPILE = 0;
var MODULE_CACHE = {};
var SCRIPT_CACHE = {};

module.exports = function(grunt) {
	grunt.registerTask('transpile', function() {
		console.log('Transpiling app...');
		sh('rm -rf ' + OUTPUT_FILE);
		compileApp();
		LAST_TRANSPILE = Date.now();
		console.log('...done. App written to ' + OUTPUT_FILE);
	});
};

function compileApp() {
	fs.appendFileSync(OUTPUT_FILE, 'console.log(\'App Version: ' + getGitHash() + '\');\n\n');
	concatenateScripts();
	concatenateModules();
	fs.appendFileSync(OUTPUT_FILE, '\nrequire(\'app\');');
}

function getGitHash() {
	try {
		return sh('git rev-parse HEAD').stdout.trim();
	} catch (e) {
		return 'Unknown Commit';
	}
}

function concatenateScripts() {
	var scriptNames = getScriptNames();
	var changedScripts = getChangedScripts(scriptNames);
	console.log('Re-compiling the following scripts: ' + changedScripts.join(', '));
	compileScripts(changedScripts);
	scriptNames.forEach(function(name) {
		fs.appendFileSync(OUTPUT_FILE, SCRIPT_CACHE[name]);
	});
}

function getScriptNames() {
	return readdir(PATH_TO_JS + '/scripts', function(name) {
		return name.substring(name.length - 3) === '.js';
	}).sort(function(a, b) {
		if (a === 'config.js') {
			return -1;
		} else if (b === 'config.js') {
			return 1;
		} else {
			return 0;
		}
	});
}

function getChangedScripts(scriptNames) {
	return scriptNames.filter(function(name) {
		var path = PATH_TO_JS + '/scripts/' + name;
		var stat = fs.statSync(path);
		return (stat.mtime.getTime() > LAST_TRANSPILE);
	});
}

function compileScripts(scriptNames) {
	scriptNames.forEach(function(name) {
		var path = PATH_TO_JS + '/scripts/' + name;
		var contents = fs.readFileSync(path, 'utf8');
		var wrappedContents = '(function() {\n\n' + contents + '\n\n})();\n';
		SCRIPT_CACHE[name] = convertES6Syntax(wrappedContents);
	});
}

function concatenateModules() {
	var moduleNames = getModulesNames();
	var changedModules = getChangedModules(moduleNames);
	console.log('Re-compiling the following modules: ' + changedModules.join(', '));
	compileModules(changedModules);
	moduleNames.forEach(function(name) {
		fs.appendFileSync(OUTPUT_FILE, MODULE_CACHE[name]);
	});
}

function getModulesNames() {
	return readdir(PATH_TO_JS).filter(function(name) {
		if (name.indexOf('scripts/') === 0) {
			return false;
		}

		return name.substring(name.length - 3) === '.js';
	}).map(function(name) {
		return name.substring(0, name.length - 3);
	});
}

function getChangedModules(moduleNames) {
	return moduleNames.filter(function(name) {
		var path = PATH_TO_JS + '/' + name + '.js';
		var stat = fs.statSync(path);
		return (stat.mtime.getTime() > LAST_TRANSPILE);
	});
}

function compileModules(moduleNames) {
	moduleNames.forEach(function(name) {
		MODULE_CACHE[name] = compileModule(name);
	});
}

function compileModule(moduleName) {
	var path = PATH_TO_JS + '/' + moduleName + '.js';
	var contents = fs.readFileSync(path, 'utf8');
	return convertES6Syntax(convertModuleSyntax(moduleName, contents));
}

function convertModuleSyntax(name, contents) {
	try {
		var converted = transform(contents).code;
		var modulePath = name.substring(0, name.lastIndexOf('/') >= 0 ? name.lastIndexOf('/') : 0);
		converted = normalizeModuleNames(modulePath, converted);

		return '\n' +
			'define(\'' + name + '\', function() {\n' +
				'let module = { exports: {} };\n\n' +
				converted + '\n\n' +
				'return module.exports;\n' +
			'});\n';
	} catch (error) {
		console.error('Error while converting module syntax. File contents:\n' + contents);
		throw error;
	}
}

function normalizeModuleNames(modulePath, contents) {
	var requirePattern = /require\((?:'|")([a-zA-Z0-9\/\\\._]+?)(?:'|")\)/g;

	return contents.replace(requirePattern, function(fullMatch, requiredModulePath) {
		var fullFilePath = path.resolve(PATH_TO_JS + '/' + modulePath + '/' + requiredModulePath + '.js');
		var fullModulePath = fullFilePath.substring(PATH_TO_JS.length + 1, fullFilePath.length - 3);
		return 'require(\'' + fullModulePath + '\')';
	});
}

function convertES6Syntax(contents) {
	var converted = es6transpiler.run({
		src: contents,
		disallowUnknownReferences: false,
		disallowDuplicated: false
	});

	if (converted.errors.length > 0) {
		console.error('Errors while converting ES6 syntax.');
		converted.errors.forEach(function(error) {
			console.error(error);
		});

		throw new Error('Couldn\'t convert ES6 syntax for file with contents:\n' + contents);
	}

	return converted.src;
}