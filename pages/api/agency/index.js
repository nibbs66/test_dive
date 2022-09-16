import dbConnect from "../../../lib/mongo";
import Agency from "../../../models/Agency";
import clientPromise from '../../../lib/mongodb'
mongoose = require("mongoose")
export default async function handler(req, res) {
    const {
        method,
        query: {agency}
    } = req;


    await dbConnect()

    if(method==="GET"){
        try {
            let agencies;
            if (agency) {

                agencies = await Agency.find({name: agency})
                ;
            } else {
                agencies = await Agency.find();
            }
            res.status(200).json(agencies);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        try{
            const agency = await Agency.create(req.body);
            res.status(201).json(agency)
        }catch(err){
            res.status(500).json(err);
        }
    }
}
