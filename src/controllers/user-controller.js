const mongoose = require('mongoose')
const Recipe = mongoose.model('User')
const md5 = require('md5')

const repository = require('../repositories/user-repository')
const authService = require('../services/auth-service')

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar os usuários', data: error })
    }
}

exports.getById = async (req, res, next) => {
    try {
        let id = req.params.id
        const token = req.headers['x-access-token']
        const dataToken = await authService.decodeToken(token)

        if (id === 'me') {            
            id = dataToken.id
        } else if (dataToken.role != 'admin') {
            res.status(500).send({ message: 'Só é possível buscar seu usuário.' })
            return
        }

        let data = await repository.getById(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar o usuário', data: error })
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        let user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if (!user) {
            res.status(500).send({ message: 'E-mail ou senha inválidos' })
            return
        }
        
        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        })

        res.status(201).send({ token: token })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao cadastrar o usuário', data: error })
    }
}

exports.post = async (req, res, next) => {
    try {
        let data = await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        const token = await authService.generateToken({
            id: data._id,
            email: data.email,
            name: data.name,
            role: data.role
        })

        res.status(201).send({data: data, token: token})
    } catch (error) {
        res.status(500).send({ message: 'Erro ao cadastrar o usuário', data: error })
    }
}

exports.update = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        const dataToken = await authService.decodeToken(token)

        await repository.update(dataToken.id, {
            name: req.body.email,
            email: req.body.email,
            role: dataToken.role
        })

        res.status(200).send({ message: 'Usuário atualizado com sucesso.' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar o usuário', data: error })
    }
}

exports.updateById = async (req, res, next) => {
    try {
        await repository.update(req.params.id, {
            name: req.body.email,
            email: req.body.email,
            role: req.body.role
        })

        res.status(200).send({ message: 'Usuário atualizado com sucesso.' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar o usuário', data: error })
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        const dataToken = await authService.decodeToken(token)

        let user = await repository.getPasswdById(dataToken.id)

        if (user.password !== md5(req.body.password + global.SALT_KEY)) {
            res.status(500).send({ message: 'Senha incorreta' })
            return            
        }

        await repository.updatePassword(dataToken.id, {
            password: md5(req.body.newPassword + global.SALT_KEY)            
        })

        res.status(200).send({ message: 'Senha atualizada com sucesso.' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar a senha', data: error })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.remove(req.params.id)
        res.status(200).send({ message: 'Usuário removido com sucesso.' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao remover o usuário', data: error })
    }
}