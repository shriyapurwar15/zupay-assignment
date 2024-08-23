const express = require("express");
const { registerUser, authUser } = require("../controller/userController");

const router = express.Router()

router.post('/create',registerUser);
router.post('/login',authUser);


module.exports = router;