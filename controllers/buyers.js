const { Op } = require('sequelize')
const {User, Profile, Product, Category} = require('../models/index')

class BuyerController {
  static buyers(req,res) {
    const {id,} = req.params
    let obj = {confirm: req.query.buy}
    const {search} = req.query
    User.findOne({
      include:[Profile, Product],
      where: {
        id
      }
    })
    .then((data) => {
      obj.data = data
      return Product.findAll({
        include: [Category],
        where: {
          UserId: data.id,
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      })
    })
    .then((data2) => {
      obj.buyProduct = data2
      return Product.findAll({
        include: [Category],
        where: {
          isBuy: false,
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      })
    })
    .then((data3) => {
      obj.notBuy = data3
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