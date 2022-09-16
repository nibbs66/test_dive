const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },

        items: {
            type: Array,

        },

    },
    {timestamps: true }
);
module.exports = mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);
