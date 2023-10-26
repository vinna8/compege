const {Schema, model} = require('mongoose');

const Task = new Schema({
    number: {type: Number, required: true},
    questions: {type: String, required: true},
    photo: {type: String},
    answer: {type: String, required: true},
    score: {type: Number, required: true}
})

module.exports = model('Task', Task);