const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name : {
        required: true,
        type: String
    },
    age : {
        required: true,
        type: Number
    },
    image : String,
    animalType: {
        required : true,
        enum: ['cat', 'dog']
    }
})

const user = mongoose.model('users', userSchema)

module.exports = user;