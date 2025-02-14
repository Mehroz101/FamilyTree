const User = require("../models/User");

// ✅ Get User Details
const GetAllUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("childID"); // If childID is an ObjectId reference

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const sendData = {
      id: user._id,
      name: user.userName,
      age: user.age,
      veteran: user.veteran,
      childID: user.childID, // Ensure this exists in schema
    };

    res.status(200).send({ success: true, message: "", data: sendData });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ✅ Add New User or Update Grandpa Relation

const AddUser = async (req, res) => {
  try {
    console.log("Received Body:", req.body);

    const { users, grandpaID } = req.body;

    if (!users || !Array.isArray(users) || users.length === 0 || !grandpaID) {
      return res.status(400).json({ success: false, message: "Missing or invalid required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(grandpaID)) {
      return res.status(400).json({ success: false, message: "Invalid Grandpa ID" });
    }

    let grandpa = await User.findById(grandpaID);
    if (!grandpa) {
      return res.status(404).json({ success: false, message: "Grandpa user not found" });
    }

    const newUsers = await User.insertMany(users);

    grandpa.childID = [...(grandpa.childID || []), ...newUsers.map(user => user._id)];
    await grandpa.save();

    return res.status(201).json({ success: true, message: "Users added successfully", data: newUsers });
  } catch (error) {
    console.error("Error adding users:", error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

module.exports = { AddUser, GetAllUsers };
