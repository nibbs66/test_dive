import dbConnect from "../../../lib/mongo";
import Messages from "../../../models/Messages";
import {sendConfirmationEmail} from "../../../lib/messageCenter";

const handler = async(req,res) => {

    const {
        method,
        query: {messageGroup},

    } = req;

    await dbConnect()




    /*else if(prod){

                        const search = await Messages.find({[`items.$[outer].productId`]: prod}).transform((order)=>{
                            console.log(search)


                        })

                    }*/



    if (method === "GET") {


        try {
            let messages;
            if(messageGroup){
                messages = await Messages.find({
                    subject: messageGroup
                });
            }else{
                messages = await Messages.find()
            }

            res.status(200).json(messages)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "POST") {

        try {
            const message = await Messages.create(req.body)

            res.status(201).json(message)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "PUT") {
        const items = req.body

        try {
            items.messages.map(item=> {
                const newUpdate = Messages.findByIdAndUpdate({_id: item.productID}, {$inc: {stock: -item.quantity}, new: true})
                res.status(201).json(newUpdate)
            })
        } catch (err) {
            res.status(500).json(err.message)
        }

    }

}

export default handler;

