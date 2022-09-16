import { useState, useEffect } from 'react';
import dayjs from "dayjs";

const useSales = ({winkel, back}) => {
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const previousMonth = back -1
        const  sorted =  winkel?.filter(date=>dayjs(date.createdAt).$M<dayjs().month()-previousMonth && dayjs(date.createdAt).$M>=dayjs().month()- back)
        const sum = sorted?.reduce((totals, amount)=>{
            return totals + amount.total;
        }, 0)
      setTotal(sum)
    },[winkel])

        return total?.toFixed(2)
};

export default useSales;
