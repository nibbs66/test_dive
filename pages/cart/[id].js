import {useEffect, useState} from 'react';
import Client from "../../components/layout/Client";
import ClientHeader from "../../components/Client/ClientHeader";
import Image from "next/image";
import monkey from '../../public/img/494.jpg'
import TrashCan from "../../components/icons/TrashCan";
import {TrashIcon} from '@heroicons/react/24/outline'
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import Quantity from "../../components/Quantity";
import {useSession} from "next-auth/react";
import useUser from "../api/hooks/useUser";
import axios from "axios";
import {useRouter} from "next/router";
import GuestCartLogin from "../../components/credentials/GuestCartLogin";
import CartLogin from "../../components/credentials/CartLogin";
import Trash from "../../components/Trash";
import Link from "next/link";
const Cart = () => {

    const {cart,mutateCart,isValidating} = useUser()
    const {data: session,status}=useSession()
    const {query} = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [first, setFirst] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [selected, setSelected] = useState('')
    const [shippingCost, setShippingCost] = useState(0)
    const [couponCode, setCouponCode] = useState('')
    const [guestCheck, setGuestCheck] = useState(false)
    console.log(cart)
    const {id} = query

    useEffect(()=>{
        if(status === 'authenticated') {
            if (selected.length > 0) {
                setDisabled(false)
            }
        }
        if(status === 'unauthenticated'){
            if (selected.length > 0 && guestCheck) {
                setDisabled(false)
            }

        }
            },[status, selected, guestCheck])
    const handleQuantity = async(idx, item, dec) => {

        const {productId, price, quantity} = item
        let newQuant;
        const {id} = query
        if(dec==='inc'){
            newQuant = quantity + 1
        }
        if(dec==='dec'){
            newQuant = (Math.max(quantity - 1, 1))
        }
        console.log(newQuant)
        const difference = newQuant - quantity
      try{
            const res = await axios.put(`/api/cart/${id}`,
                {
                    newQuant,
                    id,
                    productId,
                    addToTotal: (price * difference),
                });
            console.log(res.data)
            mutateCart()
        }catch(err){
            console.log(err)
        }
        setFirst(newQuant)
    }
    const handleChange = (e) => {
        const{value}=e.target
        setSelected(value)
        if(cart?.total<70){
            setShippingCost(6.95)
        }
    };
    const handleUpdate = async() => {
        const {id}=query
        try{
            const res = await axios.put(`/api/cart/${id}`,
                {
                    selected,
                    shippingCost,
                });
            mutateCart()
        }catch(err){
            console.log(err)
        }

    }


    return (
        <div className='min-h-screen w-screen flex flex-col  gap-5'>
            <ClientHeader title={'WinkelWagen'} lastPage={'/'}/>
            <div className="flex gap-10 px-10 mt-10 flex-col xl:flex-row w-full">
                <div className={`${status ==="authenticated" ? 'hidden' : 'flex xl:flex-col gap-5 items-center xl:w-1/3 text-xs whitespace-nowrap w-full text-slate-400'}`}>
                   <div className={`w-1/2 xl:w-full`}>
                       <AccordionLayout
                           index={1}
                           activeIndex={activeIndex}
                           setActiveIndex={setActiveIndex}
                           title={'Guest Checkout'}
                           bg={'#3b81f6'}

                       >
                          <GuestCartLogin setGuestCheck={setGuestCheck} setActiveIndex={setActiveIndex}/>
                       </AccordionLayout>
                   </div>
                    <span className='text-slate-400 uppercase w-full text-center font-bold'>
                        -or-
                    </span>
                    <div className={`w-1/2 xl:w-full`}>
                    <AccordionLayout
                        index={2}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        title={'Login'}
                        bg={'#3b81f6'}

                    >
                        <CartLogin/>
                    </AccordionLayout>
                    </div>
                </div>
                <div className='min-h-fit  border border-slate-400'></div>
               <div className='flex flex-col gap-5 w-full'>

                   {cart && cart?.items?.map((item, idx)=>(
                       <div className={`flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-5`}key={idx} >
                          <div className={`hidden md:flex md:h-16 md:w-16  rounded-full object-contain overflow-hidden border-2 border-slate-200`}>
                              <Image src={item.img} alt='' height={100} width={100} objectFit='contain'/>
                          </div>
                         <div className={`flex gap-4`}>
                             <div className={`grid text-xs md:text-sm uppercase font-bold text-slate-400`}>
                                 <span>Name:</span>
                                 <span>Id:</span>
                                 {item.color && <span>color:</span>}
                                 {item.size &&  <span>size:</span>}
                             </div>
                             <div className={`grid text-xs md:text-sm text-slate-500 whitespace-nowrap`}>
                                 <span>{item.name}</span>
                                 <span>{item.modelId}</span>
                                 {item.color && <span>{item.color}</span>}
                                 {item.size && <span> {item.size}</span>}
                             </div>
                         </div>
                           <div  className='flex flex-col items-center gap-3'>
                               <span className='md:text-xl text-sm md:font-thin'>€{Number(item.price*(item.quantity)).toFixed(2)}</span>
                               <Quantity  trash={false} quantity={item.quantity} locator={idx} item={item} handleQuantity={handleQuantity}/>
                               <span

                                   className=" flex items-center justify-center h-6 w-6 text-sm rounded-md bg-red-500 text-white  cursor-pointer">
                                   {/*<Trash height={`h-5`} width={w-5} id={id} item={item} idx={idx}
                                           setSelected={setSelected}/>*/}
                                   <Trash height={`h-5`} width={`w-5`} id={id} item={item} idx={idx}
                                               setSelected={setSelected}/>
                                   {/*<TrashCan height={20} width={20}/>*/}
                               </span>
                           </div>

                       </div>

                   ))}
               </div>

                <div className='min-h-fit  border border-slate-400'>

                </div>
                <div className="flex flex-col gap-5  md:text-sm text-xs">
                   <div className="flex gap-10">
                       <div className='flex flex-col uppercase gap-3 text-slate-400'>
                           <span>Shipping/Winkel</span>
                           <span>Coupon Code</span>
                           <span>sub-total</span>
                       </div>
                       <div className='flex flex-col  gap-3 items-end'>
                           <div className='flex gap-2 text-slate-500'>
                              <div className={`flex gap-1 items-center`}>
                                  <input id='Winkel'
                                         type="radio"
                                         checked={selected === 'Winkel'}
                                         value='Winkel'
                                         onChange={handleChange}/>
                                  <label htmlFor="">Winkel</label>
                              </div>
                               <div className={`flex gap-1 items-center`}>
                                   <input  id='PostNL'
                                           type="radio"
                                           checked={selected === 'PostNL'}
                                           value='PostNL'
                                           onChange={handleChange}/>
                                   <label htmlFor="">PostNL</label>
                               </div>
                           </div>
                           <input className='border-2 pl-2 rounded text-slate-500' type="text" placeholder='Enter Code...'/>
                           {cart?.total > 0 ? <span className={`text-slate-500`}>€{cart?.total?.toFixed(2)}</span> :
                               <span className={`text-slate-500`}>€0.00</span>}
                       </div>
                   </div>
                    <div className='w-full items-center border-2 '></div>
                    <div className='flex uppercase md:text-lg text-gray-400'>
                        <div>
                            <span>Order Summary</span>
                        </div>

                    </div>
                    <div className="flex justify-between md:text-sm text-xs">
                        <div className='flex flex-col uppercase text-slate-400 gap-3'>
                            <span>sub-total</span>
                            <span>estimated shipping</span>
                            <span>discount</span>
                            <span>tax</span>
                            <span>coupon code</span>
                            <span>total:</span>
                        </div>
                        <div className='flex flex-col  gap-3 items-end text-slate-500'>

                            {cart?.total > 0 ? <span>€{(cart?.total/1.21).toFixed(2)}</span> :<span>€0.00</span>}
                            <span>€{shippingCost.toFixed(2)}</span>
                            <span>€0.00</span>
                            {cart?.total > 0 ? <span>€{(cart?.total-(cart?.total/1.21))?.toFixed(2)}</span> : <span></span>}
                            {couponCode ?  <span>{couponCode}</span> : <span>---</span>}
                            <span>€{cart && (cart?.total + shippingCost).toFixed(2) || 0.00.toFixed(2)}</span>
                        </div>
                    </div>
                    <Link href={`/checkout`} passHref>
                    <div className='flex justify-center'>
                        <button
                            onClick={handleUpdate}
                            className={`uppercase bg-blue-500 disabled:opacity-30 text-white px-3 py-2  rounded font-bold disabled:cursor-not-allowed`}
                                 disabled={disabled}
                        >
                            Complete Order
                        </button>
                    </div>
                    </Link>
                </div>


            </div>

        </div>
    );
};

export default Cart;
Cart.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
/*<div className="flex gap-16 ">
    <div className='flex flex-col uppercase gap-3'>
        <span>sub-total</span>
        <span>Estimated shipping</span>
        <span>discount</span>
        <span>tax</span>
        <span>coupon code</span>
        <span>total</span>

    </div>

</div>*/
