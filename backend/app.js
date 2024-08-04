const express = require('express')
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const todosRoutes = require('./routes/todos')
const sessionsRoutes = require('./routes/sessions')

const app = express()
connectDB()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/todos', todosRoutes)
app.use('/api/sessions', sessionsRoutes)

app.use((req, res) => {
  res.status(404).json({message: 'Not Found'})
})

module.exports = app
