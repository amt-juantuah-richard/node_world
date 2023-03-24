const {Router} = require('express');
const { 
    getStudents, 
    getSingleStudentById, 
    addStudent,
    removeStudentById,
    updateOneStudentById
} = require('./controller');



const router = Router();

router.get("/", getStudents);
router.post("/", addStudent);
router.get("/:id", getSingleStudentById);
router.delete("/:id", removeStudentById);
router.put("/:id", updateOneStudentById);


module.exports = router;