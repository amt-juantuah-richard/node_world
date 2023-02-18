// app dependencies
const express = require('express');
const { quotes } = require('../data');
const { getRandomElement } = require('../utils');

const route = express.Router();


// get a random quote
route.get('/random', (req, res, next) => {
    res.send(getRandomElement(quotes))
})


// get all quotes or a person's quotes
route.get('/', (req, res, next) => {
    const queryPerson = req.query.person ?? '';
    const personQuotes = quotes.filter(quote => quote.person.includes(queryPerson));
    res.json(personQuotes);
})


// add a new quote
route.post('/', (req, res, next) => {
    req.query.quote && req.query.person ? 
    (()=>{
        quotes.push(req.query);
        res.json(req.query)
    })()
    : res.status(400).send();
})

module.exports = route