$(document).ready(function(){

var sellers = [];



function createMarker(latLng) {
  console.log("Yes it's")
  var markerOptions = {
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true
  }

  var marker = new google.maps.Marker(markerOptions);

  var content = 'You are here: ' + latLng.lat() + ', ' + latLng.lng();
}

console.log(!!currentSeller())
// var id = currentSeller()._id;
// console.log('you are user ' + currentSeller()._id);

if (!!currentSeller()) {
  var socket = io();
  console.log()
  var id = currentSeller()._id;
  console.log('you are user ' + currentSeller().username);
  socket.emit('new seller' , id);




  setInterval( function(){

    navigator.geolocation.getCurrentPosition(function(location){
      console.log(location);
    socket.emit('update location' , {
      id : id , 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      username: currentSeller().username
    });

  });
} , 10000);



  // navigator.geolocation.watchPosition(function(location){
  //     console.log(location);
  //   socket.emit('update location' , {
  //     id : id , 
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     username: currentSeller().username
  //   });

  // });



  socket.on('location updated' , function(user){

      // var marker = sellers[user.id];
      // marker.location = user.location;

      var latLng = new google.maps.LatLng(user.latitude, user.longitude);

      console.log(user.username + "latlang = " + latLng);

      showMap(latLng);
      createMarker(latLng);

    });

} else {

  console.log("no-one (or buyer) logged in, running else statement")

  socket.on('new seller' , function(id){

    sellers[id] = new Marker();

  });

  socket.on('location updated' , function(user){

      // var marker = sellers[user.id];
      // marker.location = user.location;

      var latLng = new google.maps.LatLng(user.latitude, user.longitude);
      createMarker(latLng);

    });
}
});