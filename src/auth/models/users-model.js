'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET || 'mysecret';
const userschema = require('./users-schema.js');

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  
  async save(record) {
    console.log(record);

    let myUser =await this.schema.find({ username: record.username } );

    if(!myUser){
    const newRecord = new this.schema(record);
        console.log(newRecord);
      newRecord.password = await bcrypt.hash(newRecord.password, 5);
      newRecord.username = newRecord;
      return newRecord.save();
    }
    return Promise.reject(); // ==>.catch
  }

  async authenticateBasic(user,pass) {
    const valid = await bcrypt.compare(pass, user.password);
    return valid ? user : Promise.reject('wrong password');
  }

  async generateToken(user) {
    const token = await jwt.sign({ username: user.username }, SECRET);
    return token;
  }

  list() {
    return this.schema.find();
  }
}


class Users extends Model {
  constructor() {
    super(userschema);
  }
}


module.exports = new Users();
