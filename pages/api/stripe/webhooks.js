import Stripe from 'stripe';
import {buffer} from 'micro';
import axios from 'axios'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,  {
    apiVersion: '2020-08-27',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req,res) {


    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        if (webhookSecret) {
            event = await stripe.webhooks.constructEvent(buf, sig, webhookSecret)
            const data = JSON.parse(buf);
            if(event === 'payment_intent.created'){
                const paymentIntent = event.data.object;

                res.status(200).json(paymentIntent)
            }else if(event ===  'payment_intent.succeeded,'){
                const paymentMethod = event.data.object;

                res.status(200).json(paymentMethod)

            }else{
                console.log(`Unhandled event type ${event.type}`);
            }


        }
    } catch (err) {

        return res.status(400).send(`Webhook error: ${err.message}`)
    }





    res.json({ received: true });
    res.send()

}


