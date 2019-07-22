let mix = require('laravel-mix');
let IconfontPlugin = require('webpack-iconfont-plugin');

mix.setPublicPath('public/')
   .js('resources/assets/js/index.js', 'js/')
   .less('resources/assets/less/app.less', 'css/', {
        javascriptEnabled: true
   })
   .sass('resources/assets/sass/icon-font.scss', 'css/')
   .webpackConfig({
     plugins: [
        new IconfontPlugin({
            svgs: 'resources/assets/icons/*.svg',
            fonts: 'public/fonts',
            styles: 'resources/assets/sass/icon-font.scss',
            template: 'resources/assets/sass/icon-font.scss.njk',
            fontName: 'icon',
            cssFontPath: '/fonts/',
            normalize: true,
            fontHeight: 500
        })
     ]
   })
   .version()
   .disableNotifications();
