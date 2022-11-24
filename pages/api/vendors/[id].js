import dbConnect from "../../../lib/mongo";

import Vendor from "../../../models/Vendor";

export default async function handler(req, res) {
    const {
        method,
        query: {id},
        cookies
    } = req;



    await dbConnect()

    if(method==="GET"){

        try{




             const vendor = await Vendor.findById(id);


            res.status(200).json(vendor)
        }catch(err){
            res.status(500).json(err)
        }
    }
    if(method==="PUT"){

console.log(req.body)
     try{
        const   vendor = await Vendor.findByIdAndUpdate(id, req.body, {new: true});
             res.status(201).json(vendor)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method==="DELETE"){
        try{
            await Vendor.findByIdAndDelete(id);
            res.status(200).json("VendorPage Deleted")
        }catch(err){
            res.status(500).json(err);
        }
    }
}
