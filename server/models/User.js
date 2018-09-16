const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_I = 10;
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userSchema.pre("save", function(next) {
  bcrypt.genSalt(SALT_I, (err, salt) => {
    if (err) return next(err);

    if (this.isModified("password")) {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);

        this.password = hash;
        next();
      });
    } else {
      next();
    }
  });
});

userSchema.methods.comparePassword = function(pass, cb) {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  let token = jwt.sign(this._id.toHexString(), process.env.SECRET);
  this.token = token;
  this.save((err, user) => {
    cb(err, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  jwt.verify(token, process.env.SECRET, (err, decode) => {
    this.findOne({ _id: decode, token: token }, (err, user) => {
      cb(err, user);
    });
  });
};

module.exports = User = mongoose.model("User", userSchema);
