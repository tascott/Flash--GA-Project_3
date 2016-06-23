$(document).ready(function(){



  if (!currentSeller() && !currentBuyer()) {
    console.log("open")
   $('.welcome').remodal().open();
 
 } else {
    $('.welcome').remodal().destroy();
    console.log("destroy")
 };


  // Returns width of browser viewport
  var browser = $(window).width();
  // Returns width of HTML document
  var document = $(document).width();

  $('.nav .toggle-nav').click(function(e){
      $('.nav .nav-mobile').addClass('style-mobile').slideToggle('slow');
      e.preventDefault();
  });


  $("#logout-button" ).on("click", logout);
  
});

function clearAll() {



  $( ".showable" ).hide();
  setTimeout(function() {
    $(this).show();
  }, 500);

}





function checkForSellerLogin(){
  var token = window.localStorage.getItem('sellerToken');

  if (token) {
    $("#menuBar").prepend("<a href='#'><li class='show' data-id='"+currentSeller()._id+"'>Welcome seller: " + currentSeller().username + "</a>");


    // console.log(currentSeller());
    //hooray we are logged in
    console.log("HEY A SELLER IS LOGGED IN!")
    $.ajaxSetup({
      headers: {'Authorisation': 'Bearer ' + token }
    });
    return true;

  }
}

function checkForBuyerLogin(){
  var token = window.localStorage.getItem('buyerToken');

  if (token) {


    $("#menuBar").prepend("<a href='#'><li class='buyershow' data-id='"+currentBuyer()._id+"'>Welcome buyer: " + currentBuyer().username + "</a>");


    console.log("TEST: "+ currentBuyer().username);
    //hooray we are logged in
    console.log("BUYER IS LOGGED IN, WAHOOOOOOO!")
    $.ajaxSetup({
        headers: {'Authorisation': 'Bearer ' + token }
    });
    return true;
  }
}



// SELLER LOG IN

function logSellerIn(){
  event.preventDefault();

  $.ajax({
    url: '/seller-login',
    type: 'post',
    data: { seller : {
      "email": $("input#login-seller-userName").val(),
      "password": $("input#login-seller-password").val(),
    }}
  }).done(function(data){
    console.log(data);
 
        window.localStorage.setItem('sellerToken' , data.sellerToken);
        console.log("logged in")

        $.ajaxSetup({
          headers: {'Authorisation': 'Bearer ' + data.sellerToken }
        });
      })
  location.reload(true);


}

// BUYER LOGIN 

function logBuyerIn(){
  event.preventDefault();

  $.ajax({
    url: '/buyer-login',
    type: 'post',
    data: { buyer : {
      "email": $("input#login-buyer-userName").val(),
      "password": $("input#login-buyer-password").val(),
    }}
  }).done(function(data){
    console.log(data);
    console.log(data.message);

        window.localStorage.setItem('buyerToken' , data.buyerToken);
        console.log("Buyer is logged in NOW")

        $.ajaxSetup({
          headers: {'Authorisation': 'Bearer ' + data.buyerToken }
        });
      })
  location.reload(true);
}


// LOG OUT

function logout() {

  window.localStorage.removeItem('sellerToken');
  window.localStorage.removeItem('buyerToken');
  console.log("Logout");
  location.reload(true);
  

}
















