const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

const verifyToken = async (req,res,next)=>{
    let token ;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(' ')[1];
            
            //decodes token id
            const decoded = jwt.verify(token, process.env.SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).send("Not authorized User,No token");
        }
    }
}

module.exports = {verifyToken};