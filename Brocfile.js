var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');
var tsc = require('broccoli-typescript-compiler').typescript;
var watchify = require('broccoli-watchify');
var sass = require('broccoli-sass');
var Reload = require('broccoli-livereload');

var js = tsc('app', {
    tsconfig: {
        compilerOptions: {
            module: 'commonjs',
            target: 'es5',
            strict: true,
            sourceMap: true
        },
        files: [
            'main.ts'
        ]
    },
});

var app = watchify(js, {
    browserify: {
        entries: ['main.js'],
        debug: true
    },
    outputFile: 'app.js',
    cache: true
});

var html = funnel('app', {
    include: ['index.html']
});

var styles = sass(['app/resources'], 'app.scss', 'app.css');

var images = funnel('app', {
    include: ['resources/*.png']
});

var merged = merge([app, html, styles, images]);

var tree = new Reload(merged, {
    target: 'index.html'
});

module.exports = tree;

