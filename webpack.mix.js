let mix = require('laravel-mix');

mix.js('public/electron.js', 'build')
    .webpackConfig(require('./webpack.config'));;