import express from "express"
import { authuser } from "../middlewear/auth.js";
export const requestRouter = express.Router();

//---------------------Sending Req---------------------------------
requestRouter.get("/request", authuser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " is sending request")
  } catch (error) {
    res.send("Error :" + error.message)
  }
})