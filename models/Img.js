const mongoose = require('mongoose');

const ImgSchema = new mongoose.Schema(
         {name: 'string'},
    {timestamps: true }
);
module.exports = mongoose.models.Img || mongoose.model('Img', ImgSchema);
