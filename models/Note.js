const {Schema, model} = require('mongoose');

const Note = new Schema({
    note: {type: String, required: true},
    teacher: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Note', Note);