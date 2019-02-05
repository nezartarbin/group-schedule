//importing express and bodyparsers
const express = require("express");
const bodyParser = require('body-parser');
const Mongo = require("mongodb").MongoClient;

//initializing express app
const app = express();

const dburl = "mongodb://localhost:27017";
const client = new Mongo(dburl, { useNewUrlParser: true });
const dbName = "group-schedules";

//mounting bodyparser
//bodyParser will parse HTTP request body for us
app.use(express.json());

//define main get request. When accessing root, we send our home HTML page.
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/public/home.html", () => console.log("home page sent"));
});

//When CSS stylesheet requested, we send it
app.get("/css/main.css", (req,res,next) => {
    res.sendFile(__dirname + "/public/css/main.css");
});

//handling post request
app.post('/user', (req,res,next) => {
    console.log(req.body);
    addDocument("group1", req.body);
});

//defining server listener
app.listen(3000, () => {
    console.log(`Server started on port 3000...`);
});

function addDocument(coll,doc) {
    client.connect(() => {
        client.db(dbName).collection(coll).insertOne(doc, (err, result) => {console.log(JSON.stringify(result.ops))})
    })
}