const mymongo = require("mongoose");

const commentSchema = mymongo.Schema({
    postid: {
        required: true,
        type: String,

    },
    comment: {
        required: true,
        type: String,
    },
    time: {
        required: true,
        type: String,
    }
});

const comments = mymongo.model("AnonymousComments", commentSchema);

module.exports = comments;