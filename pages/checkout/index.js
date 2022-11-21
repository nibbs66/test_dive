import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from 'react';
import Head from "next/head";
import {Elements} from "@stripe/react-stripe-js";
import Script from "next/script";

import axios from "axios";
import {useRouter} from "next/router";

import Client from "../../components/layout/Client";
import useUser from "../api/hooks/useUser";
import CheckoutForm from "../../components/Client/Checkout/CheckoutForm";
import ClientHeader from "../../components/Client/ClientHeader";
const stripe =  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const Checkout = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('')
    const [success, setSuccess] = useState(false)
    const {user,cart} = useUser()

    useEffect(() => {
        const newIntent = async() => {
            try {
                const res = await axios.post(`/api/stripe/stripe_intent`, {
                    headers: {'Content-Type': 'application/json'},
                    amount: Math.round((cart?.total + cart?.shipping?.price) * 100),
                    items: cart,
                    payment_intent_id: '',
                })

                setClientSecret( res.data.client_secret),
                    setPaymentIntent(res.data.id)

            } catch (err) {
                console.log(err)
            }
        }
        newIntent()
    },[cart]);

    const appearance = {
        theme: 'flat',
        labels: 'floating',
    };
    const options = {
        clientSecret,
        appearance,

    };

    return (
        <div className={`h-screen w-screen`}>
            <ClientHeader title={`Check Out`} lastPage={'/'}/>
            <Head>
                <title>checkout</title>
            </Head>
            <Script src="https://js.stripe.com/v3" async></Script>
            {!success &&<div>
                <div className={`flex justify-center`}>
                    {cart ? <span className={`pt-5 uppercase text-slate-400 font-bold text-xl`}>
                   Cart Total:  €{(cart?.total + cart?.shipping?.price).toFixed(2)}
                </span> :
                        <span>€0.00</span>
                    }
                </div>

                <div>
                    {clientSecret &&
                        <Elements key={clientSecret} options={options} stripe={stripe}>
                            <CheckoutForm  total={cart.total} paymentIntent={paymentIntent}/>
                        </Elements>
                    }
                </div>
            </div>}
        </div>
    );
};

export default Checkout;
Checkout.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
