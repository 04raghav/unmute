const express=require('express')
const Router=express.Router();
const {checkToken}=require('../Middleware/checktoken')
const {formConnection,checkConnection, changeConnection}=require('../Controller/userConnections')

Router.post('/connect/request',checkToken ,formConnection)
Router.post('/check-connections',checkToken,checkConnection)
Router.post('/accept-request',checkToken,changeConnection)

module.exports=Router