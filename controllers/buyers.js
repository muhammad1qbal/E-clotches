const {User, Profile, Products} = require('../models/index')

class BuyerController {
  static buyers(req,res) {
    console.log(req.params);
    User.findOne({
      include: [Profile, Products]
    })
    .then((data) => {
      console.log(data);
      res.render('buyers')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  static buy(req,res) {
    
  }

  static delete(req,res) {
    
  }

}

module.exports = BuyerController