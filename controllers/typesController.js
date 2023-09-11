const typesSchema = require('../schemas/typesSchema');
const animalSchema = require('../schemas/animalSchema');

module.exports = {
    getTypes: async (req, res) => {
        const types = await typesSchema.find();
        res.send({ types });
    },
    addType: async (req, res) => {
        const reqestedType = req.body;

        console.log(reqestedType);
        if (!reqestedType.name){
            return res.send({error : `Type cannot be empty value`});
        }

        const alreadyExists = await typesSchema.findOne({name : req.body.name});
        if (alreadyExists) {
            return res.send({error : `Type "${alreadyExists.name}" already exist!`});
        }
        

        const newType = new typesSchema({
            name: req.body.name,
        })

        const result = await newType.save();

        res.send({result: result})
    },
    deleteType : async (req, res) => {
        console.log('Type to be removed: '+req.params.id);

        const typeToDelete = await typesSchema.findOne({_id: req.params.id});
        
        if (!typeToDelete){
            return res.send({error: `There is no type ${req.params.id}`});
        }

        const animalsWithRequestedType = await animalSchema.find({type: typeToDelete.name});
        if (animalsWithRequestedType.length > 0){
            return res.send({error: `Can not delete type '${typeToDelete.name}', because it's assigned to at least one animal.`});
        }

        const result = await typeToDelete.deleteOne();
        res.send({result});
    }
}