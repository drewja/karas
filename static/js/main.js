$(document).ready(function () {
    $("nav").find("li").on("click", "a", function () {
        $('.navbar-collapse.in').collapse('hide');
    });
});

var pages = {
    'index': $('#index'),
    'contact': $('#contact'),
    'about': $('#about'),
    'services': $('#services'),
    'team': $('#team')
}
var loaders = {
    'index': function () {
        $.backstretch(["./img/KarasDental_team.tall.jpg"]);
    },
    'contact': function () {
        initBranches();
    }
}
var unloader = {
    'index': function () {
        if ($("body").data("backstretch")) $.backstretch('destroy');
    },
    'contact': function() {
        $('#map_branches').empty();
    }
}

var loadPage = function (page) {
    $(window).scrollTop(0);
    pages[page].show().addClass('active');
    if (loaders[page]) loaders[page]();
}

function unloadPage() {
    id = $('.container.page.active').hide().removeClass('active').attr('id');
    if (unloader[id]) unloader[id]();
}


$('.navbar-nav>li>a').click(
    function (ev) {
        t = $(ev.target);
        if (t.parent().hasClass('active')) return;
        $('.navbar-nav>.active').removeClass('active');
        t.parent().addClass('active')
        page = t.data('target');
        unloadPage();
        loadPage(page);
    }
);
loadPage('index');

var locations = [{
        "name": "Elroy",
        "address": {
            "street": "1104 Academy Street",
            "city": "Elroy",
            "state": "Wisconsin",
            "zip": "53929",
            "coordinates": ["43.74816", "-89.87307"]
        },
        "phone": "6084628282",
        "fax": "6084628250",
        "email": ""
    },
    {
        "name": "Necedah",
        "address": {
            "street": "1412 Wheelihan Avenue",
            "city": "Necedah",
            "state": "Wisconsin",
            "zip": "54646",
            "coordinates": ["44.00815", "-90.06928"]
        },
        "phone": "6084628282",
        "fax": "",
        "email": ""
    },
    {
        "name": "Cottage Grove",
        "address": {
            "street": "2848 Cottage Grove Rd.",
            "city": "Cottage Grove",
            "state": "Wisconsin",
            "zip": "53527",
            "coordinates": ["43.090243", "-89.224976"]
        },
        "phone": "6084628282",
        "fax": "",
        "email": ""
    }
]

function initBranches() {
    var locations = [
        ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Elroy Location</span><br />1104 Academy Street<br />Elroy, WI 53929<br /><strong>Phone:</strong> (608) 462-8282<br /><strong>Fax:</strong> (608) 462-8250<br /> ', 43.74816, -89.87307, 1],
        ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Necedah Location</span><br />1412 Wheelihan Avenue<br /> Necedah, WI 54646<br /><strong>Phone:</strong> (608) 565-7173<br /><strong>Fax:</strong> (608) 565-2734<br /> ', 44.00815, -90.06928, 2],
        ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Cottage Grove Location</span><br />2848 West Cottage Grove Rd.<br />Cottage Grove, WI 53527<br /><strong>Phone:</strong> 608-839-6363<br /> ', 43.090243, -89.224976, 3],
    ];

    var map = new google.maps.Map(document.getElementById('map_branches'), {
        zoom: 7,
        center: new google.maps.LatLng(43.538855, -89.463380),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}