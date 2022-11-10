import React, {useEffect} from 'react';
import ModalCard from "./Modal/ModalCard";
import Image from "next/image";

import ArrowBack from "./icons/ArrowBack";
import {useRouter} from "next/router";
import Link from "next/link";
import { ChevronDoubleLeftIcon} from '@heroicons/react/24/outline'
import useUser from "../pages/api/hooks/useUser";

const OrderSummary = ({showModal, setShowModal, product, quantity, color, size, img}) => {
    const router = useRouter()
    const {cart, isValidating, mutate, mutateCart} = useUser()
    useEffect(()=>{
        mutateCart()
    },[cart])
    const handleClick = () => {

        setShowModal(false)
        router.push(`/cart/${cart._id}`)

    }
    return (
        <ModalCard showModal={showModal} setShowModal={setShowModal}>
            <div className={`container`}>

                <div className={`flex flex-col sm:flex-row gap-5 mb-4 `}>
                    <div className={`flex flex-col w-full`}>
                        <span className={`uppercase text-slate-400 font-bold text-sm sm:border-b sm:border-slate-700 pb-0.5`}>Added to Cart</span>
                        <div className={`mt-2 flex gap-2`}>
                            <div className={`hidden sm:flex`}>
                               <Image src={img} alt="" height={100} width={100} objectFit="contain"/>
                            </div>
                           <div className={`flex gap-1 items-start`}>
                               <div className={`flex flex-col uppercase text-slate-400 sm:text-sm text-xs gap-2 `}>
                                   <span>Name:</span>
                                   <span>Price:</span>
                                   { color && <span>Color:</span> }
                                   { size && <span>Size:</span> }
                                   <span>Quantity:</span>
                               </div>
                               <div className={`flex flex-col sm:text-sm text-xs text-slate-500 whitespace-nowrap font-semibold gap-2`}>
                                   <span>{product.name}</span>
                                   <span>€{product.price.toFixed(2)}</span>
                                   {color && <span>{color}</span>}
                                   {size && <span>{size}</span>}
                                   <span>{quantity}</span>
                               </div>

                           </div>

                        </div>
                    </div>
                    <div className={`hidden sm:flex border-l-4  border-slate-200`}></div>
                    <div className={`flex flex-col `}>
                        <div>
                            <span className={`uppercase text-slate-400 font-bold text-sm sm:border-b sm:border-slate-700  `}>Cart Total</span>
                        </div>
                        <div className={`flex mt-2 mb-10 gap-2`}>
                            <div className={`flex flex-col uppercase text-slate-400 text-sm gap-5`}>
                                <span>Items:</span>
                                <span>Total:</span>
                            </div>
                            <div className={`flex flex-col text-sm text-slate-500 font-semibold gap-5`}>
                              <span>{cart?.items?.length}</span>
                                <span> €{(cart?.total)?.toFixed(2)}</span>

                            </div>

                        </div>

                        <button onClick={handleClick}
                            className={`uppercase text-white text-sm bg-blue-500 rounded p-1 font-bold`}>Cart</button>
                    </div>
                </div>
                <Link href='/shop' passHref>
                <div className={`flex items-center gap-1 uppercase text-slate-400 cursor-pointer text-sm`}>
                    <ChevronDoubleLeftIcon  className={`w-4 h-4`}/>
                    <span>Continue Shopping</span>
                </div>
                </Link>
            </div>

        </ModalCard>
    );
};

export default OrderSummary;
