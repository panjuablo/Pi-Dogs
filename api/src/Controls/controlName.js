const axios = require('axios');
const { Dog, Temperaments } = require('../db');
const { Op } = require('sequelize');

const dogsName = async(name) => {
    try {
        const infoName = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data;
        const infoDb = await Dog.findAll({
            includes: Temperaments,
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
        })

        const allDogs = infoDb ? [...infoDb, ...infoName] : [...infoName];

        const dogsMap = allDogs.map((e) => {
            return {
                id: e.id,
                name: e.name,
                weight: e.weight.metric !== undefined? e.weight.metric : 'Not found!',
                height: e.height.metric !== undefined? e.height.metric : 'Not found!',
                life_span: e.life_span !== undefined? e.life_span : 'Not found!',
                image: `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg`,
                temperaments: e.temperament !==undefined? e.temperament.split(', '): 'The dog havent got a temperament',
                origin: e.origin !== undefined? e.origin : 'Not found!'
            }
        });

        return dogsMap;
    } catch(error) {
        res.send(error)
    }
};

module.exports = { dogsName }