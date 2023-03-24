const pool = require('../../db');

const { getAllStudents, getStudentById, postStudents } = require('./queries')

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
}

// const addStudent = (req, res) => {
//     const { name, email, age, dob } = JSON.parse(req.body);

//     // check if student with email exists
//     pool.query(postStudents, [students], (error, results) => {
//         if (error) throw error;
//         res.status(201).json(results.rows);
//     })
// }

module.exports = {
    getStudents,
    getSingleStudentById,
    // addStudent,
};