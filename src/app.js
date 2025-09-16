import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { requestRouter } from "./routes/request.js";
import { connectdb } from "./config/database.js";


const app = express();
app.use(express.json());
app.use(cookieParser())


app.use("/",authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)



connectdb()
  .then(() => {
    console.log("db connected succesfully");
    app.listen(7777, () => console.log("Server is running on port 7777"));
  })
  .catch((err) => {
    console.log("db connection failed");
  });
