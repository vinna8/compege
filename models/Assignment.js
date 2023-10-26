const {Schema, model} = require('mongoose');

const Assignment = new Schema({
    variant: {type: Schema.Types.ObjectId, ref: 'Variant', required: true},
    teacher: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    students: [{
        student: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        completed: {type: Boolean, default: false}
    }],
    createdAt: {type: Date, default: Date.now}
})

module.exports = model('Assignment', Assignment);