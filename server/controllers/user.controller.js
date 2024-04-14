import { errorHandler } from "../utils/errorHandler.js";

export const updateUser = async (req, res, next) => {
  //check user
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Not allow to update this user!"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password need >6 length!"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
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
          errorHandler(400, "Username nly contain letters and numbers"),
        );
      }
    }
    //update user after check
    try {
      
    } catch (error) {
      
    }
  }
};
