const express = require('express')
const router = express.Router()

const controller = require('../controllers/user-controller')
const authService = require('../services/auth-service')

router.get('/', authService.isAdmin, controller.get)
router.get('/:id', authService.authorize, controller.getById)
router.post('/', controller.post)
router.post('/auth', controller.authenticate)
router.put('/', authService.authorize, controller.update)
router.put('/password', authService.authorize, controller.updatePassword)
router.put('/:id', authService.isAdmin, controller.updateById)
router.delete('/:id', authService.isAdmin, controller.delete)

module.exports = router