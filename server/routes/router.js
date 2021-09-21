const express = require('express'); 
const route = express.Router(); 

const controller = require('../controller/controller'); 

route.get('/', controller.homeRoute); 
route.get('/getData', controller.getData); 
route.post('/createData', controller.createData);
route.post('/updateData', controller.updateData);
route.post('/deleteData', controller.deleteData);
module.exports = route;