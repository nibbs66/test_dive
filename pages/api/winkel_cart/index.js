import dbConnect from "../../../lib/mongo";
import WinkelCart from "../../../models/WinkelCart";
import User from "../../../models/User";

export default async function handler(req, res) {
    const {
        method,
        query: {cart},

    } = req;


    await dbConnect()

    if(method==="GET"){
        0
        try {
            let carts;
            if (cart) {

                carts = await WinkelCart.findOne(
                    {userId: cart}
                );
            }else {
                carts = await WinkelCart.find();
            }
            res.status(200).json(carts);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        const userId = req.body.userId
        try{
            const cart = await WinkelCart.create(req.body);
            if(!userId.includes('winkel')){
                await User.findByIdAndUpdate(userId,
                    {cart: cart._id})
            }
            res.status(201).json(cart)
        }catch(err){
            res.status(500).json(err);
        }
    }

    if(method === 'PUT'){
        const {items, addToTotal} = req.body

        try{
            const amendedWinkelCart =  await WinkelCart.findOneAndUpdate(
                {userId: cart},
                {
                    $push: {items: {productId: items.productId, quantity: items.quantity, color: items.color,
                            size: items.size, name: items.name, modelId: items.modelId, img: items.img, price: items.price}},
                    $inc: {total: addToTotal},
                    new: true
                }
            )
            res.status(200).json(amendedWinkelCart)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

