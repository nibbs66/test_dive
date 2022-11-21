const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {

        fullName: {
            type: String,
            required: true
        },
        userId: {
            type: String,

        },

        email: {
            type: String,
            required: true,
            unique: false,
        },

        phone: {
            type: String,
            required: true },

        regarding: {
            type: String
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String
        },
    },
    {timestamps: true }
)

export default mongoose.models.Message ||
mongoose.model("Message", MessageSchema);
