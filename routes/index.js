const express = require('express')
const IndexController = require('../controllers/index')
const route = express.Router()
const sellers = require('./sellers')
const buyers = require('./buyers')



route.get('/', IndexController.homeGet)
route.post('/', IndexController.homePost)
route.get('/register', IndexController.registerGet)
route.post('/register', IndexController.registerPost)
route.get('/register/:id/profile', IndexController.registerProfileGet)
route.post('/register/:id/profile', IndexController.registerProfilePost)
route.get('/logout', IndexController.logout)

route.use(function(req, res, next) {
  if (!req.session.login) {
    res.redirect(`/?errors=Please login`)
  } else {
    next()
  }
})


route.use('/buyers', buyers)
route.use('/sellers', sellers)

module.exports = route