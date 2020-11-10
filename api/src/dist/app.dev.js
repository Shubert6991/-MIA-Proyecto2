"use strict";

var express = require('express');

var morgan = require('morgan');

var cors = require('cors'); //initializations


var app = express();
app.use(cors()); //settings

app.set('port', process.env.PORT || 4000); //middleware 

app.use(morgan('dev'));
app.use(express.json({
  limit: '25mb'
}));
app.use(express.urlencoded({
  extended: true,
  parameterLimit: 50000,
  limit: '25mb'
})); //global
//routes

app.use(require('./routes/login.js'));
app.use(require('./routes/register.js'));
app.use(require('./routes/recover.js'));
app.use(require('./routes/profile.js'));
app.use(require('./routes/admin.js'));
app.use(require('./routes/product.js')); //public
//server start

app.listen(app.get('port'), function () {
  console.log("Server on port: " + app.get('port'));
});