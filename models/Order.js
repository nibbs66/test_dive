const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        customer: {
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},


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

