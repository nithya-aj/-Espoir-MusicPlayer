const router = require("express").Router()
const { createPlaylist, editPlaylist, getAllPlaylists, addSongToPlaylist, deletePlaylist, favoritePlaylist, randomPlaylist, playlistById } = require("../controllers/playlistController")
const auth = require('../middleware/authMiddleware')
const validObjectId = require('../middleware/objectIdMiddleware')

// create playlist
router.post("/", auth, createPlaylist)

// edit playlist
router.put("/edit/:id", [auth, validObjectId], editPlaylist)

// add song to playlist
router.put("/add-song", auth, addSongToPlaylist)

// user favorite playlist
router.get("/favorite", auth, favoritePlaylist)

// get random playlsit
router.get("/random", auth, randomPlaylist)

// get playlist by id and songs
router.get("/:id", [auth, validObjectId], playlistById)

// get all playlists
router.get("/", auth, getAllPlaylists)

// delete playlist
router.delete("/:id", [validObjectId, auth], deletePlaylist)

module.exports = router