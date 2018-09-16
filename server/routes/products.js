const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/article", auth, admin, (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then(article => res.status(200).json({ success: true, article }))
    .catch(err => res.json({ success: false, err }));
});

router.get("/articles_by_id", (req, res) => {
  const type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = items.split(",");
    items = ids.map(item => mongoose.Types.ObjectId(item));
  }

  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .then(docs => res.status(200).send(docs))
    .catch(err => res.send(err));
});

router.get("/articles", (req, res) => {
  let order = req.query.order || "asc";
  let sortBy = req.query.sortBy || "_id";
  let limit = +req.query.limit || 100;
  Product.find()
    .populate("brand")
    .populate("wood")
    .sort({ [sortBy]: order })
    .limit(limit)
    .then(articles => res.send(articles))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
