$(document).ready(function(){

var sellers = [];




console.log(!!currentSeller())
// var id = currentSeller()._id;
// console.log('you are user ' + currentSeller()._id);

if (!!currentSeller()) {
  var socket = io();

  var id = currentSeller()._id;
  console.log('you are user ' + currentSeller().username);

  // socket.emit('new seller' , id);

  setInterval( function(){

    navigator.geolocation.getCurrentPosition(function(location){
    socket.emit('update location' , {
      id : id, 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      username: currentSeller().username
    });

  });
} , 10000);



socket.on('location updated' , function(user){
 var latLng = new google.maps.LatLng(user.latitude, user.longitude);
 console.log(user.username + "'s location' = " + latLng);
 showMap(latLng);



/////////////////////////////////////////////
 var contentString = "Tickets from "+ user.username + " <input type='button' class = 'show' value='See List' data-id='"+ user.id+ "'>"
 var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
 var marker = new google.maps.Marker({
     position: latLng,
     map: map,
     title: 'marker'
   });
   marker.addListener('click', function() {
     infowindow.open(map, marker);
     console.log("infowindow clicked")
      });
/////////////////////////////////////////////



    }); //socket.on(update location)

} else {

  console.log("no-one (or buyer) logged in, running else statement")

  socket.on('new seller' , function(id){

    sellers[id] = new Marker();

  });

  socket.on('location updated' , function(user){

      var latLng = new google.maps.LatLng(user.latitude, user.longitude);
      createMarker(latLng);

    });
}
});