const axios = require('axios');
const { Dog, Temperaments } = require('../db');

const dogsId = async(id) => {
    if(
        id.match(/^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$/i) //regular expression para validar UUID
    ){ try {
        let dogDb = await Dog.findByPk(
            id,
            {include: [
                {model: Temperaments, attributes: ['name'], through: { attributes: []}}
            ],}
        )
        return dogDb;

    } catch(error){
        console.log(error)
    }
    } else {
        try {
            let dogApi = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data;
            let dogInfo = {
                id: dogApi.id,
                name: dogApi.name,
                weight: dogApi.weight.metric,
                height: dogApi.height.metric,
                life_span: dogApi.life_span,
                image: dogApi.reference_image_id,
                temperaments: dogApi.temperament,
                origin: dogApi.origin
            }
            return dogInfo;

        } catch(error) {
            console.log(error)
        }
    }

}

module.exports = { dogsId }