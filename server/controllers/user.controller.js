import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const updateUser = async (req, res, next) => {
  //check user
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Not allow to update this user!"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password need >6 length!"));
    }
    req.body.password = bcrypt.hash(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(errorHandler(400, "Username must between 5-20 length!"));
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username can not has space"));
    }
    //lowercase check?
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username only contain letters and numbers"),
      );
    }
  }

  //update user after check
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          photoURL: req.body.photoURL,
          password: req.body.password,
        },
      },
      { new: true },
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  //check user
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Not allow to delete this user!"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    return next(error);
  }
};
export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been sign out");
  } catch (error) {
    return next(error);
  }
};
