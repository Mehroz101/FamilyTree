const Auth = require("../models/Auth");
const User = require("../models/User"); // Use require for imports
const jwt = require("jsonwebtoken"); // Example of another require
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
      const isUserExits = await Auth.findOne({ email });
      if (isUserExits) {
        return res.status(400).send({
          success: false,
          message: "User already exists",
        });
      } else {
        const previousUserID = await Auth.find().sort({ userID: -1 });
        const userID = previousUserID ? previousUserID[0].userID + 1 : 1;
        const user = new Auth({
          email,
          password,
          userID,
        });
        await user.save();
        res.status(201).send({
          success: true,
          message: "User successfully signed up",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await Auth.findOne({ email});
    if (user) {
      if (user.password === password) {
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
