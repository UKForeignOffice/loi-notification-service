global.server = {};
global.chai = require('chai');
global.expect = global.chai.expect;
global.should =  global.chai.should;
global.request = require('supertest');
//global.config = require('../config/common');

process.env.PORT = 6000;