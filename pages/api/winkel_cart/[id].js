import dbConnect from "../../../lib/mongo";
import WinkelCart from "../../../models/WinkelCart";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            const cart = await WinkelCart.findById(id);

            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    if(method === 'PUT'){
        const{newQuant, productId, addToTotal, selected, shippingCost, amountPaid}=req.body
        console.log(amountPaid)
        if(!selected){
            try{
                await WinkelCart.findOneAndUpdate(
                    {_id: id},
                    {$set: {[`items.$[outer].quantity`]: newQuant}},
                    { "arrayFilters": [{ "outer.productId": productId}]}
                )
                const updatedWinkelCart = await WinkelCart.findOneAndUpdate(
                    {_id: id},
                    {$inc: {total: addToTotal},  new: true}
                )


                res.status(200).json(updatedWinkelCart)
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            try{
                const shippingUpdate = await WinkelCart.findOneAndUpdate(
                    {_id: id},
                    {$set: {shipping:
                                {
                                    method: selected,
                                    price: shippingCost
                                },
                            amountPaid: amountPaid,
                            new: true
                        }
                    },
                )
                res.status(200).json(shippingUpdate)
            }catch(err){
                res.status(500).json(err);
            }
        }


    }
}
