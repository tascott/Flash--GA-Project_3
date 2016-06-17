var Buyer = require("../models/buyer");

function buyersIndex(req, res){
  Buyer.find({}, function(err, buyers) {
    if (err) return res.status(404).send(err);

    res.status(200).send(buyers);
  });
}

function buyersCreate(req, res){
  var buyer = new Buyer(req.body.buyer);

  buyer.save(function(err, buyer) {
    if (err) return res.status(500).send(err);

    res.status(201).send(buyer)
  })
}

function buyersShow(req, res){
  var id = req.params.id;

  Buyer.findById({ _id: id }, function(err, buyer) {
    if (err) return res.status(500).send(err);
    if (!buyer) return res.status(404).send(err);

    res.status(200).send(buyer);
  })
}

function buyersUpdate(req, res){
  var id = req.params.id;

  Buyer.findByIdAndUpdate({ _id: id }, req.body.buyer, function(err, buyer){
    if (err) return res.status(500).send(err);
    if (!buyer) return res.status(404).send(err);

    res.status(200).send(buyer);
  })
}

function buyersDelete(req, res){
  var id = req.params.id;

  Buyer.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  })
}

module.exports = {
  buyersIndex:  buyersIndex,
  buyersCreate: buyersCreate,
  buyersShow:   buyersShow,
  buyersUpdate: buyersUpdate,
  buyersDelete: buyersDelete
}