function collapseMenu() {
    $('.navbar-collapse.in').collapse('hide');
}

$(document).click(function (ev) {
    if ($('#navbar').hasClass('in')) {
        collapseMenu();
    }
})

var pages = {
    'index': $('#index'),
    'contact': $('#contact'),
    'about': $('#about'),
    'services': $('#services'),
    'team': $('#team')
}


var loader = {
    'index': function () {
        let bg = {'url':"./img/teamallweb.jpg", 'alignY':0.2, 'scale':"cover", 'orientation': "landscape"};            
        let w = $( window ).width();
        if (w < 928) {
            loadPage('about');
            return;
        }

        else $.backstretch([bg]);
        $(window).on("resize", function(){
            
            let w = $( window ).width();
            if (w < 928) {
                if ($("body").data("backstretch")) $.backstretch('destroy');
                unloadPage();
                loadPage('about');
            }
        })

    },
    'contact': function () {
        initBranches();
    }
}
var unloader = {
    'index': function () {
        if ($("body").data("backstretch")) $.backstretch('destroy');
        $(window).off("resize");
    },
    'contact': function () {
        $('#map_branches').empty();
    }
}

function loadPage(page) {
    collapseMenu();
    $(window).scrollTop(0);
    pages[page].show().addClass('active');
    let q = '.navbar-nav li>a[data-target="' + page + '"]';
    $(q).parent().addClass('active');
    if (loader[page]) loader[page]();
}

function unloadPage() {
    $('.navbar-nav li.active').removeClass('active');
    id = $('.container.page.active').hide().removeClass('active').attr('id');
    if (unloader[id]) unloader[id]();
}

function pageExists(page) {
    if (pages[page]) return true;
    return false;
}

$('.navbar-nav li>a').click(
    function (ev) {
        t = $(ev.target);
        page = t.data('target');
        if (!pageExists(page) ||
            t.parent().hasClass('dropdown') ||
            t.parent().hasClass('.active')) {
            return;
        }
        unloadPage();
        t.parent().addClass('active');
        loadPage(page);
    }
);
$('.navbar-brand').click(function(ev){
    unloadPage();
    loadPage('index');
    $('.navbar-nav li.active').removeClass('active');

})
loadPage('index');

var showMapInfo ={
    'elroy': null,
    'necedah': null,
    'cottagegrove':null
}

function initBranches() {
    var locations = [
        ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Elroy Location</span><br />1104 Academy Street<br />Elroy, WI 53929<br /><strong>Phone:</strong><a href="tel:6084628282"> (608) 462-8282</a><br /><strong>Fax:</strong> (608) 462-8250<br /> ', 43.74816, -89.87307, 1, 'elroy'],
        ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Necedah Location</span><br />1412 Wheelihan Avenue<br /> Necedah, WI 54646<br /><strong>Phone:</strong><a href="tel:6085657173"> (608) 565-7173</a><br /><strong>Fax:</strong> (608) 565-2734<br /> ', 44.00815, -90.06928, 2, 'necedah'],
        ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Cottage Grove Location</span><br />2848 West Cottage Grove Rd.<br />Cottage Grove, WI 53527<br /><strong>Phone:</strong><a href="tel:6088396363"> (608) 839-6363</a><br /> ', 43.090243, -89.224976, 3, 'cottagegrove'],
    ];

    var map = new google.maps.Map(document.getElementById('map_branches'), {
        zoom: 7,
        center: new google.maps.LatLng(43.538855, -89.463380),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var i;

    for (i = 0; i < locations.length; i++) {
        let ra = locations[i];
        let html = ra[0];
        let lat = ra[1];
        let long = ra[2];
        let nam = ra[4];

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map
        });

        f = showMapInfo[nam] = function(){
            infowindow.setContent(html);
            infowindow.open(map, marker);
        };

        google.maps.event.addListener(marker, 'click', f);
    }
}