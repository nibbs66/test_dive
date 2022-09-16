import dbConnect from "../../../lib/mongo";
import User from "../../../models/User";
const argon2 = require('argon2');
export default async function handler(req, res) {
    const {
        method,
        query: {user}
    } = req;


    await dbConnect()



    if(method==="GET"){
        try {
            let users;
            if (user) {

                users = await User.find({name: user})
                ;
            } else {
                users = await User.find();
            }
            res.status(200).json(users);
        }catch(err){
            res.status(500).json(err)
        }

    }

}
