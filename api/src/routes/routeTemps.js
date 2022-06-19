const express = require('express');
const route = express.Router();
const axios = require('axios');
const { Temperaments } = require('../db');

route.get('/', async(req,res,next) => {
    try {
        const getInfo = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
        let allTemp = getInfo?.map((el) => el.temperament !== undefined || null ? el.temperament.split(', ') : ['no temper.']);
        let temps = [];

        for(let i=0; i<allTemp.length; i++){
            for(let j=0; j<allTemp[i].length; j++){
                if(!temps.includes(allTemp[i][j])){
                    temps.push(allTemp[i][j])
                } else {
                    continue
                }
            }
        };

        temps.map(async (e) => {
            await Temperaments.findOrCreate({
                where: {
                    name: e
                }
            })
        })

        const tempDb = await Temperaments.findAll();
        res.status(200).send(tempDb)

    } catch(error) {
        next(error)
    }
});

module.exports = route;