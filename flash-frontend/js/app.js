$(document).ready(function(){


  getSellers();
  getBuyers();
  checkForSellerLogin();



  $("form#new-seller").on("submit", createSeller);
  $("form#new-buyer").on("submit", createBuyer);
  $("form#new-ticket").on("submit", createTicket);

  $("form#login-seller").on("submit", logSellerIn);

  $("#seller-form-button" ).on("click", toggleSellerForm);
  $("#buyer-form-button" ).on("click", toggleBuyerForm);

  $("#seller-login-button" ).on("click", toggleSellerLoginForm);
  $("#logout-button" ).on("click", logout);

  $("#seller-index-button" ).on("click", toggleShowSellers);
  $("#buyer-index-button" ).on("click", toggleShowBuyers);




  $("body").on("click", ".delete", removeSeller);
  $('body').on('click', '.show', showSellerProfile)
  $('body').on('click', '.edit', editSeller);


  $("body").on("click", ".buyerdelete", removeBuyer);
  $('body').on('click', '.buyershow', showBuyerProfile)
  $('body').on('click', '.buyeredit', editBuyer);


  $('body').on('click', '#addTicket', toggleAddTicket);
 
});


function checkForSellerLogin(){
  var token = window.localStorage.getItem('sellerToken');

  if (token) {
    //hooray we are logged in
    console.log("HEY A SELLER IS LOGGED IN!")
    $.ajaxSetup({
        headers: {'Authorisation': 'Bearer ' + token }
    });
  }
}


//INDEX - SELLERS
function toggleShowSellers(){
  $("#show").slideUp("slow");
  $("#tickets").slideUp("slow");
  $("#buyers").slideUp("slow");

  setTimeout(function(){
    $("#show").html(" ");
    $("#tickets").html(" ");
    $('#sellers').toggle("slow")
  }, 600);
}

//INDEX - BUYERS
function toggleShowBuyers(){
  $("#show").slideUp("slow");
  $("#tickets").slideUp("slow");
  $("#sellers").slideUp("slow");
  setTimeout(function(){
    $("#show").html(" ");
    $("#tickets").html(" ");
    $('#buyers').toggle("slow")
  }, 600);
}



// GET ALL SELLERS

function getSellers(){
  var ajax = $.get('http://localhost:3000/sellers')
  .done(function(data){
    $.each(data, function(index, seller){
      addSeller(seller);
    });
  });
}

// GET ALL BUYERS

function getBuyers(){
  var ajax = $.get('http://localhost:3000/buyers')
  .done(function(data){
    $.each(data, function(index, buyer){
      addBuyer(buyer);
    });
  });
}



//----------------------------------------------------//

// SELLER LOG IN

function toggleSellerLoginForm() {

      $('#login-seller').toggle("slow")
  
}

function logSellerIn(){
  event.preventDefault();

  $.ajax({
    url: 'http://localhost:3000/seller-login',
    type: 'post',
    data: { seller : {
      "email": $("input#login-seller-userName").val(),
      "password": $("input#login-seller-password").val(),
      }}
  }).done(function(data){
      console.log(data);
        // body...



      window.localStorage.setItem('sellerToken' , data.sellerToken);
      console.log("logged in")

      $.ajaxSetup({
          headers: {'Authorisation': 'Bearer ' + data.sellerToken }
      });
  })


}

// LOG OUT

function logout() {

  window.localStorage.removeItem('sellerToken');
  window.localStorage.removeItem('buyerToken');
  console.log("Logout");
  

}

// CREATE SELLEERRR !!!!!!!!!~~~~~~~~~~~~~~~~


// CREATE SELLER

function toggleSellerForm(){
  $("form#new-seller").slideToggle("slow");
  $("form#new-buyer").slideUp("slow");

}

