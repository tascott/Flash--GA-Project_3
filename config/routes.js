var express = require('express'),
    router  = express.Router();
    var buyerAuthenticationController = require('../controllers/buyerAuthentication');
    var sellerAuthenticationController = require('../controllers/sellerAuthentication');
    var jwt = require('jsonwebtoken');
    var buyerSecret = require('./buyerConfig').secret;
    var sellerSecret = require('./sellerConfig').secret;

var buyersController = require('../controllers/buyersController');
var ticketsController = require('../controllers/ticketsController');
var sellersController = require('../controllers/sellersController');

router.route('/')
  .get(buyersController.buyersIndex)
 
router.route('/buyers')
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
  .get(sellersController.sellersIndex)
  .post(sellersController.sellersCreate)

router.route('/sellers/:id') 
  .get(sellersController.sellersShow)
  .patch(sellersController.sellersUpdate)
  .delete(sellersController.sellersDelete)

  router.post('/buyer-login', buyerAuthenticationController.login );
  router.post('/buyer-register', buyerAuthenticationController.register );

  router.post('/seller-login', sellerAuthenticationController.login );
  router.post('/seller-register', sellerAuthenticationController.register );


module.exports = router;