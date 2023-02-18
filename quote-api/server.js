const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.use('/api/quotes', require('./routes/quotesRouter'))

app.listen(PORT, () => {
    console.log("Power Quotes Server is up and running");
})

