module.exports = function(grunt) {

    require('load-grunt-plugins-from-parent')(grunt);

    var cssFiles = [


      "bower_components/semantic/dist/semantic.min.css",


    ];


    grunt.initConfig({
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: cssFiles,
                dest: "./dist/app.css"
            },
        },
        watch: {
            css: {
                files: './src/**/**.css',
                tasks: ['concat_css']
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/app.css': ['dist/app.css']
                }
            }
        }
    });

    grunt.loadNpmTasksFromParent('grunt-concat-css');
    grunt.loadNpmTasksFromParent('grunt-contrib-cssmin');
    grunt.loadNpmTasksFromParent('grunt-contrib-watch');




    grunt.registerTask('prod', ['concat_css', 'cssmin']);
    grunt.registerTask('default', ['concat_css', 'watch']);


};
