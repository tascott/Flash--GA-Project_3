var express = require('express'),
    router  = express.Router();
    var buyerAuthenticationController = require('../controllers/buyerAuthentication');
    var sellerAuthenticationController = require('../controllers/sellerAuthentication');
    var jwt = require('jsonwebtoken');
    var secret = require('./buyerConfig').secret;
    // var sellerSecret = require('./sellerConfig').secret;

var buyersController = require('../controllers/buyersController');
var ticketsController = require('../controllers/ticketsController');
var sellersController = require('../controllers/sellersController');


function checkForToken(req,res,next){
    if(!req.headers.authorisation) return res.status(401).json({ message: 'NO TOKEN: Unauthorised'});


    var token = req.headers.authorisation.replace('Bearer ', '');

      jwt.verify(token , secret , function(err, user){
      if(!user) return res.status(401).json({ message: 'Invalid Token'}); 
      req.user = user;
      console.log(user);
      next();
  });

}

function authoriseBuyer(req,res, next) {

    if(req.user.buyer) {
      console.log("the buyer was AUTHORISED")
      next();
    } else {
      res.status(403);
    }

}

function authoriseSeller(req,res, next) {

    if(!req.user.buyer) {
      console.log("the seller was AUTHORISED")
      next();
    } else {
      res.status(403);
    }

}


router.route('/')
  .get(buyersController.buyersIndex)

  router.post('/buyer-login', buyerAuthenticationController.login );
  router.post('/buyer-register', buyerAuthenticationController.register );
 
router.route('/buyers')
    // .all(checkForToken, authoriseSeller) 
  .get(buyersController.buyersIndex)
  .post(buyersController.buyersCreate)

router.route('/buyers/:id') 
  .get(buyersController.buyersShow)
  .patch(buyersController.buyersUpdate)
  .delete(buyersController.buyersDelete)

router.route('/tickets')
  .get(ticketsController.ticketsIndex)
  .post(ticketsController.ticketsCreate)

router.route('/transfer/:id')
  .post(ticketsController.ticketsTransfer)

router.route('/tickets/:id') 
  .get(ticketsController.ticketsShow)
  .patch(ticketsController.ticketsUpdate)
  .delete(ticketsController.ticketsDelete)

router.route('/sellers')
  // .all(checkForToken, authoriseBuyer)
  .get(sellersController.sellersIndex)
  .post(sellersController.sellersCreate)

router.route('/sellers/:id') 
  .get(sellersController.sellersShow)
  .patch(sellersController.sellersUpdate)
  .delete(sellersController.sellersDelete)

  

  router.post('/seller-login', sellerAuthenticationController.login );
  router.post('/seller-register', sellerAuthenticationController.register );


module.exports = router;