const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String, required: true
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

        items: {
            type: Array,
        },
        amountPaid: {
            type: Number,
        },
        orderDate: {
            type: Date,
        },

        purchaseType: {
            type: String,
        },




    },
    {timestamps: true }
)

export default mongoose.models.Sales || mongoose.model("Sales", SalesSchema);

