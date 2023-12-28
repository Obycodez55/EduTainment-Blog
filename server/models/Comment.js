const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Coomment", CommentSchema)