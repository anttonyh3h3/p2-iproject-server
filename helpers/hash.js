const bcrypt = require("bcryptjs")

const encryptPass = (password) => {
  const salt = bcrypt.genSaltSync(8)

  return bcrypt.hashSync(password, salt)
}

const decryptPass = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = { encryptPass, decryptPass }