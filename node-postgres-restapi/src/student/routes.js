const {Router} = require('express');
const { getStudents, getSingleStudentById, addStudents } = require('./controller');



const router = Router();

router.get("/", getStudents);
router.post("/", addStudents);
router.get("/:id", getSingleStudentById);


module.exports = router;