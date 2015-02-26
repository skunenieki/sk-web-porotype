var $ = require('jquery');
window.jQuery = $;
window.$ = $;

(function($) {

    $.fn.parallax = function(options) {

        var windowHeight = $(window).height();

        // Establish default settings
        var settings = $.extend({
            speed        : 0.15
        }, options);

        // Iterate over each object in collection
        return this.each( function() {

            // Save a reference to the element
            var $this = $(this);

            // Set up Scroll Handler
            $(document).scroll(function(){

                    var scrollTop = $(window).scrollTop();
                        var offset = $this.offset().top;
                        var height = $this.outerHeight();

            // Check if above or below viewport
            if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                return;
            }

            var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

                 // Apply the Y Background Position to Set the Parallax Effect
                $this.css('background-position', 'center ' + yBgPosition + 'px');

            });
        });
    }
}(jQuery));

$('.bg-1').parallax({
    speed : 0.45
});

(function($) {
    /**
    * Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
    * according to the GMT+0 Timezone
    **/
    var launch = new Date(2015, 07, 8, 12, 00);
    /**
    * The script
    **/
    var days = $('#days h1');
    var hours = $('#hours h1');
    var minutes = $('#minutes h1');
    var seconds = $('#seconds h1');

    setDate();
    function setDate(){
        var now = new Date();
        if( launch < now ){
            days.html('0');
            hours.html('0');
            minutes.html('0');
            seconds.html('0');
        }
        else{
            var s = -now.getTimezoneOffset()*60 + (launch.getTime() - now.getTime())/1000;
            var d = Math.floor(s/86400);
            days.html(d);
            s -= d*86400;

            var h = Math.floor(s/3600);
            hours.html(h);
            s -= h*3600;

            var m = Math.floor(s/60);
            minutes.html(m);

            s = Math.floor(s-m*60);
            seconds.html(s);
            setTimeout(setDate, 1000);
        }
    }
})($);


console.log('loaded');




