import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errorHandler.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    //reuseable component errorHandler
    return next(errorHandler(400, "All fields are required!"));
  }
  //hash password

  const hashedPassword = bcrypt.hashSync(password, 8);

  //create based on the user models
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return res.status(200).json({ message: "Signup successfully!" });
  } catch (error) {
    //pass error to next
    return next(error);
  }
};
