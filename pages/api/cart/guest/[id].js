import dbConnect from "../../../../lib/mongo";
import Cart from "../../../../models/Cart";
import User from "../../../../models/User";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

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

    if(method === 'PUT'){
       const {
           firstName,
           lastName,
           phone,
           email,
           address,
           city,
           postalCode,
           country
       }=req.body
       try{
            const guestInfo = await Cart.findOneAndUpdate(
                {_id: id},
                {$set: {guestInformation:
                            {
                                firstName,
                                lastName,
                                phone,
                                email,
                                address,
                                city,
                                postalCode,
                                country
                            },
                        new: true
                    }
                },
            )
            res.status(200).json(guestInfo)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

