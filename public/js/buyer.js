$(document).ready(function(){

  // NEED TO RETURN TRUE IF LOAGGED IN
  
  

if(checkForSellerLogin()){
  console.log("THERE IS A SELLER LOGIN")
  getBuyers();
  getSellers();
} 

  // checkForBuyerLogin();



  $("form#new-buyer").on("submit", createBuyer);
  $("form#login-buyer").on("submit", logBuyerIn);
  $("#buyer-form-button" ).on("click", toggleBuyerForm);
  $("#buyer-login-button" ).on("click", toggleBuyerLoginForm);
  $("#buyer-index-button" ).on("click", toggleShowBuyers);



  $("body").on("click", ".buyerdelete", removeBuyer);
  $('body').on('click', '.buyershow', showBuyerProfileMike)
  $('body').on('click', '.buyeredit', editBuyer);
  $('body').on('click', '.buyerClose', hideBuyerProfileMike);

  });

function toggleBuyerLoginForm() {
  $(".showable").hide();
  setTimeout(function() {
    $("form#login-buyer").toggle("slow");
  }, 500);

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
  } else {
    return false;
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
    // $("#show").slideUp("slow");
    // $("#tickets").slideUp("slow");
    // $("#sellers").slideUp("slow");
    // setTimeout(function(){
    //   $("#show").html(" ");
    //   $("#tickets").html(" ");
    //   $('#buyers').toggle("slow")
    // }, 600);

    $( ".showable" ).hide();

    setTimeout(function() {
      $("#buyers").toggle("slow");
    }, 500);
  }


  // CREATE BUYER

  function toggleBuyerForm(){
    $( ".showable" ).hide();

    setTimeout(function() {
      $("form#new-buyer").toggle("slow");
    }, 500);
  }

  function createBuyer(){
    event.preventDefault();

    console.log("You are creating a buyer");

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
      // addBuyer(data.buyer);
      toggleBuyerForm();
      console.log("Hey it's done");
      console.log(data);
      var pass = $("input#buyerpassword").val();
      var eme  = $("input#buyeremail").val();

      // This is going to log the buyen
      
            $.ajax({
              url: '/buyer-login',
              type: 'post',
              data: { buyer : {
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

                  window.localStorage.setItem('buyerToken' , data.buyerToken);
                  console.log("Buyer is logged in NOW")

                  $.ajaxSetup({
                    headers: {'Authorisation': 'Bearer ' + data.buyerToken }
                  });
                  location.reload();

                })

    });

  }

  // ADD A BUYER TO PAGE

  function addBuyer(buyer){
    $("#buyers").prepend("<div class='buyer-tile'><h2>" + buyer.firstName + "</h2><p> " + buyer.phone + "</p><a data-id='"+buyer._id+"' class='buyerdelete' href='#'>Delete</a><a data-id='"+buyer._id+"' class='buyershow' href='#'>Show</a><a href='#' class='buyeredit' data-id='"+buyer._id+"'>Edit</a></div>");
  }

  function hideBuyerProfileMike(){
    $('#showAndTickets').toggle();
    $(this).parent().remove();
    $('#tickets').empty();

  }

  // SHOW BUYERS

  function showBuyerProfileMike(){
    $('#sellers').slideUp();
      $('#showAndTickets').toggle();
      $.ajax({
        method: 'GET',
        url: '/buyers/'+$(this).data().id
      }).done(function(buyer){
        $('#show').prepend("<div class='seller-tile' data-id="+ buyer._id +"> <h2 id='username'> User: " + buyer.userName + "</h2><h3> Name:  " 
            + buyer.firstName +" "+ buyer.lastName+ "</h3><h3> Email: "+buyer.email+"</h3><h3>Number: "+buyer.phone+"</h3><a href='#' class='buyerClose' data-id='"+buyer._id+"'>[Close X]</a></div>");

        // Fix later...
        // <a href='#' class='buyeredit' data-id='"+buyer._id+"'>Edit</a></div>"
        $.each(buyer.tickets, function(index, ticket){
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
      $("input#edit-userName").val(buyer.userName),
      $("input#edit-phone").val(buyer.phone)
      $('form#edit-buyer').slideDown()
    });
    $('#edit-buyer').on('submit', updateBuyer.bind(this));
  }

  var updateBuyer = function(){
    event.preventDefault();
    var buyer = {
      buyer:{
        "firstName": $("input#edit-firstName").val(),
        "lastName": $("input#edit-lastName").val(),
        "userName": $("input#edit-userName").val(),
        "phone": $("input#edit-phone").val()
      }
    };
    $.ajax({
      method: 'patch',
      url: '/buyers/'+$(this).data().id,
      data: buyer
    }).done(function(data){
      // not ideal
      console.log(data)
      // location.reload();
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






