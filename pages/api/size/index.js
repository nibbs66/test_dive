import dbConnect from "../../../lib/mongo";
import Sizes from "../../../models/Sizes";
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

                ids = await Sizes.findOne(
                    {userId: id}
                );
            }else {
                ids = await Sizes.find();
            }
            res.status(200).json(ids);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        console.log(req.body)
        try{
            const reservation = await Sizes.create(req.body);

            res.status(201).json(reservation)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT') {
        const {save, remove} = req.body
        if (save) {
            try{
                const updatedSizes = await Sizes.findOneAndUpdate(
                    {userId: id},
                    {$push: {items: {...save}}}
                )
                res.status(200).json(updatedSizes)
            }catch(err){
                res.status(500).json(err);
            }
        }
        if (remove) {
            try {
                const deleteSizesItem = await Sizes.updateOne(
                    {userId: id},
                    {
                        $pull: {
                            items: {_id: remove}
                        }
                    },
                    {safe: true}
                )
                res.status(200).json(deleteSizesItem)
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }
}

