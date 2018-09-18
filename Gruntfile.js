module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        port: 9000,
        hostname: '*'
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    }
  });

};
