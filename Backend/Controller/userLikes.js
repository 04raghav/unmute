const User=require('../Model/UserModule');

const userLikes = async (req, res) => {
    const { likes } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);  // ✅ find by _id
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        user.Tags = likes; // save preferences
        await user.save();

        res.status(200).send({ message: "Likes updated successfully", Tags: user.Tags });
    } catch (error) {
        console.error("Error in userLikes:", error);
        res.status(500).send({ message: "Server Error in selecting likes" });
    }
};


module.exports={userLikes}