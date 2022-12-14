import {useEffect, useState} from 'react';
import Admin from "../../../components/layout/Admin";
import AccordionLayout from "../../../components/Accordion/AccordionLayout";
import TableDisplay from "../../../components/Table/TableDisplay";
import {userOrderColumns} from "../../../tableData";

import axios from "axios";
import dayjs from "dayjs";


const Order = ({order}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isChecked, setIsChecked] = useState('Received')
    const [statusColor, setStatusColor] = useState('')
    const [winkelStatus, setWinkelStatus] = useState('Ready-Ship')
    const [data, setData] = useState([]);

    console.log(order)
    const status = [
        {key: 0, name: 'Received'},
        {key: 1, name: winkelStatus},
        {key: 2, name: 'Shipped'},
        {key: 3, name: 'Delivered'},
        {key: 4, name: 'Cancelled'}
    ]

    useEffect(()=>{
        setData([])
        order.items.map(async (option) => {
            try {
                let stockValue;
                const res = await axios.get(`/api/products/${option.productId}`);
                console.log(res.data)
                res.data.productSubType.map((value)=>{
                    if(option.subTypeId === value._id){
                        stockValue = value.stock
                    }
                })
                setData((prev) => [...prev, {
                    id: option.productId,

                    productId: <span>{option.productId.slice(0, 5)}...</span>,
                    name: option.name,
                    quantity: option.quantity,
                    available: stockValue,
                    price: <span>€{option?.price?.toFixed(2)}</span>,



                }])

            } catch (err) {
                console.log(err)
            }
        })
        let newStatus;
        let text;
        if(order.status === 0){
            newStatus = 'Received'
            text = 'text-blue-700'

        }
        if(order.status === 1){
            if(order.shippingMethod?.method === 'Winkel'){
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
            newStatus = 'Cancelled'
            text = 'text-red-700'
        }
        setIsChecked(newStatus)

        setStatusColor(text)
    },[order])
    const handleStatus = async(e, update) => {
        if(update.key === 3){
            try{
                const res = await axios.post(`/api/sales`,
                    {
                        name: order.customer ? order.customer.firstName + ' ' + order.customer.lastName : order.name,
                        email: order.email,
                        phone: order.phone,
                        userId: order.userId,
                        items: order.items,
                        purchaseType: order.purchaseType,
                        orderDate: order.createdAt,
                        total: order.total,
                        amountPaid: order.total
                    })
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        try{
            const res = await axios.put("/api/orders/"+order._id, {status: update.key});
            let newStatus;
            let text;

            if(res.data.status === 0){
                newStatus = 'Received'
                text = 'text-blue-700'

            }
            if(res.data.status === 1){
                if(order.shippingMethod?.method === 'Winkel'){
                    newStatus = 'Ready'
                    setWinkelStatus('Ready')

                }else{
                    newStatus = 'Ready-Ship'
                }
                text = 'text-orange-500'
            }
            if(res.data.status === 2){
                newStatus = 'Shipped'
                text = 'text-green-700'
            }
            if(res.data.status === 3){
                newStatus = 'Delivered'
                text='text-slate-700'
            }
            if(res.data.status === 4){
                newStatus = 'Cancelled'
                text = 'text-red-700'
            }
            setStatusColor(text)
            setIsChecked(newStatus)

        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className={`flex flex-col gap-5 pt-5`}>
            <AccordionLayout
                title={`Customer Information`}
                bg={`${activeIndex === 0 ? 'bg-blue-600': 'bg-blue-500'}`}
                text={'text-white'}
                mx={'mx-10'}
                bodyMargin={'mx-10'}
                index={0}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <div className={`w-full flex flex-col`}>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 px-5 mt-3  overflow-y-auto h-full w-full pb-10">
                        <div className='flex flex-col  gap-1 text-slate-400 text-sm'>
                            <div className='flex gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <span className='uppercase  font-bold'>Customer:</span>
                                    {order.purchaseType==='Web-shop' && <span className='uppercase  font-bold'>Address:</span>}
                                    {order.purchaseType==='Web-shop' && <span className='uppercase  font-bold'>City/Postal Code:</span>}

                                    {order.purchaseType==='Web-shop' && <span className='uppercase  font-bold'>Country:</span>}
                                    <span className='uppercase  font-bold'>email:</span>
                                    <span className='uppercase  font-bold'>phone:</span>

                                </div>
                                <div className='flex flex-col gap-2'>
                                    {order.purchaseType==='Web-shop' ? <span>{order.customer.firstName + ' ' + order.customer.lastName}</span>
                                        : <span>{order.name}</span>
                                    }
                                    {order.purchaseType==='Web-shop' && <span>{order.address.address}</span>}
                                    {order.purchaseType==='Web-shop' && <span>{order.address.city},{' '}{order.address.postalCode}</span>}
                                    {order.purchaseType==='Web-shop' && <span>{order.address.country}</span>}
                                    <span>{order.email}</span>
                                    <span>{order.phone}</span>

                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col ml-5 gap-1 text-slate-400 text-sm'>
                            <div className='flex gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <span className='uppercase  font-bold'>Total:</span>
                                    <span className='uppercase  font-bold'>Balance:</span>
                                    <span className='uppercase  font-bold'>Source:</span>
                                    <span className='uppercase  font-bold'>Shipping:</span>
                                    <span className='uppercase  font-bold'>Shipping Charge:</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span>€{order.total.toFixed(2)}</span>
                                    <span>€{(order.total-order.amountPaid).toFixed(2)}</span>
                                    <span>{order.purchaseType}</span>
                                    <span>{order.shippingMethod.method}</span>
                                    <span>€{order.shippingMethod?.price?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col ml-5 gap-1 text-slate-400 text-sm'>
                                <div className='flex gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <span className='uppercase  font-bold'>Order Date:</span>
                                        <span className='uppercase  font-bold'>Status:</span>
                                        <div className={`grid grid-cols-1`}>
                                            <span  className='uppercase  font-bold mb-2'>Update Status</span>
                                            {status.map((status)=>(
                                                <div className={`flex gap-2 uppercase`} key={status.key}>
                                                    <input
                                                        onChange={(e) => handleStatus(e, status)}
                                                        type="checkbox"
                                                        id={status.name}
                                                        name={status.name}
                                                        checked={isChecked === status.name}
                                                    />
                                                    <label htmlFor="">{status.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <span>{dayjs(order.createdAt).format('DD MMM YYYY')}</span>
                                        <span className={`${statusColor} uppercase font-bold`}>{isChecked}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {order.total - order.amountPaid > 0 && <div className={`flex justify-center`}>
                        <button
                            className={`bg-green-600 hover:bg-green-500 px-3 py-2 text-white font-semibold uppercase leading-none rounded`}>Send
                            Invoice
                        </button>
                    </div>}
                </div>
            </AccordionLayout>
            <AccordionLayout
                title={`Order Details`}
                bg={`${activeIndex === 1 ? 'bg-blue-600': 'bg-blue-500'}`}
                text={'text-white'}
                mx={'mx-10'}
                bodyMargin={'mx-10'}
                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <TableDisplay tableTitle={true} title={'order detail'} font={'text-slate-500'} textSize={'text-3xl'}
                              rows={data} columns={userOrderColumns}
                              PageSize={5}/>
            </AccordionLayout>

        </div>
    );
};

export default Order;
Order.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export const getServerSideProps = async (ctx) =>{
    const host = ctx.req.headers.host;

    const res = await axios.get(`https://`+host+`/api/orders/${ctx.params.id}`);

    return{
        props:{
            order: res.data,

        }
    }
}
