const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
    {

        color: {
            type: String,
        },



    },

    {timestamps: true }
)

export default mongoose.models.Color ||
mongoose.model("Color", ColorSchema);

