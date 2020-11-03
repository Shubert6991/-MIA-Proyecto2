const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//initializations
const app = express();
app.use(cors())
//settings
app.set('port', process.env.PORT || 4000);

//middleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//global

//routes
app.use(require('./routes/login.js'));
app.use(require('./routes/register.js'));
//public

//server start
app.listen(app.get('port'), () => {
  console.log("Server on port: "+app.get('port'));
});