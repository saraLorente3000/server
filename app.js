const express = require('express')
const path = require('path')
var sqlite3 = require('sqlite3');
const bodyParser = require('body-parser')
var db;
require('dotenv').config();

//Initialize express
const app = express();
//Initialize bodyparse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//I use the routes file
app.use((require("./src/routes/home")))

//I get the port from the environment variable and if not I put the default one
const port = process.env.PORT? process.env.PORT : 8080

app.listen(3001, () =>{

})