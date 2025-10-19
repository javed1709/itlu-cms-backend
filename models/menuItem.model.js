const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [1, "Price must be positive"],
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (url) => /^https?:\/\/.+\..+/.test(url),
        message: "Must be a valid URL",
      },
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "At least one category is required",
      },
    },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
