var map;

var markers = [];



// // Adds a marker to the map and push to the array.
// function addMarker(location) {
//   var marker = new google.maps.Marker({
//     position: location,
//     map: map
//   });
//   markers.push(marker);
// }


function loadTheMap(){

  // This makes the map active
  navigator.geolocation.getCurrentPosition(function(location){
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    var latLng = new google.maps.LatLng(latitude, longitude);

    showMap(latLng);

  });
}

function addMarker(location , id) {

  if(markers[id]) {

    var marker = markers[id];
    marker.setPosition(location);
    console.log('existing marker' , id);

  } else {

    console.log('new marker' , id);

    var marker = new google.maps.Marker({
      position: location,
      map: map,
    });

    marker.addListener('click', function() {
         infowindow.open(map, marker);
         console.log("infowindow clicked")
          });

    markers[id]=marker;
  }


  
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


function getMyLocation() {

 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
  alert("no geolocation support");
  }
}


function clearMarkers() {
  setMapOnAll(null);
}


function displayLocation(position) {

  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var latLng = new google.maps.LatLng(latitude, longitude);

  return latLng;

  // showMap(latLng);
  // createMarker(latLng);
  // getSellerLocations();


 
}

function showMap(latLng) {

  var mapOptions = {
    center: latLng,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP

  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

// function getSellerLocations(){
//     var ajax = $.get('/sellers')
//       .done(function(data) {
//         $.each(data, function(index, user) {
//           var latLng = new google.maps.LatLng(user.latitude, user.longitude)

//           var marker = new google.maps.Marker({
//             position: latLng,
//             map: map
//           });
//         });
//     });
// }



// function initAutocomplete() {
//   var map = new google.maps.Map(document.getElementById('map-canvas'), {
//     center: {lat: -33.8688, lng: 151.2195},
//     zoom: 13,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });

// }

// });




