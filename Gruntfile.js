require('load-grunt-tasks')(grunt);

grunt.initConfig({
    cssnano: {
        options: {
            sourcemap: true
        },
        dist: {
            files: {
                'cssprod/main.css': 'css/main.css',
                'cssprod/article.css': 'css/article.css',
                'cssprod/chronique.css': 'css/chronique.css',
                'cssprod/fantasy.css': 'css/fantasy.css',
                'cssprod/tolkien.css': 'css/tolkien.css',
            }
        }
    }
});

grunt.registerTask('default', ['cssnano']);