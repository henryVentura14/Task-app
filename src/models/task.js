const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  ini: {
    type: String,
    require: true
  },
  end: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model("Task", TaskSchema);