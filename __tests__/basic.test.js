'use strict';

const basic = require('../src/auth/middleware/basic');
let res = {};
let next = jest.fn();

describe('basic auth ', () => {

  it('should respond with error', () => {
    let req = { headers: { authorization: null } };
    basic(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });
  it('should respond properly', () => {
    let req = { headers: { authorization: 'Basic dasdr54sada6scac1a' } };
    basic(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});