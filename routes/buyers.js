const express = require('express')
const BuyerController = require('../controllers/buyers')
const route = express.Router()

route.get('/:id', BuyerController.buyers)
route.get('/:id/products/:productId/buy', BuyerController.buy)
route.get('/:id/products/:productId /delete', BuyerController.delete)

module.exports = route