import Users from "../models/Users.js";

export const userVerify = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  try {
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
  next();
};
