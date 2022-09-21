import dbConnect from "../../../lib/mongo";
import Messages from "../../../models/Messages";

export default async function handler(req, res) {
    const {
        method,
        query: {id},
        cookies
    } = req;

    const token = cookies.token;

    await dbConnect()

    if(method==="GET"){

        try{
            const message = await Messages.findById(id);
            res.status(200).json(message)
        }catch(err){
            res.status(500).json(err)
        }
    }
    if(method==="PUT"){

        try{
            const course = await Messages.create(req.body);
            res.status(201).json(course)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method==="DELETE"){

        try{
            await Messages.findByIdAndDelete(id);
            res.status(200).json("Cursus Deleted")
        }catch(err){
            res.status(500).json(err);
        }
    }
}
