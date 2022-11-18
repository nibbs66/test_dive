
import {useEffect, useState} from 'react';
import diver from '../public/img/scuba.png'

import Image from "next/image";

const StatusBar = ({status, method}) => {
    console.log(status)
    const [winkelStatus, setWinkelStatus] = useState('Ready to Ship')
    const [isChecked, setIsChecked] = useState('Order Received')
    const [statusWidth, setStatusWidth] = useState('')


    useEffect(()=>{

        let newStatus;
        let width;
        if(status === 0){
            newStatus = 'Order Received'

            width = 'w-3/12'


        }
        if(status === 1){
            if(method === 'Winkel'){
                newStatus = 'Ready'
                setWinkelStatus('Ready')

            }else{
                newStatus = 'Ready-Ship'
            }
            width = 'w-1/2'
        }
        if(status === 2){
            newStatus = 'Shipped'
            width = 'w-3/4'
        }
        if(status === 3){
            newStatus = 'Delivered'
            width = 'w-full'
        }
        if(status === 4){
            newStatus = 'Order Cancelled'
            width = 'w-full'
        }
        setStatusWidth(width)
        setIsChecked(newStatus)

    },[status, method])
    const orderStatus = (status) => {

    }
    return (
        <div className={`relative hidden sm:flex w-10/12 rounded-full bg-[rgba(224,224,222,0.6)] h-4 mt-10  `}>
            <div className={`flex items-center h-full ${statusWidth} ${isChecked !== 'Order Cancelled' ? 'bg-blue-300' : 'bg-red-500'}  rounded-full justify-end `}>

                     <span className={`md:text-sm text-xs uppercase text-slate-500 whitespace-nowrap  font-bold px-2 py-5`}>
                    {isChecked}
                </span>

                <div >
                    <Image className={`absolute inset-0  hidden md:flex pr-5 overflow-visible `}  src={diver} alt='' height={60} width={80} objectFit='cover'/>

                </div>





            </div>

        </div>
    );
};

export default StatusBar;
