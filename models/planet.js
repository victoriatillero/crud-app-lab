const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
    name: String,
    hasRings: Boolean,
    hasMoons: Number,
    distanceFromSun: Number,
})
const Planet = mongoose.model('Planet', planetSchema)
module.exports = Planet
