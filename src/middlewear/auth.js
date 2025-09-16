import { User } from "../models/user.js";
import jwt from "jsonwebtoken"

export const authuser = async (req, res, next) => {
    try {
        const { Token } = req.cookies;
        if (!Token) {
            throw new Error("Token not valid!!!!!!!!!");
            
            
        }
        const decodedMsg =  jwt.verify(Token, "1234")
            console.log(decodedMsg)
            const { id } = decodedMsg;
        
            const user =await User.findById(id)
            if (!user) {
              throw new Error("user does not exsist");
        }
        req.user=user
        next();
   } catch (error) {res.status(404).send("Error  :"+ error.message)
    
   }
}