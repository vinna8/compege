const {Schema, model} = require('mongoose');

const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
})

module.exports = model('File', File);