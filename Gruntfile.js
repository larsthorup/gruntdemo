module.exports = function (grunt) {
    var gruntConfig = {};


    // convenience
    grunt.registerTask('default', ['lint', 'test', 'coverage']);


    // lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    gruntConfig.jshint = {
        all: [
            '*.js',
            'src/**/*.js'
        ]
    };
    grunt.registerTask('lint', ['jshint']);

    // test
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    gruntConfig.jasmine = {
        src: {
            src: [
                'src/js/**/*.js'
            ],
            options: {
                specs: 'src/test/**/*.test.js',
                junit: {
                    path: 'output/testresults'
                }
            }
        }
    };
    gruntConfig.jasmine.src.options.keepRunner = true;
    grunt.registerTask('test', ['jasmine:src']);

    // coverage
    gruntConfig.jasmine.istanbul = {
        src: gruntConfig.jasmine.src.src,
        options: {
            specs: gruntConfig.jasmine.src.options.specs,
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
                coverage: 'output/coverage/coverage.json',
                report: [
                    {type: 'html', options: {dir: 'output/coverage'}},
                    {type: 'cobertura', options: {dir: 'output/coverage/cobertura'}},
                    {type: 'text-summary'}
                ]
            }
        }
    };
    grunt.registerTask('coverage', ['jasmine:istanbul']);

    // grunt
    grunt.initConfig(gruntConfig);
};