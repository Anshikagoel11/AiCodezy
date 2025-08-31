const user = require("../models/user");
const { validate } = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
require("dotenv").config();

const register = async (req, res) => {
  try {
    validate(req.body);

    const { emailId, password } = req.body;

    //check if mail already exists
    if (await user.exists({ emailId })) {
      throw new Error("Invalid Email");
    }

    //hash the password
    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "user";
    const newUser = await user.create(req.body);

    const userDetails = {
      firstName: newUser.firstName,
      emailId: newUser.emailId,
      _id: newUser._id,
    };

    //send token to user
    const token = jwt.sign(
      { emailId: emailId, _id: newUser._id, role: "user" },
      process.env.jwt_secret_key,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    }); //time in cookie here is given in ms

    res.status(200).json({
      user: userDetails,
      message: "Register Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //check for complete data
    if (!emailId || !password) {
      throw new Error("Email or password is missing");
    }

    //check email exists or not
    const foundUser = await user.findOne({ emailId });
    if (!foundUser) throw new Error("Invalid Credentials");

    //if email exists then now check for password
    const isMatched = await bcrypt.compare(password, foundUser.password);
    if (!isMatched) throw new Error("Invalid Credentials");

    const userDetails = {
      firstName: foundUser.firstName,
      emailId: foundUser.emailId,
      _id: foundUser._id,
    };

    //if credentials matches then send token
    const token = jwt.sign(
      { emailId: emailId, _id: foundUser._id, role: foundUser.role },
      process.env.jwt_secret_key,
      { expiresIn: 60 * 60 }
    );
    console.log("token is : ", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      user: userDetails,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(400).send("Error occured: " + err);
  }
};

// const forgetPassword = async (req, res) => {
//   try {
//     const { emailId, newPassword } = req.body;

//     if (!emailId || !password || !newPassword) {
//       throw new Error("All fields are required");
//     }

//     const foundUser = await user.findOne({ emailId });
//     if (!foundUser) throw new Error("Invalid email or password");

//     const isMatched = await bcrypt.compare(password, foundUser.password);
//     if (!isMatched) throw new Error("Invalid email or password");

//     if (!validator.isStrongPassword(newPassword)) {
//       throw new Error("New password is too weak");
//     }

//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//     foundUser.password = hashedNewPassword;
//     await foundUser.save();

//     return res.status(200).json({ message: "Password reset successfully" });
//   } catch (err) {
//     return res.status(400).json({ message: err.message || "Error occurred" });
//   }
// };

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.decode(token);

    //first added token in block list for security
    await redisClient.set(`token:${token}`, "blocked");
    redisClient.expireAt(`token:${token}`, payload.exp);

    res.clearCookie("token", null, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now()),
    });
    res.status(204).send("logout successfully");
  } catch (err) {
    res.status(400).send("Error occured: " + err);
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Error occured");
  }
};

const checkAuth = async (req, res) => {
  const userDetails = {
    firstName: req.user.firstName,
    emailId: req.user.emailId,
    _id: req.user._id,
  };

  res.status(200).json({
    user: userDetails,
    message: "valid user",
  });
};

//only admin can create another admin
const adminRegister = async (req, res) => {
  try {
    validate(req.body);

    const { emailId, password } = req.body;

    if (await user.exists({ emailId })) {
      throw new Error("Invalid Email");
    }

    req.body.password = await bcrypt.hash(password, 10);

    const newAdmin = await user.create(req.body);

    //send token to user
    const token = jwt.sign(
      { emailId: emailId, _id: newAdmin._id, role: newAdmin.role },
      process.env.jwt_secret_key,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    }); //time in cookie here is given in ms
    res.status(201).send("register successfully");
  } catch (err) {
    res.status(400).send("Error occured: " + err);
  }
};

module.exports = { register, login, logout, profile, adminRegister, checkAuth };
