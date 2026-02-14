const sendUserData=(req,res)=>{
    const a=req.a;
    const b=req.b;

    if(a+b>1){return res.status(200).send({message:"Working"})}

    return res.status(400).send({message:"not Working"})

}

module.exports={sendUserData}