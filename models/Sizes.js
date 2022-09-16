const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
    {

        size: {
            type: String,
        },



    },

    {timestamps: true }
)

export default mongoose.models.Size ||
mongoose.model("Size", SizeSchema);

