const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema(
    {

        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
        duration: {
            type: Number,
        }


    },

    {timestamps: true }
)

export default mongoose.models.Time ||
mongoose.model("Time", TimeSchema);

