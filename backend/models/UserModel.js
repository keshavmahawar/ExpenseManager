let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        required: true,
        min: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("user", User);
