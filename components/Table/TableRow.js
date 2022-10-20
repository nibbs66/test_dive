import {useState} from 'react';
import Link from "next/link";

const TableRow = ({data, columns, link}) => {
    const [statusText, setStatusText] = useState('')
    const orderStatus = (data) => {
        console.log(data)
    }

    const orderTheme = (data) => {
        if(data === 1){
            return 'text-orange-500'
        }
        if(data=== 2){

            return 'text-green-700'
        }
        if(data=== 3){

            return'text-slate-700'
        }
        if(data === 4){

            return 'text-red-700'
        }

    }




    return (

        <>
            {data?.map((item)=>(
                <tr key={data.id}>
                    {columns.map(({field})=> {
                        const tData = item[field]
                        {return (field === 'isNew' && tData === 'Ja') ?
                            <th key={field} className={` align-middle text-green-700 font-bold text-sm whitespace-nowrap px-2 py-3 `}>
                                {tData}
                            </th> : (field === 'isNew' && tData === 'Nee') ?
                                <th key={field} className={` align-middle text-red-700 font-bold text-sm whitespace-nowrap px-2 py-3 `}>
                                    {tData}
                                </th>
                                : (field === 'status') ?
                                    <th key={field} className={` align-middle ${tData === 0 ? 'text-blue-700'
                                        : tData === 1 ? 'text-orange-500'
                                            : tData === 2 ? 'text-green-700'
                                                : tData === 3 ? 'text-slate-700'
                                                    : 'text-red-700'} uppercase font-bold text-sm whitespace-nowrap px-2 py-3 `}>
                                        {tData === 0 ? 'Received'
                                            : tData === 1 ? 'Ready-Ship'
                                                : tData === 2 ? 'Shipped'
                                                    : tData === 3 ? 'Delivered'
                                                        : 'Cancelled'}
                                    </th> : (field === 'stock') ?
                                        <th key={field} className={` align-middle ${tData < 5 ? 'text-red-700' : 'text-green-500'}  text-sm whitespace-nowrap px-2 py-3 `}>
                                            {tData}
                                        </th>


                                        : <th key={field} className={` align-middle  font-light text-sm whitespace-nowrap px-2 py-3 `}>
                                            {tData}

                                        </th>

                        }

                    })}

                </tr>

            ))}
        </>

    );
};

export default TableRow;
