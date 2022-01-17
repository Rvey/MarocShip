const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
require('dotenv').config();
// const upload = require('./utils/fileHandler');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/src`))


const port = process.env.PORT

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database Connected')
})

const routes = require('./routes/routes')
app.use('/api/', routes)


app.listen(port, () => {
    console.log(`up and running at http://localhost:${port}`);
})