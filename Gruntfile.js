module.exports = function (grunt) {
    var gruntConfig = {};

    // lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    gruntConfig.jshint = {
        all: [
            '*.js',
            'src/**/*.js'
        ]
    };

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

    // grunt
    grunt.initConfig(gruntConfig);
};