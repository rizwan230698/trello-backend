const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("List", ListSchema);
