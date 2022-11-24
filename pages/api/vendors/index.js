import dbConnect from "../../../lib/mongo";
import Vendor from "../../../models/Vendor";


export default async function handler(req, res) {

    const {
        method,
        query: {vendor},
    } = req;
    await dbConnect()

    if(method==="GET"){

        let selectVendor;
        try {
            if (vendor) {

                selectVendor = await Vendor.find({
                   _id: vendor
                });
            }else{
                selectVendor = await Vendor.find();
            }


            res.status(200).json(selectVendor);
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

        console.log('vendor', vendor)
        try{
            const updatedVendor = await Vendor.findByIdAndUpdate(
                vendor,
                     req.body,
                {new: true}
            )
            res.status(201).json(updatedVendor)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

