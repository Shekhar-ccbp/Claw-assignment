const Session = require('../models/Session')

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({userId: req.user._id})
    res.json(sessions)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
