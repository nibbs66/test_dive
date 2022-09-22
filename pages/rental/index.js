import {useEffect, useState} from 'react';
import Client from "../../components/layout/Client";
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import {ScubaPackage, ScubaItem, DashboardUsers} from "../../tableData";
import TableDisplay from "../../components/Table/TableDisplay";
import ClientHeader from "../../components/ClientHeader";
import ScheduleModal from "../../components/ScheduleModal";
const Index = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const packageData = [{items:[
            <div className={`flex flex-col gap-1`}>
                <span className={`font-bold uppercase text-slate-400`}>Rental of Full Equipment Set (Day or Weekend)</span>
                <span  className={`text-slate-500`}>Includes a wetsuit, BCD, regulator, tank, weights, and a bag.</span>
            </div>,
            <span  className={`text-slate-500`}><span className={`md:hidden uppercase`}>Price:{' '}</span>€75.00</span>,
            <button onClick={()=>setShowModal(true)} className={`bg-red-500 px-2 py-1 rounded text-white uppercase font-semibold  text-xs md:text-base`}>Reserve</button>
        ]},
        {items:[
                <div className={`flex flex-col gap-1`}>
                    <span className={`font-bold uppercase text-slate-400`}>Personal Gear Rental Set (Day or Weekend)</span>
                    <span className={`text-slate-500`}>Includes a mask, snorkel, pair of boots, and fins.</span>
                </div>,
                <span  className={`text-slate-500`}> <span className={`md:hidden uppercase`}>Price:{' '}</span>€45.00</span>,
                <button onClick={()=>setShowModal(true)} className={`bg-red-500  px-2 py-1 rounded text-white uppercase font-semibold text-xs md:text-base`}>Reserve</button>
            ]}]


    return (
        <div className={`min-h-screen w-screen`}>
            <ScheduleModal showModal={showModal} setShowModal={setShowModal} subject={'Tehuur'} regarding={'Full Set'}/>

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
                       <TableDisplay tableTitle={false} title={'package'} font={'text-slate-500'} textSize={'text-3xl'} rows={packageData} columns={ScubaPackage}
                                     PageSize={2} />
                   </div>
                    <div >
                        <div className={`md:hidden flex flex-col gap-1 px-5`}>
                            {packageData.map((item, idx)=>(
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
