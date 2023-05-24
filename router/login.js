const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
router.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      error: "Please provide a email and password.",
    });
  }
  try {
    const userLogin = await User.findOne({ email: email });

    if (!userLogin) {
      return res
        .status(400)
        .json({ error: "Email doesn't exist please signup first" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      res.status(400).json({ error: "Invalid Credentials" });
    } else {
      const token = await userLogin.generateAuthToken();
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 2580),
        httpOnly: true,
      });
      res.status(200).json({ message: "User Logged In Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
