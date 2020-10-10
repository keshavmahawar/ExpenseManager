let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 3,
    },
    type: {
        type: String,
        required: true,
        enum: ["credit", "debit"],
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("transaction", User);
