const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// POSTS
// ----------------------

const blogSchema = new Schema({
  title:     { type: String, required: true },
  body:      { type: String, required: [true, "No body-content, pls add"] },
  user:      {
                email: { type: String, required: [true, "No user email supplied"] },
                _id:   { type: String, required: true }
             }
})

// ----------------------
// USERS
// ----------------------

const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true }
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  })


module.exports = {
  User: createModel('User', usersSchema),
  Blog: createModel('Blog', blogSchema)
}
