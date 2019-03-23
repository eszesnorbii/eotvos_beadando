const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var db

app.use(cors())
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) throw err
    db = client.db('beadando')
})

app.post('/:id',
    (req, res) => {
        db.collection(req.params.id).insertOne(req.body.item, data => {
            res.send(data)
            const date = new Date()
            console.log(
                "succesfully post operation at",
                date.getHours(),
                ": ",
                date.getMinutes()
            )
        })
    }
)

app.get('/:id',
    (req, res) => {
        db.collection(req.params.id).find().toArray((err, data) => {
            res.send(data)
            const date = new Date()
            console.log(
                "succesfully get operation at",
                date.getHours(),
                ": ",
                date.getMinutes()
            )
        })
    }
)

app.delete('/:id',
    (req, res) => {
        db.collection("shopping_cart").deleteOne({_id: req.params.id}), ( () => {
            const date = new Date()
            console.log(
                "succesfully delete operation at",
                date.getHours(),
                ": ",
                date.getMinutes()
            )
            db.close()
        })
    }
)

function start(port) {
    if (app.listen(port)) {
        const date = new Date()
        console.log('Web server started listening on http://localhost:8082 at',
            date.getHours(),
            ":",
            date.getMinutes())

    }
}

start(8082)