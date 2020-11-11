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
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({ extended: true, parameterLimit: 50000,limit: '25mb' }));
//global

//routes
app.use(require('./routes/login.js'));
app.use(require('./routes/register.js'));
app.use(require('./routes/recover.js'));
app.use(require('./routes/profile.js'));
app.use(require('./routes/admin.js'));
app.use(require('./routes/product.js'));
app.use(require('./routes/home.js'));
app.use(require('./routes/reportes.js'));
//public

//server start
app.listen(app.get('port'), () => {
  console.log("Server on port: "+app.get('port'));
});