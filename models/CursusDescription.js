const mongoose = require("mongoose");

const CursusDescriptionSchema = new mongoose.Schema(
    {
        cursus: {
            type: String,
            required: true,
        },
        img: {
            type: [String]
        },
        video: {
            type: String
        },
        desc: {
            type: String,
            required: true,

        },

        minStudents: {
            type: Number,
        },

        maxStudents: {
            type: Number,

        },
        cutOff: {
            type: Number
        },
        sortOrder: {
            type: Number
        },


    },

    {timestamps: true }
)

export default mongoose.models.CursusDescription ||
mongoose.model("CursusDescription", CursusDescriptionSchema);

