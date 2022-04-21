const { compare } = require('../helpers/security')
const {User, Profile} = require('../models/index')

class IndexController {

  static homeGet (req, res) {
    const {errors} = req.query
    res.render('home', {errors})
  }

  static homePost (req, res) {
    const {email, password} = req.body

    User.findOne({
      where: {
        email,
      }
    })
    .then((data) => {
      if (data) {
        if (data.role == 'seller' && compare(password, data.password)) {
          req.session.login = true
          res.redirect(`/sellers/${data.id}`)
        } else if (data.role == 'buyer' && compare(password, data.password)) {
          req.session.login = true
          res.redirect(`/buyers/${data.id}`)
        } else {
          res.redirect('/?errors=email or password invalid')
        }
      } else {
        res.redirect('/?errors=email or password invalid')
      }
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static registerGet(req, res) {
    let {errors} = req.query
    if (errors) {
      errors = errors.split(',')
    }
    res.render('register', {errors})
  }

  static registerPost(req, res) {
    const {name, email, password, role} = req.body
    User.create({
      name,
      email,
      password,
      role
    })
    .then((data) => {
      res.redirect(`/register/${data.id}/profile`)
    })
    .catch((err) => {
      let errors = err.errors.map(el => el.message)
      res.redirect(`/register?errors=${errors}`)
    })
  }

  static registerProfileGet(req, res) {
    const {id} = req.params
    let {errors} = req.query
    if (errors) {
      errors = errors.split(',')
    }
    res.render(`registerProfile`, {id, errors})
  }

  static registerProfilePost(req, res) {
    const {id} = req.params
    const {age, gender, phone} = req.body

    Profile.create({
      age,
      gender,
      phone,
      UserId: id
    })
    .then((data) => {
      res.redirect('/')
    })
    .catch((err) => {
      let errors = err.errors.map(el => el.message)
      res.redirect(`/register/${id}/profile?errors=${errors}`)
    })
  }

  static logout(req, res) {
    req.session.destroy(err => {
      res.redirect('/')
    })
  }
}

module.exports = IndexController