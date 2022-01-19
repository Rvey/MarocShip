const jwt = require('jsonwebtoken')
const Manager = require('../models/manager.model')
const auth = async (req, res, next) => {
    // try {
    //     const token = await req.headers.authorization.split(" ")[1]
    //     let decodeData =  jwt.verify(token, `${process.env.JWT_SECRET}`)

    //     if (token && decodeData) {
    //         req.managerId = decodeData?.id
    //         // get the current manager
    //         // const manager = await Manager.findOne({ _id: decodeData.id, 'tokens.token': token })
    //         // console.log(manager);
    //     }else {
    //         decodeData = jwt.decode(token)
    //         req.managerId = decodeData?.sub
    //     }
    //     next()
    // } catch (e) {
    //     res.status(401).send({ error: 'Please authenticate.' })
    // }
}
const currentUser = async (req, res, next) => {
  
        const token = await req.headers.authorization.split(" ")[1]
        let decodeData =  jwt.verify(token, `${process.env.JWT_SECRET}`)
        return token;
   
}

module.exports = auth, currentUser