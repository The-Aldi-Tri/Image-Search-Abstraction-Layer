const GoogleImages = require('google-images')

const CSE_ID = process.env.CSE_ID
const API_KEY = process.env.API_KEY

const customSearchClient = new GoogleImages(CSE_ID, API_KEY)

module.exports = customSearchClient
