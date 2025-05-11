const { Schema, model } = require("mongoose");

let adminSchema = new Schema({
  name: { type: String, required: true, unique: true },
  is_creator: { type: Boolean, required: true },
  password: { type: String, required: true },
});

module.exports = model("Admin", adminSchema);
