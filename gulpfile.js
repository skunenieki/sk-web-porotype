var elixir = require('laravel-elixir');
require('laravel-elixir-browserify');

elixir(function(mix) {
    mix.less('app.less')
       .browserify('app.js');
});
