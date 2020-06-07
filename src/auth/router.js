'use strict';
const express = require('express');
const router = express.Router();
const users = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');


router.post('/signup', signupHandler);
router.post('/signin',basicAuth ,signinHandler);
router.get('/users',basicAuth ,usersHandler);


function signupHandler(req, res) {
  console.log('hiiiii');
  users
    .save(req.body)
    .then((userData) =>{
        console.log(userData);
      const token = users.generateToken(userData);
      return token;
    })
    .then((tokenData) =>{
    res.json({ tokenData });
    })
    .catch((err) =>res.status(403));
}
  
function signinHandler(req,res){
  res.json({ token: req.token });
      
}

function usersHandler(req, res) {
  res.json(users.list());
}

module.exports = router;

  
