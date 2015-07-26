require('jquery-lazyload/jquery.lazyload');

var FastClick = require('fastclick');

$(function() {
    FastClick(document.body);
});

$(function() {
    $("img.lazy").lazyload({
        event : "loadSponsorImages"
    });
});

require('bootstrap/js/modal');
var moment = require('moment');
require('moment/locale/lv');
moment.locale('lv');

require('../../../bower_components/retina.js/dist/retina');
require('zepto.backstretch/zepto.backstretch.min');

require('./twitter-fetcher');
require('./timecircles');

var countdown =  $('#countdown');



$(window).load(function() {
    $.backstretch([
        '/img/bg2.jpg',
        '/img/bg3.jpg',
        '/img/bg4.jpg',
        '/img/bg5.jpg',
      ], {duration: 4000, fade: 750});

    $('#preloader .spinner').hide();
    $('#preloader').delay(350).fadeOut('slow');
    $('section').show();
    createTimeCicles();
    countdown.delay(350).addClass('animated bounceIn');

    $.getJSON('https://picasaweb.google.com/data/feed/api/user/106491134644784033245',
        {
            'kind': 'album',
            'alt': 'json',
            'v': '2.0',
            'max-results': '8',
            'fields': "entry(gphoto:id,title,media:group(media:content(@url))),title",
        }, function(json) {
            var galleryBoxes = $('.gallery-box');
            $.each(json.feed.entry, function(idx, obj) {
                var item = galleryBoxes[idx];
                $(item).find('.project-category').html(obj.title.$t);
                $(item).attr('href', 'https://plus.google.com/u/0/photos/' + json.feed.title.$t + '/albums/' + obj.gphoto$id.$t);
                $(item).find('img').attr('src', obj.media$group.media$content[0].url.replace(/\/(?=[^\/]*$)/, '/s512-c/'));
            });
    });

    twitterFetcher.fetch({
        id: '579257548878061568',
        domId: 'timeline',
        maxTweets: 5,
        enableLinks: true,
        showUser: true,
        showImages: false,
        showInteraction: false,
        customCallback: function(tweets) {
            var n = 0;
            var x = tweets.length;
            var element = document.getElementById('timeline');
            var html = '';
            var el = document.createElement('div');
            while (n < x) {
                el.innerHTML = tweets[n];

                html += '<li class="' + (n%2 === 0 ? 'pos-right' : 'pos-left') + ' clearfix">';
                html += '<div class="timeline-badge"><i class="fa fa-twitter"></i></div>';
                html += '<div class="message"><div class="media">';
                html += '<div class="media-left">';
                html += '<a href="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].href + '">';
                html += '<img class="media-object" src="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src.replace('normal', '200x200') + '"/>';
                html += '</a>';
                html += '</div>';
                html += '<div class="media-body">';
                html += '<h4 class="media-heading">';
                html += '<a href="' + el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].href + '">';
                html += el.getElementsByClassName('user')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[1].innerHTML;
                html += '</a>';
                html += '</h4>';
                html += '<div class="timline-time"><small class="text-muted"><i class="fa fa-clock-o"></i> ';
                html += el.getElementsByClassName('timePosted')[0].innerHTML;
                html += '</small></div>';
                html += '<p>' + el.getElementsByClassName('tweet')[0].innerHTML + '</p>';
                html += '</div>';
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

    // var timeout = setTimeout(function() {
        $('img.lazy').trigger('loadSponsorImages');
    // }, 50);
});

$(window).on('resize', function() {
    countdown.TimeCircles().destroy();
    createTimeCicles();
});

$(function () {
    var parent = $(".sponsors .shuffle");
    var sponsorLogos = parent.children();
    while (sponsorLogos.length) {
        parent.append(sponsorLogos.splice(Math.floor(Math.random() * sponsorLogos.length), 1)[0]);
    }
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
