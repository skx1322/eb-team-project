import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    admin_name: {
        type: String,
        required: [true, "Provide name"]
    },
    admin_password: {
        type: String,
        required: [true, "Provide passowrd"]
    },
    admin_email: {
        type: String,
        required: [true, "Provide email"]
    },
    admin_otp: {
        type: String,
        default: null
    },
    admin_passExpire: {
        type: String,
        default: null
    },
},{
    timestamps: true
})

const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel;