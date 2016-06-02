var fs = require('fs');
var Handlebars = require('handlebars');

var PAGES = [
	{ title: 'Sign In | Greenlight.guru', template: 'signin', isPasswordPage: false },
	{ title: 'Sign Up | Greenlight.guru', template: 'user_signup', isPasswordPage:true },
	{ title: 'Password Recovery | Greenlight.guru', template: 'send_reset_email', isPasswordPage: false },
	{ title: 'Reset Password | Greenlight.guru', template: 'reset_password', isPasswordPage: true },
	{ title: 'Sign Up | Greenlight.guru', template: 'organization_signup', isPasswordPage: false },
	{ title: 'Admin Sign In | Greenlight.guru', template: 'admin_signin', isPasswordPage: false },
	{ title: 'Invite Customer | Greenlight.guru', template: 'create_signup', isPasswordPage: false },
	{ title: 'Logged Out Due To Inactivity', template: 'inactivity_logout', isPasswordPage: true }
];

module.exports = function(grunt) {
	grunt.registerTask('build_site_pages', function() {
		var template = Handlebars.compile(readTemplateFile('base.hbs'));

		PAGES.forEach(function(page) {
			var data = {
				title: page.title,
				contents: readTemplateFile(page.template + '.html'),
				script: page.template + '.js',
				isPasswordPage: true
			};

			savePageToFile(page.template, template(data));
		});
	});
};

function readTemplateFile(fileName) {
	return fs.readFileSync('src/site/templates/' + fileName, { encoding: 'utf8' });
}

function savePageToFile(templateName, contents) {
	fs.writeFileSync('build/pages/' + templateName + '.html', contents);
}