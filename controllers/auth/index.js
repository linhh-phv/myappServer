const User = require("../../models/auth/user");
const bcryptjs = require("bcryptjs");
const moment = require("moment");
const jwtHelper = require("../../helpers/jwtHelper");
const { validateEmail } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validateEmail(email)) {
      return res.status(400).json({
        status: "error",
        message: "Email is incorrect format.",
      });
    }

    const findUser = await User.findOne({ email });
    if (findUser)
      return res.status(400).json({
        status: "error",
        message: 'Email "' + email + '" is already taken',
      });

    const hashPassword = await bcryptjs.hash(password, 10);
    const username =
      "mine-" + Math.floor(Math.random() * (999999999 - 1 + 1) + 1);
    const data = {
      email: email,
    };
    const accessToken = await jwtHelper.generateToken(
      data,
      process.env.ACCESS_TOKEN_SECRET,
      "1h"
    );
    const user = await User.create({
      email: email,
      password: hashPassword,
      username,
      accessToken: accessToken,
      dateActive: moment().format("MM/DD/YYYY"),
    });
    if (user) {
      return res.status(200).json({
        message: "Create user successfully",
        data: user,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Oops! Create user not success...",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(11000).json({
        status: "error",
        message: "User is already in use",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Oops! Something went wrong..." + error,
      });
    }
  }
};
const deleteAllUsers = async (req, res) => {
  try {
    const decode = await jwtHelper.verifyToken(
      req.token,
      process.env.ACCESS_TOKEN_SECRET
    );

    User.deleteMany({}, () => {
      return res.status(200).json({
        message: "Deleted all user.",
        decode,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Oops! Something went wrong..." + error,
    });
  }
};
const users = async (req, res) => {
  try {
    const decode = await jwtHelper.verifyToken(
      req.token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const getUsers = await User.find();
    if (getUsers) {
      return res.status(200).json({
        message: "Get users successfully",
        data: getUsers,
        decode,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Oops! Get user not success...",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Oops! Something went wrong..." + error,
    });
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      const result = await bcryptjs.compare(password, findUser.password);
      if (result) {
        const accessToken = await jwtHelper.generateToken(
          { email: email },
          process.env.ACCESS_TOKEN_SECRET,
          "1h"
        );
        const obj = { ...findUser._doc, accessToken, password: "" };
        return res.status(200).json({
          message: "Login successfully",
          data: obj,
        });
      } else {
        return res.status(400).json({
          status: "error",
          message: "Incorrect password!",
        });
      }
    } else {
      return res.status(400).json({
        status: "error",
        statusCode: -1,
        message: "User not found!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Oops! Something went wrong..." + error,
    });
  }
};
module.exports = { register, login, users, deleteAllUsers };
