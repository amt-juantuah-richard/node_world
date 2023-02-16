const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.use('/case1', require('./routes/case1.js'));

app.use('/case2', require('./routes/case2.js'));

app.get('/', (req, res, next) => {
  res.send('Hello router master');
})

app.listen(port, () => {
  console.log(`Your app is running on http://localhost:${port} \n Press on CTRL+C to quit the serverserver`)
})
