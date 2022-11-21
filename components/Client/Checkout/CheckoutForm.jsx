import { useEffect, useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import Loader from "../../icons/Loader";




const CheckoutForm = ({total, paymentIntent}) => {
    const [email, setEmail] = useState('chrismcnabb6691@ggmail.com')
    ;const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [stripeRes, setStripeRes] = useState({})
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {

        if (!stripe) {
            return;
        }

        //Grab the client secret from url params
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case 'succeeded':
                    setMessage('Payment succeeded!');
                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        });
        }, [stripe]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        setIsLoading();
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:3000/success`,
                receipt_email: email,
                shipping: {
                    address: { city: 'NY' },
                    name: 'Shipping user',
                },
                payment_method_data: {
                    billing_details: {
                        name: 'Billing user',
                    },
                },
            },

        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }


        setIsLoading();
    };


    return (
        <div className='flex items-center justify-center sm:mt-16 mt-5'>
            {isLoading ?   <Loader/> :
                <div className='  h-auto justify-center sm:h-full flex flex-col rounded-md drop-shadow-xl
                        md:rounded-xl md:drop-shadow-2xl  bg-white py-10 px-24 cursor-pointer'
            >

            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <div className={`flex justify-center`}>
                    <button className={`  bg-green-500 uppercase text-white py-1 px-2 rounded mt-5 font-bold text-lg`}
                            disabled={isLoading || !stripe || !elements}
                            id="submit">


                     Pay Now

                            </button>
                </div>


            </form>
            </div> }

        </div>
    );
};

export default CheckoutForm;
