import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required, missing some information!" });
  }
  //hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);
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
    return res.status(500).json({ message: error.message });
  }
};
