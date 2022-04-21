const express = require('express')
const route = express.Router()
const SellerController = require('../controllers/sellers')

route.get("/:id", SellerController.listSellerById);
route.get("/:id/add", SellerController.addProductForm);
route.post("/:id/add", SellerController.addProduct);
route.get("/:id/products/:productId/edit", SellerController.editForm);
route.post("/:id/products/:productId/edit", SellerController.editProduct);

module.exports = route