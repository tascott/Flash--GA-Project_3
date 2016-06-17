var mongoose = require("mongoose");

var sellerSchema = mongoose.Schema({
  first name: { type: String, required: true },
  last name: { type: String, required: true},
  email: String,
  phone: String,
  location: String,
  ticket: [{ type: mongoose.Schema.ObjectId, ref: 'Ticket' }]
});

module.exports = mongoose.model('Seller', sellerSchema);