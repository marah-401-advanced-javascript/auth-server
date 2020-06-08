'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET || 'mysecret';
const userschema = require('./users-schema.js');
const Model = require('./mongo.js');

  
class Users extends Model {
  constructor() {
    super(userschema);
  }

  async save(record) {
    console.log('record befor hash',record);

    let myUser = await this.get({ username: record.username } );

    if(myUser.length === 0){
      record.password = await bcrypt.hash(record.password, 5);
      console.log('record after hash',record);
      return await this.create(record);
    }
    return Promise.reject(); // ==>.catch
  }

  async authenticateBasic(user,pass) {
    const myUser = await this.get({username : user});
    const valid = await bcrypt.compare(pass, myUser[0].password);
    return valid ? myUser : Promise.reject('wrong password');
  }

  generateToken(user) {
    const token =  jwt.sign({ username: user.username }, SECRET);
    return token;
  }
}

module.exports = new Users();
