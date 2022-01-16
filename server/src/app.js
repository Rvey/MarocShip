const express = require('express')
const mongoose = require('mongoose') 
const app = express()
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database Connected')
})
// require('./routes/routes')(app)

const routes = require('./routes/routes')
app.use('/api/', routes)


app.listen(port,() => {
    console.log(`up and running at http://localhost:${port}`);
})