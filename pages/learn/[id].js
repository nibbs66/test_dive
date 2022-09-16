import  {useState} from 'react';
import {useRouter} from "next/router";
import Client from "../../components/layout/Client";
import OpenImg1 from "../../public/img/Open Water/images/OW-Gallery-hero-1-TlujvLJ-.jpeg";
import OpenImg2 from "../../public/img/Open Water/images/OW-Gallery-hero-3-1ek2N6fk.jpeg";
import OpenImg3 from "../../public/img/Open Water/images/OW-Gallery-hero-4-q16OdRV_.jpeg";
import OpenImg4 from "../../public/img/Open Water/images/OW-Gallery-hero-5-25LTSMTH.jpeg";
import vid from "../../public/img/Open Water/mqdefault.jpeg"
import Image from "next/image";
import ClientHeader from "../../components/ClientHeader";
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import Table from "../../components/Table/Table";
import TableDisplay from "../../components/Table/TableDisplay";
import {Cursus} from "../../tableData";
import axios from "axios";

const Course = ({cursus}) => {
    const [index, setIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter()
    const {id} = router.query
const picRotation = [OpenImg1, OpenImg2, OpenImg3,OpenImg4]
    const courseSchedule = [

        {
            items: [   <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 sep 2022</span> ,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
        {
            items: [<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 oct 2022</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
        {
            items: [<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 nov 2022</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
        {
            items: [<span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Date:{' '}</span>1 dec 2022</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Cursus:{' '}</span>Open Water Diver</span>,
                <span className={`text-slate-500 text-sm`}><span className={`md:hidden uppercase`}>Prijs:{' '}</span>€299.00</span>,
                <button className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>Book Now</button>],

        },
    ]
    const handlePhoto = (idx) => {
        setIndex(idx)
    }
    console.log(cursus)
    return (
        <div className='flex flex-col w-screen min-h-fit m-auto mb-2 md:mb-auto  pt-1'>
           <div>
               <ClientHeader  title={cursus.cursus} lastPage={'/learn'}/>
           </div>
            <div className={'flex flex-col justify-center items-center md:items-start   md:gap-5 px-10 pt-5 '}>
                <div className={'flex flex-col sm:flex-row mt-5 gap-10 lg:gap-0'}>
                    <div className={'flex items-center md:w-3/4 flex-col gap-10 '}>
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
                    <div className={'flex md:w-1/3 md:pr-5 '}>
                        <p className={' md:text-lg text-base text-slate-400 '}>
                            {cursus.desc}

                        </p>
                    </div>

                </div>
                <div className={`mt-10 text-center text-slate-400 font-bold text-lg md:hidden`}>
                    <span className={`uppercase`}>Call</span><span> RnG Diving</span><span  className={`uppercase`}> today to start your undersea adventure!!</span>
                </div>

                    <AccordionLayout
                        title={`Wanneer start er een ${cursus.cursus}`}
                        bg={'bg-blue-500'}
                        text={'text-white'}
                        titleSize={`text-xs  md:text-base`}
                        mx={'mx-10'}
                        width={`w-full`}
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
                            {courseSchedule.map((item, idx)=>(
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
    console.log(ctx.params.id)
    const res = await axios.get(process.env.PUBLIC_URL + `/api/cursusDescription/${ctx.params.id}`);
    return {
        props: {
            cursus: res.data,


        },
    }
}
