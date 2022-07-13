const express = require('express');
const app = express();
const fs = require("fs")

app.use(express.json());

app.get("/", (req, res)=>{
    let data = fs.readFileSync("./public/index.html", "utf-8")
    res.send(data)
})
app.post("/", (req, res)=>{
    console.log(req.body)
    res.setHeader("Content-Type", "application/json")
    res.send('POST request to the homepage');
})

app.listen("80", ()=>{console.log("http://localhost")})