'use strict';

const users = require('../models/users-model');


module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    next('Invalid Login no auth headers');
  } else {
    console.log=('hiii');
    const [auth, token] = req.headers.authorization.split(' ');
    console.log=('TOKEN' , token);
    if (auth === 'Bearer') {
      users
        .authenticateToken(token)
        .then((validUser) => {
          req.user = validUser;
          console.log('heloooooooooooooo');
          next();
        })
        .catch((e) => next('Invalid login', e.message));
    } else {
      next('Invalid auth header');
    }
  }
};
  