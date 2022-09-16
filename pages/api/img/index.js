import dbConnect from "../../../lib/mongo";
import Img from "../../../models/Img";

export default async function handler(req, res) {

    const {
        method,
    } = req;
    await dbConnect()
    if(method==="GET"){

        try {

            const  images = await Img.find();

            res.status(200).json(images);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        try{
            const image = await Img.create(req.body);
            res.status(201).json(image)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT'){
        const items = req.body

        try{
            const updatedImg = await Img.findOneAndUpdate(
                {userId: image},
                {$push: {items: {...items}}}
            )
            res.status(200).json(updatedImg)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

