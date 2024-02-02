const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // request all data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      // otp,
    } = req.body;
    // Check if All Details are there or not
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    //existing user
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User Already exist .Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: "",
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Something went wrong ${error}`,
    });
  }
};

exports.login = async (req, res) => {
  // req.body
  // validation data
  //email check
  //password check
  //token
  //res ka cookie

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(300).json({
        success: true,
        message: "Fill all the fields",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.json({
        success: false,
        message: "User is not registed",
      });
    }
    let token 
    if (await bcrypt.compare(password, user.password)) {
      token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
    }
    user.token = token;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).json({
      success: true,
      user,
      message: "Succesfully logined in ",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Something went wrong ${error}`,
    });
  }
};
