module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass','shell']
      }
    },
    

    shell: {
         options: {
             stderr: false
         },
         multiple: {
             command: [
                 'blessc css/app.css css/appSplitted.css -x',
                 'sed -r -i \'s/\\@import.url\\(\\\'appSplitted\\-.*\\.css\\?z\\=.*\\\'\\)\\;//g\' css/*.css',
                 //Automation for magento css preparing
                 'rm -f css/magento/*',
                 'cp -f css/appSplitted*.css css/magento/',
                 'mv css/magento/appSplitted.css css/magento/app3.css',
                 'mv css/magento/appSplitted-blessed1.css css/magento/app2.css',
                 'mv css/magento/appSplitted-blessed2.css css/magento/app1.css',
                 //Replace paths for magento css
                 'sed -r -i \'s/\\/Content\\/fonts\\//..\\/fonts\\//g\' css/magento/*.css',
                 'sed -r -i \'s/\\/Content\\/img\\//..\\/images\\//g\' css/magento/*.css',
                 //Copy files back to magento - commented by default
                 'cp -f css/magento/*.css ../../postpaid_new/common/skin/frontend/enterprise/tele2se/css/'
             ].join('&&')
         }
    }
    
  });
  
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
}