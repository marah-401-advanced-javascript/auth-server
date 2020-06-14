'use strict';
const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
require('dotenv').config();
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE5ODM4NjksImFsZ29yaXRobSI6IkhTMjU2IiwiaWF0IjoxNTkxOTgyOTY5fQ.PR2QZYljXk8iFcHTpUoBsuwXpkpog0lW9bLO7KPAPkw';

describe('server.js', () => {

  it('1/ 404 test', () => {
    return mockRequest.get('/wrong')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });


  it('2/ POST user /signup ', () => {
    let testData = {
      'username': 'test user',
      'password': '0000',
      'role':'user',
    };
    return mockRequest
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send(testData)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('3/ POST with a correct encoded value /signin ', () => {
    return mockRequest
      .post('/signin')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic dGVzdCB1c2VyOjAwMDA=')
      .then(data => {
        token = data.body.token;
        expect(data.status).toBe(200);
      });
  });

  it('4/ POST with a wrong encoded value  /signin ', () => {
    return mockRequest
      .post('/signin')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic dGVzdCB1c2VyOjAwMD')
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('/read test with wrong token that have user type as role', () => {
    return mockRequest
      .get('/read')
      .set('Authorization', 'Bearer 111111')
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('/read test with correct token that have user type as role', () => {
    return mockRequest
      .get('/read')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/add test with correct token that have user type as role', () => {
    return mockRequest
      .post('/add')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('///////////////////remove test with correct token that have user type as role', () => {
    return mockRequest
      .delete('/remove')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(500);
      });
  });


  it('POST  /signup editors user', () => {
    let testData = {
      'username': 'test user editor',
      'password': '55',
      'role':'editors',
    };
    return mockRequest
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send(testData)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('POST with a correct encoded value /signin editors user', () => {
    return mockRequest
      .post('/signin')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic dGVzdCB1c2VyIGVkaXRvcjo1NQ==')
      .then(data => {
        token = data.body.token;
        expect(data.status).toBe(200);
      });
  });

  
  it('/read test with correct token that have editors type as role', () => {
    return mockRequest
      .get('/read')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/add test with correct token that have editors type as role', () => {
    return mockRequest
      .post('/add')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/change test with correct token that have editors type as role', () => {
    return mockRequest
      .put('/change')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/remove test with correct token that have editors type as role', () => {
    return mockRequest
      .delete('/remove')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(500);
      });
  });
});

