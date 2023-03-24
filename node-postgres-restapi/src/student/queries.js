const getAllStudents = 'SELECT * FROM students';

const getStudentById = 'SELECT * FROM students WHERE id=$1';

const postStudents = 'INSERT INTO students (name, email, age, dob) values ($1, $2, $3, $4)';

const deleteStudentById = 'DELETE FROM students WHERE id=$1';

const updateStudentById = 'UPDATE students SET email=$2 WHERE id=$1';

const checkEmailPresent = 'SELECT s FROM students s WHERE s.email=$1';

module.exports = {
    getAllStudents,
    getStudentById,
    postStudents,
    checkEmailPresent,
    deleteStudentById,
    updateStudentById
}