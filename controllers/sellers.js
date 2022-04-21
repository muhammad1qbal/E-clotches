const {
  Category,
  Product,
  User,
  Profile
} = require('../models/index');
const rupiah = require('../helper/price');

class SellerController {
  static listSellerById(request, response) {
    const {
      id
    } = request.params;
    User.findAll({
      include: [{
        model: Profile,
        where: {
          id: id
        }
      }, {
        model: Product,
        where: {
          UserId: id
        }
      }],
      where: {
        role: 'seller'
      }
    }).then((result) => {
      // console.log(result);
      response.render('sellersDetail', {
        result,
        rupiah
      })
    }).catch((err) => {
      // console.log(err);
      response.send(err);
    })
  }

  static addProductForm(request, response) {
    // console.log(request.params);
    const {
      id
    } = request.params;
    Category.findAll().then((result) => {
      response.render('addProductForm', {
        result,
        id
      })
    }).catch((err) => {
      response.send(err);
    })
  }

  static addProduct(request, response) {
    // console.log(request.body);
    // console.log(request.params);
    const {
      name,
      imageURL,
      description,
      price,
      CategoryId
    } = request.body;
    const {
      id
    } = request.params;
    const newProduct = {
      name,
      imageURL,
      description,
      price: +price,
      CategoryId,
      UserId: id
    }

    Product.create(newProduct).then(() => {
      response.redirect(`/sellers/${id}`);
    }).catch((err) => {
      response.send(err);
    })
  }

  static editForm(request, response) {
    // console.log(request.params);
    const {
      id,
      productId
    } = request.params;
    let data = {};
    Product.findByPk(productId).then((result) => {
      // console.log(result);
      data.result = result;
      return Category.findAll();
    }).then((data2) => {
      data.category = data2;
      // console.log(data.category[0].id);
      // console.log(data.result.CategoryId);
      response.render('editProductForm', data)
    }).catch((err) => {
      response.send(err);
    })
  }

  static editProduct(request, response) {
    console.log(request.body);
    console.log(request.params);

    const {
      name,
      imageURL,
      description,
      price,
      CategoryId
    } = request.body;
    const {
      id,
      productId
    } = request.params;

    const updatedData = {
      name,
      imageURL,
      description,
      price: +price,
      CategoryId,
      UserId: id
    }

    Product.update(updatedData, {
      where: {
        id: productId
      }
    }).then(() => {
      response.redirect(`/sellers/${id}`);
    }).catch((err) => {
      response.send(err);
    })
  }
}

module.exports = SellerController;