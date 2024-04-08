const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  popularity: {
    type: Number,
    default: 0
  }, 
  // Add other fields as needed
} , { versionKey: false } // Setting versionKey option to false
);

module.exports = mongoose.model('Course', courseSchema);
