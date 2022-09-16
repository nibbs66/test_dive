const mongoose = require("mongoose");

const CursusListingSchema = new mongoose.Schema(
    {
        cursusId: {
            type: String,
            required: true,
        },
        date: {
            type: [String]
        },
        studenten: {
            type: [String]
        },
        locations: {
            type: [String]
        }


    },

    {timestamps: true }
)

export default mongoose.models.CursusListing ||
mongoose.model("CursusListing", CursusListingSchema);

