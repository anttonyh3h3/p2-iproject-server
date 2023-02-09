const CLIENT_ID = process.env.CLIENT_ID;
const DISCORD_CLIENT_ID = process.env.DISCORD_API_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_API_CLIENT_SECRET;
const { User, Coaching, Pro } = require("../models");
const { decryptPass } = require("../helpers/hash");
const { signToken } = require("../helpers/jwt");
const { v4 } = require("uuid");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);
const url = require("url");
const { default: axios } = require("axios");

class Controller {
  // Google Oauth
  static async userGoogleOauth(req, res, next) {
    try {
      const googleToken = req.headers["google-oauth-token"];
      console.log(googleToken);

      // verify google oauth token
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      // console.log(payload);
      const { name, email } = payload;
      const username = name.split(" ").join("").toLowerCase();

      const [user, created] = await User.findOrCreate({
        where: { username },
        defaults: {
          username,
          email,
          password: "google",
          status: "Unverified",
        },
        hooks: false,
      });

      if (created) {
        res.status(201).json({
          access_token: signToken({ uuid: user.uuid }),
          username: user.username,
          role: user.role,
        });
      } else {
        res.status(200).json({
          access_token: signToken({ uuid: user.uuid }),
          username: user.username,
          status: user.status,
        });
      }
    } catch (err) {
      console.log(err, "<<<<<<<<<<<<<<<< ERROR");
    }
  }

  // Discord Oauth
  static async userDiscordOauth(req, res, next) {
    const { dcCode } = req.params;
    const uuid = v4();

    try {
      const formData = new url.URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: dcCode.toString(),
        redirect_uri: "http://localhost:2600/login",
      });

      const { data } = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const response = await axios({
        url: "https://discord.com/api/v10/users/@me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      // res.status(200).json(response.data)

      const { username, email } = response.data

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          uuid,
          username,
          email,
          password: "discord",
          status: "Unverified",
        },
        hooks: false,
      });

      if (created) {
        res.status(201).json({
          access_token: signToken({ uuid: user.uuid }),
          username: user.username,
          status: user.status,
        });
      } else {
        res.status(200).json({
          access_token: signToken({ uuid: user.uuid }),
          username: user.username,
          status: user.status,
        });
      }
    } catch (error) {
      console.log(error, "<<<<<<<<<<<<<<<<<< DISCORD OAUTH ERROR");
      next(error);
    }
  }

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
            status: logUser.status,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // Fetch Pros data
  static async fetchPros(req, res, next) {
    try {
      const dataPros = await Pro.findAll({
        attributes: ["uuid", "name", "photoUrl", "content", "agent_uuid"],
        order: [["id", "ASC"]],
      });

      res.status(200).json(dataPros);
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

  // Fetch coaching appointments by specific user
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
      next(error);
    }
  }
}

module.exports = Controller;
