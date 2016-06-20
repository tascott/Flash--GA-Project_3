var jwt = require('jsonwebtoken');
var Buyer = require('../models/buyer');
var secret = require('../config/buyerConfig').secret;

function login(req, res) {

  Buyer.findOne({ email: req.body.buyer.email }, function(err, user) {
    if(err) return res.send(500).json({ message: err });
    if(!user || !user.validatePassword(req.body.buyer.password)) return res.status(401).json({ message: "Unauthorized" });

    var payload = { _id: user._id, username: user.username }; 
    var token = jwt.sign(payload, secret, {expiresIn: 60*60*24});

    return res.status(200).json({ message: "Login successful", user: user , token : token});
  });

}

function register(req, res) {

  var buyer = new Buyer(req.body.buyer);

  buyer.save(function(err, buyer) {
    if(err) return res.status(500).json({ message: err });

    return res.status(200).json({ message: "Thank you for registering", buyer });
  });
}

module.exports = {
  login: login,
  register: register
};