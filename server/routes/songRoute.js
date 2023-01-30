const router = require("express").Router()
const auth = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
const validObjectId = require('../middleware/objectIdMiddleware')
const { createSong, getAllSongs, updateSong, deletSong } = require("../controllers/songController")

// create song
router.post("/", admin, createSong)
router.get("/", auth, getAllSongs)
router.put("/:id", [admin, validObjectId], updateSong)
router.delete("/:id", [admin, validObjectId], deletSong)