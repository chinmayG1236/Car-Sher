import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"

export const test=(req,res)=>{
    res.json({
        message:'API is working'
    })
}

// update user

export const updateUser = async (req, res, next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'You cannot update others account'));
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            {new:true}
        );
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

// delete user

export const deleteUser = async (req, res, next)=>{
    if(req.user.id != req.params.id){
        return next(errorHandler(401,'cannot delete others account'));
    }
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json('Your account has been deleted...');
    } catch (error) {
        next(error);
    }
}