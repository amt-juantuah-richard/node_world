// import dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './src/serveFiles/routes/userRoutes';
import fileRoute from './src/serveFiles/routes/fileRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const homeInfo: string = `
    <p>You can visit the following endpoints:</p>
    <a href="#">/api/v1/servefiles</a>
`;


app.get("/", (req, res) => {
    res.send(homeInfo);
});


app.use("/api/v1/users", userRoute);
app.use("/api/v1/files", fileRoute);

app.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
})
