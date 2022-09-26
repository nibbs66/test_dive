import dbConnect from "../../../lib/mongo";
import Conversations from "../../../models/Conversatons"
import {sendEmail} from "../../../lib/messageCenter";

const handler = async(req,res) => {

    const {
        method,
        query: {messageGroup},

    } = req;

    await dbConnect()




    /*else if(prod){

                        const search = await Conversations.find({[`items.$[outer].productId`]: prod}).transform((order)=>{
                            console.log(search)


                        })

                    }*/



    if (method === "GET") {


        try {
            let messages;
            if(messageGroup){
                messages = await Conversations.find({
                    subject: messageGroup
                });
            }else{
                messages = await Conversations.find()
            }

            res.status(200).json(messages)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "POST") {
           const {response} = req.body
            const {
                _id,
                fullName,
                regarding,
                subject,
                email,
            } = req.body.messages
       try {
            const message = await Conversations.create({
            userId: _id,
            response
            })
            await sendEmail({toUser: fullName, toEmail:  email, regarding: subject, replyBody: response, messageResponse: 'inquiry'})
            res.status(201).json(message)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "PUT") {
        const items = req.body

        try {
            items.map(item=> {
                const newUpdate = Conversations.findByIdAndUpdate(5, {$inc: {stock: -item.quantity}, new: true})
                res.status(201).json(newUpdate)
            })
        } catch (err) {
            res.status(500).json(err.message)
        }

    }

}

export default handler;

