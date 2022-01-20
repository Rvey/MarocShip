const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser')
const logger = require('./utils/logger')

const app = express()

require('dotenv').config();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/src`))
app.use('/api/', routes)


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true ,  useUnifiedTopology: true  }, () => {
    console.log('Database Connected')
})

app.listen(process.env.PORT, () => {
    console.log(`up and running at http://localhost:${process.env.PORT}`);
})
