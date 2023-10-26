const {Router} = require('express');
const Variant = require('../models/Variant');
const Assignment = require('../models/Assignment');
const User = require('../models/User');
const router = Router();

// /api/variant/addVariant
router.post(
    '/addVariant',
    async (req, res) => {
        try {
            const {variant} = req.body;
            const newVariant = new Variant({
                title: variant.title,
                tasks: variant.tasks,
                teacher: variant.teacher
            });
            await newVariant.save();
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при добавлении варианта' })
        }
})

// /api/variant/variants
router.get(
    '/variants',
    async (req, res) => {
        try {
            const teacher = req.query.idTeacher;
            const variants = await Variant.find({teacher: teacher}).populate('tasks');
            res.json(variants);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка' })
        }
})

// /api/variant/deleteVariant
router.post(
    '/deleteVariant',
    async (req, res) => {
        try {
            const idVariant = req.query.idVariant;
            const variant = await Variant.findOne({_id: idVariant});
            await Variant.deleteOne({_id: variant._id});
            res.json({ message: 'Вариант удален' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при удалении варианта' })
        }
})

// /api/variant/assignment
router.post(
    '/assignment',
    async (req, res) => {
        try {
            const {variant, teacher, students} = req.body;

            const newAssignment = new Assignment({
                variant: variant,
                teacher: teacher,
                students: students.map(student => ({ student })),
            });
            await newAssignment.save();

            for (i = 0; i < students.length; i++) {
                await User.findOneAndUpdate({_id: students[i]}, {$push: {assignments: newAssignment._id}})
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при отправке варианта' })
        }
})

// /api/variant/assignmentForGroup
router.post(
    '/assignmentForGroup',
    async (req, res) => {
        try {
            const {variant, teacher, groups} = req.body;
            let students;
            
            for (i = 0; i < groups.length; i++) {
                const student = await User.find({group: groups[i]}, {_id: 1});
                students = student;
            }

            const newAssignment = new Assignment({
                variant: variant,
                teacher: teacher,
                students: students.map(student => ({ student: student._id })),
            });
            await newAssignment.save();

            for (i = 0; i < students.length; i++) {
                await User.findOneAndUpdate({_id: students[i]}, {$push: {assignments: newAssignment._id}})
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при отправке варианта' })
        }
})

module.exports = router;