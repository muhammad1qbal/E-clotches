const {User, Profile} = require('../models/index')

class IndexController {

  static homeGet (req, res) {
    res.render('home')
  }

  static homePost (req, res) {
    // res.render()
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
}

module.exports = IndexController