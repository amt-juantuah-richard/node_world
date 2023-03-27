// import dependencies
import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import cors from 'cors';
import userRoute from './src/serveFiles/routes/userRoutes';
import fileRoute from './src/serveFiles/routes/fileRoutes';
import cookieParser from 'cookie-parser';
import { errorHandler } from './src/serveFiles/mdw';


// configer dotenv
dotenv.config();

// call app as an instance of express
const app = express();


// set ejs engine
app.set('view engine', 'ejs');

// set up port number
const port = process.env.PORT || 5000;

// general middlewares for all endpoints:
// allow json parsing
// allow cors origin
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const homeInfo: string = `
    <p>You can visit the following endpoints:</p>
    <a href="#">/api/v1/users</a>
    <a href="#">/api/v1/files</a>
    <a href="uploads/Install-Linux-tar_1679923586835.txt"> Install-Linux-tar_1679923586835.txt </a>'
`;


app.get("/", (req, res) => {
    res.send(homeInfo);
});

// public folder as static content
app.use(express.static('./public'));

// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/files", fileRoute);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
})
