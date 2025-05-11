const { Schema, model } = require("mongoose");

const socialSchema = new Schema({
  social_name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    maxLenght: [50, "name should be maximum of 50 characters"],
  },
});

module.exports = model("Social", socialSchema);
