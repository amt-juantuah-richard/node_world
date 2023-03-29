const express = require('express')

const case1 = express.Router()

const cases = [
  {id:0, name: "work", period: "3 months"},
  {id:1, name: "party", period: "1 day"},
  {id:2, name: "extra", period: "6months"}
]

// get all cases
case1.get('/', (req, res, next) => {
  res.download(cases);
})

// get a single case
case1.get('/:id', (req, res, next) => {
  const caseInCases = cases[req.params.id];
  if (caseInCases) {
    res.json(caseInCases);
  } else {
    res.status(404).send('resource(s) NOT found')
  }
})

// add more cases
case1.post('/', (req, res, next) => {
  const newCase = req.query;
  if (newCase.name && newCase.period) {
    cases.push({id: cases.length, ...newCase});
    res.statusCode = 201;
    res.send(cases)
  } else res.status(400).send('bad request')
})

module.exports = case1;
