const express = require('express');

const app = express()
const Port = 3000
app.get('/', (req, res) => {
  res.send("Hello Mr. OJ. Welcome to Express")
})

app.listen(Port, () => {
  console.log(`We are running on http://localhost:${Port} \n\n Press on CTRL+C to exit`)
})
