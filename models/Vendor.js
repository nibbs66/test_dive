const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({

        vendor: {type: String},
        img: {type: String},
        link: {type: String},
        address: {type: String},
        city: {type: String},
        postalCode: {type: String},
        country: {type: String},
        contact: {type: String},
        phone:{type: String},
        email: {type: String},




    },
    {timestamps: true }
);
module.exports = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
