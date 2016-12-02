module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);



  var javascriptFiles = [
    'source/app.js', 'source/**/**.js', 'dist/templates.js',
  ];

  var libraryFiles = [
    'bower_components/angular/angular.min.js',
  //  'bower_components/angular-animate/angular-animate.min.js',
//    'bower_components/angular-touch/angular-touch.min.js',
  //  'bower_components/tg-angular-validator/dist/angular-validator.min.js',
  //  'bower_components/ng-fastclick/dist/index.min.js',
  //  'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  //  'bower_components/textAngular/dist/textAngular-sanitize.js',
//    'bower_components/lodash/dist/lodash.min.js',
//    'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
//    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
  //  'bower_components/moment/min/moment.min.js',
  //  'bower_components/firebase/firebase.js',
  //  'bower_components/angularfire/dist/angularfire.min.js',
//  "bower_components/percircle/dist/css/percircle.css",

    'bower_components/jquery/dist/jquery.min.js',
    "bower_components/semantic/dist/semantic.min.js"


  ]

  var cssFiles = [
  //  "bower_components/percircle/dist/css/percircle.css",
    "bower_components/semantic/dist/semantic.min.css",
    "source/**/*.css"
  ];




  grunt.initConfig({
    ngtemplates: {
      app: {
        src: '**/**.view.html',
        dest: 'dist/templates.js',
        options: {
          url: function(url) {
            return url.replace('.view.html', '').replace('source/', '');
          },
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true, // Only if you don't use comment directives!
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        }
      }
    },
    concat: {
      library: {

        src: libraryFiles,
        dest: 'dist/library.js'

      },
      app: {

        src: javascriptFiles,
        dest: 'dist/app.js'

      },
      together: {

        src: [
          'dist/library.js',
          'dist/app.js'
        ],
        dest: 'dist/app.js'

      }
    },
    watch: {
      js: {
        files: 'source/**/**.js',
        tasks: ['concat']
      },
      css: {
        files: 'source/**/**.css',
        tasks: ['concat_css']
      },
      view: {
        files: 'source/**/**.view.html',
        tasks: ['ngtemplates', 'concat']
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'dist/app.js': ['dist/app.js']
        }
      }
    },
    removelogging: {
      dist: {
        src: "dist/app.js",
        dest: "dist/app.js",

        options: {
          // see below for options. this is optional.
        }
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
    },
    concat_css: {
      options: {
        // Task-specific options go here.
      },
      all: {
        src: cssFiles,
        dest: "dist/app.css"
      },
    }

  });



  grunt.registerTask('default', ['ngtemplates', 'concat_css', 'concat', 'watch']);
  grunt.registerTask('compile', ['ngtemplates', 'concat_css', 'concat:library', 'concat:app', 'removelogging', 'concat:together', 'uglify', 'cssmin']);


};
