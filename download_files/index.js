'use strict'

const express = require('express');

const path = require('path');

const PORT = 3000;

const app = express();

const FILES = path.join(__dirname, 'files');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('<ul>' + 
               '<li> Download <a href="/files/software_engineer.pdf">software_engineer.pdf</a>.</li>' +
	       '<li> Download <a href="/files/software_engineer.pdf">software_engineer.pdf</a>.</li>' +
	  '</ul>')
});

app.get('/files/:file(*)', (req, res, next) => {
  res.download(req.params.file, { root: FILES }, (err) => {
    if (!err) {
      return;
    } 
    if (err.status !== 404) {
      return next(err)
    }

    res.statusCode = 404;
    res.send(`<h2>Missing file or link is broken</h2>`)
  })
})


app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}`)
})
