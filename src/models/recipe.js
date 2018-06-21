const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: String,
        required: [true, 'Tempo é obrigatório'],
    },
    serving: {
        type: Number,
        required: [true, 'Serve é obrigatório'],
    },
    photoUrl: {
        type: String,
        trim: true
    },
    ingredients: [{
        type: String
    }],
    preparation: [{
        type: String
    }]
})

module.exports = mongoose.model('Recipe', schema)