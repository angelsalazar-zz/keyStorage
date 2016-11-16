// Database
require('./app/database/db');
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var config = require('./config')

var app = express();

//parse anything
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

//server all the static files
app.use(express.static(path.join(__dirname,'public')));

var api = require('./app/routes/api')(app,express)
app.use('/api',api)



app.listen(config.port,function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Listening on port " + config.port);
  }
})
