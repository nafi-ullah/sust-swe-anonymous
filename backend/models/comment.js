const mymongo = require("mongoose");

const commentSchema = mymongo.Schema({
    id: {
        required: true,
        type: String,

    },
    comments: {
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