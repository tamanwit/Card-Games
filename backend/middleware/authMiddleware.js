const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyUser = (req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : "Unauthorised"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)        
        req.user = decoded

        next()

    } catch(error){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

module.exports = {
    verifyUser,

}