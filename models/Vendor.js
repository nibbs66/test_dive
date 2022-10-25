const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({

            vendor: {type: String},
            img: {type: String},
            link: {type: String},



    },
    {timestamps: true }
);
module.exports = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
