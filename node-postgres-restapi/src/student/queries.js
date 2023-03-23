const getAllStudents = 'SELECT * FROM students';

const getStudentById = 'SELECT * FROM students WHERE id=$1';

const postStudents = 'INSERT INTO students (name, email, age, dob) values ($1)';

module.exports = {
    getAllStudents,
    getStudentById,
    postStudents,
}