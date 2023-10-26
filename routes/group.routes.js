const {Router} = require('express');
const Group = require('../models/Group');
const Statistic = require('../models/Statistic');
const User = require('../models/User');
const router = Router();

// /api/group/addGroup
router.post(
    '/addGroup',
    async (req, res) => {
        try {
            const {group} = req.body;

            const newGroup = new Group({
                number: group.groupNumber, 
                teacher: group.teacher
            });
            await newGroup.save();

            for (i = 0; i < group.student.length; i++) {
                await User.findOneAndUpdate({_id: group.student[i]}, {$set: {group: newGroup.number}});
            }
        } catch (e) {
            console.log(e);
        }
})

// /api/group/getGroup
router.get(
    '/getGroup',
    async (req, res) => {
        try {
            const groupsObj = await Group.find({teacher: req.query.id});

            let groups = [];
            groupsObj.map(g => {
                groups.push({number: g.number, student: []});
            })
            
            for (i = 0; i < groups.length; i++) {
                const student = await User.find({group: groups[i].number}, {lastName: 1, firstName: 1, patronymic: 1, group: 1});
                student.map(s => {
                    groups.map(g => {
                        if (s.group === g.number) {
                            g.student.push(s);
                        }
                    })
                })
            }
            res.json(groups);
        } catch (e) {
            console.log(e);
        }
    }
)

// /api/group/deleteStudent
router.post(
    '/deleteStudent',
    async (req, res) => {
        try {
            const {group, student} = req.body;
            await User.findOneAndUpdate({_id: student}, {$unset: {group: group}});
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка' })
        }
    }
)

// /api/group/addStudent
router.post(
    '/addStudent',
    async (req, res) => {
        try {
            const {group, student} = req.body;
            await Promise.all(student.map((s) => User.findOneAndUpdate({_id: s}, {$set: {group: group}})));
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка' })
        }
    }
)

//api/group/studentStat
router.get(
    '/studentStat',
    async (req, res) => {
        try {
            const student = req.query.id;
            const statistic = await Statistic.findOne({user: student})
            res.json({ 
                statistic: { all: statistic.all, right: statistic.right, statistic: statistic.statistic }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка' })
        }
    }
)

module.exports = router;