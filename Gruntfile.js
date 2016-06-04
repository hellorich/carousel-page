'use strict';

module.exports = function(grunt) {

  // Grunt task timing
  require('time-grunt')(grunt);
  
  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  // Paths
  var path = {
    conf: 'config',
    src: 'src',
    dest: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    
    path: path,

    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint']
      },
      requirejs: {
        files: '<%= path.src %>/js/**/*.js',
        tasks: ['newer:requirejs']
      },
      sass: {
        files: '<%= path.src %>/sass/**/*.scss',
        tasks: ['newer:sass'],
      },
      imagemin: {
        files: '<%= path.src %>/img/**/*.{gif,png,jpg,svg}',
        tasks: ['newer:imagemin']
      },
      mustache_render: {
        files: '<%= path.src %>/mustache/**/*.{mustache,json}',
        tasks: ['newer:mustache_render']
      }
    },

    // Build

    requirejs: {
      compile: {
        options : {
          baseUrl: '',
          include: '<%= path.src %>/js/main',
          mainConfigFile: '<%= path.conf %>/require.js',
          name: '<%= path.src %>/js/lib/almond',
          out: '<%= path.dest %>/assets/js/scripts.js'
        }        
      }
    },

    sass: {
      dist: {
        options: {
          includePaths: require('node-neat').includePaths,
          style: 'compressed'
        },
        files: {
          '<%= path.dest %>/assets/css/styles.css': '<%= path.src %>/sass/manifest.scss'
        }
      }
    },

    imagemin: {
      gif: {
        files: [
          {
            dest: '<%= path.dest %>/assets/img/gif/',
            expand: true,
            ext: '.gif',
            flatten: true,
            src: ['<%= path.src %>/img/gif/*.gif']
          }
        ]
      },
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            dest: '<%= path.dest %>/assets/img/png/',
            expand: true,
            ext: '.png',
            flatten: true,
            src: ['<%= path.src %>/img/png/*.png']
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            dest: '<%= path.dest %>/assets/img/jpg/',
            expand: true,
            ext: '.jpg',
            flatten: true,
            src: ['<%= path.src %>/img/jpg/*.jpg'],
          }
        ]
      },
      svg: {
        options: {
          plugins: [
            {removeViewBox: false}
          ],
        },
        files: [
          {
            dest: '<%= path.dest %>/assets/img/svg/',
            expand: true,
            ext: '.svg',
            flatten: true,
            src: ['<%= path.src %>/img/svg/*.svg']
          }
        ]
      }
    },

    mustache_render: {
      options: {
        directory: '<%= path.src %>/mustache/',
        pretty: true
      },
      templates: {
        files: [
          {
            data: '<%= path.src %>/mustache/data/index.json',
            template: '<%= path.src %>/mustache/index.mustache',
            dest: '<%= path.dest %>/index.html'
          }
        ]
      }
    },

    // Tests

    jshint: {
      options: {
        force: true,
        jshintrc: '<%= path.conf %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= path.src %>/js/{,*/}*.js',
        '!<%= path.src %>/js/lib/*'
      ]
    },

    scsslint: {
      options: {
        bundleExec: false,
        config: '<%= path.conf %>/.scss-lint.yml',
        reporterOutput: null
      },
      files: [
        '<%= path.src %>/sass'
      ]
    },

    // Display
    
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '<%= path.dest %>/assets/js/*.js',
            '<%= path.dest %>/assets/css/*.css',
            '<%= path.dest %>/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: '<%= path.dest %>'
        }
      }
    }

  });

  grunt.registerTask('make', [
    'requirejs',
    'sass',
    'imagemin',
    'mustache_render'
  ]);
  
  grunt.registerTask('go', [
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('check:sass', ['scsslint']);
  
  grunt.registerTask('check:js', ['jshint']);

};
