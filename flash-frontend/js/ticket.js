$(document).ready(function(){

  getTickets();

  $("form#new-ticket").on("submit", createTicket);
  $('body').on('click', '#seeTicketsButton', toggleShowTickets)
  $('body').on('click', '#addTicket', toggleAddTicket)

  });


// AJAX CALL - GET ALL TICKETS

function getTickets(){
  var ajax = $.get('http://localhost:3000/tickets')
  .done(function(data){
    $.each(data, function(index, ticket){
      addTicket2(ticket);
    });
  });
}



//INDEX - Tickets
function toggleShowTickets(){
  $("#show").slideUp("slow");
  $("#sellers").slideUp("slow");
  $("#buyers").slideUp("slow");
  $("#ticketIndex").toggle("slow");


  setTimeout(function(){
    $("#show").html(" ");
    $("#buyers").html(" ");
  }, 600);
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


