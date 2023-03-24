const pool = require('../../db');

const { getAllStudents, 
    getStudentById, 
    postStudents, 
    checkEmailPresent,
    deleteStudentById,
    updateStudentById
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

const removeStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(getStudentById, [id], (error, results) => {
        if (error) throw error;
        else if (!results.rows.length) res.status(404).send("Deletion unsuccessful. Student Does not exist")
        else {
            pool.query(deleteStudentById, [id], (error, results) => {
                res.status(200).send("student deleted successfully!!")
            })            
        }
    })
}

const updateOneStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    const { email } = req.body;
    if (!itemOne || !itemTwo) throw error;
    pool.query(getStudentById, [id], (error, results) => {
        if (error) throw error;
        else if (!results.rows.length) res.status(404).send("Upddate unsuccessful. Student Does not exist")
        else {
            pool.query(updateStudentById, [id, email], (error, results) => {
                if (error) throw error;
                res.status(200).send("Update effected successfully");
            })
        }
    })
}

module.exports = {
    getStudents,
    getSingleStudentById,
    addStudent,
    removeStudentById,
    updateOneStudentById
};

