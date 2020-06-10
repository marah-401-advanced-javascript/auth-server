'use strict';
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ 
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, lowercase: true, enum: ['user', 'writer', 'editor', 'admin']},
});



module.exports = mongoose.model('userSchema', userSchema);
