const { Song } = require("../models/SongModel")
const { Playlist } = require("../models/PlaylistModel")

const searchSongs = async (req, res) => {
    const search = req.query.search;
    if (search !== "") {
        const songs = await Song.find({
            name: { $regex: search, $options: "i" }
        }).limit(10);
        const playlist = await Playlist.find({
            name: { $regex: search, $options: "i" }
        }).limit(10)
        const result = { songs, playlist }
        res.status(200).send({ data: result })
    } else {
        res.status(200).send({})
    }
}

module.exports = { searchSongs }