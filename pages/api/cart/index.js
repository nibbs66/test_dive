import dbConnect from "../../../lib/mongo";
import Cart from "../../../models/Cart";
import User from "../../../models/User";

export default async function handler(req, res) {
    const {
        method,
        query: {cart},

    } = req;


    await dbConnect()

    if(method==="GET"){

        try {
            let carts;
            if (cart) {

                carts = await Cart.findOne(
                    {userId: cart}
                );
            }else {
                carts = await Cart.find();
            }
            res.status(200).json(carts);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        const userId = req.body.userId
        try{
            const cart = await Cart.create(req.body);
            if(!userId.includes('guest')){
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
            const amendedCart =  await Cart.findOneAndUpdate(
                {userId: cart},
                {
                    $push: {items: {
                            productId: items.productId, quantity: items.quantity, color: items.color,
                            size: items.size, name: items.name, modelId: items.modelId,
                            img: items.img, price: items.price, vendor: items.vendor,
                            subTypeId: items.subTypeId,
                        }},
                    $inc: {total: addToTotal},
                    new: true
                }
            )
            res.status(200).json(amendedCart)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

