import dbConnect from "../../../lib/mongo";
import User from "../../../models/User";
import PendingUser from "../../../models/PendingUser";
import argon2 from "argon2";
import {sendConfirmationEmail} from '../../../lib/mailer'
export default async function handler(req, res) {
    const {
        method,
        query: {group},
    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            let actives;
            if (group) {
                actives = await User.find({
                    userType: {
                        $in: [group],
                    }
                });
            } else {
                actives = await User.find();
            }

            res.status(200).json(actives);
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if(method==="POST"){


        const{
            firstName,
            lastName,
            personal,
            password,
            experience,
            address,
            emergencyContact,
            employeeInfo,
            isEmployee,
            userType
        } =req.body;




        const newUser = new PendingUser({
            firstName,
            lastName,
            personal,
            password: await argon2.hash(password),
            experience,
            address,
            emergencyContact,
            employeeInfo,
            isEmployee,
            userType


        })
        try{

            const rUser = await User.findOne({'personal.username': personal.username.toLowerCase()})
            const pUser = await PendingUser.findOne({'personal.username': personal.username.toLowerCase()})

            if (pUser  || rUser ) { return res.status(422).send('Username is already taken. Username must be unique.  Please try again.');}
            const user = await PendingUser.create(newUser);
            await sendConfirmationEmail({toUser: user.firstName, toEmail: user.personal.email, id: user._id, userRequest: 'register'})
            res.status(201).json('Please check your email to activate account.')
        }catch(err){
            res.status(500).json(err);
        }
    }

}
//Annie@176
//test@test.com
