$(document).ready(function(){







console.log(!!currentSeller())
// var id = currentSeller()._id;
// console.log('you are user ' + currentSeller()._id);
if (!!currentSeller() || !!currentBuyer()) {
  var socket = io();
  var id = currentSeller()._id || currentBuyer()._id;
  var hideMe = currentSeller().buyer || currentBuyer().buyer;
  hideMe = !!!hideMe
  console.log('you are user ' + currentSeller().username);
  // socket.emit('new seller' , id);


  navigator.geolocation.getCurrentPosition(function(location){

    console.log("THIS IS GET ME LAT: " + location.coords.latitude);
    console.log("THIS IS GET ME LON: " + location.coords.longitude);

    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    var latLng = new google.maps.LatLng(latitude, longitude);

    showMap(latLng);

  });

  // Creates markers - for now....
  setInterval( function(){
    navigator.geolocation.getCurrentPosition(function(location){
    socket.emit('update location' , {
      id : id, 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      username: currentSeller().username,
      display: hideMe
    });
  });
} , 3000);



socket.on('location updated' , function(user){
 
  var latLng = new google.maps.LatLng(user.latitude, user.longitude);
  console.log(user.username + "'s location' = " + latLng);

 var contentString = "Tickets from "+ user.username + " <input type='button' class = 'show' value='See List' data-id='"+ user.id+ "'>"
 var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

 deleteMarkers();
 addMarker(latLng);
 setMapOnAll(map);

  console.log(markers);

    });

} else {

  console.log("no-one logged in")
}
});