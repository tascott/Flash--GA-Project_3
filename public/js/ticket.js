$(document).ready(function(){

  getTickets();

  $("form#new-ticket").on("submit", createTicket);
  $("#ticket-index-button").on("click", toggleShowTickets);
  $("#closeTickets").on("click", toggleHideTickets);


  $('body').on('click', '#seeTicketsButton', toggleShowTickets)
  $('body').on('click', '#addTicket', toggleAddTicket)
  $('body').on('click', '.hold', holdTicket);
  $('body').on('click', '.auth', authTicket);
  $('body').on('click', '.reject', rejTicket);
  $("body").on("click", ".ticketdelete", removeTicket);



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

function toggleHideTickets(){

  $("#ticketIndex").hide();

}


function addTicket2(ticket){
  $("#ticketIndex").append("<div class='seller-tile'><h2>" + ticket.event + "</h2><p> " + ticket.price + "</p><a data-id='"+ticket._id+"' class='delete' href='#'>Delete</a><a data-id='"+ticket._id+"' class='show' href='#'>Show</a><a href='#' class='edit' data-id='"+ticket._id+"'>Edit</a></div>");
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
      addTicketForBuyer(ticket)
      toggleAddTicket();
      $("input#event").val(null),
      $("input#date").val(null),
      $("input#price").val(null)
    });
  }

  function addTicket(ticket){
    // $('#tickets').prepend("<div class='ticket-tile'><h2>"+ ticket.event + "</h2><p>"
    //   + ticket.date + 
    //   + ticket.price +"'>Price</a> | <a href='")
    // $('#tickets').prepend("<div class='ticket-tile'><h2>"+ ticket.event + "</h2><p><h3> Date: "+ ticket.date + "</h3><h3> Price: "+ticket.price+" </h3><h3>"+isAuth(ticket)+"</h3>"+canDelete(ticket))

  }

  function addTicketMike(ticket){
    $('#tickets').prepend("<div class='ticket-tile'><h2>"+ ticket.event + "</h2><p><h3> Date: "+ ticket.date + "</h3><h3> Price: "+ticket.price+" </h3><h3>"+isHeld(ticket)+"</h3>")

  }

  function addTicketForBuyer(ticket){
    $('#tickets').prepend("<div class='ticket-tile'><h2>"+ ticket.event + "</h2><p><h3> Date: "+ ticket.date + "</h3><h3> Price: "+ticket.price+" </h3><h3>"+isAuth(ticket)+"</h3>"+canDelete(ticket))

  }

  function isHeld(ticket){
    if(ticket.hold == true && ticket.sold == true){
      return "<p>You have the ticket</p> <h3><a class='ticketdelete' data-ticketid='"+ticket._id+"'href='#'> Delete </a> </h3>"
    } else if (ticket.hold){
      return "<p>Ticket on hold with seller</p>"
    } else {
      return "<a class='hold' data-ticketid='"+ticket._id+"'href='#'> Get Ticket!</a>"
    }

  }

  function canDelete(ticket){
    if(!currentSeller().buyer){
      return "<h3><a class='ticketdelete' data-ticketid='"+ticket._id+"'href='#'> Delete </a> </h3>"
    } else {

    }
  }

  function isAuth(ticket){
    if(ticket.hold){
      return "<p> Ticket Status: You have a buyer </p> <h3> <a class='auth' data-ticketid='"+ticket._id+"'href='#'> Authorize </a> </h3> <h3> <a class='reject' data-ticketid='"+ticket._id+"'href='#'> Reject </a> </h3>"
    } else {
      return "<p>Still for Sale</p>"
    }

  }

  function authTicket(){
  
    var ticket = $(this).data().ticketid;
    var id = currentSeller()._id;

    console.log("TICKET ID: "+ ticket);
    console.log("SELLER ID: "+ id);

    $.ajax({
      method: 'POST',
      url: '/transfer/'+ticket,
      data: { package: {
        "seller": id
      }}
    }).done(function(myticket){

      console.log(myticket)

    });
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

  function rejTicket(){

      var ticket = $(this).data().ticketid;

      console.log("You rejected the ticket!");

        $.ajax({
          method: 'patch',
          url: '/tickets/'+ticket,
          data: { ticket : {
                  hold : false,
                  buyerID : null
          }}
        }).done(function(data){
          // not ideal
          console.log(data)

        });
  }


  function removeTicket(){
    event.preventDefault();
    console.log($(this).data().ticketid);
    $.ajax({
      url:'/tickets/'+$(this).data().ticketid,
      type:'delete'
    });
    $(this).parent().parent().remove();
  }


  

