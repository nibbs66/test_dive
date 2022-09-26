const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,

        },

        email: {
            type: String,

            unique: false,
        },

        regarding: {
            type: String
        },
        subject: {
            type: String,

        },
        response: {
            type: String
        },
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
        duration: {
            type: String,
        },


    },
    {timestamps: true }
)

export default mongoose.models.Conversation ||
mongoose.model("Conversation", ConversationSchema);
