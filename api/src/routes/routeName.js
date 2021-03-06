const express = require('express');
const route = express.Router();
const { dogsAll } = require('../Controls/control');
const { dogsName } = require('../Controls/controlName');
const {  dogsId } = require('../Controls/controlId');


route.get('/', async(req,res) => {
    const name = req.query.name;
    if(!name){
        const allApi = await dogsAll();
        res.status(200).send(allApi);
    }else {
        try {
            let allDogs = await dogsName(name);
            allDogs.length ? res.status(200).send(allDogs) : res.status(404).send('The name does not exist!!!');
        }catch(error) {
            res.send(error)
        }
    }
});

route.get('/:id', async(req,res) => {
    const { id } = req.params;
    try {
        let allId = await dogsId(id);
        allId? res.status(200).send(allId) : res.status(404).send('Id no found.');
        console.log(allId);
    } catch(error) {
        res.status(404).send(error)
    }
})

module.exports = route; 