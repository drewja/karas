

app = new App();
app.name = "karas";
app.container = document.getElementsByClassName("karas-container")[0];

app.route('/', 'index',
    (swap) => {
        document.querySelector('[data-karas="about"]').click();
    }
);

app.route('/about', 'about',
    (swap) => {
        htmlFileLoader('pages/about.html', (html)=> swap(html, true));
    }
);

var mapelem = null;

app.route('/contact', 'contact', 
    (swap) => {

        htmlFileLoader('pages/contact.html', (html)=> {
            swap(html, true);
            if (mapelem) return;

            var showMapInfo = {
                'elroy': null,
                'necedah': null,
                'cottagegrove': null
            }
            var locations = [
                ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Elroy Location</span><br />1104 Academy Street<br />Elroy, WI 53929<br /><strong>Phone:</strong><a href="tel:6084628282"> (608) 462-8282</a><br /><strong>Fax:</strong> (608) 462-8250<br /> ', 43.74816, -89.87307, 1, 'elroy'],
                ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Necedah Location</span><br />1412 Wheelihan Avenue<br /> Necedah, WI 54646<br /><strong>Phone:</strong><a href="tel:6085657173"> (608) 565-7173</a><br /><strong>Fax:</strong> (608) 565-2734<br /> ', 44.00815, -90.06928, 2, 'necedah'],
                ['<span style="font-size:14px; font-weight:bold; color:#5AA426;">Cottage Grove Location</span><br />2848 West Cottage Grove Rd.<br />Cottage Grove, WI 53527<br /><strong>Phone:</strong><a href="tel:6088396363"> (608) 839-6363</a><br /> ', 43.090243, -89.224976, 3, 'cottagegrove'],
            ];
            mapelem = document.getElementById('map_branches');
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
        
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, long),
                    map: map
                });
        
                f = showMapInfo[nam] = function() {
                    infowindow.setContent(html);
                    infowindow.open(map, marker);
                };
        
                google.maps.event.addListener(marker, 'click', f);
            }
        })
    }
);

app.route('/services', 'services', 
    (swap) => {
        htmlFileLoader('pages/services.html', (html)=> swap(html, false));
    }
);

app.route('/team', 'team', 
    (swap) => {
        htmlFileLoader('pages/team.html', (html)=> swap(html, false));
    }
);

app.run();

const shrink = cssAnimation('shrink', `
from {
    top:0;
}
to {
    top:100px;
    height:400px;
}`, 500);

const shrinkEls = document.getElementsByClassName('scrollShrink')

const doShrink = shrink(shrinkEls);