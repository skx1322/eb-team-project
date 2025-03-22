import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({
  tutorial_title:{
    type: String,
    require: [true, "Provide tutorial title"]
  },
  tutorial_image:{
    type: String,
    require: [true, "Provide tutorial image"]
  },
  tutorial_type: {
    type: String,
    enum: ["EBWISE", "MSTEAM"],
    required: [true, "Provide type"],
  },
  tutorial_content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TutorialDetail",
    },
  ],
  tutorial_video: {
    type: String,
    default: "",
  },
});

const TutorialModel = mongoose.model("TutorialTitle", tutorialSchema);

export default TutorialModel;
