const express = require("express");
const router = express.Router();

const Brand = require("../models/Brand");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand
    .save()
    .then(brand => {
      res.status(200).json({ success: true, brand });
    })
    .catch(err => res.json({ success: false, err }));
});

router.get("/brands", (req, res) => {
  Brand.find()
    .then(brands => {
      res.json({ brands });
    })
    .catch(err => {
      return res.status(400).json({ err });
    });
});

module.exports = router;
