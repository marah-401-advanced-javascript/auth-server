'use strict';
const express = require('express');
const router = express.Router();
const users = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');
const oauth = require('./middleware/oauth.js');


router.post('/signup', signupHandler);
router.post('/signin', basicAuth ,signinHandler);
router.get('/users', basicAuth ,basicHandler);
router.get('/oauth', oauth ,oauthHandler);


function signupHandler(req, res) {
  users
    .save(req.body)
    .then((userData) =>{
      // console.log('USER DATA:' , userData);
      const token = users.generateToken(userData);
      return token;
    })
    .then((token) =>{
      // console.log('TOKEN:' , token);
      res.json({ token });
    })
    .catch((err) =>res.status(403).send('ERRORRRRR'));
}
  

function signinHandler(req,res){
  res.json({ token: req.token , user: req.user });
}


async function basicHandler(req, res) {
  return await users.get().then((result)=>{
    res.json(result);
  });
}


function oauthHandler(req,res){
  res.json({ token: req.token });
}


module.exports = router;

  
