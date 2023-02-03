const router = require("express").Router()
const { searchSongs } = require("../controllers/searchController")
const auth = require("../middleware/authMiddleware")

router.get("/", auth, searchSongs)

module.exports = router