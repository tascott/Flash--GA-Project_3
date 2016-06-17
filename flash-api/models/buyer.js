var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone:  { type: String },
  tickets: [{ type: mongoose.Schema.ObjectId, ref: 'Ticket' }]
});

module.exports = mongoose.model('Buyer', buyerSchema);