const express=require('express');
const app=express()

const cors=require('cors');
const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config()
console.log("HF_API_KEY:", process.env.HF_API_KEY ? "✅ Loaded" : "❌ Missing");


const Connect=require('./Model/Connect.js')
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true ,//ORIGIN ALL
    credentials:true
}))

const authRoutes=require('./Router/authRoutes.js')
app.use('/api',authRoutes  )
const postroutes=require('./Router/postRoutes.js')
app.use('/post',postroutes)
const tagRoutes=require('./Router/userTags.js')
app.use('/user',tagRoutes)
const moveRouter = require('./Router/moveRouter.js')
app.use('/user',moveRouter)
const connectRoutes=require('./Router/connectRoutes.js')
app.use('/user',connectRoutes)
const aiRoutes = require('./Router/aiRoutes.js');
app.use('/ai', aiRoutes);

app.get('/journal/test', (req, res) => {
  res.send('Journal route is working!');
});

const journalRoutes = require('./Router/journalRoutes.js');
app.use('/journal', journalRoutes);




app.listen(process.env.PORT,()=>{
    console.log(`Server running on port: ${process.env.PORT}`);
    Connect();
})
