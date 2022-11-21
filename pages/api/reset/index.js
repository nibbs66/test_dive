import dbConnect from "../../../lib/mongo";
import User from "../../../models/User";
import {sendConfirmationEmail} from "../../../lib/mailer";

export default async function handler(req, res) {
    const {
        method,

    } = req;
    await dbConnect()

    if(method === 'POST'){
        const {email, request} = req.body
        console.log(typeof(email))
        try{
            const user = await User.findOne({'personal.email': email})
            await sendConfirmationEmail({
                toUser: user.firstName,
                toEmail: user.personal.email,
                id: user._id,
                username: user.personal.username,
                userRequest: request})

            res.status(201).json('Please check your email to complete.')
        }catch(err){
            res.status(400).json('User not Found')
        }
    }

}


