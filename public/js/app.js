$(document).ready(function(){

  $("#logout-button" ).on("click", logout);
  // $("#mainBanner" ).on("click", hideBanner);
  

  function hideBanner(){
    $("#mainBanner").toggle();
    console.log("banner hidden");
    $( "#mainBanner" ).addClass("z_index")



  }


});


function toggleAll(){
  console.log("toggled all")
  $("#show").slideUp("slow");
  $("#tickets").slideUp("slow");
  $("#showAndTickets").slideUp("slow");
  $("#dropDownTop").slideUp("slow");
  $("#buyers").slideUp("slow");
  $("#sellers").slideUp("slow");
  $("#form#new-buyer").slideUp("slow");
  $("#form#edit-buyer").slideUp("slow");
  $("#form#new-seller").slideUp("slow");
  $("#form#edit-seller").slideUp("slow");
  $("#form#login-buyer").slideUp("slow");
  $("#form#login-seller").slideUp("slow");
  $("#frontInfoHolder").slideUp("slow");
  $("#ticketIndex").slideUp("slow");
};




 
  


function checkForSellerLogin(){
  var token = window.localStorage.getItem('sellerToken');

  if (token) {
    $("#menuBar").append("<li>Welcome seller: " + currentSeller().username + ", </li>");
    // console.log(currentSeller());
    //hooray we are logged in
    console.log("HEY A SELLER IS LOGGED IN!")
    $.ajaxSetup({
      headers: {'Authorisation': 'Bearer ' + token }
    });
  }
}

function checkForBuyerLogin(){
  var token = window.localStorage.getItem('buyerToken');

  if (token) {
    $("#menuBar").append("<li>Welcome buyer: " + currentBuyer().username + ", </li>");
    console.log(currentBuyer());
    //hooray we are logged in
    console.log("BUYER IS LOGGED IN, WAHOOOOOOO!")
    $.ajaxSetup({
        headers: {'Authorisation': 'Bearer ' + token }
    });
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
  $


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

        // body...

        window.localStorage.setItem('buyerToken' , data.buyerToken);
        console.log("Buyer is logged in NOW")

        $.ajaxSetup({
          headers: {'Authorisation': 'Bearer ' + data.buyerToken }
        });
      })

}


// LOG OUT

function logout() {

  window.localStorage.removeItem('sellerToken');
  window.localStorage.removeItem('buyerToken');
  console.log("Logout");
  

}
















