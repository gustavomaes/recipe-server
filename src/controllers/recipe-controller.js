const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const AWS = require('aws-sdk');
const guid = require('guid')

const repository = require('../repositories/recipe-repository')
const authService = require('../services/auth-service')

AWS.config.loadFromPath('./src/configs/s3_config.json');
let s3Bucket = new AWS.S3({ params: { Bucket: 'recipes-dev', ACL: 'public-read' } });

exports.get = async (req, res, next) => {
    // Recipe.find({ active: true}, 'name description photoUrl') 
    let data = await repository.get()
    try {
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar as receitas', data: error })
    }
    // 

}

exports.getById = async (req, res, next) => {
    let data = await repository.getById(req.params.id)
    try {
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar as receitas', data: error })
    }
}

exports.getByUser = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        const dataToken = await authService.decodeToken(token)

        let data = await repository.getByUser(dataToken.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar as receitas', data: error })
    }
}

exports.post = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        const dataToken = await authService.decodeToken(token)

        const photoUrl = await saveImage(req.body.photo)

        let newRecipe = {
            "name": req.body.name,
            "user": dataToken.id,
            "time": req.body.time,
            "serving": req.body.serving,
            "ingredients": req.body.ingredients,
            "preparation": req.body.preparation,
            photoUrl: photoUrl
        }

        let data = await repository.create(newRecipe)
        res.status(201).send(data)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao cadastrar a receita', data: error })
    }
}

exports.put = async (req, res, next) => {

    let updateRecipe = {
        name: req.body.name,
        time: req.body.time,
        serving: req.body.serving,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation
    }

    try {

        const token = req.headers['x-access-token']
        const dataToken = await authService.decodeToken(token)

        let recipeToUpdate = await repository.getById(req.params.id)

        if (recipeToUpdate.user != dataToken.id && dataToken.role != 'admin') {
            res.status(500).send({ message: 'Só é possível alterar as suas receitas.' })
            return
        }

        if (req.body.photo) {
            const photoUrl = await saveImage(req.body.photo)
            updateRecipe = {
                ...updateRecipe,
                photoUrl: photoUrl
            }
        }

        await repository.update(req.params.id, updateRecipe)
        res.status(200).send({ message: 'Receita atualizada com sucesso.' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar a receita', data: error })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        const dataToken = await authService.decodeToken(token)

        let recipeToDelete = await repository.getById(req.params.id)

        if (recipeToDelete.user != dataToken.user && dataToken.role != 'admin') {
            res.status(500).send({ message: 'Só é possível deletar as suas receitas.' })
            return
        }

        await repository.remove(req.params.id)

        res.status(200).send({ message: 'Receita removida com sucesso.' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao remover a receita', data: error })
    }
}


async function saveImage(photo) {
    let fileName = 'food-base.png'
    let keyName = guid.raw() + '.jpg'
    if (photo === null) {
        return `https://s3.amazonaws.com/recipes-dev/${fileName}`        
    }

    buf = new Buffer(photo.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    let dataImg = {
        Key: keyName,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    }

    await s3Bucket.putObject(dataImg, function (err, dataImg) {
        if (!err) {
            fileName = keyName
        }
    }).promise()

    return `https://s3.amazonaws.com/recipes-dev/${fileName}`
}