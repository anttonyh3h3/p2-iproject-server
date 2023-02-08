const Controller = require("../controllers");
const { authorization } = require("../middlewares/auth")

const router = require("express").Router();

// Coaching routing endpoints
router.post("/:id", Controller.createAppointment)

// Get coaching data for logged user
router.get("/", Controller.fetchUserCoaching)

// Cancel coaching
router.patch("/:id", authorization, Controller.cancelCoaching)

// Finish coaching
router.put("/:id", authorization, Controller.finishCoaching)

module.exports = router;