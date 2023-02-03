const { User } = require("../models/UserModel")
const { Song, validate } = require('../models/SongModel')

// create song
const createSong = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.body(400).send({ message: error.details[0].message })

    const song = await Song(req.body).save()
    res.status(200).send({ data: song, message: "Song created successfully!" })
}

// get all the songs
const getAllSongs = async (req, res) => {
    const songs = await Song.find()
    res.status(200).send({ data: songs })
}

// update songs
const updateSong = async (req, res) => {
    const song = await Song.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    )
    return res.status(200).send({ data: song, message: "Song updated successfully!" })
}

// delete song
const deletSong = async (req, res) => {
    await Song.findByIdAndRemove(req.params.id)
    res.status(200).send({ message: " Song deleted successfully!" })
}

// like song
const likeSong = async (req, res) => {
    let resMessage = ""
    const song = await Song.findById(req.params.id);
    console.log(song, "song object");
    if (!song) return res.status(400).send({ message: "Song doesn't exit" })

    const user = await User.findById(req.user._id)
    const index = user.likedSongs.indexOf(song._id)
    console.log(`this song is in the position ${index}`);
    if (index === -1) {
        user.likedSongs.push(song._id)
        resMessage = "Song added to your liked songs"
    } else {
        user.likedSongs.splice(index, 1)
        resMessage = "Song removed from your liked songs"
    }
    await user.save()
    res.status(200).send({ message: resMessage })
}

// get all liked songs
const allLikedSongs = async (req, res) => {
    const user = await User.findById(req.user._id)
    const songs = await Song.find({ _id: user.likedSongs })
    return res.status(200).send({ data: songs })
}

module.exports = { createSong, getAllSongs, updateSong, deletSong, likeSong, allLikedSongs } 