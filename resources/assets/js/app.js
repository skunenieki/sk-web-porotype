var $ = require('jquery');
window.jQuery = $;
window.$ = $;

var moment = require('moment');
require('moment/locale/lv');
// require('./locale');
require('./twitter-fetcher');
require('./timecircles');

moment.locale('lv');


var countdown =  $('#countdown');

createTimeCicles();

$(window).on('resize', function() {
    countdown.TimeCircles().destroy();
    createTimeCicles();
    // countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
    //     countdown.removeClass('animated bounceIn');
    // });
});

function createTimeCicles() {
    // countdown.addClass('animated bounceIn');
    countdown.TimeCircles({
        fg_width: 0.013,
        bg_width: 0.6,
        circle_bg_color: '#ffffff',
        text_size: 0.09,
        time: {
            Days: {color: '#5bc0de'},
            Hours: {color: '#5bc0de'},
            Minutes: {color: '#5bc0de'},
            Seconds: {color: '#5bc0de'},
        }
    });
    // countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
    //     countdown.removeClass('animated bounceIn');
    // });
}

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

twitterFetcher.fetch({
    id: '579257548878061568',
    domId: 'timeline',
    maxTweets: 5,
    enableLinks: true,
    showUser: true,
    showInteraction: false,
    customCallback: function(tweets) {
        var n = 0;
        var x = tweets.length;
        var element = document.getElementById('timeline');
        var html = '';
        var el = document.createElement('div');
        while (n < x) {
            el.innerHTML = tweets[n];

            // console.log(el.innerHTML);

            html += '<li class="' + (n%2 === 0 ? 'timeline-inverted' : '') + '">';
            html += '<div class="info timeline-badge"><i class="fa fa-twitter"></i></div>';
            html += '<div class="timeline-panel media">';
            html += '<div class="media-left">';
            html += '<a href="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].href + '">';
            html += '<img class="media-object" src="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src + '"/>';
            html += '</a>';
            html += '</div>';
            html += '<div class="timeline-body media-body">';
            html += '<h4 class="media-heading">';
            html += '<a href="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].href + '">';
            html += el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[1].innerHTML;
            html += '</a>';
            html += '</h4>';
            html += '<p>' + el.getElementsByClassName('tweet')[0].innerHTML + '</p>';
            html += '<div class="timline-time"><small class="text-muted"><i class="fa fa-clock-o"></i> ';
            html += el.getElementsByClassName('timePosted')[0].innerHTML;
            html += '</small></div>';
            html += '</div>';
            html += '</div>';
            html += '</li>';

            n++;
        }
        element.innerHTML = html;
    },
    dateFunction: function(newDate, datetimeText) {
        return moment(newDate).format('LLL');
    }
});
