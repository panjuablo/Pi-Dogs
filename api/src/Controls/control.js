const axios = require('axios');
const { Dog, Temperaments} = require('../db');

const dogsAll = async() => {
    try {
        const getApi = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
        const infoApi = await getApi?.map(e => {
            return {
                id: e.id,
                name: e.name,
                weight: e.weight.metric !== undefined? e.weight.metric : 'Not found!',
                height: e.height.metric !== undefined? e.height.metric : 'Not found!',
                life_span: e.life_span !== undefined? e.life_span : 'Not found!',
                image: e.image.url !== undefined? e.image.url : 'Image not found!',
                temperaments: e.temperament !==undefined? e.temperament.split(', '): 'The dog havent got a temperament',
                origin: e.origin !== undefined? e.origin : 'Not found!'
            }
        })

        const infoDb = await Dog.findAll({
            include: {
                model: Temperaments,
                attributes: ['name'],
                through: {attributes:[]},
            },
        })

        const allInfo = infoDb? [...infoDb, ...infoApi] : [...infoApi];

        return allInfo;

    } catch (error) {
        console.log(error)
    }
};

module.exports = { dogsAll }