import bcrypt from "bcrypt";
import User from "../models/users.js";
import Post from "../models/post.js";

// Update User details controller
export const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.pasword) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update your account");
  }
};

// Delete User details controller
export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    //delete all user posts and user account
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
};

// Get User by Id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(400).json(error);
  }
};
