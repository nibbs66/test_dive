import dbConnect from "../../../lib/mongo";
import WebImage from "../../../models/WebImage";

export default async function handler(req, res) {

    const {
        method,
    } = req;
    await dbConnect()
    if(method==="GET"){

        try {

              const  images = await WebImage.find();

            res.status(200).json(images);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        try{
            const image = await WebImage.create(req.body);
            res.status(201).json(image)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT'){
        const items = req.body

        try{
            const updatedWebImage = await WebImage.findOneAndUpdate(
                {userId: image},
                {$push: {items: {...items}}}
            )
            res.status(200).json(updatedWebImage)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

