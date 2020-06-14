'use strict';

const base64 = require('base-64');
const users = require('../models/users-model');

/*
headers:{
  "authorization":"Basic m4e321$342"
}
*/

module.exports = (req, res, next) => {
  // check if the client sent authorization headers
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    // user:pass
    const basic = req.headers.authorization.split(' ').pop(); // ["Basic","m4e321$342"]
    console.log('BASIC : ', basic);
    const [user, pass] = base64.decode(basic).split(':'); // "marah 0000"
    console.log('__BASIC_AUTH__', user, pass);
    users
      .authenticateBasic(user, pass)
      .then((validUser) => {
        // console.log('req.TOKEN :', req.token);
        req.token = users.generateToken(validUser);
        req.user = validUser;

        next();
      })
      .catch((err) => next(err));
  }
};
