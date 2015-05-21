var elixir = require('laravel-elixir');
require('laravel-elixir-icons');

elixir(function(mix) {
    mix.less('app.less')
       .icons({
           template: 'resources/assets/less/_icons.less',
       })
       .browserify('index.js')
       .copy('node_modules/bootstrap/fonts/', 'public/fonts/')
       .copy('node_modules/font-awesome/fonts/', 'public/fonts/')
       .copy('resources/assets/js/vendor/', 'public/js/vendor/');
});
