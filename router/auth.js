const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
router.use(express.json());

router.post("/", async (req, res) => {
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

    function generateUniqueId() {
      const id = Math.floor(100000000 + Math.random() * 900000000).toString();
      return id;
    }

    var uniqueId;

    async function savePersonWithUniqueId() {
      uniqueId = generateUniqueId();
      const existingUniqueId = await User.findOne({ uniqueId: uniqueId });
      if (existingUniqueId) {
        return savePersonWithUniqueId();
      }
      const user = new User({ name, email, password, uniqueId });

      await user.save();

      res.status(201).json({ message: "User Registered Successfully" });
    }

    // Call the function to save a person with a unique ID
    savePersonWithUniqueId();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
