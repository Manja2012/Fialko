import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { env } from "../config.js";
import bcrypt from "bcrypt";

// const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(404).json("User not found !");

//     const comparePassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!comparePassword) return res.status(400).json("Wrong Credentials ! ");

//     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, env.tokenSecret, {
//       expiresIn: "24h",
//     });

//     const { password, ...other } = user._doc;

//     res
//       .cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .json(other);
//   } catch (e) {
//     console.log(e);
//   }
// };
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found!");

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) return res.status(400).json("Wrong Credentials!");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      env.tokenSecret,
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "None",
      secure: true,
      // origin: env.frontOrigin,
      // domain: env.webAppUrl,
    };

    const { password, ...other } = user._doc;

    res.cookie("access_token", token, cookieOptions).status(200).json(other);
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred during login.");
  }
};

const register = async (req, res, next) => {
  try {
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      ...req.body,
      password: hashedPassword,
      isAdmin: false,
    });
    res.status(201).json("User has been created!");
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getByIdUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateByIdUser = async (req, res) => {
  try {
    const updateUser = await ModelUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateUser) return res.status(404).json("User not found !");
    res.status(200).json({
      message: "user updated",
      updateUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteByIdUser = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);

    if (!userDeleted) return res.status(404).json("User not found !");
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
  }
};

const getCurrenctUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
const findUser = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);

    if (!userFound)
      return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.status(200).json(userFound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Une erreur interne est survenu" });
  }
};
export {
  login,
  register,
  getAllUsers,
  getByIdUser,
  updateByIdUser,
  deleteByIdUser,
  getCurrenctUser,
  findUser,
};
