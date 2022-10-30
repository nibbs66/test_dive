import {useEffect, useState} from 'react';
import Client from "../../components/layout/Client";
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import {ScubaPackage, ScubaItem, DashboardUsers} from "../../tableData";
import TableDisplay from "../../components/Table/TableDisplay";
import ClientHeader from "../../components/ClientHeader";
import ScheduleModal from "../../components/ScheduleModal";
import axios from "axios";
import TableActions from "../../components/Table/TableActions";

const Index = ({rentals}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([])
    const [packageData, setPackageData] = useState([])
    const [mobileData, setMobileData] = useState([])
    const [mobilePackageData, setMobilePackageData] = useState([])

    useEffect(()=>{
        setData([])
        setPackageData([])
        rentals.map((rental, idx)=>{
            if(rental.category !== undefined){
                setData( (prev)=>[...prev, {
                    id: rental._id,
                    category: rental.category,
                    item: <div className={`flex flex-col gap-1`}>
                        <span className={`font-bold uppercase text-slate-400`}>{rental.name}</span>
                        <span  className={`text-slate-500`}>{rental.desc}</span>
                    </div>,
                    halfDay: <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.halfDayPrice}</span>,
                    fullDay: <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.fullDayPrice}</span>,
                    reserve: <button onClick={()=>setShowModal(true)} className={`bg-red-500 px-2 py-1 rounded text-white uppercase font-semibold  text-xs md:text-base`}>Reserve</button>
                }])
            }else{
                setPackageData( (prev)=>[...prev, {
                    id: rental._id,
                    category: rental.category,
                    package: <div className={`flex flex-col gap-1`}>
                        <span className={`font-bold uppercase text-slate-400`}>{rental.name}</span>
                        <span  className={`text-slate-500`}>{rental.desc}</span>
                    </div>,
                    dag: <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.halfDayPrice}</span>,
                    weekend: <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.fullDayPrice}</span>,
                    reserve: <button onClick={()=>setShowModal(true)} className={`bg-red-500 px-2 py-1 rounded text-white uppercase font-semibold  text-xs md:text-base`}>Reserve</button>
                }])
            }

        })
    },[rentals])
    useEffect(()=>{
        setMobileData([])
        setMobilePackageData([])
        rentals.map((rental, idx)=>{
            if(rental.category !== 'Packages'){
                setMobileData( (prev)=>[...prev, {
                    id: rental._id,
                    category: rental.category,
                    items: [
                        <div className={`flex flex-col gap-1`}>
                            <span className={`font-bold uppercase text-slate-400`}>{rental.name}</span>
                            <span  className={`text-slate-500`}>{rental.desc}</span>
                        </div>,
                        <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.halfDayPrice}</span>,
                        <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.fullDayPrice}</span>,
                        <button onClick={()=>setShowModal(true)} className={`bg-red-500 px-2 py-1 rounded text-white uppercase font-semibold  text-xs md:text-base`}>Reserve</button>

                    ]
                }])
            }else{
                setMobilePackageData( (prev)=>[...prev, {
                    id: rental._id,
                    category: rental.category,
                    items: [
                        <div className={`flex flex-col gap-1`}>
                            <span className={`font-bold uppercase text-slate-400`}>{rental.name}</span>
                            <span  className={`text-slate-500`}>{rental.desc}</span>
                        </div>,
                        <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.halfDayPrice}</span>,
                        <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€{rental.fullDayPrice}</span>,
                        <button onClick={()=>setShowModal(true)} className={`bg-red-500 px-2 py-1 rounded text-white uppercase font-semibold  text-xs md:text-base`}>Reserve</button>

                    ]
                }])
            }

        })
    },[rentals])

    console.log(data)

    return (
        <div className={`min-h-screen w-screen`}>
            <ScheduleModal showModal={showModal} setShowModal={setShowModal} subject={'Tehuur'} regarding={'Duiken Tank'}/>

            <div className={`flex flex-col gap-5 my-5 w-full px-5 md:px-10 items-center justify-center`}>
                <ClientHeader title={'Te Huur'} lastPage={'/'}/>

                <AccordionLayout
                    title={`Packages`}
                    bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                    text={'text-white'}
                    titleSize={`text-sm md:text-base`}
                    mx={'mx-10'}
                    width={`w-full`}
                    bodyMargin={'mx-10'}
                    index={0}
                    body={`justify-center`}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`hidden md:flex w-full`}>
                        <TableDisplay tableTitle={false} title={'package'} font={'text-slate-500'} textSize={'text-3xl'}
                                      rows={packageData} columns={ScubaPackage}
                                      PageSize={2} />
                    </div>
                    <div >
                        <div className={`md:hidden flex flex-col gap-1 px-5`}>
                            { mobilePackageData.map((item, idx)=>(
                                item.items.map((each, idx)=>(

                                    <span className={`text-sm  `} key={idx}>
                                           {each}
                                       </span>
                                ))

                            ))}
                        </div>
                    </div>
                </AccordionLayout>
                <AccordionLayout
                    title={`Items`}
                    bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                    text={'text-white'}
                    titleSize={`text-sm md:text-base`}
                    mx={'mx-10'}
                    width={`w-full`}
                    bodyMargin={'mx-10'}
                    index={1}
                    body={`justify-center`}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`hidden md:flex w-full`}>
                        <TableDisplay tableTitle={false} title={'package'} font={'text-slate-500'} textSize={'text-3xl'}
                                      rows={data} columns={ScubaItem}
                                      PageSize={5} />
                    </div>
                    <div >
                        <div className={`md:hidden flex flex-col gap-1 px-5`}>
                            { mobileData.map((item, idx)=>(
                                item.items.map((each, idx)=>(

                                    <span className={`text-sm  `} key={idx}>
                                           {each}
                                       </span>
                                ))

                            ))}
                        </div>
                    </div>
                </AccordionLayout>



            </div>
        </div>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
export async function getServerSideProps(ctx) {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/rentalProduct`);
    return {
        props: {
            rentals: res.data,


        },
    }
}
