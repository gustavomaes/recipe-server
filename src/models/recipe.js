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
        type: Number,
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
        name: {
            type: String,
            required: [true, 'Nome do ingrediente é obrigatório'],
            trim: true
        },
        quantity: {
            type: String,
            required: [true, 'Quantidade do ingrediente é obrigatório'],
        }
    }],
    preparation: [{
        type: String
    }]
})

module.exports = mongoose.model('Recipe', schema)