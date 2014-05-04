module.exports = function (grunt) {
    var gruntConfig = {};


    // convenience
    grunt.registerTask('default', ['lint', 'test', 'coverage', 'karma:once']);


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


    // browser test
    grunt.loadNpmTasks('grunt-karma');
    gruntConfig.karma = {};
    gruntConfig.karma.server = {
        options: {
            plugins: ['karma-jasmine', 'karma-firefox-launcher'],
            frameworks: ['jasmine'],
            files: ['src/js/**/*.js', 'src/test/**/*.test.js'],
            browsers: ['Firefox']
        },
        background: true
    };
    gruntConfig.karma.once = {
        options: gruntConfig.karma.server.options,
        singleRun: true
    };
    grunt.loadNpmTasks('grunt-contrib-watch');
    gruntConfig.watch = {
        karma: {
            files: ['src/**/*.js' ],
            tasks: ['karma:server:run']
        }
    };
    grunt.registerTask('karma:forever', ['karma:server:start', 'watch:karma']);


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