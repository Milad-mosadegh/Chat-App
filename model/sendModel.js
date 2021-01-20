const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const registerSchema = new Schema({
    fname: { type: String, minlength: 2, maxlength: 15 },
    lname: { type: String, minlength: 2, maxlength: 15 },
    email: { type: String, unique: true },
    password: { type: String, minlength: 4 }
})

const RegisterModel = mongoose.model('register', registerSchema)

module.exports = RegisterModel;