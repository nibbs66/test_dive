import dbConnect from "../../../../lib/mongo";
import Order from "../../../../models/Order";
import dayjs from "dayjs";
import Product from "../../../../models/Product";
import {sendConfirmationEmail} from "../../../../lib/mailer";
import User from "../../../../models/User";
const handler = async(req,res) => {

    const {
        method,
        query: {id},

    } = req;

    await dbConnect()

    if (method === "GET") {


        try {

            const income = await Order.find()
            const lastMonthFilter =  income.filter(date=>dayjs(date.createdAt).$M<dayjs().month() && dayjs(date.createdAt).$M>=dayjs().month()-1)
            const currentMonthFilter = income.filter(date=>dayjs(date.createdAt).$M === dayjs().month())
            const lastMonthSum = lastMonthFilter.reduce((totals, amount)=>{
                return totals + amount.total;
            }, 0)
            const currentMonthSum = currentMonthFilter.reduce((totals, amount)=>{
                return totals + amount.total;
            }, 0)
            const monthTotals = [
                {
                    current: currentMonthSum
                },
                {
                    last: lastMonthSum
                }
            ]

            res.status(200).json(monthTotals)
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

