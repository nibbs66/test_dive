import dbConnect from "../../../lib/mongo";
import Service from "../../../models/Service";
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

                services = await Service.findOne(
                    {userId: service}
                );
            }else {
                services = await Service.find();
            }
            res.status(200).json(services);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){


      try{
            const service = await Service.create(req.body);

            res.status(201).json(service)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT') {
        const {save, remove} = req.body
        if (save) {
            try{
                const updatedService = await Service.findOneAndUpdate(
                    {userId: service},
                    {$push: {items: {...save}}}
                )
                res.status(200).json(updatedService)
            }catch(err){
                res.status(500).json(err);
            }
        }
        if (remove) {
            try {
                const deleteServiceItem = await Service.updateOne(
                    {userId: service},
                    {
                        $pull: {
                            items: {_id: remove}
                        }
                    },
                    {safe: true}
                )
                res.status(200).json(deleteServiceItem)
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }
}

