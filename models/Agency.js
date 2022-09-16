const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 60
        },
        levels: {
            type: [String],
        },

    },

    {timestamps: true }
)

export default mongoose.models.Agency ||
mongoose.model("Agency", AgencySchema);

