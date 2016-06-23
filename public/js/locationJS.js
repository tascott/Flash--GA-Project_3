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




