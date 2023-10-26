const {Router} = require('express');
const config = require('config');
const Topic = require('../models/Topic');
const router = Router();

// /api/topic/name
router.post(
    '/name', 
    async (req, res) => {
        try {
            const topic = new Topic({number: 5, topic: 'Анализ и построение алгоритмов', file: '62792f35466f477b507b16fd'});
            await topic.save();
        } catch (e) {
            console.log(e);
        }
})


// /api/topic/topics
router.get(
    '/topics',
    async (req, res) => {
        try {
            const topics = await Topic.find().sort({ number: 1 });
            res.json(topics);
        } catch (e) {
            console.log(e);
        }
})

module.exports = router;