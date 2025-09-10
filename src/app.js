import express from 'express'

const app = express();

// app.use("/", (req, res,next) => {
//     console.log("working on /user")
//     next();
// })
// app.get(`/user`, (req, res) => {
//     console.log(req.query)

//     res.send({
//         name: "Rizwan",
//         age : "24"
//     })
// })
// app.get("/user/:id/:age/:address", (req, res) => {
//     console.log(req.params)

//     res.send({
//         name: "Rizwan",
//         age: "24"
//     })
// })
// app.post("/user",(req, res) => {
//     res.send("user added in db")
// })
// app.put("/user",(req, res) => {
//     res.send("user updated in db")
// })
// app.delete("/user", (req, res) => {
//     res.send("user deleted")
// })

////Multiple route handlers

// app.use("/user", (req, res, next) => {
//     console.log("route handler 1")
//     next();

//     // res.send("route handler 1")
// },
//     (req, res, next) => {
//         console.log("route handler 2")
//         // res.send("route handler 2")
//         next();
//     },
//    [ (req, res, next) => {
//         console.log("route handler 3")
//         // res.send("route handler 3")
//         next()
//     },
//     (req, res, next) => {
//         console.log("route handler 4")
//         // res.send("route handler 4")
//         next()
//     }],
//     (req, res, next) => {
//         console.log("route handler 5")
//         // next()

//         res.send("route handler 5")
//     },
// )

////multiple routes with same path and / middlewear

// app.use("/",(req, res ,next)=> {
//     console.log("handling your request....")
//     next();
// })
// app.get("/user", (req, res, next) => {
//     // res.send("route handle 1")
//     next();
// })
// app.get("/user", (req, res, next) => {
//     res.send("route handle 2")
// })


///Auth handler for user and admin
// import { authAdmin, authuser } from './middlewear/auth.js';

// app.get("/admin/getAllData",authAdmin, (req, res) => {
//     res.send("Here is all data for admin")
// })

// app.get("/user/data", authuser, (req, res) => {
//     res.send("username : rizwan")
// })
// app.get("/user/login", (req, res) => {
//     res.send("you are getting login")
// })



/////Wild Card Error handling
app.get("/user", (req, res) => {
    try {
        throw new Error()
        
    } catch (error) {
        res.status(401).send("Catch: Something went Wrong ")
    }
})
 
app.use("/", (err, req, res, next) => {
    res.status(401).send("something went wrong")
})


app.listen(7777,()=>console.log("Server is running on port 7777"))