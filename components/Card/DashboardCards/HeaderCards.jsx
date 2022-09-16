import {useState, useEffect} from 'react';
import CardDisplay from "../CardDisplay";
import ArrowDown from "../../icons/ArrowDown";
import ArrowUp from "../../icons/ArrowUp";
import dayjs from "dayjs";
const HeaderCards = ({data, title, bg, box}) => {
    const [total, setTotal] = useState(0)

    const month = dayjs().month()-1
    const date = new Date();
    const testMonth = new Date(date.setMonth((date.getMonth() - 1)));;
    const today = dayjs().$d



    useEffect(()=>{
        const sorted =  data?.filter(date=>dayjs(date.createdAt).$M<dayjs().month() && dayjs(date.createdAt).$M>=dayjs().month()-1)
        const sum = sorted?.reduce((totals, amount)=>{
            return totals + amount.total;
        }, 0)
        setTotal(sum)
    },[data])

    return (


        <CardDisplay bg={bg} title={title} box={box}>
            <div className='flex pt-5 pr-5 justify-end'>
                {/*<span className='uppercase font-bold text-slate-400'>{title}</span>*/}
            </div>
            <div  className='flex py-10 pr-5 justify-end'>
                <span className=' text-slate-600 text-2xl font-bold'>€{total?.toFixed(2) || (0).toFixed(2)}</span>
            </div>
            <div className='border-t-2 mx-5'></div>
            <div className='flex pt-10 px-5 items-center justify-center gap-10'>
                <div className='flex items-center gap-1'>
                    <ArrowDown  color={'text-red-600'} height={`h-4`} width={`w-4`}  />
                    <span  className='uppercase font-bold text-slate-400 text-xs'>1.5%</span>
                </div>
                <span  className='uppercase font-bold text-slate-400 text-xs'>Since last month</span>
            </div>
        </CardDisplay>





    )
};

export default HeaderCards;
