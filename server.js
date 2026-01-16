const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app= express()
const mongoose = require('mongoose')
const methodOverride= require("method-override")
const morgan = require("morgan")


const PORT = process.env.PORT
const Planet = require('./models/planet')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=>{
    console.log(`Connected to mongodb ${mongoose.connection.name}`)
})
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(methodOverride('_method'))

// I.N.D.U.C.E.S
//ROOT Route
app.get('/', async (req,res)=>{
    res.render('home.ejs')
})
//Index Route
app.get('/planets', async (req,res)=> {
    const allPlanets = await Planet.find()
    console.log(allPlanets)
    res.render('planets/index.ejs', {allPlanets})
})
//New Route
app.get('/planets/new', async (req,res)=>{
    res.render('planets/new.ejs')
})
//Delete Route
app.delete('/planets/:planetId', async (req, res)=> {
    await Planet.findByIdAndDelete(req.params.planetId)
    res.redirect('/planets')
})
//Update Route
//Create Route
app.post('/planets', async(req,res)=> {
    if (req.body.hasRings === 'on') {
        req.body.hasRings = true
    } else {
        req.body.hasRings = false
    }
    req.body.hasMoons= Number(req.body.hasMoons)
    req.body.distanceFromSun = Number(req.body.distanceFromSun)
    await Planet.create(req.body)
    console.log(req.body)
    res.redirect('/planets')
})
//Edit Route
app.get('/planets/:planetId/edit',async (req,res) => {
    const foundPlanet = await Planet.findByIdAndUpdate(req.params.planetId);
    res.render('planets/edit.ejs', {foundPlanet:foundPlanet})
} )
//Show Route
app.get('/planets/:planetId', async (req,res)=> {
    const foundPlanet = await Planet.findById(req.params.planetId)
    res.render('planets/show.ejs', {foundPlanet: foundPlanet})
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}` )
})
