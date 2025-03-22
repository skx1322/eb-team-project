import mongoose from "mongoose";

const tutorialDetailSchema = new mongoose.Schema({
    tutorial_step:{
        type: Number,
        required: true,
        default: 1,
    },
    tutorial_title: {
        type: String,
        required: [true, "Provide title"],
    },
    tutorial_content: {
        type: String,
        required: [true, "Provide content"],
    },
    tutorial_image: {
        type: String,
        default: null,
    },
    tutorial_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TutorialTitle",
        required: true,
    }
})

tutorialDetailSchema.index({tutorial_id: 1,tutorial_step: 1}, {unique: true})

const TutorialDetailModel = mongoose.model("TutorialDetail", tutorialDetailSchema);

export default TutorialDetailModel;