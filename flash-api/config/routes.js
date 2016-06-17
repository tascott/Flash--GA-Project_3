var express = require('express'),
    router  = express.Router();

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

module.exports = router;