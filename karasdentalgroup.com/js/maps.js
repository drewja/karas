var showMapInfo = {
    'Elroy': null,
    'Necedah': null,
    'CottageGrove': null
}
var locations = [
    ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Elroy Location</span><br />1104 Academy Street<br />Elroy, WI 53929<br /><strong>Phone:</strong><a href="tel:6084628282"> (608) 462-8282</a><br /><strong>Fax:</strong> (608) 462-8250<br /> ', 43.74816, -89.87307, 1, 'Elroy'],
    ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Necedah Location</span><br />1412 Wheelihan Avenue<br /> Necedah, WI 54646<br /><strong>Phone:</strong><a href="tel:6085657173"> (608) 565-7173</a><br /><strong>Fax:</strong> (608) 565-2734<br /> ', 44.00815, -90.06928, 2, 'Necedah'],
    ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Cottage Grove Location</span><br />2848 West Cottage Grove Rd.<br />Cottage Grove, WI 53527<br /><strong>Phone:</strong><a href="tel:6088396363"> (608) 839-6363</a><br /> ', 43.090243, -89.224976, 3, 'CottageGrove'],
];

function newMap(mapelem, list){
    var map = new google.maps.Map(mapelem, {
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
        let button = list[i];
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map
        });

        f = showMapInfo[nam] = function() {
            infowindow.setContent(html);
            infowindow.open(map, marker);
            list.removeClass('active');
            $(button).addClass('active');
        };

        google.maps.event.addListener(marker, 'click', f);
    }
}