const mongoose = require('mongoose');

// elegant mongodb object modeling for node.js
const fileSchema = new mongoose.Schema({
    userID: {
        type:String,
        required: true,
        min: 6,
        max:1024
    },
    fileName: {
        type:String,
        required: true,
        min: 3,
        max:255

    },
    path: {
        required:true,
        type:String,
    }
});

module.exports = mongoose.model('File',fileSchema);