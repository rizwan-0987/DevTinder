import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { requestRouter } from "./routes/request.js";
import { connectdb } from "./config/database.js";
import { userRouter } from "./routes/user..js";
import cors from "cors"


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))

app.use("/",authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)



connectdb()
  .then(() => {
    console.log("✅db connected succesfully");
    app.listen(7777, () => console.log("Server is running on port 7777"));
  })
  .catch((err) => {
    console.log("⭕db connection failed");
  });
