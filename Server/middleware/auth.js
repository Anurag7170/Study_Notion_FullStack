const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const  token  =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    //destructure kiya tha
    // const {token} = req.cookies;

    //   console.log(req.cookies);
    //   console.log(req.header("Authorization"));

    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log(decodeToken);  // try krna
      req.user = decodeToken;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token ${error}`,
    });
  }
  
};

exports.isStudent = async (req, res, next) => {
	try {
		// const userDetails = await User.findOne({ email: req.user.email });

        const accountType = req.user.accountType;
        // console.log(req.user.accountType);

		if (accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		// const userDetails = await User.findOne({ email: req.user.email });

        const accountType = req.user.accountType;
        // console.log(req.user.accountType);

		if (accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

exports.isStudent = async (req, res, next) => {
	try {
		// const userDetails = await User.findOne({ email: req.user.email });

        const accountType = req.user.accountType;
        // console.log(req.user.accountType);

		if (accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};