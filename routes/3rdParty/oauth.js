const Controller = require("../../controllers");

const router = require("express").Router();

// Users Oauth endpoints

// Google Oauth
router.post("/google", Controller.userGoogleOauth)

// Discord Oauth redirect
router.post("/discord/:dcCode", Controller.userDiscordOauth)

// Discord Oauth
// router.get("")

module.exports = router;