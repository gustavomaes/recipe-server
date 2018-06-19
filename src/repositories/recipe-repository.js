const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')

exports.get = async () => {
    const res = await Recipe.find({}, 'name photoUrl user')
    return res
}

exports.getById = async (id) => {
    const res = await Recipe.findById({ _id: id })
    return res
}

exports.getByUser = async (userId) => {
    const res = await Recipe.find({ user: userId })
    return res
}

exports.create = async (data) => {
    let recipe = new Recipe(data)
    await recipe.save()
    return recipe
}

exports.update = async (id, data) => {
    await Recipe.findByIdAndUpdate(id, {
        $set: {
            ...data
        }
    })
}

exports.remove = async (id) => {
    await Recipe.findByIdAndRemove(id)
}