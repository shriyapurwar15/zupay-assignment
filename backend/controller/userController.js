const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Please enter all the Fields");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create a new user ");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went Wrong [UESR CREATE]");
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send("Please enter your email");
    }
    if (!password) {
      return res.status(400).send("Please enter password");
    }
    const user = await User.findOne({ email : email });
    console.log(user)
    if(!user){
      return res.status(404).send("Invalid email");
    }
    const result = await bcrypt.compare(password, user.password);
    console.log(result)
    if (user && result) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).send("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong [USER LOGIN]");
  }
};

module.exports = { registerUser, authUser };
