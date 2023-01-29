const { User, validate } = require('../models/UserModel')
const bcrypt = require('bcrypt')
require('express-async-errors')

// create user
const createUser = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(403).send({ message: "User with the given email already exits!" })

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    let newUser = await new User({
        ...req.body,
        password: hashedPassword
    }).save()

    newUser.password = undefined
    newUser.__v = undefined;

    res.status(200).send({ data: newUser, message: "Account created successfully!" })
}

// get all users(admin)
const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password -__v")
    res.status(200).send({ data: users })
}

// get user by id
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password -__v")
    res.status(200).send({ data: user })
    console.log(user);
}

// update user by id
const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).select("-password -__v")
    return res.status(200).send({ data: user, message: "Updated successfully!" })
}

// delete user by id(admin)
const deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    res.status(200).send({ message: " User deleted successfully" })
}

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser }