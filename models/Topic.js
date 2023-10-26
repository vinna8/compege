const {Schema, model} = require('mongoose');

const Topic = new Schema({
    number: {type: Number, required: true},
    topic: {type: String, required: true},
    file: {type: Schema.Types.ObjectId, ref: 'File'}
})

module.exports = model('Topic', Topic);