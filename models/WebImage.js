const mongoose = require('mongoose');

const WebImageSchema = new mongoose.Schema({
        pic: {
            category: {type: String},
            img: {type: String},
            link: {type: String}
        },

    },
    {timestamps: true }
);
module.exports = mongoose.models.WebImage || mongoose.model('WebImage', WebImageSchema);
