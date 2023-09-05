const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    },
    animal: {
        type: Schema.Types.ObjectId,
        ref: 'animalSchema',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

const comment = mongoose.model('comments', commentSchema)

module.exports = comment;