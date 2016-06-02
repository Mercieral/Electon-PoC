var config = function(moduleName) {
    return require('./tasks/options/' + moduleName);
};

module.exports = function(grunt) {

    grunt.initConfig({
        ember_handlebars: config('ember_handlebars'),
        autoprefixer: config('autoprefixer'),
        sass: config('sass'),
        emberTemplates: config('ember_handlebars')
    })
    grunt.loadNpmTasks('grunt-ember-handlebars');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.task.loadTasks('./tasks');

    grunt.registerTask('build_app_js', ['ember_handlebars:all', 'transpile']);
    grunt.registerTask('build_app_css', ['sass:app', 'autoprefixer:app']);
    grunt.registerTask('build_source', ['make_build_folder', 'copy_assets', 'build_app_js', 'build_app_css']);
    grunt.registerTask('build_dev', ['bower_update', 'build_source', 'bower_develop']);
}