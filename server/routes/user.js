const express = require("express");
const router = express.Router();

const User = require("../models/User");

const auth = require("../middleware/auth");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      return res.status(400).json({ success: false, err });
    });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              loginSuccess: false,
              message: "Auth failes, wrong password"
            });
          }
          if (err) {
            res.status(400).json({
              loginSuccess: false,
              message: err
            });
          }

          user.generateToken((err, user) => {
            if (err) {
              res.status(400).send({
                err
              });
            }
            res
              .cookie("w_auth", user.token)
              .status(200)
              .json({
                loginSuccess: true
              });
          });
        });
      } else {
        res.status(400).json({
          loginSuccess: false,
          message: "Auth failes, email not found"
        });
      }
    })
    .catch(err => {
      return res.status(400).json({ success: false, err });
    });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    cart: req.user.cart,
    history: req.user.history
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(() => {
      return res.status(200).json({
        success: true
      });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
});

module.exports = router;
