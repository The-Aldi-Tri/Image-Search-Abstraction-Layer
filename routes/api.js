'use strict'
require('dotenv').config()
const customSearchClient = require('../connection/customSearchEngine.js')
const SearchLog = require('../Model/searchLogModel.js')

const nthNumber = (number) => {
  if (number > 3 && number < 21) return 'th'
  switch (number % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

module.exports = function (app) {
  app.route('/query/:query')
    .get(async (req, res) => {
      const query = req.params.query
      const page = req.query.page || 1

      const newLog = new SearchLog({
        searchQuery: query,
        timeSearched: new Date()
      })

      await newLog.save()

      await customSearchClient.search(query, { page })
        .then((images) => {
          return res.json(images)
        })
    })

  app.route('/recent')
    .get(async (req, res) => {
      const logs = await SearchLog.find({}, { __v: 0 })
      const formattedLog = logs.map((item) => {
        const date = item.timeSearched

        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'long' })
        const year = date.getFullYear()
        const time = date.toLocaleString('default', { timeStyle: 'medium' })

        const formattedDate = `${month} ${day}${nthNumber(day)} ${year}, ${time.toLowerCase()}`

        return {
          searchQuery: item.searchQuery,
          timeSearched: formattedDate
        }
      })

      return res.json(formattedLog)
    })
}
