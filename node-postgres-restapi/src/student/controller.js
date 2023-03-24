const pool = require('../../db');

const { getAllStudents, 
    getStudentById, 
    postStudents, 
    checkEmailPresent 
} = require('./queries');

const getStudents = (req, res) => {
    pool.query(getAllStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getSingleStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    // console.log(req.body);
    // res.send("req");

    // check if student with email exists
    pool.query(checkEmailPresent, [email], (error, results) => {
        if (results.rows.length) {
            res.send(`email ${email} already exists`)
        } else {
            pool.query(postStudents, [name, email, age, dob], (error, results) => {
                if (error) throw error;
                res.status(201).send(`user with email ${email} created successfully!!`);
            });
        }
    })
};

module.exports = {
    getStudents,
    getSingleStudentById,
    addStudent,
};

