import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    }
})
export const User = mongoose.model("User",userSchema)