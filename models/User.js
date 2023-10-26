const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    patronymic: {type: String, required: true},
    roles: [{type: String, ref: 'Role', required: true}],
    group: {type: String, ref: 'Group'},
    assignments: [{type: Schema.Types.ObjectId, ref: 'Assignment'}]
})

module.exports = model('User', schema);