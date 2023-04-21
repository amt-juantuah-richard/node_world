// import dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import userRoute from './src/serveFiles/routes/userRoutes';
import fileRoute from './src/serveFiles/routes/fileRoutes';
import cookieParser from 'cookie-parser';
import { errorHandler } from './src/serveFiles/mdw';


// configer dotenv
dotenv.config();

// call app as an instance of express
const app = express();


// set up port number
const port = process.env.PORT || 5000;

const FILES = path.join(__dirname, 'public');
app.use(express.static(FILES));

// general middlewares for all endpoints:
// allow json parsing
// allow cors origin
app.use(express.json());
app.use(cors());
app.use(cors({ origin: ['http://localhost:3000', 'http://document-hub-store.onrender.com', 'https://document-hub-store.onrender.com'], credentials: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const homeInfo: string = `
    <p>You can visit the following endpoints:</p>
    <a href="#">/api/v1/users</a>
    <a href="#">/api/v1/files</a>
    `;


app.get("/", (req, res) => {
    res.send(homeInfo);
});

// app.get("/public/uploads/:filename", (req, res) => {
    
//     console.log(req.params.filename)
//     console.log(req.baseUrl)
//     res.send(`<a href="${req.params.filename}">download</a>`);
// });

// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/files", cors(), fileRoute);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})
