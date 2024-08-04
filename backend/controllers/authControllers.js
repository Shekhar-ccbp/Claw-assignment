const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const supabase = require('../config/supabaseClient')

exports.register = async (req, res) => {
  try {
    const {email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({email, password: hashedPassword})
    await user.save()
    res.status(201).json({message: 'User registered'})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      res.json({token})
    } else {
      res.status(401).json({message: 'Invalid credentials'})
    }
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
