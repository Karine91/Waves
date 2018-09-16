const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const users = require("./routes/user");
const brand = require("./routes/brand");
const woods = require("./routes/woods");
const products = require("./routes/products");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//ROUTES
app.use("/api/users/", users);
app.use("/api/product/", brand);
app.use("/api/product/", woods);
app.use("/api/product/", products);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
