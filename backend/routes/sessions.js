const express = require('express')
const router = express.Router()
const sessionsController = require('../controllers/sessionsController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, sessionsController.getSessions)

module.exports = router
