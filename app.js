const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/students'
const bodyParser=require("body-parser");

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/students", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
// const con = mongoose.connection

// // con.on('open', () => {
// //     console.log('connected...')
// // })

app.use(express.json())

const alienRouter = require('./routes/student')
app.use('/students',alienRouter)

app.listen(9000, () => {
    console.log('Server started')
})