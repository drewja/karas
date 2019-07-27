var showMapInfo = {
    'Elroy': null,
    'Necedah': null,
    'CottageGrove': null
}
function htmlToElement(html) {
    var w = document.createElement('div');
    html = html.trim(); // Never return a text node of whitespace as the result
    w.innerHTML = html;
    return w.firstChild;
}
var Branches = {
    'elroy': {
        coords: [43.74816, -89.87307], //lat lng
        address: ['1104 Academy Street', 'Elroy', 'WI', '53929'], // street city state zip
        phone: '6084628282',
        fax: '6084628250',
        name: 'Elroy'
    },
    'necedah': {
        coords: [44.00815, -90.06928], //lat lng
        address: ['1412 Wheelihan Avenue', 'Necedah', 'WI', '54646'], // street city state zip
        phone: '6085657173',
        fax: '6085652734',
        name: 'Necedah'
    },
    'cottagegrove':{
        coords: [43.090243, -89.224976], //lat lng
        address: ['2848 West Cottage Grove Rd.','Cottage Grove', 'WI', '53527'], // street city state zip
        phone: '6088396363',
        fax: '',
        name: 'Cottage Grove'
    }
}

function phoneNumberFormat(nums){
    // try to convert the input to a formated phone number (XXX)-XXX-XXXX
    nums = nums.toString()
    nums = nums.replace(/[^0-9]/g,'');
    if (nums.length != 10) return "";
    return '(' + nums.slice(0, 3) + ')-' + nums.slice(3, 6) + '-' + nums.slice(6, 10);
}

function mapHtml(branch_id){
    branch = Branches[branch_id];

    r = [
        '<span style="font-size:14px; font-weight:bold; color:#5AA426;">',
        branch.name, 
        ' Location</span><br />',
        branch.address[0],
        '<br />',
        branch.address[1] + ', ',
        branch.address[2] + ' ',
        branch.address[3],
        '<br /><strong>Phone:</strong><a href="tel:',
        branch.phone,
        '"> ',
        phoneNumberFormat(branch.phone),
        '</a><br /><strong>Fax:</strong> ',
        phoneNumberFormat(branch.fax),
        '<br />'
    ];

    return r.join('');
}
/*
var NearestLocation = null;
function getNearestLocation(addr){
    var input_loc = null;
    geocoder = new google.maps.Geocoder()
    geocoder.geocode( { 'address': addr }, (result)=> {
        input_loc = [result[0].geometry.location.lat(), result[0].geometry.location.lng()];
    })

}
*/
function newMap(mapelem, buttonContainer){
    var map = new google.maps.Map(mapelem, {
        zoom: 7,
        center: new google.maps.LatLng(43.538855, -89.463380),
        mapTypeControl: false
    });

    var infowindow = new google.maps.InfoWindow();

    for (branch_id in Branches) {
        let branch = Branches[branch_id];
        let html = mapHtml(branch_id);
        let lat = branch.coords[0];
        let long = branch.coords[1];
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map
        });
        buttonID = 'button-'+ branch_id
        buttonHtml = htmlToElement('<button type="button" class="list-group-item list-group-item-action" id='+buttonID+'>'+ branch.name +'</button>');
        buttonContainer.appendChild(buttonHtml);
        button = document.getElementById(buttonID);

        f = showMapInfo[buttonID] = function() {
            infowindow.setContent(html);
            infowindow.open(map, marker);;
        };

        google.maps.event.addListener(marker, 'click', f);
    }
}