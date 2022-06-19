const express = require('express');
const route = express.Router();
const { dogsPost } = require('../Controls/controlPost')

route.post('/', dogsPost);

module.exports = route;