const router = require("express").Router()
const auth = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
const validObjectId = require('../middleware/objectIdMiddleware')
const { createSong, getAllSongs, updateSong, deletSong, likeSong, allLikedSongs } = require("../controllers/songController")

// create song
router.post("/", admin, createSong)

// get all the songs
router.get("/", auth, getAllSongs)

// update song
router.put("/:id", [admin, validObjectId], updateSong)

// delete song
router.delete("/:id", [admin, validObjectId], deletSong)

// like song
router.put("/like/:id", [validObjectId, auth], likeSong)

// get all liked songs
router.get("/like", auth, allLikedSongs)

module.exports = router