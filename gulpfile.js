var elixir = require('laravel-elixir');
require('laravel-elixir-icons');
require('laravel-elixir-imagemin');

elixir(function(mix) {
    mix.icons({
           template: 'resources/assets/less/_icons.less',
       })
       .imagemin('resources/assets/img/**/*', 'public/img')
       .less('app.less')
       .browserify('index.js')
       .copy('node_modules/bootstrap/fonts', 'public/fonts/')
       .copy('node_modules/font-awesome/fonts', 'public/fonts')
       .copy('resources/assets/js/vendor', 'public/js/vendor');
});
