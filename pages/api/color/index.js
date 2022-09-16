import dbConnect from "../../../lib/mongo";
import Colors from "../../../models/Colors";
import Cart from "../../../models/Cart";
import User from "../../../models/User";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if(method==="GET"){

        try {

            let ids;
            if (id) {

                ids = await Colors.findOne(
                    {userId: id}
                );
            }else {
                ids = await Colors.find();
            }
            res.status(200).json(ids);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        console.log(req.body)
        try{
            const reservation = await Colors.create(req.body);

            res.status(201).json(reservation)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT') {
        const {save, remove} = req.body
        if (save) {
            try{
                const updatedColors = await Colors.findOneAndUpdate(
                    {userId: id},
                    {$push: {items: {...save}}}
                )
                res.status(200).json(updatedColors)
            }catch(err){
                res.status(500).json(err);
            }
        }
        if (remove) {
            try {
                const deleteColorsItem = await Colors.updateOne(
                    {userId: id},
                    {
                        $pull: {
                            items: {_id: remove}
                        }
                    },
                    {safe: true}
                )
                res.status(200).json(deleteColorsItem)
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }
}

