export const test = (req, res) => {
  res.json({ message: "User API test Working!!!" });
};

export const updateUser = async (req, res, next) => {
  console.log(req.user);
};
