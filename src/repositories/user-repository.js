const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.authenticate = async (data) => {
    const res = await User.findOne({
        email: data.email,
        password: data.password
    })
    return res
}

exports.get = async () => {
    const res = await User.find({}, 'name email role')
    return res
}

exports.getById = async (id) => {
    const res = await User.findById({ _id: id }, 'name email role')
    return res
}

exports.getPasswdById = async (id) => {
    const res = await User.findById({ _id: id }, 'password')
    return res
}

exports.create = async (data) => {
    let user = new User(data)
    await user.save()
    return { 
        name: user.name,
        email: user.email,
        role: user.role
    }
}

exports.update = async (id, data) => {
    await User.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            role: data.role
        }
    })
}

exports.updatePassword = async (id, data) => {
    await User.findByIdAndUpdate(id, {
            password: data.password
    })
}

exports.remove = async (id) => {
    await User.findByIdAndRemove(id)
}