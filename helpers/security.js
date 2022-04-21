let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

function hash(pass) {
  return  bcrypt.hashSync(`${pass}`, salt)
}
function compare(pass, com) {
  return bcrypt.compareSync(`${pass}`, com)
}

module.exports = {hash,compare}