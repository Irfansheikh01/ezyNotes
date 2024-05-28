const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Irfanisagoodboy";

//ROUTE 1 :Create a user Using : POST '/api/auth/createUser' . No login required
router.post(
  "/createUser",
  [
    body("name",'Name should be atleast 3 characters').isLength({ min: 3 }),
    body("email",'Please enter a valid Email').isEmail(),
    body("password",'Please enter a strong password').isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether user with the same email exists already in DB.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success,authtoken });

      //res.json({ user, Success: "User created successfully!!" });
    } catch (error) {
      //catch errors occurred in the code (sytax errors also)
      success = false;
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//ROUTE 2 : Authenticate a user using : POST "/api/auth/login". No login required
router.post(
  "/loginUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //validation errors are caught and returned here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials!" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success ,error: "Please try to login with correct credentials!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authtoken });
    } catch (error) {
      success = false;
      //catch errors occurred in the code (sytax errors also)
      console.error(error.message);
      res.status(500).send(success,"Internal Server Error!");
    }
  }
);

//ROUTE 3 : GET logged in user Details using : POST "/api/auth/getUser". Login required

router.post("/getUser", fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      //catch errors occurred in the code (sytax errors also)
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);
module.exports = router;
