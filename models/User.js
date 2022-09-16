const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        personal: {
            phone:{
                type: String
            },
            email: {
                type: String
            },
            dob: {
                type: String
            },
            username:{
                type: String,
                unique: true
            },
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        experience:{
            type: [
                {
                    diverNumber: {type: String},
                    certificationAgency: {type: String},
                    certificationLevel: {type: [String]},
                    date: {type: Date},
                    instructorNumber: {type: String}
                }
            ]
        },
        address: {
            address: {type: String},
            city: {type: String},
            postalCode: {type: String},
            country: {type: String}
        },
        emergencyContact:{
            firstName:{
                type: String
            },
            lastName: {
                type: String
            },
            phone:{
                type: Number
            },
            email: {
                type: String
            },
        },
        employeeInfo:{
            hireDate:{type: Date},
            position:{type: String}
        },
        cart: {
            type: String,

        },
        favorites: {
            type: String,

        },
        img: {
            type: String,
        },
        orders: {
            type: Array,
        },
        userType:{
            type: [String]
        },
        isAdmin: {
            type: Boolean,
            default: false },

        isEmployee: {
            type: Boolean,

        },

    },


    {timestamps: true }
)

export default mongoose.models.User ||
mongoose.model("User", UserSchema);

