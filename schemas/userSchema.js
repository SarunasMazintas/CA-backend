const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        required: true,
        type: String
    },
    password : {
        required: true,
        type: String
    },
    image : String
})

const user = mongoose.model('users', userSchema)

module.exports = user;