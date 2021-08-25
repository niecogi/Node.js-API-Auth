const mongoose = require('mongoose');

// elegant mongodb object modeling for node.js
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max:255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:1024
    },
    course: mongoose.Schema.Types.Mixed,
    subject :{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    token :{
        type:String
    },
    resetToken:{
         type: String
    },
    expireToken:{
         type:Date
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);