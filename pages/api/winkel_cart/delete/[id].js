import dbConnect from "../../../../lib/mongo";
import WinkelCart from "../../../../models/WinkelCart";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if(method === 'PUT'){

const {price, quantity, _id}= req.body
console.log(_id)
       try{
            const deleteWinkelCartItem = await WinkelCart.updateOne(
                    {_id: id},
                    {
                        $pull: {
                            items: { _id}
                        },
                        $inc: {total: -(price*quantity)},

                    },
                    {safe: true})

                res.status(200).json(deleteWinkelCartItem)
            }catch(err){
                res.status(500).json(err);
            }
        }

    if(method === 'DELETE'){

        try{
          const deleteWinkelCart =  await WinkelCart.findByIdAndDelete(id)
            //res.status(200).json("WinkelCart has been deleted...")
            res.status(200).json(deleteWinkelCart)
        }catch(err){
            res.status(500).json(err)
        }
    }

}
