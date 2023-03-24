const {Router} = require('express');
const { getStudents, getSingleStudentById } = require('./controller');



const router = Router();

router.get("/", getStudents);
// router.post("/", addStudent);

router.get("/:id", getSingleStudentById);


module.exports = router;