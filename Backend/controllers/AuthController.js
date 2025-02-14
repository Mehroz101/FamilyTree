const Auth = require("../models/Auth");
const User = require("../models/User"); // Use require for imports
const jwt = require("jsonwebtoken"); // Example of another require
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    console.log("Received signup request with body:", req.body);

    if (password === confirmPassword) {
      console.log("Passwords match. Checking if user exists...");
      const isUserExists = await Auth.findOne({ email });

      if (isUserExists) {
        console.log("User already exists with email:", email);
        return res.status(400).send({
          success: false,
          message: "User already exists",
        });
      } else {
        console.log("User does not exist. Creating new user...");
        const previousUserID = await Auth.find().sort({ userID: -1 });
        console.log("preivous id: ", previousUserID);
        let userID = 0;
        if (previousUserID.length > 0) {
          userID = previousUserID[0].userID + 1;
        } else {
          userID = 1;
        }
        console.log("Generated new userID:", userID);

        const user = new Auth({
          email,
          password,
          userID,
        });
        await user.save();
        console.log("New user created and saved with email:", email);

        res.status(201).send({
          success: true,
          message: "User successfully signed up",
        });
      }
    } else {
      console.log("Passwords do not match for email:", email);
      res.status(400).send({
        success: false,
        message: "Password does not match",
      });
    }
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
