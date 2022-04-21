const {User, Profile, Product} = require('../models/index')

class BuyerController {
  static buyers(req,res) {
    const {id} = req.params
    let obj = {}
    User.findOne({
      include:[Profile, Product],
      where: {
        id
      }
    })
    .then((data) => {
      obj.data = data
      return Product.findAll({
        where: {
          isBuy: false
        }
      })
    })
    .then((data2) => {
      obj.notBuy = data2
      res.render('buyers', obj)
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static buy(req,res) {
    console.log(req.params);
  }

  static delete(req,res) {
    console.log(req.params);
    const {id, productId} = req.params
    Product.destroy({
      where: {
        id: productId
      }
    })
  }

}

module.exports = BuyerController