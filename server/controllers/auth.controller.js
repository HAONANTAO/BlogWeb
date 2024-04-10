import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required!"));
  }
  try {
    const validUser = await User.findOne({
      // use email and password login
      email,
    });
    if (!validUser) {
      next(errorHandler(404, "user can not found!"));
    }
    //compare password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "invalid password!"));
    }
    //all passed
    //JWT Token
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET_KEY,
      // { expiresIn: "1d" },
    );
    //Separate the password not showing
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        //for security reason
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    //create first then next time find
    if (user) {
      const token = createToken(user);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      //create user
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        photoURL,
      });
      await newUser.save();
      const token = createToken(newUser);
    }
  } catch (error) {
    next(error);
  }
  // reuseable
  function createToken(user1) {
    const token = jwt.sign(
      {
        id: user1._id,
      },
      process.env.JWT_SECRET_KEY,
    );
    const { password, ...rest } = user1._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
    return token;
  }
};
