var $ = require('jquery');
window.jQuery = $;
window.$ = $;

require('./../../../bower_components/jquery-backstretch/jquery.backstretch.js');

var moment = require('moment');
require('moment/locale/lv');
moment.locale('lv');

require('./twitter-fetcher');
require('./timecircles');


$.backstretch('https://pbs.twimg.com/profile_banners/81058554/1397729260/1500x500');
var countdown =  $('#countdown');

$(window).load(function() {
    $('#preloader').delay(350).fadeOut('slow');
    $('section').show();
    // // $('body').delay(350).css({'overflow':'visible'});
    createTimeCicles();
    countdown.delay(350).addClass('animated bounceIn');
});

$(window).on('resize', function() {
    countdown.TimeCircles().destroy();
    createTimeCicles();
});

function createTimeCicles() {
    countdown.TimeCircles({
        fg_width: 0.013,
        bg_width: 0.6,
        circle_bg_color: '#ffffff',
        text_size: 0.09,
        time: {
            Days: {color: '#ccc'},
            Hours: {color: '#ccc'},
            Minutes: {color: '#ccc'},
            Seconds: {color: '#ccc'},
        }
    });
    $('.textDiv_Days h4').html('Dienas');
    $('.textDiv_Hours h4').html('Stundas');
    $('.textDiv_Minutes h4').html('Minūtes');
    $('.textDiv_Seconds h4').html('Sekundes');
}

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

            html += '<li class="' + (n%2 === 0 ? 'pos-right' : 'pos-left') + ' clearfix">';
            html += '<div class="timeline-badge"><i class="fa fa-twitter"></i></div>';
            html += '<div class="media">';
            html += '<div class="media-left">';
            html += '<a href="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].href + '">';
            html += '<img class="media-object" src="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src + '"/>';
            html += '</a>';
            html += '</div>';
            html += '<div class="media-body">';
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
