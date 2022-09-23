const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 60
        },
        modelId: {
            type: String,

        },
        gender: {
            type: String,
        },

        desc: {
            type: String,

        },
        img: {
            type: [String]
        },
        barcode:{
            type: [Number],

        },
        category:{
            type: String,
        },
        size: {
            type: [String],

        },

        halfDayPrice: {
            type: Number,
            required: true,
        },

        fullDayPrice: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,

        },
        purchaseType: {
            type: String,
            default: 'Rental'
        },

        inStock: {type: Boolean, default: true},

    },


    {timestamps: true }
)

export default mongoose.models.Rental ||
mongoose.model("Rental", RentalSchema);

