import dbConnect from "../../../lib/mongo";
import User from "../../../models/User";
import argon2 from "argon2";
export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {

            const  user = await User.findById(id);


            const {password, ...others} = user._doc

            res.status(200).json(others)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "PUT") {
        const{password, username}=req.body

        if(password) {
            const newPassword = await argon2.hash(password)
            try {
                await User.findByIdAndUpdate(
                    id,
                    {
                        'password': newPassword,
                        new: true
                    }
                );
                res.status(200).json('Reset')
            } catch (err) {
                res.status(500).json(err);
            }
        }
        if(username) {

            try {
                await User.findByIdAndUpdate(
                    id,
                    {
                        'personal.username': username,
                        new: true
                    }
                );
                res.status(200).json('Reset')
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }
    if (method === "DELETE") {
        try {
            await User.findByIdAndDelete(id);
            res.status(200).json("User Deleted")
        } catch (err) {
            res.status(500).json(err);
        }

    }
}
