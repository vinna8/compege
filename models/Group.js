const {Schema, model} = require('mongoose');

const Group = new Schema({
    number: {type: String, required: true, unique: true},
    teacher: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Group', Group);