$(document).ready(function(){

  // NEED TO RETURN TRUE IF LOAGGED IN
  
  

if(checkForSellerLogin()){
  console.log("THERE IS A SELLER LOGIN")
  getBuyers();
} 

  // checkForBuyerLogin();



  $("form#new-buyer").on("submit", createBuyer);
  $("form#login-buyer").on("submit", logBuyerIn);
  $("#buyer-form-button" ).on("click", toggleBuyerForm);
  $("#buyer-login-button" ).on("click", toggleBuyerLoginForm);
  $("#buyer-index-button" ).on("click", toggleShowBuyers);



  $("body").on("click", ".buyerdelete", removeBuyer);
  $('body').on('click', '.buyershow', showBuyerProfile)
  $('body').on('click', '.buyeredit', editBuyer);

  });

function toggleBuyerLoginForm() {
 $("form#login-buyer").toggle("slow");
}

function getBuyerToken() {
  if (localStorage.getItem('buyerToken'))
  return localStorage.getItem('buyerToken');
}

function currentBuyer() {
  var token = getBuyerToken();
  if (token){
    var payload = token.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);
    return payload
  }
}


  // GET ALL BUYERS

  function getBuyers(){
    var ajax = $.get('/buyers')
    .done(function(data){
      $.each(data, function(index, buyer){
        addBuyer(buyer);
      });
    }); 
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


  // CREATE BUYER

  function toggleBuyerForm(){
    $("form#new-buyer").slideToggle("slow");
    $("form#new-seller").slideUp("slow");
  }

  function createBuyer(){
    event.preventDefault();

    $.ajax({
      url:'/buyer-register',
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

  // SHOW BUYERS

  function showBuyerProfile(){
    $('#buyers').slideUp();
    $.ajax({
      method: 'GET',
      url: '/buyers/'+$(this).data().id
    }).done(function(buyer){
      $('#show').prepend("<div class='buyer-tile' data-id="+ buyer._id +
        "><h2 id='username'>" +
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


  // EDIT BUYER

  function editBuyer(){
    $.ajax({
      method: 'get',
      url: '/buyers/'+$(this).data().id
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
      url: '/buyers/'+$(this).data().id,
      data: buyer
    }).done(function(data){
      // not ideal
      location.reload();
    });
  }

  //REMOVE BUYER

  function removeBuyer(){
    event.preventDefault();
    $.ajax({
      url:'/buyers/'+$(this).data().id,
      type:'delete'
    });
    $(this).parent().remove();
  }






