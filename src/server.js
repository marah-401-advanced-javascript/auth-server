'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./auth/router.js');
const middleNotFound = require('./middleware/404.js');
const middleError = require('./middleware/500.js');
const app = express();
const path = require('path');
const extraRoutes = require('./extra-routes.js');



// global middleware
app.use(express.json()); //body-parser middleware for the request (that will run on all routes) 
app.use(morgan('dev'));
app.use(cors());
app.use('/public', express.static('public')); // tell the server to connect the frontend
// app.use(express.static('./public'));


//Routers use
// app.use('/', express.static('./docs'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.use(router);
app.use(extraRoutes);


// errors middleware
app.use('*', middleNotFound);
app.use(middleError);


module.exports = {
  server: app,// exporting this for testing puposes
  start: (port) => {// exporting this for index.js
    const PORT = port || process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};