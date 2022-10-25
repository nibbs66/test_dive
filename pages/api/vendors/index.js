import dbConnect from "../../../lib/mongo";
import Vendor from "../../../models/Vendor";

export default async function handler(req, res) {

    const {
        method,
    } = req;
    await dbConnect()
    if(method==="GET"){

        try {

            const  vendors = await Vendor.find();

            res.status(200).json(vendors);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){


        try{
            const vendor = await Vendor.create(req.body);
            res.status(201).json(vendor)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT'){
        const vendor = req.body

        try{
            const updatedVendor = await Vendor.findOneAndUpdate(
                {userId: vendor},
                {$push: {items: {...vendor}}}
            )
            res.status(200).json(updatedVendor)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

