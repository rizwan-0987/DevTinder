import express from "express"
import { authuser } from "../middlewear/auth.js";
export const profileRouter = express.Router();

//--------------------getting profile data---------------------------
profileRouter.get("/profile", authuser, async (req, res) => {
  try {
    const user = req.user
    res.send(user)
  } catch (error) {
    res.send("Error :" + error.message)
  }
})