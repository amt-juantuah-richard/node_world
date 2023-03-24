const getAllStudents = 'SELECT * FROM students';

const getStudentById = 'SELECT * FROM students WHERE id=$1';

const postStudents = 'INSERT INTO students (name, email, age, dob) values ($1, $2, $3, $4)';

const checkEmailPresent = 'SELECT s FROM students s WHERE s.email=$1';

module.exports = {
    getAllStudents,
    getStudentById,
    postStudents,
    checkEmailPresent
}