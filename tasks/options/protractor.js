module.exports = {
	all: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'all'
			}
		}
	},
	admin: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'admin'
			}
		}
	},
	docs: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'docManagement'
			}
		}
	},
	project: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'projectManagement'
			}
		}
	},
	designControls: {
		options:  {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'designControls'
			}
		}
	},
	designReviews: {
		options:  {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'designReviews'

			}
		}
	},
	riskManagement: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'riskManagement'
			}
		}
	},
	dashboard: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'dashboard'
			}
		}

	},
	user: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'user'
			}
		}

	},
	multiOrg: {
		options: {
			configFile: 'test/e2e/protractor.conf.js',
			args: {
				webdriverManagerUpdate: true,
				suite: 'multiOrg'
			}
		}
	}
};