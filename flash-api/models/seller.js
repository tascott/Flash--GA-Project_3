var mongoose = require("mongoose");
var bcrypt   = require("bcrypt-nodejs");

var sellerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true},
  userName: { type: String, required: true },
  email: String,
  phone: String,
  latitude: String,
  longitude: String,
  tickets: [{ type: mongoose.Schema.ObjectId, ref: 'Ticket' }],
  passwordHash: { type: String, required: true }
});


sellerSchema.set('toJSON', {
  transform: function(document, json) {
    delete json.passwordHash;
    delete json.__v;
    return json;
  }
});

sellerSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

sellerSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

sellerSchema.path('passwordHash')
  .validate(function(passwordHash) {
    if(!this._password) {
      return this.invalidate('password', 'A password is required');
    }
    if(this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
  });

sellerSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('Seller', sellerSchema);