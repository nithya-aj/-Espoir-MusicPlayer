const router = require('express').Router();
const auth = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
const validObjectId = require('../middleware/objectIdMiddleware')
const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')

//create user
router.post("/", createUser)

// get all users
router.get("/", admin, getAllUsers)

// get user by id
router.get("/:id", [validObjectId, auth], getUser)

// update user by id
router.put("/:id", [validObjectId, auth], updateUser)

// delete user
router.delete("/:id", [validObjectId, admin], deleteUser)

module.exports = router
