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

app.use("/user", (req, res, next) => {
    console.log("route handler 1")
    next();

    // res.send("route handler 1")
},
    (req, res, next) => {
        console.log("route handler 2")
        // res.send("route handler 2")
        next();
    },
   [ (req, res, next) => {
        console.log("route handler 3")
        // res.send("route handler 3")
        next()
    },
    (req, res, next) => {
        console.log("route handler 4")
        // res.send("route handler 4")
        next()
    }],
    (req, res, next) => {
        console.log("route handler 5")
        // next()

        res.send("route handler 5")
    },
)


app.listen(7777,()=>console.log("Server is running on port 7777"))