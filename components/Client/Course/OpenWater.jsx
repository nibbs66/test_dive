import React, {useState} from 'react';
import CourseDisplay from "./CourseDisplay";
import AccordionLayout from "../../Accordion/AccordionLayout";
import TableDisplay from "../../Table/TableDisplay";
import {Cursus} from "../../../tableData";
import OpenImg1 from "../../public/img/Open Water/images/OW-Gallery-hero-1-TlujvLJ-.jpeg";
import OpenImg2 from "../../public/img/Open Water/images/OW-Gallery-hero-3-1ek2N6fk.jpeg";
import OpenImg3 from "../../public/img/Open Water/images/OW-Gallery-hero-4-q16OdRV_.jpeg";
import OpenImg4 from "../../public/img/Open Water/images/OW-Gallery-hero-5-25LTSMTH.jpeg";
import vid from "../../public/img/Open Water/mqdefault.jpeg"
import Image from "next/image";
const OpenWater = () => {
    const [index, setIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const picRotation = [OpenImg1, OpenImg2, OpenImg3,OpenImg4]
    return (
        <CourseDisplay>
            <div className={'flex mt-5'}>
                <div className={'flex items-center w-3/4 flex-col gap-10'}>
                    <Image  src={picRotation[index]} alt='' width={700} height={350} objectFit={'contain'}
                            className=" h-3/4 w-3/4 object-contain rounded-md cursor-pointer" />

                    <div className={'flex gap-5'}>
                        {picRotation.map((img, idx)=>(
                            <Image  key={idx} value={idx} src={img} alt="" height={100} width={100} objectFit="contain" className='cursor-pointer'
                                    onClick={()=>handlePhoto(idx)}/>
                        ))}
                    </div>
                </div>
                <div className={'flex w-1/3 pr-5'}>
                    <p className={' text-lg text-slate-400'}>
                        A scuba diving certification, also known as an Open Water Diver certification, allows you
                        to dive anywhere in the world. Similar to driving a car, scuba diving requires specific
                        knowledge, skills and training. A PADI Open Water Diver certification allows you to seek
                        adventure anywhere where there’s water.


                    </p>
                </div>

            </div>
            <div className={'w-3/4 '}>
                <AccordionLayout
                    title={'Wanneer start er een Open Water Diver Cursus?'}
                    bg={'#3b81f6'}
                    index={0}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <TableDisplay tableTitle={false} rows={courseSchedule} columns={Cursus}
                                  PageSize={6} action={false} showButton={false}/>
                </AccordionLayout>
            </div>

        </CourseDisplay>
    );
};

export default OpenWater;
