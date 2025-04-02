import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/imgres?q=profile%20image&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fblue-circle-with-white-user_78370-4707.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile&docid=WIYPytbMl_8XfM&tbnid=ZzhEBaHQM02woM&vet=12ahUKEwifve6nhPqLAxXwbPUHHXBLDF0QM3oECHMQAA..i&w=626&h=626&hcb=2&ved=2ahUKEwifve6nhPqLAxXwbPUHHXBLDF0QM3oECHMQAA"
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;