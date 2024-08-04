const Todo = require('../models/Todo')

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.user._id,
      title: req.body.title,
    })
    await todo.save()
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({userId: req.user._id})
    res.json(todos)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: 'Forbidden'})
    }
    todo.title = req.body.title || todo.title
    todo.completed =
      req.body.completed !== undefined ? req.body.completed : todo.completed
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: 'Forbidden'})
    }
    await todo.remove()
    res.json({message: 'Todo removed'})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
