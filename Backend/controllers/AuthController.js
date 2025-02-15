const Auth = require("../models/Auth");
const User = require("../models/User"); 
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcryptjs");
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Password does not match",
      });
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    const lastUser = await Auth.findOne().sort({ userID: -1 });
    const nextUserID = (lastUser ? lastUser.userID : 0) + 1;

    const hash = await bcrypt.hash(password, 10);
    const user = new Auth({
      email,
      password: hash,
      userID: nextUserID,
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "User successfully signed up",
    });
  } catch (error) {
    console.error("Error during signup process:", error.message);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        res.status(200).send({
          success: true,
          message: "User successfully logged in",
          token,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { signup, login };
