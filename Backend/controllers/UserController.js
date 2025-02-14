const User = require("../models/User");

// ✅ Get User Details
const GetAllUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("childID"); // If childID is an ObjectId reference

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const sendData = {
      id: user._id,
      name: user.name,
      age: user.age,
      veteran: user.veteran,
      childID: user.childIDs, // Ensure this exists in schema
    };

    res.status(200).send({ success: true, message: "", data: sendData });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ✅ Add New User or Update Grandpa Relation
// const lastUser = await User.findOne().sort({ userID: -1 }).select("userID");
// let nextUserID = lastUser && lastUser.userID ? Number(lastUser.userID) + 1 : 1; // Start from 1 if no users exist

const AddUser = async (req, res) => {
  try {
    const createrID = req.user.id
    console.log("Received Body:", req.body);
    const { grandpaID, children } = req.body;

    if (!Array.isArray(children) || children.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Children array is required" });
    }

    // Find the highest userID
    const lastUser = await User.findOne().sort({ userID: -1 }).select("userID");
    let nextUserID = lastUser ? lastUser.userID + 1 : 1; // Start from 1 if no users exist

    let parentUser = null;
    if (grandpaID !== null) {
      parentUser = await User.findOne({ userID: grandpaID });
      if (!parentUser) {
        return res
          .status(404)
          .send({ success: false, message: "Parent user not found" });
      }
    }

    const newUsers = [];

    for (let child of children) {
      if (!child.name || child.name.trim() === "") {
        return res
          .status(400)
          .send({ success: false, message: "Name is required" });
      }

      const newUser = new User({
        createrID:createrID,
        userID: nextUserID,
        id: child.id,
        name: child.name,
        ventega: child.ventega,
        age: Number(child.age),
        parentID: grandpaID || null,
        childIDs: [],
      });

      await newUser.save();
      newUsers.push(newUser.userID);
      nextUserID++;
    }

    if (parentUser) {
      await User.findOneAndUpdate(
        { userID: grandpaID },
        { $push: { childIDs: { $each: newUsers } } }
      );
    }

    res.status(201).send({
      success: true,
      message: "Users added successfully",
      users: newUsers,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

const GetUserDropDown = async (req, res) => {
  try {
    const createrID  = req.user.id;
    const users = await User.find({createrID:createrID});
    console.log(users)
    res.status(200).json({
      success:true,
      data:users
    })
  } catch (error) {
    res.status(500).send({ success: false, messsgae: error.message });
  }
};
const getUsersTree = async (req, res) => {
  try {
      // Fetch all users from the database
      const users = await User.find();

      // Convert users into a map (userID as key)
      const userMap = new Map();
      users.forEach(user => {
          userMap.set(user.userID, { 
              id: user.userID, 
              name: user.name, 
              age: user.age, 
              veteran: user.ventega, 
              children: [] // Initialize empty array for children
          });
      });

      // Build the hierarchical tree
      let tree = [];
      users.forEach(user => {
          if (user.parentID && userMap.has(user.parentID)) {
              // If the user has a parent, push it into the parent's children array
              userMap.get(user.parentID).children.push(userMap.get(user.userID));
          } else {
              // If no parent, it's a root-level user
              tree.push(userMap.get(user.userID));
          }
      });

      res.status(200).json({ success: true, data: tree });
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { AddUser, GetAllUsers,GetUserDropDown,getUsersTree };
