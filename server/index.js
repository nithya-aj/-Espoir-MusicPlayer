require("dotenv").config();
const express = require('express')
const app = express()
const connection = require('./db')
const cors = require('cors')
require("express-async-errors")
const userRoutes = require('./routes/userRoute')
const authRoutes = require('./routes/authRoute')
const songRoutes = require('./routes/songRoute')
const playlistRoutes = require('./routes/playlistRoute')
const searchRoutes = require("./routes/searchRoute")

connection()
app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/login", authRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/playlists/", playlistRoutes)
app.use("/api/", searchRoutes)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on ${port}`))