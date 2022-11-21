const mongoose = require("mongoose");

const CursusListingSchema = new mongoose.Schema(
    {
        cursusId: {
            type: String,
            required: true,
        },
        startDate: {
            type: [String]
        },
        endDate: {
            type: Date
        },
        studenten: {
            type: [String]
        },
        locations: {
            type: [String]
        },
        calendarColor: {
            type: String
        }


    },

    {timestamps: true }
)

export default mongoose.models.CursusListing ||
mongoose.model("CursusListing", CursusListingSchema);

