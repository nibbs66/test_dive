const mongoose = require("mongoose");

const CatMenuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 60
        },
        subCategories: {
          type: [String],
        },

        desc: {
            type: String,
            maxlength: 200
        },

        img: {
            type: String,
            required: true,
        },

    },

    {timestamps: true }
)

export default mongoose.models.CatMenu ||
mongoose.model("CatMenu", CatMenuSchema);

