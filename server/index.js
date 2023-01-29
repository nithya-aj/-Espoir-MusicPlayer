require("dotenv").config();
const express = require('express')
const app = express()
const connection = require('./db')
const cors = require('cors')
require("express-async-errors")
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')

connection()
app.use(cors())
app.use(express.json())

app.use("/api/users", userRoute)
app.use("/api/login", authRoute)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on ${port}`))