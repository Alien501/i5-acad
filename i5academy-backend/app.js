
const express = require('express')
const cors=require("cors");
const app = express()
const routes = require('./controllers/blogController')
const db = require('./db')

// middleware
app.use(cors())
app.use(express.json());
app.use('/api/blogs',  routes)

app.use('/thumb', express.static('upload/thumb'))


app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send("Something went wrong!" + err)
})

db.query("SELECT 1")
    .then(() => {
        console.log("Connection success!")
        app.listen(3000, () => {
            console.log("Port: http://localhost:3000/api/blogs");
        })
    })
    .catch(err => console.log("Connnection failed" + err))