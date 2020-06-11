'use strict';
const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
require('dotenv').config();
let token = null;

describe('server.js', () => {

  it('1/ 404 test', () => {
    return mockRequest.get('/wrong')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });

  it('2/ POST  /signup ', () => {
    let testData = {
      'username': 'test user',
      'password': '55',
      'role':'admin',
    };
    return mockRequest
      .post('/signup')
      .send(testData)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('3/ POST with a correct encoded value /signin ', () => {
    return mockRequest
      .post('/signin')
      .set('Authorization', 'Basic dGVzdCB1c2VyOjU1')
      .then(data => {
        token = data.body.token;
        expect(data.status).toBe(200);
      });
  });

  it('4/ POST with a wrong encoded value  /signin ', () => {
    return mockRequest
      .post('/signin')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('5/ read test with wrong token that have user type as role', () => {
    return mockRequest
      .get('/read')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  //   it('6/ read test with correct token that have user type as role', () => {
  //     return mockRequest
  //       .get('/read')
  //       .set('Authorization', `Bearer dGVzdCB1c2VyOjU1`)
  //       .then(data => {
  //         expect(data.status).toBe(200);
  //       });
  //   });

  //   it('7/ add test with correct token that have user type as role', () => {
  //     return mockRequest
  //       .post('/add')
  //       .set('Authorization', `Bearer dGVzdCB1c2VyOjU1`)
  //       .then(data => {
  //         expect(data.status).toBe(200);
  //       });
  //   });

  //   it('8/ remove test with correct token that have user type as role', () => {
      
  //     return mockRequest
  //       .delete('/remove')
  //       .set('Authorization', `Bearer dGVzdCB1c2VyOjU1`)
  //       .then(data => {
  //         expect(data.status).toBe(200);
  //       });
  //   });


  it('9/ POST  /signup editors user', () => {
    let testData = {
      'username': 'test user editor',
      'password': '55',
      'role':'editor',
    };
    return mockRequest
      .post('/signup')
      .send(testData)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('10/ POST with a correct encoded value /signin editors user', () => {
    return mockRequest
      .post('/signin')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic dGVzdCB1c2VyIGVkaXRvcjo1NQ==')
      .then(data => {
        token = data.body.token;
        expect(data.status).toBe(200);
      });
  });

  
  //   it('11/ read test with correct token that have editors type as role', () => {
  //     return mockRequest
  //       .get('/read')
  //       .set('Authorization', `Bearer ${token}`)
  //       .then(data => {
  //         expect(data.status).toBe(200);
  //       });
  //   });

  //   it('12/ add test with correct token that have editors type as role', () => {
  //     return mockRequest
  //       .post('/add')
  //       .set('Authorization', `Bearer ${token}`)
  //       .then(data => {
  //         expect(data.status).toBe(200);
  //       });
  //   });

  //   it('13/ change test with correct token that have editors type as role', () => {
  //     return mockRequest
  //       .put('/change')
  //       .set('Authorization', `Bearer ${token}`)
  //       .then(data => {
  //         expect(data.status).toBe(200);
  //       });
  //   });

//   it('14/ remove test with correct token that have editors type as role', () => {
//     return mockRequest
//       .delete('/remove')
//       .set('Authorization', `Bearer ${token}`)
//       .then(data => {
//         expect(data.status).toBe(200);
//       });
//   });
});