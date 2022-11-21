const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },

        items: {
            type: [
                {
                    productId: {type: String, required: true},
                    subTypeId: {type: String, required: true},
                    vendor: {type: String, required: true},
                    quantity: {type: Number, required: true},
                    color: {type: String},
                    size: {type: String},
                    name: {type: String},
                    price: {type: Number},
                    img: {type: String},
                    modelId: {type: String},
                    barcode: {type: String},
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
        guestInformation: {
            firstName: {type: String},
            lastName: {type: String},
            phone:{type: Number},
            email: {type: String},
            address: {type: String},
            city: {type: String},
            postalCode: {type: String},
            country: {type: String}

        },
        purchaseType: {
            type: String,
        },

    },
    {timestamps: true }
);
module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
