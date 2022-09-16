import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";

import Product from "../../../models/Product";
import {sendConfirmationEmail} from "../../../lib/mailer";
import User from "../../../models/User";
const handler = async(req,res) => {

    const {
        method,
        query: {id, prod},

    } = req;

    await dbConnect()




/*else if(prod){

                    const search = await Order.find({[`items.$[outer].productId`]: prod}).transform((order)=>{
                        console.log(search)


                    })

                }*/



        if (method === "GET") {


           try {
                let orders;
                if(id){
                    orders = await Order.find({
                        userId: id
                    });
                }else{
                     orders = await Order.find()
                }

                res.status(200).json(orders)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        if (method === "POST") {

            try {
                const order = await Order.create(req.body)
                await sendConfirmationEmail({toEmail: order.email, toUser: order.customer.firstName, id: order._id, userRequest: 'order'})
                res.status(201).json(order)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        if (method === "PUT") {
            const items = req.body

          try {
             items.products.map(item=> {
                  const newUpdate = Product.findByIdAndUpdate({_id: item.productID}, {$inc: {stock: -item.quantity}, new: true})
                 res.status(201).json(newUpdate)
                  })
            } catch (err) {
                res.status(500).json(err.message)
            }

        }

}

export default handler;

