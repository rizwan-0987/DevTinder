import express from 'express'

const app = express();

app.use("/", (req, res,next) => {
    console.log("working on /user")
    next();
})
app.get(`/user`, (req, res) => {
    console.log(req.query) 

    res.send({
        name: "Rizwan",
        age : "24"
    })
})
app.get("/user/:id/:age/:address", (req, res) => {
    console.log(req.params)

    res.send({
        name: "Rizwan",
        age: "24"
    })
})
app.post("/user",(req, res) => {
    res.send("user added in db")
})
app.put("/user",(req, res) => {
    res.send("user updated in db")
})
app.delete("/user", (req, res) => {
    res.send("user deleted")
})


app.listen(7777,()=>console.log("Server is running on port 7777"))