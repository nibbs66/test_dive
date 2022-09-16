const mongoose = require("mongoose");

const CursusScheduleSchema = new mongoose.Schema(
    {
        cursusId: {
            type: String,
            required: true,
        },
        schedule: {
            type: [String]
        },


    },

    {timestamps: true }
)

export default mongoose.models.CursusSchedule ||
mongoose.model("CursusSchedule", CursusScheduleSchema);

