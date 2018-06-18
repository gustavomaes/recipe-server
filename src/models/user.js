const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'E-mail é obrigatório'],
        trim: true,        
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatório'],
        trim: true        
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', schema)