const axios = require('axios');
const { Dog, Temperaments } = require('../db');

const dogsPost = async (req,res,next) => {
    const { name, height, weight, life_span, image, temperaments, origin } = req.body;

    try{
        const createdInDb = true;
        const dogNew = { name, height, weight, life_span, image, origin, createdInDb };
        const validation = await Dog.findOne({
            where: {
                name: name,
            }
        })
        
        if(!validation){
            const dogCreate = await Dog.create(dogNew);

            for(let i of temperaments){
                const matchTemp = await Temperaments.findOne({
                    where: {
                        name: i,
                    },
                })
                dogCreate.addTemperaments(matchTemp);
            } res.status(200).send(dogCreate.id);
    }else{
        res.status(404).send('The dog already exists')
    }
    } catch(error) {
        next(error)
    };
};

module.exports = { dogsPost }