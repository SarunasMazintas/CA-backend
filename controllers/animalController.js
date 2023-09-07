const animal = require('../schemas/animalSchema');
const animalSchema = require('../schemas/animalSchema');
const commentSchema = require('../schemas/commentSchema');
const mongoose = require('mongoose');

module.exports = {
    getAnimalsList: async (req, res) => {
        const animals = await animalSchema.find();
        res.send({ animals });
    },
    addAnimal: async (req, res) => {
        console.log('Animal creation request received', req.body);
        let createdAnimal;
        try {
            const animalRequested = new animalSchema({
                name: req.body.name,
                age: req.body.age,
                image: req.body.image,
                type: req.body.type,
            })

            const result = await animalRequested.save();
            createdAnimal = result;

        } catch (error) {
            console.log('Klaida: ');
            return res.send({ error });
        }

        console.log('result: ', createdAnimal);

        res.send({ animal: createdAnimal });
    },
    updateAnimal: async (req, res) => {
        res.send({ message: 'Method under construction!' })
    },
    removeAnimal: async (req, res) => {
        console.log('Animal to remove: ', req.params.id);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.send({ error: 'Animal ID format is broken' })
        }

        const animalToDelete = await animalSchema.findOne({ _id: req.params.id });
        
        if (!animalToDelete){
            return res.send({ error: 'There is no animal with id ' + req.params.id })
        }
        
        const result = await animalToDelete.deleteOne();
        const commentsOfAnimal = await commentSchema.deleteMany({animal : req.params.id})

        res.send({ message: `Animal ${req.params.id} removed!` })
    }
}