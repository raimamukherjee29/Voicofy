const mongoose = require('mongoose')

function DbConnect() {
  const DB_URL = process.env.DB_URL

  // Check if DB_URL is provided
  if (!DB_URL) {
    console.error('DB_URL environment variable is not set.')
    return
  }

  // Database connection
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))

  db.once('open', () => {
    console.log('DB connected...')
  })
}

module.exports = DbConnect
