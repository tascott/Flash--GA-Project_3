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

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

});