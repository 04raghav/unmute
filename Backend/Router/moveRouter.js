const express= require('express')
const Router = express.Router()
const {userLikes}= require('../Controller/userLikes')
const {checkToken} = require('../Middleware/checktoken')
Router.post('/take-preference',checkToken, userLikes)
module.exports = Router