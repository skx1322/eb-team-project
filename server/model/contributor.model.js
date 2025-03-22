import mongoose from "mongoose";

const contributorScheme = new mongoose.Schema({
    cont_name: {
        type: String,
        required: [true, "Provide Name"],
    },
    cont_role: {
        type: String,
        required: [true, "Provide Role"],
    },
    cont_email: {
        type: String,
        required: [true, "Provide Email"],
    },
    cont_avatar: {
        type: String,
        required: [true, "Provide Image"],
    },
    cont_description: {
        type: String,
        default: null,
    },
})

const ContributorModel = mongoose.model("Contributor", contributorScheme);

export default ContributorModel;