import dbConnect from "../../../lib/mongo";
import Time from "../../../models/Time";
import Cart from "../../../models/Cart";
import User from "../../../models/User";

export default async function handler(req, res) {
    const {
        method,
        query: {service},

    } = req;


    await dbConnect()

    if(method==="GET"){

        try {

            let services;
            if (service) {

                services = await Time.findOne(
                    {userId: service}
                );
            }else {
                services = await Time.find();
            }
            res.status(200).json(services);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

console.log(req.body)
        try{
            const reservation = await Time.create(req.body);

            res.status(201).json(reservation)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT') {
        const {save, remove} = req.body
        if (save) {
            try{
                const updatedTime = await Time.findOneAndUpdate(
                    {userId: service},
                    {$push: {items: {...save}}}
                )
                res.status(200).json(updatedTime)
            }catch(err){
                res.status(500).json(err);
            }
        }
        if (remove) {
            try {
                const deleteTimeItem = await Time.updateOne(
                    {userId: service},
                    {
                        $pull: {
                            items: {_id: remove}
                        }
                    },
                    {safe: true}
                )
                res.status(200).json(deleteTimeItem)
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }
}

