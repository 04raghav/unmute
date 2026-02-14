const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config();
const jwtVerify=process.env.JWT_SECRET

const checkToken = (req, res, next) => {
    try {
        const token = req.cookies.vent_token;
        if (!token) {
            console.log("Access Denied: No token provided from middleware.");
            return res.status(401).json({ message: "Access Denied: No token provided." });
        }

        const decoded = jwt.verify(token, jwtVerify);
        req.ventId=decoded.ventId;
        console.log("u can check the info from here in middleware",req.ventId);
        req.userId = decoded.id;  // store Mongo _id

        next();
    } catch (error) {
        console.log("this is error in middleware:", error)
        res.status(401).send({ message: "Invalid token" });
    }
}


module.exports={checkToken};