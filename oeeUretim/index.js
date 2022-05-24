const express = require('express');
const bodyParser = require('body-parser');
var uretim = require('./uretim.js');
var cors = require('cors');
var port=6163;
const app = express();

app.use(bodyParser());
app.use(cors());


app.post('/admin/:fnc', function (req, res) {
    //console.log(req.params.fnc);
    uretim[req.params.fnc](res,req.body);
})
 
app.listen(port,()=>{
    console.log('server ',port,' başladı')
})