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
    type: {
        required: true,
        type: String
    },
    images: [{
        type: String
    }],
})

const animal = mongoose.model('animals', animalSchema)

module.exports = animal;