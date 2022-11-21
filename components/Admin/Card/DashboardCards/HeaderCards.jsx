import {useState, useEffect} from 'react';
import CardDisplay from "../CardDisplay";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import {ChevronDoubleDownIcon, ChevronDoubleUpIcon} from "@heroicons/react/20/solid";
import dayjs from "dayjs-with-plugins";
const HeaderCards = ({data, title, bg, box, orders, orderCat, sales}) => {
    const [currentMonthTotal, setCurrentMonthTotal] = useState(0)
    const [lastMonthTotal, setLastMonthTotal] = useState(0)
    const [saleChange, setSaleChange] = useState(0)


//const MTDOrders = orders.filter((sale) => dayjs(sale.createdAt).isBetween(dayjs().startOf('month'), dayjs()))

    useEffect(()=>{

        const MTDOrders = sales.filter((sale) => dayjs(sale.createdAt).isBetween(dayjs().startOf('month'), dayjs())  && sale.purchaseType === orderCat)
        const lastMonthOrders = sales.filter((sale) => dayjs(sale.createdAt).isBetween(dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')) && sale.purchaseType === orderCat)

        const currentSum = MTDOrders?.reduce((totals, amount)=>{
            return totals + amount.total;
        }, 0)
        const lastSum = lastMonthOrders?.reduce((totals, amount)=>{
            return totals + amount.total;
        }, 0)

        setSaleChange(((currentSum/lastSum-1)*100).toFixed(1))
        setCurrentMonthTotal(currentSum)
        setLastMonthTotal(lastSum)
    },[data])

    return (


        <CardDisplay bg={bg} title={title} box={box}>
            <div className='flex pt-5 pr-5 justify-end'>
                {/*<span className='uppercase font-bold text-slate-400'>{title}</span>*/}
            </div>
            <div  className='flex py-10 pr-5 justify-end'>
                <span className=' text-slate-600 text-2xl font-bold'>€{currentMonthTotal?.toFixed(2) || (0).toFixed(2)}</span>
            </div>
            <div className='border-t-2 mx-5'></div>
            <div className='flex pt-10 px-5 items-center justify-center gap-10'>
                <div className='flex items-center gap-1'>
                    {saleChange >=1 ? <ChevronDoubleUpIcon className={`text-green-600 h-6 w-6`}/>
                        :
                        <ChevronDoubleDownIcon className={`text-red-600 h-6 w-6`}/>}
                    <span  className='uppercase font-bold text-slate-400 text-sm'>{saleChange !== 'NaN' ? saleChange : '-100'}%</span>
                </div>
                <span  className='uppercase font-bold text-slate-400 text-xs'>Since last month</span>
            </div>
        </CardDisplay>





    )
};

export default HeaderCards;
