

//var friendlist = new FriendList()
//var view = new View(friendlist)
//var saver = new serversaver(friendlist, "key")

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelectorAll('#map').length > 0) {
        if (document.querySelector('html').lang)
            lang = document.querySelector('html').lang;
        else{
            lang = 'en';
        }
        let js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyD3Iz_jhU2lO3npT4hSb-e5Y_sCh6CIO_o&language=' + lang;
        document.getElementsByTagName('head')[0].appendChild(js_file);
    }
});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.3, lng: -91.7},
        zoom: 8
    });
}

