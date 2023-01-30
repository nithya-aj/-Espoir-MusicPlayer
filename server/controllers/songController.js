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

module.exports = { createSong, getAllSongs, updateSong, deletSong } 