import User from '../models/user.model.js'          //This file is linked with 'isAuth.js'., used for extracting 'user._id'(created in mongoDB) 
                                                    // from token (cookies) (chrome)

export const getCurrentUser = async(req, res) => {
    try {
        const userId = req.userId
        if(!userId){
            return res.status(400).json({ message:"userId is not found" })
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({ message: "user is not found" })
        }
        return res.status(200).json( user )
    } catch (error) {
        return res.status(500).json({ message:`Get current user error ${error}` })
    }
}

