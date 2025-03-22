import mongoose from "mongoose";

const newletterSubscriberSchema = new mongoose.Schema({
    member_email: {
        type: String,
        required: [true, "Provide email"],
    },
})

const NewletterSubscriberModel = mongoose.model("TutorialDetail", newletterSubscriberSchema);

export default NewletterSubscriberModel;