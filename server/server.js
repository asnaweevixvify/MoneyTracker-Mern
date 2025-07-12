const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/trackRoute')
const mongoose = require('mongoose')

const app = express()

require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api',router)

mongoose.connect(process.env.DATABASE)
.then(()=>console.log('connect complete','✅'))
.catch((err)=>console.log(err))

const port = process.env.PORT
app.listen(port,()=>{console.log('connect server port',port,'✅')})


