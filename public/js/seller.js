$(document).ready(function(){


  if(checkForBuyerLogin()){
    console.log("THERE IS A BUYER LOGGED IN")
    getSellers();
    getBuyers();
  } 


$("form#new-seller").on("submit", createSeller);
$("form#login-seller").on("submit", logSellerIn);

$("#seller-form-button" ).on("click", toggleSellerForm);
$("#seller-login-button" ).on("click", toggleSellerLoginForm);
$("#seller-index-button" ).on("click", toggleShowSellers);

$("body").on("click", ".delete", removeSeller);
$('body').on('click', '.show', showSellerProfileMike) 
$('body').on('click', '.edit', editSeller);
$('body').on('click', '.sellerClose', hideSellerProfileMike);



});

// AJAX CALL - GET ALL SELLERS

function getSellerToken() {
  if (localStorage.getItem('sellerToken'))
  return localStorage.getItem('sellerToken');
}

function currentSeller() {
  var token = getSellerToken();
  if (token){
    var payload = token.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);
    return payload
  } else {
    return false;
  }
}


function getSellers(){
  var ajax = $.get('/sellers')
  .done(function(data){
    $.each(data, function(index, seller){
      addSeller(seller);
    });
  });
}



//INDEX - SELLERS
function toggleShowSellers(){
        $('#sellers').toggle("slow");
        $("#show").slideUp("slow");
  }




// login seller form
function toggleSellerLoginForm() {
  $( ".showable" ).hide();

  setTimeout(function() {
    $("form#login-seller").toggle("slow");
  }, 500);

}


// CREATE SELLER

function toggleSellerForm(){
  $( ".showable" ).hide();

  setTimeout(function() {
    $("form#new-seller").toggle("slow");
  }, 500);

}

function createSeller(){
  event.preventDefault();
  
  console.log("You are creating a seller")

  $.ajax({
    url:'/seller-register',
    type:'post',
    data: { seller: {
      "firstName": $("input#firstname").val(),
      "lastName": $("input#lastname").val(),
      "userName": $("input#username").val(),
      "email": $("input#email").val(),
      "phone": $("input#phone").val(),
      "location": $("input#location").val(),
      "password": $("input#password").val(),
      "passwordConfirmation": $("input#passwordconfirmation").val()
    }}

  }).done(function(data) {
    // addSeller(data.seller);
    toggleSellerForm();
    console.log("Hey it's done");
    console.log(data);
    var pass = $("input#password").val();
    var eme  = $("input#email").val();

    // THIS IS THEN GOING TO LOG IN THE SELLER

    $.ajax({
      url: '/seller-login',
      type: 'post',
      data: { seller : {
        "email": eme,
        "password": pass
      }}
    }).done(function(data){
      $("input#firstname").val(null),
      $("input#lastname").val(null),
      $("input#username").val(null),
      $("input#email").val(null),
      $("input#phone").val(null)
      console.log(data);
    
          window.localStorage.setItem('sellerToken' , data.sellerToken);
          console.log("logged in")

          $.ajaxSetup({
            headers: {'Authorisation': 'Bearer ' + data.sellerToken }
          });
          // $('#sellerRegisterModal').remodal().destroy();
          location.reload();

        })
  

  });

  

  // location.reload(true);
}

// ADD A SELLER TO PAGE

function addSeller(seller){
  $("#sellers").prepend("<div class='seller-tile'><h2>" + seller.firstName + "</h2><p> " + seller.phone + "</p><a data-id='"+seller._id+"' class='delete' href='#'>Delete</a><a data-id='"+seller._id+"' class='show' href='#'>Show</a><a href='#' class='edit' data-id='"+seller._id+"'>Edit</a></div>");
}

// hide profile

function hideSellerProfileMike(){
  $('#showAndTickets').toggle();
  $(this).parent().remove();
  $('#tickets').empty();
}

// SHOW SELLER - MIKE

function showSellerProfileMike(){
  $('#sellers').slideUp();
  $('#showAndTickets').toggle();
  $.ajax({
    method: 'GET',
    url: '/sellers/'+$(this).data().id
  }).done(function(seller){
    $('#show').prepend("<div class='seller-tile' data-id="+ seller._id +"> <h2 id='username'> User: " + seller.userName + "</h2><h3> Name:  " 
                + seller.firstName +" "+ seller.lastName+ "</h3><h3> Email: "+seller.email+"</h3><h3>Number: "+seller.phone+"</h3></h3><a href='#' class='sellerClose' data-id='"+seller._id+"'>[Close X]</a></div>");

    $.each(seller.tickets, function(index, ticket){
      // If I'm a seller I want to see the buyers tickets
      if(currentBuyer()){
        // RENAME THIS LATER
        addTicketMike(ticket)
      // if I'm a buyer I want to see the seller action on my ticket
      } else if (currentSeller()) {
        addTicketForBuyer(ticket)
      } else {

      }
    })
    $("#tickets").append("<div class='ticket-tile'><h2><a id='addTicket' href='#'>Add a ticket +</a></h2></div>")
    setTimeout(function(){
      $('#show').slideDown()
      $('#tickets').slideDown()
    }, 600);
  });
}



// EDIT SELLER

function editSeller(){
  $.ajax({
    method: 'get',
    url: '/sellers/'+$(this).data().id
  }).done(function(seller){
    $("input#edit-firstName").val(seller.firstName),
    $("input#edit-lastName").val(seller.lastName),
    $("input#edit-email").val(seller.email),
    $("input#edit-phone").val(seller.phone)
    $('form#edit-seller').slideDown()
  });
  $('#edit-seller').on('submit', updateSeller.bind(this));
}

var updateSeller = function(){
  event.preventDefault();
  var seller = {
    seller:{
      firstName: $("input#edit-firstName").val(),
      lastName: $("input#edit-lastName").val(),
      userName: $("input#edit-userName").val(),
      phone: $("input#edit-phone").val()
    }
  };
  console.log($(this).data().id)
  $.ajax({
    method: 'patch',
    url: '/sellers/'+$(this).data().id,
    data: seller
  }).done(function(data){
    // not ideal
    location.reload();
  });
}



//REMOVE SELLER

function removeSeller(){
  event.preventDefault();
  $.ajax({
    url:'/sellers/'+$(this).data().id,
    type:'delete'
  });
  $(this).parent().remove();
}



