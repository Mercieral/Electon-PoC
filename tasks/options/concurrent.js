module.exports = {
	options: {
		logConcurrentOutput: true,
		limit: 6
	},

	develop: {
		tasks: ['watch:templates', 'watch:app', 'watch:css', 'watch:site_pages', 'watch:static_assets', 'watch:tests']
	}
};