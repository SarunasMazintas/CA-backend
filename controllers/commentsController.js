const commentSchema = require('../schemas/commentSchema');


module.exports = {
    getAllComments: async (req, res) => {
        const comments = await commentSchema.find();
        res.send({ comments });
    },
    getCommentsByAnimalId: async (req, res) => {
        const comments = await commentSchema.find({animal: req.params.id});
        res.send({ comments });
    },
    createComment: async (req, res) => {
        const newComment = new commentSchema({
            author : req.body.author,
            animal : req.body.animal,
            message: req.body.message
        })
        const result = await newComment.save();
        res.send({result: result})
    }
}
//64f3a66fff9716d4a7e1768c