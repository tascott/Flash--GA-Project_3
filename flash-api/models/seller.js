var mongoose = require("mongoose");

var sellerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true},
  userName: { type: String, required: true },
  email: String,
  phone: String,
  location: String,
  tickets: [{ type: mongoose.Schema.ObjectId, ref: 'Ticket' }]
});

module.exports = mongoose.model('Seller', sellerSchema);