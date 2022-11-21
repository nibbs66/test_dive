const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
        },
        customer: {
            firstName: {type: String},
            lastName: {type: String},


        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        address: {

        },

        total: {
            type: Number,
            required: true,
        },
        amountPaid: {
            type: Number,
        },

        status: {
            type: Number,
            default: 0,

        },
        items: {
            type: Array,
        },

        purchaseType: {
            type: String,
        },

        shippingMethod: {

        },



    },
    {timestamps: true }
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

