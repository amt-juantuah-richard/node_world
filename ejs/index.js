'use strict'

// dependancies for this module
const express = require('express');
const path = require('path');

// express app
const app = express();

// port number
const port = process.env.PORT || 3000;

// dummy users
const users = [
	{username: 'king', email: 'kinglolo@codehouse.com'},
	{username: 'hearty', email: 'hty@codehouse.com'},
	{username: 'juniorbonba', email: 'junior@codehouse.com'}
]

// use the ejs as engine even though files have an .html extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//recognise the views directory
app.set('views', path.join(__dirname, 'views'));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// get route to path
app.get("/", (req, res)=>{
  res.render('users', {
    users: users,
    title: "EJS smoothing",
    header: "Some users"
  });
});

// app listens on port
app.listen(port, ()=>{
  console.log("app is running on http://localhost" + port);
})
