const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
router.use(express.json());

router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({
      error: "Please provide a name, email and password.",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
