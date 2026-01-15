const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app= express()
const mongoose = require('mongoose')

const port = process.env.port

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=>{
    console.log(`Connected to mongodb ${mongoose.connection.name}`)
})

// I.N.D.U.C.E.S
//ROOT Route
app.get('/', async (req,res)=>{
    res.render('home.ejs')
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}` )
})
