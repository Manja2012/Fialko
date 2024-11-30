import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { env } from "../config.js";
import nodemailer from "nodemailer";

export const requestPasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found!");

    const token = jwt.sign({ id: user._id }, env.tokenSecret, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.mailUser,
        pass: env.mailPassword,
      },
    });

    const resetLink = `${env.webAppUrl}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: env.mailUser,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json("Password reset link sent to your email!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, env.tokenSecret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json("User not found!");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json("Password successfully updated!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};
