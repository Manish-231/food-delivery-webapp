// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');

// router.post('/createuser',
//     [
//         body('email').isEmail(),
//         body('name').isLength({ min: 5 }),
//         body('password', 'Incorrect Password').isLength({ min: 5 })
//     ],
//     async (req, res) => {

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         console.log("CreateUser route hit"); // check if route is called
//         try {
//             const user = await User.create({
//                 name: req.body.name,
//                 password: req.body.password,
//                 email: req.body.email,
//                 location: req.body.location
//             })
//             console.log(user); // check the inserted document

//             res.json({ success: true });
//         } catch (error) {
//             console.log(error);
//             res.json({ success: false });
//         }
//     })

// router.post('/loginuser', [
//     body('email').isEmail(),
//     body('password', 'Incorrect Password').isLength({ min: 5 })], async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }


//         let email = req.body.email;
//         try {
//             let useremail = await User.findOne({ email });
//             if (!useremail) {
//                 return res.status(400).json({ error: "Try logging in with correct credentials" });
//             }
//             if (!req.body.password === userData.password) {
//                 return res.status(400).json({ error: "Try logging in with correct credentials" });
//             }
//             return res.json({ success: true });
//         } catch (error) {
//             console.log(error);
//             res.json({ success: false });
//         }
//     })
// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MysecrureToend@#$YoiuTubeChannel ';

// CREATE USER ROUTE
router.post(
  '/createUser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("CreateUser route hit");
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const { name, email, location } = req.body;

      const user = await User.create({
        name,
        email,
        password: secPassword,
        location
      });

      console.log(user);
      res.json({ success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// LOGIN USER ROUTE
router.post(
  '/loginuser',
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Try logging in with correct credentials" });
      }

    

      const pwdCompare = await bcrypt.compare(password, user.password);
      if (!pwdCompare) {
        return res.status(400).json({ error: "Try logging in with correct credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

module.exports = router;
