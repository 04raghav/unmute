
const Post=require('../Model/UserPost');
const User=require('../Model/UserModule');
const Comment=require('../Model/UserComment')
const makePost=async(req,res)=>{
    
    const {title,description,tag,ventId}=req.body
    const id=req.userId
    try {
        const user=await User.findOne({ventId : ventId});
        if(!user){
            res.status(404).send({message:"User not exist"})
            return ;
        }
        const post=new Post({userId:id,Title:title,Description:description,Tag:tag});
        await post.save();
        res.status(200).send({message:"User Post Created"});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"some error in making post"})
    }

}

const sendPost=async(req,res)=>{
    const ventId=req.ventId
    try {
        const user=await User.findOne({ventId:ventId});
        if(!user){
            res.status(404).send({message:"no user exist"})
            return ;
        }
        const tag=user.Tags;
        console.log(tag);
        const posts = await Post.find({ Tag: { $in: user.Tags } })
      .sort({ createdAt: -1 })
      .limit(100)
      .populate({
        path: "Comments",
        populate: { path: "ventId", select: "username" } // fetch comment.user (username)
      })
      .populate("userId", "username") // optional: fetch post author username
      .exec();
        // console.log(posts)
        // for(let i=0;i<posts.length;i++){
        //     console.log(posts[i].Comments)
        // }
        res.status(200).send({message:"Post Collected",AllPost:posts})
        
    } catch (error) {
        res.status(200).send({message:"server Error in sending Posts"})
    }
}

const postComment=async(req,res)=>{
    const ventId=req.ventId
    const {post,message}=req.body;
    try {
        const user=await User.findOne({ventId:ventId})
        const UPost=await Post.findOne({_id :post })
        if(!user || !UPost)return res.status(404).send({message:"invalid user"})
        const comment= new Comment({ventId:ventId, PostId:post ,message:message})
        await comment.save()
UPost.Comments.push(comment._id);
        await UPost.save();
        const updatedPost = await Post.findById(post)
      .populate({
        path: "Comments",
        populate: { path: "ventId", select: "username" } // populates user details
      });
        res.status(200).send({message:updatedPost})

    } catch (error) {
        console.log(error)
        res.status(500).send({message:error})
    }

}

module.exports={makePost,sendPost,postComment}