var Seller = require("../models/seller");

function sellersIndex(req, res){
  Seller.find({}, function(err, sellers) {
    if (err) return res.status(404).send(err);

    res.status(200).send(sellers);
  });
}

function sellersCreate(req, res){
  var seller = new Seller(req.body.seller);

  seller.save(function(err, seller) {
    if (err) return res.status(500).send(err);

    res.status(201).send(seller)
  })
}

function sellersShow(req, res){
  var id = req.params.id;

  Seller.findById({ _id: id }).populate("ticket").exec(function(err, seller) {
    if (err) return res.status(500).send(err);
    if (!seller) return res.status(404).send(err);

    res.status(200).send(seller);
  })
}

function sellersUpdate(req, res){
  var id = req.params.id;

  Seller.findByIdAndUpdate({ _id: id }, req.body.seller, function(err, seller){
    if (err) return res.status(500).send(err);
    if (!seller) return res.status(404).send(err);

    res.status(200).send(seller);
  })
}

function sellersDelete(req, res){
  var id = req.params.id;

  Seller.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  })
}

module.exports = {
  sellersIndex:  sellersIndex,
  sellersCreate: sellersCreate,
  sellersShow:   sellersShow,
  sellersUpdate: sellersUpdate,
  sellersDelete: sellersDelete
