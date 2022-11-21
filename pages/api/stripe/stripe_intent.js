import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,  {
    apiVersion: '2020-08-27',
});

export default async function handler(req,res){
    const{method} = req;
    const {amount, payment_intent_id, items} = req.body;

    if(payment_intent_id){
        try{
            const current_intent = await stripe.paymentIntents.retrieve(
                payment_intent_id,



            )
            if(current_intent){

                const updated_intent = await stripe.paymentIntents.update(
                    payment_intent_id,
                    {
                        amount: amount,
                    },

                );
                res.status(200).json(updated_intent);
                return;
            }
        }catch(e){
            if (e.code !== 'resource_missing') {
                const errorMessage =
                    e instanceof Error ? e.message : 'Internal server error';
                res.status(500).json({ statusCode: 500, message: errorMessage });
                return;
            }
        }
    }


    try{
        const calculateOrderAmount = (items) => {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the Client
            return 1400;
        };

        const payment_intent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            description: 'Payment description',
            /*automatic_payment_methods: {
                enabled: true,
            },*/
            payment_method_types: ['ideal', 'card'],
        });
        //Return the payment_intent object
        res.status(200).json(payment_intent);

    }catch(err){
        const errorMessage =
            err instanceof Error ? err.message : 'Internal server error';
        res.status(500).json({  statusCode: 500, lastmessage: errorMessage });
    }


}
