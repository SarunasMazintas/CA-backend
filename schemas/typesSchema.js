const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typesSchema = new Schema({
    name: {
        type: String
    }
})

const type = mongoose.model('types', typesSchema)

module.exports = type;