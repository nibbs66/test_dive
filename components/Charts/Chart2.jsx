
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {useState} from "react";
import useToggle from "../../hooks/useToggle";
import useSales from '../../hooks/useSales'
const initialValue = {id: 'WebShop', color: '#8884d8'};
import dayjs, {updateLocale} from "dayjs";

const Chart2 = ({winkel}) => {
    const [view, setView] = useState(initialValue);
    const [singleChart, setSingleChart] = useToggle()
    //const sales = useSales({})
//console.log(sales)

    const handleClick = (data) => {
        if (!singleChart) {
            setView({id: data.id, color: data.color})
            setSingleChart()
        } else {
            setView({id: data.id, color: data.color})
        }
    };

    const data = [
        { name: dayjs(dayjs().subtract(6, 'month')).format('MMMM'), WebShop: useSales({winkel: winkel, back: '6'}), Rentals: 3000, Cursus: 2200, Service: 1800},
        { name: dayjs(dayjs().subtract(5, 'month')).format('MMMM'), WebShop: useSales({winkel: winkel, back: '5'}), Rentals: 500, Cursus: 3000, Service: 2500},
        { name: dayjs(dayjs().subtract(4, 'month')).format('MMMM'), WebShop: useSales({winkel: winkel, back: '4'}), Rentals: 2400,Cursus: 300, Service: 600 },
        { name: dayjs(dayjs().subtract(3, 'month')).format('MMMM'), WebShop: useSales({winkel: winkel, back: '3'}), Rentals: 300, Cursus: 1300, Service: 2300},
        { name: dayjs(dayjs().subtract(2, 'month')).format('MMMM'), WebShop: useSales({winkel: winkel, back: '2'}), Rentals: 1200, Cursus: 500, Service: 1500},
        { name: dayjs(dayjs().subtract(1, 'month')).format('MMMM'), WebShop: useSales({winkel: winkel, back: '1'}), Rentals: 950, Cursus: 900, Service: 1100},
    ];


    return (
        <div className={`flex flex-col border shadow-xl mt-5 mx-10 text-slate-400 rounded bg-white px-2`}>
            <div className={` flex mb-5 gap-3 mt-2`}>
                <span className={`ml-2 uppercase font-semibold`}>Last 6 Months(Revenue)</span>
                <button className={`border cursor-pointer rounded text-white bg-[#8884d8]  px-1`}  onClick={()=>handleClick({id: 'WebShop', color: '#8884d8'})}>WebShop</button>
                <button className={`border cursor-pointer rounded text-white bg-[#1980b5]  px-1`} onClick={()=>handleClick({id: 'Rentals', color: '#82ca9d'})}>Rentals</button>
                <button className={`border cursor-pointer rounded text-white bg-[#2dc6d3]  px-1`} onClick={()=>handleClick({id: 'Cursus', color: '#2dc6d3'})}>Cursus</button>
                <button className={`border cursor-pointer rounded text-white bg-[#6e7b8f]  px-1`} onClick={()=>handleClick({id: 'Service', color: '#6e7b8f'})}>Service</button>
                <button className={`border cursor-pointer rounded text-white bg-red-500  px-1`} onClick={()=>(
                    setSingleChart(),
                        setView(initialValue)

                )}>Reset</button>

            </div>
            <ResponsiveContainer width="100%" aspect={4}>
                <AreaChart width={730} height={250} data={data}
                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                    <defs>
                        <linearGradient  id={view.id}   x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="5%" stopColor={view.color} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={view.color} stopOpacity={0}/>
                        </linearGradient>
                        { !singleChart && (<><linearGradient id="Rentals" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                            <linearGradient id="Cursus"   x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="5%" stopColor="#2dc6d3" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#2dc6d3" stopOpacity={0}/>

                            </linearGradient>
                            <linearGradient id="Service"   x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="5%" stopColor="#6e7b8f" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#6e7b8f" stopOpacity={0}/>

                            </linearGradient></>)
                        }

                    </defs>
                    <XAxis dataKey="name" stroke="lightslategray"/>

                    <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
                    <Tooltip />
                    <Area type="monotone" dataKey={view.id} stroke={view.color} fillOpacity={1}  fill={`url(#${view.id})`}/>
                    {!singleChart && <><Area type="monotone" dataKey="Rentals" stroke="#82ca9d" fillOpacity={1} fill="url(#Rentals)"/>
                        <Area type="monotone" dataKey="Cursus" stroke="#2dc6d3" fillOpacity={1} fill="url(#Cursus)" />
                        <Area type="monotone" dataKey="Service" stroke="#6e7b8f" fillOpacity={1} fill="url(#Service)" /></>}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart2;
