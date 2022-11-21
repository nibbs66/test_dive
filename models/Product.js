const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 60
        },
        vendor: {
            type: String,
            required: true,
            maxlength: 60
        },

        gender: {
            type: String,
        },
        productSubType: {
            type: [
                {barcode: {type: String, required: true},
                    stock: {type: Number, default: 0},
                    color: {type: String},
                    size: {type: String},
                    img: {type: String},
                    modelId: {type: String},
                }
            ]
        },

        desc: {
            type: String,

        },


        img: {
            type: [String]
        },
        video: {
            type: String
        },

        category: {
            type: String,
        },
        subCategories: {
            type: [String],

        },

        price: {
            type: Number,
            required: true,
        },

        cost: {
            type: Number,
            required: true,
        },

        new:{
            type: Boolean,

        },
        aanbiedingen: {
            type: Boolean,
            default: false
        },


        inStock: {type: Boolean, default: true},

    },


    {timestamps: true }
)


export default mongoose.models.Product ||
mongoose.model("Product", ProductSchema);

