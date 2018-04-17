
function clickedon() {
    let latitude = parseInt(document.getElementById("latitude").value);
    let longitude = parseInt(document.getElementById("longitude").value);
    let x = document.getElementById('error')
    if ((latitude <= 90 && latitude >= -90) && (longitude >= -180 && longitude <= 180)){
      x.innerHTML = ""
      showPosition(latitude,longitude)
    }
    else{
        x.innerHTML = "Sorry, please enter a vaild latitude and/or longitude."
    }
}

function showPosition(latitude,longitude) {
    var latlon = latitude + "," + longitude;

    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&radius=100&latlong="+latlon,
      async:true,
      dataType: "json",
      success: function(json) {
                  console.log(json);
                  initMap(latitude,longitude, json);
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    }); 
}


function initMap(latitude,longitude, json) {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
      center: {lat: latitude, lng: longitude},
      zoom: 7
    });
    try{
    for(var i=0; i<json.page.size; i++) {
      addMarker(map, json._embedded.events[i]);
    }
    }catch(err){
      var mapDiv = document.getElementById('map');
      var map = new google.maps.Map(mapDiv, {
      center: {lat: latitude, lng: longitude},
      zoom: 7
    });
    }
  }

  function addMarker(map, event) {
    if (event._embedded.venues[0].location.latitude != null || event._embedded.venues[0].location.longitude != null){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
      title: event.name,
      map: map
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    console.log(marker);
    }
  }