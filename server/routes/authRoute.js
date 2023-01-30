const { loginUser } = require("../controllers/authController")

const router = require("express").Router()

router.post("/", loginUser)

module.exports = router