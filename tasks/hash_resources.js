var fs = require('fs');
var crypto = require('crypto');

var FILES = ['javascripts/app.js', 'javascripts/vendor_full.js', 'javascripts/vendor_minimal.js', 
	'javascripts/templates.js', 'stylesheets/style.css', 'stylesheets/vendor_full.css',
	'stylesheets/vendor_minimal.css'];

module.exports = function(grunt) {
	grunt.registerTask('hash_resources', function() {
		var appFileName;
		FILES.forEach(function(filename) {
			var contents = fs.readFileSync('build/' + filename, { encoding: 'utf8' });
			var md5 = crypto.createHash('md5').update(contents).digest('hex');
			var hashedName = createFileName(filename, md5);
			renameFile(filename, hashedName);
			if(filename === 'javascripts/app.js'){
				appFileName = 'build/' + hashedName;
			}

			var htmlFiles = grunt.file.expand('build/pages/*.html').concat(['build/index.html', appFileName]);
			updateFiles(filename, hashedName, htmlFiles);
		});
	});
};

function createFileName(filename, hash) {
	var parts = filename.split('.');
	return parts[0] + '_' + hash + '.' + parts[1];
}

function renameFile(oldName, newName) {
	fs.renameSync('build/' + oldName, 'build/' + newName);
}

function updateFiles(oldName, newName, files) {
	files.forEach(function(fileName) {
		var contents = fs.readFileSync(fileName, { encoding: 'utf8' });
		var updated = contents.replace(oldName, newName);
		fs.writeFileSync(fileName, updated);
	});
}