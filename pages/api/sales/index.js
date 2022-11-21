import dbConnect from "../../../lib/mongo";
import Sales from "../../../models/Sales";


const handler = async(req,res) => {

    const {
        method,
        query: {id, prod},

    } = req;

    await dbConnect()




    /*else if(prod){

                        const search = await Sales.find({[`items.$[outer].productId`]: prod}).transform((order)=>{
                            console.log(search)


                        })

                    }*/



    if (method === "GET") {


        try {
            let sales;
            if(id){
                sales = await Sales.find({
                    userId: id
                });
            }else{
                sales = await Sales.find()
            }

            res.status(200).json(sales)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "POST") {

        try {
            const sale = await Sales.create(req.body)
            //await sendConfirmationEmail({toEmail: sale.email, toUser: sale.customer.firstName, id: sale._id, userRequest: 'sale'})
            res.status(201).json(sale)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    /*if (method === "PUT") {
        const items = req.body

        try {
            items.products.map(item=> {
                const newUpdate = TestProduct.findByIdAndUpdate({_id: item.productID}, {$inc: {stock: -item.quantity}, new: true})
                res.status(201).json(newUpdate)
            })
        } catch (err) {
            res.status(500).json(err.message)
        }

    }*/

}

export default handler;

