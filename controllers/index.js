const { User } = require("../models");
const { decryptPass } = require("../helpers/hash");
const { signToken } = require("../helpers/jwt");
const { v4 } = require("uuid")
const uuid = v4()

class Controller {
  static async userRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;

      const regUser = await User.create({
        uuid: uuid,
        username,
        email,
        password,
        phoneNumber,
        status: "Unverified",
      });

      res.status(201).json({ id: regUser.id, username: regUser.username });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!email && !username) {
        throw { name: "reqEmailUser" };
      } else if (!password) {
        throw { name: "reqPass" };
      }

      let logUser;

      if (!email) {
        logUser = await User.findOne({ where: { username } });
      } else {
        logUser = await User.findOne({ where: { email } });
      }

      const error = { name: "InvalidLogin" };

      if (!logUser) {
        throw error;
      } else {
        const isValid = decryptPass(password, logUser.password);

        if (!isValid) {
          throw error;
        } else {
          const access_token = signToken({
            uuid: logUser.uuid
          });

          console.log(logUser.uuid);

          res.status(200).json({
            access_token,
            username: logUser.username,
            email: logUser.email,
            role: logUser.status,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
