var mongoose = require("mongoose");

var ticketSchema = mongoose.Schema({
  event: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  buyerID : {type: String},
  hold : {type: Boolean},
  sold: {type: Boolean}
});

module.exports = mongoose.model('Ticket', ticketSchema);