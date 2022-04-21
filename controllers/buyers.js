const {User, Profile, Product} = require('../models/index')


class BuyerController {
  static buyers(req,res) {
    const {id,} = req.params
    let obj = {confirm: req.query.buy}

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
    const {id, productId} = req.params

    User.findOne({
      where: {
        id
      }
    })
    .then((data) => {
      data.mail(id, productId)
      res.redirect(`/buyers/${id}?buy=${productId}`)
    })
    .catch((err) => {
      res.send(err)
    })

  }

  static delete(req,res) {
    const {id, productId} = req.params
    Product.destroy({
      where: {
        id: productId
      }
    })
    .then(() => {
      res.redirect(`/buyers/${id}`)
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static confirm(req, res) {
    const {id, productId} = req.params
    Product.update({
      isBuy: true,
      UserId: id
    },{
      where: {
        id: productId
      }
    })
    .then(() => {
      res.redirect(`/buyers/${id}`)
    })
    .catch((err) => {
      res.send(err)
    })
  }

}

module.exports = BuyerController