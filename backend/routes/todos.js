const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, todosController.createTodo)
router.get('/', authMiddleware, todosController.getTodos)
router.put('/:id', authMiddleware, todosController.updateTodo)
router.delete('/:id', authMiddleware, todosController.deleteTodo)

module.exports = router
