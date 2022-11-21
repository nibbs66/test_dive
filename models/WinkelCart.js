const mongoose = require('mongoose');

const WinkelCartSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },

        items: {
            type: [
                {productId: {type: String, required: true},
                    quantity: {type: Number, required: true},
                    //color: {type: String},
                    //size: {type: String},
                    name: {type: String},
                    price: {type: Number},
                    img: {type: String},
                    modelId: {type: String},
                    subTypeId: {type: String},
                }
            ]
        },
        total: {
            type: Number,
        },
        amountPaid: {
            type: Number,
        },
        shipping: {
            method: {type: String},
            price: {type: Number}
        },
        name: {
            type: String
        },
        phone:{
            type: Number
        },
        email: {
            type: String
        },
        purchaseOption: {
            type: String
    },
        purchaseType: {
            type: String,
        },

    },
    {timestamps: true }
);
module.exports = mongoose.models.WinkelCart || mongoose.model('WinkelCart', WinkelCartSchema);
