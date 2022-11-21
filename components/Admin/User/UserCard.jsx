import ArrowDown from "../../icons/ArrowDown";
import Money from "../../icons/Money"
import {useEffect, useState} from 'react'
import dayjs from "dayjs-with-plugins";
import CardDisplay from "../Card/CardDisplay";


const Card = ({data, title, bg, box, orderCat}) => {
    const [total, setTotal] = useState(0)
    const [currentMonthTotal, setCurrentMonthTotal] = useState(0)
    const [lastMonthTotal, setLastMonthTotal] = useState(0)
    const [saleChange, setSaleChange] = useState(0)

    const month = dayjs().month()-1
    const date = new Date();
    const testMonth = new Date(date.setMonth((date.getMonth() - 1)));;
    const today = dayjs().$d



    useEffect(()=>{
        let MTDOrders;
        if(orderCat === 'Web-shop'){
            MTDOrders = data.filter((sale) => dayjs(sale.createdAt).isBetween(dayjs().startOf('month'), dayjs())  && (sale.purchaseType === orderCat || sale.purchaseType === 'Winkel'))
        }else{
            MTDOrders = data.filter((sale) => dayjs(sale.createdAt).isBetween(dayjs().startOf('month'), dayjs())  && sale.purchaseType === orderCat)
        }

        const lastMonthOrders = data.filter((sale) => dayjs(sale.createdAt).isBetween(dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')) && sale.purchaseType === orderCat)

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

            <div  className='flex py-12 pr-5 justify-end'>
                <span className=' text-slate-600 text-2xl font-bold'>€{currentMonthTotal?.toFixed(2) || (0).toFixed(2)}</span>
            </div>
            <div className='border-t-2 mx-5'></div>
            <div className='flex pt-10 px-5 items-center justify-center gap-10'>
                <div className='flex items-center space-x-4'>
                    <span  className='uppercase font-bold text-slate-400 text-xs'>ytd sales</span>
                    <span  className='uppercase font-bold text-slate-400 text-xs'>€{lastMonthTotal.toFixed(2) || (0).toFixed(2)}</span>

                </div>

            </div>
        </CardDisplay>





    )
}

export default Card
