const mongoose=require('mongoose');

const Connect=()=>{
    const URI=process.env.MONGO_URI;
    try {
        mongoose.connect(URI);
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports=Connect;