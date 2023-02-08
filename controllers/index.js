const { User, Coaching, Pro } = require("../models");
const { decryptPass } = require("../helpers/hash");
const { signToken } = require("../helpers/jwt");
const { v4 } = require("uuid");

class Controller {
  // User register
  static async userRegister(req, res, next) {
    const uuid = v4();
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

  // User Login
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
            uuid: logUser.uuid,
          });

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

  // Add coaching appointments
  static async createAppointment(req, res, next) {
    try {
      const { id } = req.params;
      const { date } = req.body;

      const coach = await Pro.findByPk(id);

      const apply = await Coaching.create({
        UserId: req.user.id,
        ProId: id,
        appointment: date,
        status: "Onprogress",
      });

      res.status(201).json({ message: `Applied for coach ${coach.name}` });
    } catch (error) {
      next(error);
    }
  }

  // Read coaching appointments by specific user
  static async fetchUserCoaching(req, res, next) {
    try {
      const myCoaching = await Coaching.findAll({
        where: { UserId: req.user.id },
        attributes: ["id", "appointment", "status"],
        order: [["id", "DESC"]],
        include: {
          model: Pro,
          attributes: ["name"],
          as: "Coach",
        },
      });

      res.status(200).json(myCoaching);
    } catch (error) {
      next(error);
    }
  }

  // Cancel coaching
  static async cancelCoaching(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Coaching.findOne({
        where: { id },
        attributes: ["id", "appointment", "status"],
        include: {
          model: Pro,
          attributes: ["name"],
          as: "Coach",
        },
      });

      const cancel = await Coaching.update(
        { status: "Canceled" },
        { where: { id } }
      );

      res
        .status(200)
        .json({ message: `Canceled coaching for ${data.Coach.name}` });
    } catch (error) {
      next(error);
    }
  }

  // Finish coaching
  static async finishCoaching(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Coaching.findOne({
        where: { id },
        attributes: ["id", "appointment", "status"],
        include: {
          model: Pro,
          attributes: ["name"],
          as: "Coach",
        },
      });

      const finish = await Coaching.update(
        { status: "Finished" },
        { where: { id } }
      );

      res
        .status(200)
        .json({ message: `Finished coaching for ${data.Coach.name}` });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
