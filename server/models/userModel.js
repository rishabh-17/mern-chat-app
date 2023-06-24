const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: true,
        min : 3,
        max: 20
    },

    email : {
        type: String,
        unique: true,
        required: true,
        min : 5,
        max : 50
    },

    password : {
        type: String,
        min: 8,
        required: true,
    },

    isAvatarImageSet : {
        type : Boolean,
        default: false
    },

    avatarImage : {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User',userSchema);