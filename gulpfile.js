var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.less('app.less')
       .browserify('index.js')
       .copy('node_modules/bootstrap/fonts/', 'public/fonts/')
       .copy('node_modules/font-awesome/fonts/', 'public/fonts/')
       .copy('resources/assets/js/vendor/', 'public/js/vendor/');
});
