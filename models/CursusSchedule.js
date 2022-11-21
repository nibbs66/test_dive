const mongoose = require("mongoose");

const CursusScheduleSchema = new mongoose.Schema(
    {
        cursusId: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },


    },

    {timestamps: true }
)

export default mongoose.models.CursusSchedule ||
mongoose.model("CursusSchedule", CursusScheduleSchema);

