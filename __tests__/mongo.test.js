'use strict';

require('@code-fellows/supergoose');

const Modelmongo = require('../src/auth/models/mongo.js');


const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, lowercase: true, enum: ['user', 'writer', 'editor', 'admin']},
});

let testModel = mongoose.model('testSchema', testSchema);

let testClass = new Modelmongo(testModel);



describe('mongo.js', () => {

  afterEach(async () => {
    await testModel.deleteMany();
  });

  it('can get() all ', () => {
    let testObj = { username: 'test 1' ,
      password: '0000',
      role:'admin',
    };
    return testClass.create(testObj)
      .then(() => {
        return testClass.get()
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can get() ', () => {
    let testObj = { username: 'test 2' ,
      password: '0000',
      role:'admin',
    };    return testClass.create(testObj)
      .then(postedData => {
        return testClass.get(postedData._id)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can post() ', () => {
    let testObj = { username: 'test 3' ,
      password: '0000',
      role:'admin',
    };    return testClass.create(testObj)
      .then(data => {
        Object.keys(testObj).forEach(key => {
          expect(data[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can put() ', () => {
    let testObj = { username: 'test 4' ,
      password: '0000',
      role:'admin',
    };    
    let updateTestObj = { username: 'test 4 updated' ,
      password: '0000',
      role:'admin',
    };
    return testClass.create(testObj)
      .then(postedData => {
        return testClass.update(postedData._id, updateTestObj)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[key]).toEqual(updateTestObj[key]);
            });
          });
      });
  });

  it('can delete() ', () => {
    let testObj = { username: 'test 5' ,
      password: '0000',
      role:'admin',
    };    return testClass.create(testObj)
      .then(postedData => {
        return testClass.delete(postedData._id)
          .then(() => {
            return testClass.get()
              .then(data => {
                data.forEach(element => {
                  Object.keys(testObj).forEach(key => {
                    expect(element[key]).not.toEqual(testObj[key]);
                  });
                });
              });
          });
      });
  });
});