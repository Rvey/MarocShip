const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const logger = require('./utils/logger')
const cors = require('cors')
const app = express()

require('dotenv').config();

// const whitelist = ['http://localhost:4000','http://localhost:3000'];
// const corsOptions = {
//     credentials: true,
//     origin: (origin, callback) => {
//         if (whitelist.includes(origin))
//             return callback(null, true)

//         callback(new Error('Not allowed by CORS'));
//     }
// }

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/src`))

require('./routes/routes')(app)


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true }, () => {
    console.log('Database Connected')
})

app.listen(process.env.PORT, () => {
    console.log(`up and running at http://localhost:${process.env.PORT}`);
})
