const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    }
});

const RegisterModel = mongoose.model("Register", RegisterSchema);
module.exports = RegisterModel;
