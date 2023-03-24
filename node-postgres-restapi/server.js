const express = require('express');

const rawRouter = require('./src/student/routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res, err) => {
    console.log(req.body)
    res.send("We are speeding slowly");
});

app.use("/api/v1/students", rawRouter);

app.listen(PORT, () => {
    console.log(`Your server is up and your application is listening on http://localhost:${PORT}`);
})
