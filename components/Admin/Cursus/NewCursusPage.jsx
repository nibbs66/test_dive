import React from 'react';
import CursusLayout from "./CursusLayout";
import AccordionLayout from "../../Accordion/AccordionLayout";
import {ArrowUpTrayIcon} from '@heroicons/react/24/outline'
import Image from "next/image";
const NewCursusPage = ({handleChange, activeIndex, setActiveIndex, file, setFile, handleClick, handleData}) => {
    return (
        <CursusLayout>
            <div className={`mt-10 `}>
            <AccordionLayout
                title={`Add Cursus`}
                bg={`${activeIndex === 1 ? 'bg-blue-600': 'bg-blue-500'}`}
                text={'text-white'}
                mx={'mx-16'}
                bodyMargin={'mx-10'}
                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <div className='flex  mt-5 mb-5 mx-10 w-full'>

                    <form className='w-full' action="submit">

                        <div className='flex w-full justify-between'>
                            <div className='w-2/5'>
                                <span className='uppercase text-2xl pl-2 pb-10 text-slate-500'>Cursus</span>
                                <div className='flex flex-col  mt-5'>
                                    <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Cursus</label>
                                    <input  className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `} type="text" name='cursus'
                                            onChange={handleChange}
                                    />
                                    <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Minimum Studenten</label>
                                    <input  className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `} type="number" name={'minStudents'}
                                            onChange={handleChange}
                                    />
                                    <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Maximum Studenten</label>
                                    <input  className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `} type="number" name={'maxStudents'}
                                            onChange={handleChange}
                                    />
                                    <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Days to Cutoff</label>
                                    <input  className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `} type="number" name={'cutOff'}
                                            onChange={handleChange}
                                    />
                                    <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Course Description</label>
                                    <textarea  className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `}  rows="5" type="text" name={'desc'}
                                               onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className=' flex flex-col  w-full'>
                                <span className='uppercase text-2xl pl-2 pb-10 text-slate-500 text-center'>Images</span>
                                <div className='flex flex-col  mt-5 gap-5'>
                                    <div className={`flex   justify-center`}>
                                        <Image className={`flex items-center h-14 w-14 rounded-full  z-50`} width={100} height={100} objectFit='contain'
                                               src={
                                                   file.length !== 0
                                                       ? URL.createObjectURL(file)

                                                       :  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                               }
                                               alt=""
                                        />
                                    </div>
                                    <div className={`flex items-center justify-center cursor-pointer pb-5 text-slate-500`}>
                                        <label className={`flex items-center gap-2 cursor-pointer`} htmlFor="file">
                                            Choose File:     <ArrowUpTrayIcon className={`h-5 w-5`}  />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile( e.target.files[0])}
                                            style={{ display: "none"}}
                                        />
                                    </div>
                                    <div className={`flex items-center justify-center`}>
                                        <span onClick={handleClick} className={`text-center bg-blue-500 text-white px-2 py-1 rounded w-1/4 cursor-pointer uppercase`}>Upload Img</span>
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div className='flex w-full justify-center mt-5'>
                            <button onClick={handleData} type={`submit`} className='uppercase font-bold px-3 py-1 bg-blue-500 text-white rounded'>Save Changes</button>
                        </div>
                    </form>
                </div>
            </AccordionLayout>
            </div>
        </CursusLayout>
    );
};

export default NewCursusPage;
