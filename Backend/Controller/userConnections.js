const User = require("../Model/UserModule");
const Comment= require('../Model/UserComment')

const formConnection=async(req,res)=>{
    try {
        const {ventId,othId}=req.body;
        console.log(ventId," ",othId)
        const user1=await User.findOne({ventId:ventId})
        const user2 = await User.findOne({ ventId: othId });
        console.log(user1," ", user2)
        if(!user1 || !user2){
            return res.status(404).send({message:"User NOT Found"})
        }
        //connection exist or not will be checked onfrontend
        user1.connections.push({id:user2._id,ventId:user2.ventId,status:'pending'})
        user1.save()
        user2.connections.push({id:user1._id,ventId:user1.ventId,status:'requested'})
        user2.save()
        
        //generate notification will be written for user2
        return res.status(200).send({message:"Request Sent"});
        
    } catch (error) {
        console.error("Error in forming connections:", error);
        return res.status(500).send({message:"Error in forming connections"})
    }
}

const checkConnection=async(req,res)=>{
    const {ventId,othId}=req.body
    try {
        const user1=await User.findOne({ventId:ventId})
        const user2=await User.findOne({ventId:othId})
        if(!user1 || !user2){
            return res.status(403).send({message:"User does not Exist"})
        }
        const connection=await user1.connections.find((conn)=>conn.id.toString()===user2.id.toString())
        if(connection){
            return res.status(200).send({message:"Connection Exists",status:connection.status,user2:{connections:user2.connections.length}})
        }
        return res.status(200).send({message:"No Connection",connections:user2.connections.length,status:"No Connection"}) ;
    } catch (error) {
        return res.status(500).send({message:"Error in checking connection"});
    }
}

const changeConnection=async(req,res)=>{
    const{userVentId,acceptedVentId}=req.body;
   try {
     const user1=await User.findOne({ventId:userVentId})
     const user2=await User.findOne({ventId:acceptedVentId});
     if(!user1 || !user2){
         return res.status(404).send({message:"User Not Exist"})
     }
 
     const result=await user1.connections.find((conn)=>conn.ventId===acceptedVentId)
     if(result){
         try {
             const con1=user1.connections.find(conn=>conn.ventId===acceptedVentId)
             const con2=user2.connections.find(con=>con.ventId===userVentId)
             if(!con1 || !con2){
                 return res.status(404).send({message:"User Not Exist in connection"})
             }
             con1.status="connected"
             con2.status="connected"
             await user1.save();
             await user2.save();
         } catch (error) {
          console.log(error) 
          return res.status(500).send({message:"error in sending data"})  
         }
     }else{
         return res.send(404).send({message:"No Previous Connection"})
     }
   } catch (error) {
    console.log(error)
    return res.send(500).send({message:"Internal Server Error"})
   }
    
}

module.exports={formConnection,checkConnection,changeConnection};