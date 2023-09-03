const animalSchema = require('../schemas/animalSchema');

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

        } catch(error){
            console.log('Klaida: ');
            return res.send({error});
        }

        console.log('result: ', createdAnimal);

        res.send({ animal: createdAnimal });
    },
}