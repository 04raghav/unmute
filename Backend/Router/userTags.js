const express=require('express');
const { checkToken } = require('../Middleware/checktoken');
const { userLikes } = require('../Controller/userLikes');
const Router=express.Router();

Router.post('/tags',checkToken,userLikes)

module.exports=Router;