function createSeller(){
  event.preventDefault();

  $.ajax({
    url:'http://localhost:3000/seller-register',
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


//----------------------------------------------------------//

// CREATE BUYER

function toggleBuyerForm(){
  $("form#new-buyer").slideToggle("slow");
  $("form#new-seller").slideUp("slow");
}

function createBuyer(){
  event.preventDefault();

  $.ajax({
    url:'http://localhost:3000/buyer-register',
    type:'post',
    data: { buyer: {
      "firstName": $("input#buyerfirstname").val(),
      "lastName": $("input#buyerlastname").val(),
      "userName": $("input#buyerusername").val(),
      "email": $("input#buyeremail").val(),
      "phone": $("input#buyerphone").val(),
      "password": $("input#buyerpassword").val(),
      "passwordConfirmation": $("input#buyerpasswordconfirmation").val()
    }}

  }).done(function(data) {
    addBuyer(data.buyer);
    console.log(data);
    toggleBuyerForm();
    $("input#buyerfirstname").val(null),
    $("input#buyerlastname").val(null),
    $("input#buyerusername").val(null),
    $("input#buyeremail").val(null),
    $("input#buyerphone").val(null),
    $("input#buyerpassword").val(null),
    $("input#buyerpasswordconfirmation").val(null)
  });
}

// ADD A BUYER TO PAGE

function addBuyer(buyer){
  $("#buyers").prepend("<div class='buyer-tile'><h2>" + buyer.firstName + "</h2><p> " + buyer.phone + "</p><a data-id='"+buyer._id+"' class='buyerdelete' href='#'>Delete</a><a data-id='"+buyer._id+"' class='buyershow' href='#'>Show</a><a href='#' class='buyeredit' data-id='"+buyer._id+"'>Edit</a></div>");
}


//------------------------------------------------------------//


//REMOVE SELLER

function removeSeller(){
  event.preventDefault();
  $.ajax({
    url:'http://localhost:3000/sellers/'+$(this).data().id,
    type:'delete'
  });
  $(this).parent().remove();
}


// SHOW SELLER

function showSellerProfile(){
  $('#sellers').slideUp();
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/sellers/'+$(this).data().id
  }).done(function(seller){
    $('#show').prepend("<div class='seller-tile' data-id="+ seller._id +
      "><img src='./images/" +
       seller.firstName + ".jpg'><h2 id='username'>" +
        seller.lastName + "</h2><p> " 
        + seller.userName + "</p><a href='https://github.com/"+ 
        seller.phone +"'>Phone</a> | <a href='"
         +
        "'>Phone</a></div>");
    $.each(seller.tickets, function(index, ticket){
      addTicket(ticket)
    })
    $("#tickets").append("<div class='ticket-tile'><h2><a id='addTicket' href='#'>Add a ticket +</a></h2></div>")
    setTimeout(function(){
      $('#show').slideDown()
      $('#tickets').slideDown()
    }, 600);
  });
}

//-------------------------------------------------------

//REMOVE BUYER

function removeBuyer(){
  event.preventDefault();
  $.ajax({
    url:'http://localhost:3000/buyers/'+$(this).data().id,
    type:'delete'
  });
  $(this).parent().remove();
}


// SHOW BUYER

function showBuyerProfile(){
  $('#buyers').slideUp();
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/buyers/'+$(this).data().id
  }).done(function(buyer){
    $('#show').prepend("<div class='buyer-tile' data-id="+ buyer._id +
      "><img src='./images/" +
       buyer.firstName + ".jpg'><h2 id='username'>" +
        buyer.lastName + "</h2><p> " 
        + buyer.userName + "</p><a href='https://github.com/"+ 
        buyer.phone +"'>Phone</a> | <a href='"
         +
        "'>Phone</a></div>");
    $.each(buyer.tickets, function(index, ticket){
      addTicket(ticket)
    })
    $("#tickets").append("<div class='ticket-tile'><h2><a id='addTicket' href='#'>Add a ticket +</a></h2></div>")
    setTimeout(function(){
      $('#show').slideDown()
      $('#tickets').slideDown()
    }, 600);
  });
}





//-------------------------------------------------------


// EDIT SELLER

function editSeller(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/sellers/'+$(this).data().id
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
    url: 'http://localhost:3000/sellers/'+$(this).data().id,
    data: seller
  }).done(function(data){
    // not ideal
    location.reload();
  });
}

////----------------------------------------------------------

// EDIT BUYER

function editBuyer(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/buyers/'+$(this).data().id
  }).done(function(buyer){
    $("input#edit-firstName").val(buyer.firstName),
    $("input#edit-lastName").val(buyer.lastName),
    $("input#edit-email").val(buyer.email),
    $("input#edit-phone").val(buyer.phone)
    $('form#edit-buyer').slideDown()
  });
  $('#edit-buyer').on('submit', updateBuyer);
}

var updateBuyer = function(){
  event.preventDefault();
  var buyer = {
    buyer:{
      firstName: $("input#edit-firstName").val(),
      lastName: $("input#edit-lastName").val(),
      userName: $("input#edit-userName").val(),
      phone: $("input#edit-phone").val()
    }
  };
  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/buyers/'+$(this).data().id,
    data: buyer
  }).done(function(data){
    // not ideal
    location.reload();
  });
}




//----------------------------------------------------------------
// ADD A TICKET


function toggleAddTicket(){
  $("form#new-ticket").slideToggle("slow");
}

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
  }
}

function createTicket(){
  event.preventDefault(); 
  $.ajax({
    url:'http://localhost:3000/tickets',
    type:'post',
    data: { ticket: {
      "event": $("input#event").val(),
      "date": $("input#date").val(),
      "price": $("input#price").val(),
      "id" : currentSeller()._id
    } 
    }
  }).done(function(ticket) {
    addTicket(ticket)
    toggleAddTicket();
    $("input#event").val(null),
    $("input#date").val(null),
    $("input#price").val(null)
  });
}

function addTicket(ticket){
  $('#tickets').prepend("<div class='ticket-tile'><h2>"+ ticket.event + "</h2><p>"
    + ticket.date + 
    + ticket.price +"'>Price</a> | <a href='")
}



////**************************************************////////////












