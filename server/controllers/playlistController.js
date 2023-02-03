const { Playlist, validate } = require('../models/PlaylistModel')
const { User } = require('../models/UserModel')
const { Song } = require('../models/SongModel')
const joi = require('joi')

// create playlist
const createPlaylist = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    const user = await User.findById(req.user._id)
    const playlist = await Playlist({ ...req.body, user: user._id }).save()
    user.playLists.push(playlist._id)
    await user.save()
    return res.status(200).send({ data: playlist, message: `Playlist created successfully!` })
}

// update playlist
const editPlaylist = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        desc: joi.string().allow(""),
        img: joi.string().allow()
    })
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    const playlist = await Playlist.findById(req.params.id)
    if (!playlist) return res.status(404).send({ message: `There is no playlist as ${req.body.name}` })

    const user = await User.findById(req.user._id)
    if (!user._id.equals(playlist.user))
        return res.status(403).send({ message: "You have no access to edit this!" })

    playlist.name = req.body.name
    playlist.desc = req.body.desc
    playlist.img = req.body.img
    await playlist.save()

    res.status(200).send({ message: "Updated successfully!" })
}

// add song to playlist
const addSongToPlaylist = async (req, res) => {
    resMessage = ""
    const schema = joi.object({
        playlistId: joi.string().required(),
        songId: joi.string().required()
    })
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.body.playlistId)
    if (!user._id.equals(playlist.user))
        return res.status(403).send({ message: "You don't have access to do this" })

    const index = playlist.songs.indexOf(req.body.songId)
    if (index === -1) {
        playlist.songs.push(req.body.songId)
        resMessage = "Added to playlist"
    } else {
        playlist.songs.splice(index, 1)
        resMessage = "Removed from playlist"
    }
    await playlist.save()
    res.status(200).send({ data: playlist, message: resMessage })
}

// user playlist
const favoritePlaylist = async (req, res) => {
    const user = await User.findById(req.user._id)
    const playlists = await Playlist.find({ _id: user.playLists })
    return res.status(200).send({ data: playlists })
}

// get random playlist
const randomPlaylist = async (req, res) => {
    const playlist = await Playlist.aggregate([{ $sample: { size: 10 } }])
    res.status(200).send({ data: playlist })
}

// get playlist by id and songs
const playlistById = async (req, res) => {
    const playlist = await Playlist.findById(req.params.id)
    if (!playlist) return res.status(404).send({ message: "Not found" })

    const songs = await Song.find({ _id: playlist.songs })
    res.status(200).send({ data: { playlist, songs } })
}

// get all playlists
const getAllPlaylists = async (req, res) => {
    const playlists = await Playlist.find()
    res.status(200).send({ data: playlists })
}

// delete playlist
const deletePlaylist = async (req, res) => {
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)
    if (!user._id.equals(playlist.user))
        return res.status(403).send({ message: "You don't have access to delete" })

    const index = user.playLists.indexOf(req.params.id)
    user.playLists.splice(index, 1)
    await user.save()
    await playlist.remove()
    res.status(200).send({ message: "Playlist removed from library!" })
}

module.exports = { createPlaylist, editPlaylist, addSongToPlaylist, deletePlaylist, favoritePlaylist, randomPlaylist, playlistById, getAllPlaylists }