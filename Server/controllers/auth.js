import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) return next(errorHandler(404, "User not found "));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Incorrect Username or Password"));

    const token = jwt.sign({ id: validUser._id }, process.env.jwtSecret);
    const { password: pass, ...userInfo } = validUser._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.jwtSecret);
      const { password: pass, ...userInfo } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(userInfo);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.jwtSecret);
      const { password: pass, ...userInfo } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(userInfo);
    }
  } catch (error) {
    next(error);
  }
};
