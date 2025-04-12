import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment_user: {
    type: String,
    required: [true, "Provide User"],
  },
  comment_email: {
    type: String,
    default: [true, "Provide email"],
  },
  comment_content: {
    type: String,
    default: "",
  },
  comment_rating: {
    type: Number,
    default: null,
  },
  comment_image: {
    type: String,
    default: null,
  },
  comment_in: {
    type: String,
    required: [true, "Provide comment section ID."],
  },
},{
    timestamps: true,
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
