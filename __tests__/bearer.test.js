'use strict';

const bearer = require('../src/auth/middleware/bearer');
let res = {};
let next = jest.fn();

describe('bearer middleware', () => {

  it('should respond with error', () => {
    let req = { headers: { authorization: null } };
    bearer(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login no auth headers');
  });
  it('should respond properly', () => {
    let req = { headers: { authorization: 'Basic dasdr54sada6scac1a' } };
    bearer(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});