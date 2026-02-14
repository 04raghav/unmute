const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

const ConnectionSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ventId:{
        type: String
    },
    status: { type: String,  enum: ["pending", "connected", "rejected","requested"] },
  },
  { _id: false } // disable subdocument _id
);

const UserSchema=new mongoose.Schema({
    ventId :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },Tags:{
        type:[String],
        default:[]
    },
    connections: { type: [ConnectionSchema], default: [] }

})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // ✅ Only hash if modified
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});


const User=mongoose.model('User',UserSchema);
//const Connections=mongoose.model('Connections',ConnectionSchema)
module.exports=User;