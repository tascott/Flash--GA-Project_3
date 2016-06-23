$(document).ready(function(){


if (!!currentSeller() || !!currentBuyer()) {
  var socket = io();
  
  var id = currentSeller()._id || currentBuyer()._id;
  var hideMe = currentSeller().buyer || currentBuyer().buyer;
  
  hideMe = !!!hideMe


  loadTheMap();

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

 
 addMarker(latLng , user.id);
 //setMapOnAll(map);


  // console.log(markers);

    });

} else {

  console.log("no-one logged in")
}
});