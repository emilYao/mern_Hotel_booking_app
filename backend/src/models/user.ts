import mongoose from "mongoose";
import bcrypt from "bcryptjs"

export type UserType = {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName: {
        type:String, 
        required:true
    },
    lastName: {
        type:String, 
        required:true
    }
})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashs = await bcrypt.hash(this.password, salt);
        this.password =  hashs;
        next();
    }catch(error: any){
        next(error)
    }
   

   
})


const User = mongoose.model<UserType>("User", userSchema);




export default User;