$(document).ready(function(){


  if(checkForBuyerLogin()){
    console.log("THERE IS A BUYER LOGGED IN")
    getSellers();
  } 


$("form#new-seller").on("submit", createSeller);
$("form#login-seller").on("submit", logSellerIn);

$("#seller-form-button" ).on("click", toggleSellerForm);
$("#seller-login-button" ).on("click", toggleSellerLoginForm);
$("#seller-index-button" ).on("click", toggleShowSellers);

$("body").on("click", ".delete", removeSeller);
$('body').on('click', '.show', showSellerProfileMike) 
$('body').on('click', '.edit', editSeller);


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

        // toggleAll();
        // $('#sellers').toggle("slow");
  
  $("#show").slideUp("slow");
  $("#tickets").slideUp("slow");
  $("#buyers").slideUp("slow");

  setTimeout(function(){
    $("#show").html(" ");
    $("#tickets").html(" ");
    $('#sellers').toggle("slow")
  }, 600);
}

// function toggleAll(){
//   console.log("toggled all")
//   $("#show").slideUp("slow");
//   $("#tickets").slideUp("slow");
//   $("#showAndTickets").slideUp("slow");
//   $("#dropDownTop").slideUp("slow");
//   $("#buyers").slideUp("slow");
//   $("#sellers").slideUp("slow");
//   $("#form#new-buyer").slideUp("slow");
//   $("#form#edit-buyer").slideUp("slow");
//   $("#form#new-seller").slideUp("slow");
//   $("#form#edit-seller").slideUp("slow");
//   $("#form#login-buyer").hide();
//   $("#form#login-seller").hide();
//   $("#frontInfoHolder").slideUp("slow");
//   $("#ticketIndex").slideUp("slow");
// };




// login seller form
function toggleSellerLoginForm() {
  $('#login-seller').toggle("slow")
}


// CREATE SELLER

function toggleSellerForm(){
  $("form#new-seller").slideToggle("slow");
  $("form#new-buyer").slideUp("slow");

}

function createSeller(){
  event.preventDefault();

  $.ajax({
    url:'/seller-register',
    type:'post',
    data: { seller: {
      "firstName": $("input#firstname").val(),
      "lastName": $("input#lastname").val(),
      "userName": $("input#username").val(),
      "email": $("input#email").val(),
      "latitude": $("input#latitude").val(),
      "longitude": $("input#longitude").val(),
      "phone": $("input#phone").val(),
      "location": $("input#location").val(),
      "password": $("input#password").val(),
      "passwordConfirmation": $("input#passwordconfirmation").val()
    }}

  }).done(function(data) {
    addSeller(data.seller);
    toggleSellerForm();
    console.log(data);
    $("input#firstname").val(null),
    $("input#lastname").val(null),
    $("input#username").val(null),
    $("input#email").val(null),
    $("input#latitude").val(null),
    $("input#longitude").val(null),
    $("input#phone").val(null)
  });
}

// ADD A SELLER TO PAGE

function addSeller(seller){
  $("#sellers").prepend("<div class='seller-tile'><h2>" + seller.firstName + "</h2><p> " + seller.phone + "</p><a data-id='"+seller._id+"' class='delete' href='#'>Delete</a><a data-id='"+seller._id+"' class='show' href='#'>Show</a><a href='#' class='edit' data-id='"+seller._id+"'>Edit</a></div>");
}


// SHOW SELLER

function showSellerProfile(){
  $('#sellers').slideUp();
  $.ajax({
    method: 'GET',
    url: '/sellers/'+$(this).data().id
  }).done(function(seller){
    $('#show').prepend("<div class='seller-tile' data-id="+ seller._id +
      "><h2 id='username'>" +
        seller.lastName + "</h2><p> " 
        + seller.userName + "</p><a href='https://github.com/"+ 
        seller.phone +"'>Phone</a> | <a href='"
         +
        "'>Phone</a></div>");
    $.each(seller.tickets, function(index, ticket){
      addTicketMike(ticket)
    })
    $("#tickets").append("<div class='ticket-tile'><h2><a id='addTicket' href='#'>Add a ticket +</a></h2></div>")
    setTimeout(function(){
      $('#show').slideDown()
      $('#tickets').slideDown()
    }, 600);
  });
}


// SHOW SELLER - MIKE

function showSellerProfileMike(){
  $('#sellers').slideUp();
  $('#showAndTickets').toggle();
  $.ajax({
    method: 'GET',
    url: '/sellers/'+$(this).data().id
  }).done(function(seller){
    $('#show').prepend("<div class='seller-tile' data-id="+ seller._id +
      "><h2 id='username'>" +
        seller.lastName + "</h2><p> " 
        + seller.userName + "</p><a href='https://github.com/"+ 
        seller.phone +"'>Phone</a> | <a href='"
         +
        "'>Phone</a></div>");
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



