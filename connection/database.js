const mongoose = require('mongoose')

const connectDb = (uri) => mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = connectDb
