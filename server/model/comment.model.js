import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment_user: {
        type: String,
        required: [true, "Provide User"],
    },
    comment_content: {
        type: String,
        default: "",
    },
    comment_image: {
        type: String,
        default: null,
    },
    comment_in: {
        type: String,
        ref: "",
    }
})

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;