$(document).ready(function(){


$("#getLocation" ).on("click", getMyLocation);

var map;


function getMyLocation() {

 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
  alert("no geolocation support");
  }
}



function displayLocation(position) {

  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var latLng = new google.maps.LatLng(latitude, longitude);

  showMap(latLng);
  createMarker(latLng);
  getSellerLocations();

  var div = document.getElementById('location');
  div.innerHTML = 'You are at Latitude: ' + latitude + ', Longitude: ' + longitude;
 
}

function showMap(latLng) {

  var mapOptions = {
    center: latLng,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function getSellerLocations(){
    console.log(map);
    var ajax = $.get('http://localhost:3000/sellers')
      .done(function(data) {
        $.each(data, function(index, user) {
          var latLng = new google.maps.LatLng(user.latitude, user.longitude)

          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        });
    });
}

function createMarker(latLng) {
  var markerOptions = {
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true
  }

  var marker = new google.maps.Marker(markerOptions);

  var content = 'You are here: ' + latLng.lat() + ', ' + latLng.lng();
  addInfoWindow(marker, latLng, content);
}

function addInfoWindow(marker, latLng, content){
  var infoWindowOptions = {
    content: content,
    position: latLng
  };

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map);
  });
}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

}

});