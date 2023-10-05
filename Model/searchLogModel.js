const mongoose = require('mongoose')

const searchLogSchema = new mongoose.Schema(
  {
    searchQuery: String,
    timeSearched: Date
  }
)
const searchLog = mongoose.models.searchLog || mongoose.model('searchLog', searchLogSchema)

module.exports = searchLog
