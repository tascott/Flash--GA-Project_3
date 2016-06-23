var jwt = require('jsonwebtoken');
var Seller = require('../models/seller');
var secret = require('../config/sellerConfig').secret;

function login(req, res) {

  Seller.findOne({ email: req.body.seller.email }, function(err, user) {
    if(err) return res.send(500).json({ message: err });
    if(!user || !user.validatePassword(req.body.seller.password)) return res.status(401).json({ message: "Unauthorized" });

    var payload = { _id: user._id, username: user.userName, buyer:false }; 
    var token = jwt.sign(payload, secret, {expiresIn: 60*60*24});

    return res.status(200).json({ message: "Login successful", user: user , sellerToken: token});
  });

}

function register(req, res) {

  var seller = new Seller(req.body.seller);

  seller.save(function(err, seller) {
    if(err) return res.status(500).json({ message: err });

    return res.status(200).json({ message: "Thank you for registering", seller });
  });
}

module.exports = {
  login: login,
  register: register
};