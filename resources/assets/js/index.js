require('jquery-lazyload/jquery.lazyload');

$(function() {
    $("img.lazy").lazyload({
        event : "loadSponsorImages"
    });
});

require('bootstrap/js/modal');
require('bootstrap/js/modal');
require('bootstrap/js/dropdown');
var moment = require('moment');
require('moment/locale/lv');
moment.locale('lv');

require('retina.js');
require('zepto.backstretch/zepto.backstretch.min');

require('twitter-fetcher');
require('./timecircles');

var countdown =  $('#countdown');

var hogan = require('hogan.js');

var algoliasearch       = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');

var Chart = require('chart.js');

var currentYear = new Date().getFullYear();
var chartLabels = [];
for (var i = 1996; i <= currentYear; ++i) {
    chartLabels.push(i);
}

window.loadResults = function (id) {
    if (typeof window.myChart !== 'undefined') {
        window.myChart.destroy();
    };

    window.index.getObject(id, function(err, content) {
        jQuery('#results-name').html(content.name + ' (' + content.birthYear + ')');

        jQuery('#results-table-rows').html('');

        var chartTimes = [];
        for (var i = 1996; i <= currentYear; ++i) {
            if (typeof content.results[i] !== 'undefined') {
                if (content.results[i].resultInSeconds > 10800) {
                    // If result is more than 3 hours, most likely the participant was DSQ or DNF.
                    chartTimes.push(null);
                } else {
                    chartTimes.push(content.results[i].resultInSeconds);
                }
            } else {
                chartTimes.push(null);
            }
        }

        for (var idx in content.results) {
            // If result is more than 3 hours, most likely the participant was DSQ or DNF.
            if (content.results[idx].resultInSeconds > 10800) {
                content.results[idx].result = '-';
                content.results[idx].rankInGroup = '-';
                content.results[idx].rankInSummary = '-';
            }

            jQuery('#results-table-rows').prepend(
                '<tr>'+
                    '<td>' + idx + '</td>' +
                    '<td>' + content.results[idx].result + '</td>' +
                    '<td>' + content.results[idx].group + '</td>' +
                    '<td>' + content.results[idx].rankInGroup + '</td>' +
                    '<td>' + content.results[idx].rankInSummary +'</td>' +
                '</tr>'
            );
        }

        var ctx = document.getElementById('charContainer');
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Rezultāts',
                    data: chartTimes,
                    borderColor: [
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 2,
                    fill :false,
                    yAxisID: 'y-axis-1',
                }]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function (item) {
                            return moment("2000-01-01").startOf('day')
                                .seconds(item.value)
                                .format('HH:mm:ss');
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        id: 'y-axis-1',
                        ticks: {
                            // beginAtZero: false,
                            min: 600,
                            stepSize: 120,
                            callback: function(value, index, values) {
                                return moment("2000-01-01").startOf('day')
                                    .seconds(value)
                                    .format('HH:mm:ss');
                            }
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            stepSize: 1
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0 // disables bezier curves
                    }
                }
            }
        });
    });
}

$(window).on('load', function() {
    twitterFetcher.fetch({
        // id: '579257548878061568',
        profile: {
            screenName: 'skunenieki'},
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
                html += el.getElementsByClassName('user')[0].getElementsByTagName('div')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].getElementsByTagName('span')[0].innerHTML;
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

    $.backstretch([
        '/img/bg2.jpg',
        '/img/bg3.jpg',
        '/img/bg4.jpg',
        '/img/bg5.jpg',
      ], {duration: 4000, fade: 750});

    $('#preloader .spinner').hide();
    $('#preloader').delay(350).fadeOut('slow');
    $('section').show();

    // if (moment().diff('2019-08-11T11:00:00.000+0300', 'seconds') > 0 || window.location.href.indexOf('algolia') !== -1) {
        $('section.intro .container').show();
        var $inputField = $('#q');
        var $hits       = $('#hits');
        var algolia     = algoliasearch('11X587TMXX', 'ae23277fdfd08d42c4e83b673f79c536');
        var helper      = algoliasearchHelper(algolia, 'skunenieki', {
            hitsPerPage: 5,
            highlightPreTag: '<strong>',
            highlightPostTag: '</strong>',
        });

        window.index = algolia.initIndex('skunenieki');

        var hitTemplate = hogan.compile($('#hit-template').text());

        $inputField.on('keyup', function() {
            if (this.value.length === 1) {
                ga('send', 'event', 'search', 'type');
            }

            var query = $inputField.val();
            if (query == '') {
                $('.search-results').slideUp({
                    done: function() {
                        $('.start-search').fadeIn();
                    },
                });
            } else {
                $('.start-search').hide();
                $('.search-results').show();
                helper.setQuery(query).search();
            }
        })
        .focus();

        helper.on('result', function(content, state) {
            var hitsHtml = '';
            for (var i = 0; i < content.hits.length; ++i) {
                var item = content.hits[i];

                var lastResultYear         = Math.max(...Object.keys(item.results));
                item.lastResult           = item.results[lastResultYear];
                item.lastResult.eventYear = lastResultYear;

                hitsHtml += hitTemplate.render(item);
            }
            if (content.hits.length === 0) {
                hitsHtml = '<li class="no-hits"><a>Rezultāti nav pieejami.. :(</a></li>';
            }
            hitsHtml += '<li class="algolia-logo"><img src="/img/algolia.svg"></li>';
            $hits.html(hitsHtml);
        });
    // }

    if (moment().diff('2019-08-11T11:00:00.000+0300', 'seconds') < 0) {
        createTimeCicles();
        countdown.delay(350).addClass('animated bounceIn');

        $(window).on('resize', function() {
            countdown.TimeCircles().destroy();
            createTimeCicles();
        });
    }

    $('img.lazy').trigger('loadSponsorImages');
});

jQuery('#q').on('click', function() {
    ga('send', 'event', 'search', 'click');
});

jQuery('.gallery-box').on('click', function() {
    ga('send', 'event', 'gallery', 'click');
});

jQuery('#nolikums').on('click', function() {
    ga('send', 'event', 'nolikums', 'click');
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

