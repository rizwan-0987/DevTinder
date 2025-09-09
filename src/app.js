import express from 'express'

const app = express();

app.get("/",(req, res) => {
    res.send("helllo from server")
})
app.get("/about",(req, res) => {
    res.send("This is about page")
})
app.get("/bye",(req, res) => {
    res.send("bye bye")
})


app.listen(7777,()=>console.log("Server is running on port 7777"))