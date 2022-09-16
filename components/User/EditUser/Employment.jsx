import React from 'react';
import dayjs from "dayjs";
const Employment = ({user}) => {
    const handleChange = () => {

    }
    return (
        <div className={`flex w-full justify-evenly`}>


        <div className='flex flex-col ml-5 xl:ml-10 gap-1 text-gray-500 text-xs md:text-sm xl:text-base'>
            <div className='flex gap-10 '>
                <div className='flex flex-col gap-2'>
                    <span className='uppercase text-gray-500 font-bold'>position:</span>
                    <span className='uppercase text-gray-500 font-bold'>hire date:</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span>{user.employeeInfo.position}</span>
                    <span>{dayjs(user.employeeInfo.hireDate).format('DD MMM YYYY')}</span>
                </div>

            </div>

        </div>
            <div className='flex flex-col ml-5 xl:ml-10 gap-1 text-gray-500 text-xs md:text-sm xl:text-base justify-center'>
                <div className='flex gap-10 items-start'>
                    <div className='flex flex-col gap-2'>
                        <span className='uppercase text-gray-500 font-bold'>nieuw position:</span>
                        <span className='uppercase text-gray-500 font-bold'>start date:</span>
                        <span className='uppercase text-gray-500 font-bold'>leave date:</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4`}
                                placeholder={`instructor...`}
                               onChange={handleChange} type="text"/>
                        <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4`}
                               onChange={handleChange}  type="date"/>
                        <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4`}
                               onChange={handleChange}  type="date"/>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Employment;
