const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type: String, 
        required: true,
        unique: true,
    },
    crossed: {
        type: Boolean, 
    } 
})


const List_item = mongoose.model('List_item', schema); 

module.exports = List_item; 