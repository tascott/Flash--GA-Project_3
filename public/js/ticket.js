$(document).ready(function(){

  getTickets();

  $("form#new-ticket").on("submit", createTicket);
  $("#ticket-index-button").on("click", toggleShowTickets);


  $('body').on('click', '#seeTicketsButton', toggleShowTickets)
  $('body').on('click', '#addTicket', toggleAddTicket)

  $('body').on('click', '.hold', holdTicket);
  $('body').on('click', '.auth', authTicket);

  });


// AJAX CALL - GET ALL TICKETS

function getTickets(){
  var ajax = $.get('/tickets')
  .done(function(data){
    $.each(data, function(index, ticket){
      addTicket2(ticket);
    });
  });
}



//INDEX - Tickets
function toggleShowTickets(){

  $( ".showable" ).hide();


  $("#frontInfoHolder").slideUp("slow");

  setTimeout(function() {
    $("#ticketIndex").toggle("slow");
  }, 500);
}



function addTicket2(ticket){
  $("#ticketIndex").prepend("<div class='seller-tile'><h2>" + ticket.event + "</h2><p> " + ticket.price + "</p><a data-id='"+ticket._id+"' class='delete' href='#'>Delete</a><a data-id='"+ticket._id+"' class='show' href='#'>Show</a><a href='#' class='edit' data-id='"+ticket._id+"'>Edit</a></div>");
}



  //----------------------------------------------------------------
  // ADD A TICKET


  function toggleAddTicket(){
    $("form#new-ticket").slideToggle("slow");
  }

  function createTicket(){
    event.preventDefault(); 
    $.ajax({
      url:'/tickets',
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

  function addTicketMike(ticket){
    $('#tickets').prepend("<div class='ticket-tile'><h2>"+ ticket.event + "</h2><p><h3> Date: "+ ticket.date + "</h3><h3> Price: "+ticket.price+" </h3><h3>"+isHeld(ticket)+"</h3>")

  }

  function addTicketForBuyer(ticket){
    $('#tickets').prepend("<div class='ticket-tile'><h2>"+ ticket.event + "</h2><p><h3> Date: "+ ticket.date + "</h3><h3> Price: "+ticket.price+" </h3><h3>"+isAuth(ticket)+"</h3>")

  }

  function isHeld(ticket){
    if(ticket.hold){
      return "<p>Ticket on Hold with Seller</p>"
    } else {
      return "<a class='hold' data-ticketid='"+ticket._id+"'href='#'> Get Ticket!</a>"
    }

  }

  function isAuth(ticket){
    if(ticket.hold){
      return "<a class='auth' data-ticketid='"+ticket._id+"'href='#'> YOU HAVE A BUYER - Authorize?!</a>"
    } else {
      return "<p>Still for Sale</p>"
    }

  }

  function authTicket(){
  
    var ticket = $(this).data().ticketid;
    var id = currentSeller()._id;

    console.log("TICKET ID: "+ ticket);
    console.log("SELLER ID: "+ id);

    // GET THE TICKET
    // $.ajax({
    //   method: 'GET',
    //   url: '/tickets/'+ticket
    // }).done(function(myticket){
    //   console.log("BUYER ID: "+ myticket.buyerID);

    $.ajax({
      method: 'POST',
      url: '/transfer/'+ticket,
      data: { package: {
        "seller": id
      }}
    }).done(function(myticket){

          // $.ajax({
          //   method: 'POST'
          //   url:    '/buyers'+id
          //   data:   , 

          // }).done(function(user){

          // });

      console.log(myticket)
      // $.each(data, function(index, ticket){
      //   addTicket2(ticket);
      // });




    });
    
    // Take the ticket out of the sellar tickets array

    // $.ajax({
    //   method: 'patch',
    //   url: '/sellers/'+id,
    //   data: { ticket : {
    //           hold : true,
    //           buyerID : id
    //   }}
    // }).done(function(data){
    //   // not ideal
    //   console.log(data)

    // });

    // Put that ticket in the buyers ticekts 





    // send console list


  }

  function holdTicket(){

    var id = currentBuyer()._id;
    var ticket = $(this).data().ticketid;


    console.log("TICKET-ID: " + id);
    console.log("BUYER: "+ ticket);

      $.ajax({
        method: 'patch',
        url: '/tickets/'+ticket,
        data: { ticket : {
                hold : true,
                buyerID : id
        }}
      }).done(function(data){
        // not ideal
        console.log(data)

      });
  }


  

