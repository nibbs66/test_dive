import  {useState} from 'react';
import {useRouter} from "next/router";
import Client from "../../components/layout/Client";
import OpenImg1 from "../../public/img/Open Water/images/OW-Gallery-hero-1-TlujvLJ-.jpeg";
import OpenImg2 from "../../public/img/Open Water/images/OW-Gallery-hero-3-1ek2N6fk.jpeg";
import OpenImg3 from "../../public/img/Open Water/images/OW-Gallery-hero-4-q16OdRV_.jpeg";
import OpenImg4 from "../../public/img/Open Water/images/OW-Gallery-hero-5-25LTSMTH.jpeg";
import vid from "../../public/img/Open Water/mqdefault.jpeg"
import Image from "next/image";
import ClientHeader from "../../components/Client/ClientHeader";
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import Table from "../../components/Table/Table";
import TableDisplay from "../../components/Table/TableDisplay";
import {Cursus} from "../../tableData";
import axios from "axios";
import ScheduleModal from "../../components/Client/ScheduleModal";


const Course = ({cursus}) => {
    const [index, setIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()
    const {id} = router.query
    const picRotation = [OpenImg1, OpenImg2, OpenImg3,OpenImg4]
    const courseSchedule2 = [

        {
            items: [<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 sep 2022</span> ,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
        {
            items: [<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 oct 2022</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button  onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
        {
            items: [<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 nov 2022</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
        {
            items: [<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 dec 2022</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
    ]
    const courseSchedule = [

        {

            date:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 sep 2022</span> ,
            course: <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
            price:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
            register:<button onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>,

        },
        {

            date:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 oct 2022</span>,
            course: <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
            price:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
            register:<button  onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>,

        },
        {

            date:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 nov 2022</span>,
            course: <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
            price:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
            register:<button onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>,

        },
        {

            date:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 dec 2022</span>,
            course: <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
            price:<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
            register:<button onClick={()=>setShowModal(true)} className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>,

        },
    ]
    const handlePhoto = (idx) => {
        setIndex(idx)
    }
    console.log(cursus)
    return (
        <div >
            <ScheduleModal setShowModal={setShowModal} showModal={showModal} subject={'cursus'} regarding={cursus.cursus}/>
            <ClientHeader  title={cursus.cursus} lastPage={'/learn'}/>
            <div className={`flex justify-center gap-x-8 py-10 `}>
                <div className={`flex flex-col items-center`}>
                    <Image  src={cursus.img[index]} alt='' width={700} height={350} objectFit={'contain'}
                            className=" h-3/4 w-3/4 object-contain rounded-md cursor-pointer" />
                    <div className={'flex gap-5'}>
                        {cursus.img.map((img, idx)=>(
                            <Image  key={idx} value={idx} src={img} alt="" height={100} width={100} objectFit="contain" className='cursor-pointer'
                                    onClick={()=>handlePhoto(idx)}/>
                        ))}
                        <Image src={vid} alt="" height={100} width={100} objectFit="contain" className='cursor-pointer'
                        />
                    </div>
                </div>
                <div  className={'flex md:w-1/3  '}>
                    <p className={' md:text-lg text-base text-slate-400 '}>
                        {cursus.desc}
                    </p>
                </div>
            </div>
            <div className={`flex items-center  px-16 mb-10`}>
                <AccordionLayout
                    title={`Wanneer start er een ${cursus.cursus}`}
                    bg={'bg-blue-500'}
                    text={'text-white'}
                    titleSize={`text-xs  md:text-base`}
                    mx={'mx-10'}
                    width={`w-screen`}
                    bodyMargin={'mx-10'}
                    index={0}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <div className={`hidden md:flex w-full`}>
                        <TableDisplay tableTitle={true} title={'Upcoming Classe'} rows={courseSchedule} columns={Cursus} font={'text-slate-500'} textSize={'lg:text-2xl'}
                                      PageSize={6} action={false} showButton={false}/>
                    </div>
                    <div className={`md:hidden flex justify-center flex-col gap-1 px-5 `}>
                        {courseSchedule2.map((item, idx)=>(
                            item.items.map((each, idx)=>(
                                (idx + 1 < item.items.length) ?

                                    <div >
                                             <span  className={`text-sm `} key={idx}>
                                           {each}
                                       </span>
                                    </div> :



                                    <span className={`text-xs`}>
                                            {each}
                                        </span>
                            ))

                        ))}
                    </div>
                </AccordionLayout>

            </div>
        </div>
    );
};

export default Course;
    Course.getLayout = function getLayout(page){
        return(
            <Client>
                {page}
            </Client>
        )
    }
export async function getServerSideProps(ctx) {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+ `/api/cursusDescription/${ctx.params.id}`);
    return {
        props: {
            cursus: res.data,


        },
    }
}
