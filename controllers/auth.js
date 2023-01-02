import bcrypt from "bcrypt";
import User from "../models/users.js";

//register User
export const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    //if no user
    !user && res.status(400).json("User not found!");

    //if its the same user then compare password
    const validate = await bcrypt.compare(req.body.password, user.password);
    //if not validate
    !validate && res.status(400).json("Wrong Credentials!");

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};
