const express = require('express');
const { quotes } = require('../data');
const { getRandomElement } = require('../utils');

const route = express.Router();

route.get('/random', (req, res, next) => {
    res.json(getRandomElement(quotes))
})

route.get('/', (req, res, next) => {
    res.json(quotes)
})

module.exports = route