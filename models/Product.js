const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 60
        },
        manufacturer:{
            type: String,
            required: true,
            maxlength: 60
        },
        modelId: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
        },

        desc: {
            type: String,

        },
        specifications: {
            type: [String]
        },

        img: {
            type: [String]
        },
        video: {
          type: String
        },
        barcode:{
            type: [Number],

        },
        category:{
            type: String,
        },
        subCategories: {
            type: [String],

        },

        categories: {
            type: [String],

        },

        size: {
            type: [String],

        },
        color: {
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
        stock: {
            type: Number,

        },
        new:{
            type: Boolean,

        },
        aanbiedingen: {
            type: Boolean,
            default: false
        },
        saleType: {
            type: String,
            default: 'Product'
        },

        inStock: {type: Boolean, default: true},

    },


    {timestamps: true }
)

export default mongoose.models.Product ||
mongoose.model("Product", ProductSchema);

