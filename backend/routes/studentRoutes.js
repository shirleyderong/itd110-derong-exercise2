const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

const validateStudent = (req, res, next) => {
    const { name, email, course, gpa, age } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({ 
            message: 'Middleware Error: Name, Email, and Course are mandatory!' 
        });
    }

    if (gpa && (parseFloat(gpa) < 1.0 || parseFloat(gpa) > 5.0)) {
        return res.status(400).json({ 
            message: 'Validation Error: GPA must be between 1.0 and 5.0' 
        });
    }

    req.body.name = name.trim();
    req.body.email = email.toLowerCase().trim();
    req.body.course = course.trim();

    req.body.gpa = gpa ? gpa.toString() : "";
    req.body.age = age ? age.toString() : "";

    next(); 
};


router.route('/')
    .get(getStudents)
    .post(validateStudent, createStudent);

router.route('/:id')
    .get(getStudent)
    .put(validateStudent, updateStudent)
    .delete(deleteStudent);

module.exports = router;