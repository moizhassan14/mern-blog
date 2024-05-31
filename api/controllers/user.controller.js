import { errorHandler } from "../utilis/error.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const test = (_, res) => {
  return res.status(200).json("testing...");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be  at least 6 characters"));
    }
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Spaces are not allowed in username"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const hashedPassword= bcryptjs.hashSync(req.body.password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: hashedPassword,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been Sign out");
  } catch (error) {
    next(error);
  }
}; 


export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "You are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex || 0);
    const limit = parseInt(req.query.limit || 9);
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const usersWithOutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: usersWithOutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};