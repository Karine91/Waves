const express = require("express");
const router = express.Router();

const Wood = require("../models/Wood");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/wood", auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood
    .save()
    .then(wood => {
      res.json({ success: true, wood });
    })
    .catch(err => res.json({ success: false, err }));
});

router.get("/woods", (req, res) => {
  Wood.find()
    .then(woods => res.json({ woods }))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
