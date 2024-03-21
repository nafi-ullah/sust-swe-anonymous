const mymongo = require("mongoose");

const postSchema = mymongo.Schema({
  
    _id: { type: mymongo.Schema.Types.ObjectId, required: true },
    post: {
        required: true,
        type: String,
    },
    time: {
        required: true,
        type: String,
    },
    count: {
        required: true,
        type: Number,
    }

    
});

const post = mymongo.model("AnonymousPost", postSchema);

module.exports = post;