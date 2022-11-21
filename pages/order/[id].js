import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Client from "../../components/layout/Client";
import StatusBar from "../../components/Client/StatusBar";
import NoPic from "../../components/icons/NoPic";

const Order = ({order}) => {
    const [textColor, setTextColor] = useState('')
    const [isChecked, setIsChecked] = useState('Order Received')
    const [winkelStatus, setWinkelStatus] = useState('Ready to Ship')
    const router = useRouter()
    const {id} = router.query
    useEffect(()=>{
        let newStatus;
        let text;
        if(order.status === 0){
            newStatus = 'Order Received'

            text = 'text-blue-700'
        }
        if(order.status === 1){
            if(order.shippingMethod.method === 'Winkel'){
                newStatus = 'Ready'
                setWinkelStatus('Ready')

            }else{
                newStatus = 'Ready-Ship'
            }
            text = 'text-orange-500'
        }
        if(order.status === 2){
            newStatus = 'Shipped'
            text = 'text-green-700'
        }
        if(order.status === 3){
            newStatus = 'Delivered'
            text='text-slate-700'
        }
        if(order.status === 4){
            newStatus = 'Order Cancelled'
            text = 'text-red-700'
        }
        setTextColor(text)
        setIsChecked(newStatus)

    },[order])

    return (
        <div className={`min-h-screen`}>
            <div className={` flex flex-col items-center gap-5 mx-10  h-full`}>
            <span className={`mt-5 uppercase text-slate-400 sm:text-xl `}>
                Order Status: <span className={`${textColor} sm:hidden font-semibold`}>{isChecked}</span>
            </span>
                <StatusBar status={order.status} method={order.shippingMethod.method}/>

                <div className={`flex flex-col md:flex-row justify-evenly w-full mt-10`}>
                    <div className={`flex gap-5`}>

                        <div className='flex flex-col gap-5'>
                            {order.items.map((item)=>(
                                <div>
                                    <div key={item._id} className={`flex  md:grid md:grid-cols-2 gap-5 md:gap-3 h-full`}>
                                        <div>
                                            {item.img ?
                                                <Image src={`${item.img}`} alt='' height={100} width={100} objectFit='contain'/>
                                                :  <NoPic height={`h-24`} width={`h-24`}/>
                                            }
                                        </div>
                                        <div className='flex flex-col items-center text-sm '>
                                            <div className='flex gap-5'>
                                                <div className='flex flex-col uppercase font-bold gap-3 text-slate-400'>
                                                    <span>Name:</span>
                                                    <span>Id:</span>
                                                    <span>Quantity:</span>
                                                    {item.color &&   <span>color:</span>}
                                                    {item.size &&   <span>size:</span>}
                                                </div>
                                                <div className='flex flex-col gap-3 text-slate-600'>
                                                    <span>{item.name}</span>
                                                    <span>{item.modelId}</span>
                                                    <span>{item.quantity}</span>
                                                    {item.color && <span>{item.color}</span>}
                                                    {item.size && <span>{item.size}</span>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {order.items.length > 1 &&
                                        <div className={`border-b border-2 w-full mb-5`}></div>
                                    }

                                </div>

                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs  sm:text-sm mt-5 md:mt-0">
                            <div className='flex flex-col uppercase gap-3 text-slate-400 font-bold'>
                                <span>Order Number</span>
                                {order.shippingMethod.method !== 'Winkel' &&
                                    <>
                                        <span>Address</span>
                                        <span>City</span>
                                        <span>Postal Code</span>
                                        <span>Country</span>
                                    </>
                                }
                                {order.shippingMethod.method !== 'Winkel' ?<span>Carrier</span> : <span>Winkel</span>}
                                <span>Tracking Number</span>
                            </div>
                            <div className='flex flex-col  gap-3 items-end text-slate-600'>

                                <span>{id}</span>
                                {order.shippingMethod.method !== 'Winkel' &&
                                    <>
                                        <span>{order.address.address}</span>
                                        <span>{order.address.city}</span>
                                        <span>{order.address.postalCode}</span>
                                        <span>{order.address.country}</span>
                                    </>
                                }
                                <span>{order.shippingMethod.method}</span>
                                <span>{id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
    Order.getLayout = function getLayout(page){
        return(
            <Client>
                {page}
            </Client>
        )
    }
export const getServerSideProps = async ({params}) =>{

    //const res = await axios.get(process.env.PUBLIC_URL+`/api/orders/${params.id}`);
    const res = await axios.get(process.env.PUBLIC_URL+`/api/orders/${params.id}`);

    return{
        props:{
            order: res.data,



        }
    }
}
