import dbConnect from "../../../lib/mongo";
import Sales from "../../../models/Sales";

const handler = async(req,res) => {
    const {method, query:{id}} = req;
    await dbConnect()

    if(method==="GET"){
        try{
            const sale = await Sales.findById(id)
            res.status(200).json(sale)
        }catch(err){
            res.status(500).json(err)
        }
    }
    if(method==="PUT"){
        console.log(req.body)
        try{
            const sale = await Sales.findByIdAndUpdate(id, req.body,
                {new: true,}
            )
            res.status(201).json(sale)
        }catch(err){
            res.status(500).json(err)
        }
    }
    if(method==="DELETE"){
        try{
            await Sales.findByIdAndDelete(id)
            res.status(200).json("Sales Deleted")
        }catch(err){
            res.status(500).json(err)
        }
    }
}

export default handler;

