const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    desc: {
        type: String,
    },
    serviceType: {
    type: String,

},

services: {
    type: Array,

},

},
    {timestamps: true }
)

export default mongoose.models.Service ||
mongoose.model("Service", ServiceSchema);

