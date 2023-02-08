const { User, Coaching } = require("../models")
const { verifyToken } = require("../helpers/jwt")

const authentication = async (req, res, next) => {
  try {
    const error = { name: "invalid_token" }

    const {access_token} = req.headers
    if (!access_token) {
      throw error
    }

    const payload = verifyToken(access_token)

    const findUser = await User.findOne({ where: { uuid: payload.uuid } })
    if (!findUser) {
      throw error
    }

    req.user = {
      id: findUser.id,
      uuid: findUser.uuid
    }

    next()
  } catch (error) {
    next(err)
  }
}

const authorization = async (req, res, next) => {
  try {
    const error = { name: "forbidden" }

    const { id } = req.params
    const findData = await Coaching.findOne({ where: { id } })
    if (!findData) {
      throw { name: "not_found" }
    }

    if (req.user.id === findData.UserId) {
      next()
    } else {
      throw error
    }
  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>>>>", "authorization error");
    next(error)
  }
}

module.exports = { authentication, authorization }