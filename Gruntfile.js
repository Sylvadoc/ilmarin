require('load-grunt-tasks')(grunt);

grunt.initConfig({
    cssnano: {
        options: {
            sourcemap: true
        },
        dist: {
            files: {
                'css/main.css': 'cssprod/main.css',
                'css/article.css': 'cssprod/article.css',
                'css/chronique.css': 'cssprod/chronique.css',
                'css/fantasy.css': 'cssprod/fantasy.css',
                'css/tolkien.css': 'cssprod/tolkien.css',
            }
        }
    }
});

grunt.registerTask('default', ['cssnano']);