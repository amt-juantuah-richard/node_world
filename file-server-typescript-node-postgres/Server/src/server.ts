// import dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// configer dotenv
dotenv.config();

// call app as an instance of express
const app = express();

// set up port number
const port = process.env.PORT || 5000;

// general middlewares for all endpoints:
// allow json parsing
// allow cors origin
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send('First end point alive');
});

app.get("/second", (req, res) => {
    res.send('second end point alive');
});

app.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
})