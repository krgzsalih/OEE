const express = require('express');
const bodyParser = require('body-parser');
var globalFunctions = require('./globals/globalFunctions.js');
var cors = require('cors');
var port=6162;
const app = express();

app.use(bodyParser());
app.use(cors());


app.post('/admin/:fnc', function (req, res) {
    console.log(req.params.fnc);
    globalFunctions[req.params.fnc](res,req.body);
})
 
app.listen(port,()=>{
    console.log('server ',port,' başladı')
})