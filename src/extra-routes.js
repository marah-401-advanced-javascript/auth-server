'use strict';

const bearerAuth = require('./auth/middleware/bearer.js');
const acl = require('./auth/middleware/acl.js');
const router = require('./auth/router.js');

router.get('/secret', bearerAuth, bearerHandler);
router.get('/read', bearerAuth, acl('read'), readHandler);
router.post('/add', bearerAuth, acl('create'), createHandler);
router.put('/change', bearerAuth, acl('update'), updateHandler);
router.delete('/remove', bearerAuth, acl('delete'), deleteHandler);


function bearerHandler(req, res){
  res.json(req.user);
}

function readHandler(req, res){
  res.send('OK!');
}

function createHandler(req, res){
  res.send('OK!');
}

function updateHandler(req, res){
  res.send('OK!');
}

function deleteHandler(req, res){
  res.send('OK!');
}

module.exports = router;
