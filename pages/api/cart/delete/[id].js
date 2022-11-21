import dbConnect from "../../../../lib/mongo";
import Cart from "../../../../models/Cart";

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
            const deleteCartItem = await Cart.updateOne(
                {_id: id},
                {
                    $pull: {
                        items: { _id}
                    },
                    $inc: {total: -(price*quantity)},

                },
                {safe: true})

            res.status(200).json(deleteCartItem)
        }catch(err){
            res.status(500).json(err);
        }
    }

    if(method === 'DELETE'){

        try{
            const deleteCart =  await Cart.findByIdAndDelete(id)
            //res.status(200).json("Cart has been deleted...")
            res.status(200).json(deleteCart)
        }catch(err){
            res.status(500).json(err)
        }
    }

}
