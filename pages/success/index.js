import {useEffect, useState} from 'react';
import Client from "../../components/layout/Client";
import { removeCookies } from 'cookies-next';
import useUser from "../api/hooks/useUser";
import axios from "axios";
import {useRouter} from "next/router";

import Loader from '../../components/icons/Loader';


const Index = () => {

    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const {user, cart, mutateCart, validateCart} = useUser()
    useEffect(()=>{


    },[])
    useEffect(() =>{
        const finalizeOrder = async() => {

            try{
                const res = await axios.post('/api/orders',
                    {
                        userId: cart?.userId,
                        customer: {
                            firstName:  user? user.firstName : cart?.guestInformation?.firstName,
                            lastName:  user? user.lastName : cart?.guestInformation.lastName
                        },
                        address: user? user.address : cart?.guestInformation?.address,
                        email:  user? user.personal.email : cart?.guestInformation?.email,
                        phone: user? user.personal.phone : cart?.guestInformation?.phone,
                        total: cart?.total,
                        amountPaid: cart?.amountPaid,
                        items: cart?.items,
                        purchaseType: cart.purchaseType,
                        shippingMethod: cart?.shipping
                    });
                cart.items.map(async(product)=>{
                    const inv = await axios.put(`/api/products/${product.productId}`,
                        {inventory: true, update: product.subTypeId, quantity: product.quantity})




                })
                if(res.status===201){
                    setSuccess(true)
                }
            }catch(err){
                console.log(err)
            }
            try{
                const remove = await axios.delete(`/api/cart/delete/${cart?._id}`)
            }catch(err){
                console.log(err)
            }
            mutateCart()
            removeCookies('visitor');
        }
        finalizeOrder()
    },[cart])


    return (
        <div className={`h-screen w-screen`}>
            {!success &&
                <div className={`flex flex-col gap-2 h-3/4 items-center text-sm sm:text-base justify-center uppercase font-bold text-slate-400`}>
                    <Loader/>
                </div>
            }
            {success &&   <div className={`flex flex-col gap-2 h-3/4 items-center text-sm sm:text-base justify-center uppercase font-bold text-slate-400`}>
                <span>BEDANKT VOOR JE BESTELLING!!</span>
                <span>U ONTVANGT BINNENKORT EEN BEVESTIGINGS-E-MAIL.</span>

            </div>}

        </div>

    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
