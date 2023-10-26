const {Schema, model} = require('mongoose');

const Variant = new Schema({
    title: {type: String, required: true},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task', required: true}],
    teacher: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Variant', Variant);