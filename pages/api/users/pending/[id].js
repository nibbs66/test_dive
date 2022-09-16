import PendingUser from "../../../../models/PendingUser";
import dbConnect from "../../../../lib/mongo";
import User from "../../../../models/User";


export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if (method === "GET") {
        try {
            const user = await PendingUser.findById(id);
            if(!user){
                return res.status(422).send("User cannot be activated")
            }
            const {_id, ...others} = user._doc
            const newUser = await User.create(others);
            await PendingUser.findByIdAndDelete(id);
            res.status(200).json(newUser)
        } catch (err) {
            res.status(500).json(err)
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
