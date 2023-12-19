const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/rampurdb");

const userSchema = mongoose.Schema({
  username : String,
  name : String,
  email : String,
  password : String,
  mobile : Number,
  profileImg : String,
  posts: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "post"
  }]
})

userSchema.plugin(PLM);
module.exports = mongoose.model("user", userSchema);
