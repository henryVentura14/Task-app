//Imports
const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
//Database
const { mongoose } = require('./database');
// Middleware
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/task', require('./routes/task.routes.js'));
//Static Files
app.use(express.static(path.join(__dirname, '../public')));
//Settings
app.set('port', process.env.PORT || 3000);
//Conection
app.listen(app.get('port'), () =>{
  console.log(`server on port ${app.get('port')}`);
});
