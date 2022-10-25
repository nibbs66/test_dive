import React from 'react';
import NewCard from "../Card/NewCard";
import Image from 'next/image'
const MainReturn = ({vendors, categories, main, handleClick}) => {
    return (
        <>
            {main === 'categories' && <div className="grid  lg:grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto h-3/4 w-full pb-10">
                   {categories.map((category) => (
                       <div key={category._id} onClick={() => handleClick(category.name, 'category')}>
                           <NewCard>
                               <div className=' md:flex justify-center'>
                                   <Image src={category.img} alt="" width={300} height={350} objectFit="contain"/>
                               </div>
                               <div
                                   className='px-5 flex flex-col items-center text-center sm:items-end sm:text-end gap-5'>

                                   <span
                                       className='uppercase text-slate-500 font-bold sm:text-slate-400 sm:text-lg'>{category.name}</span>


                                   <span
                                       className='hidden sm:flex sm:text-base sm:uppercase sm:font-bold sm:text-slate-500'>{category.desc}</span>

                               </div>
                           </NewCard>
                       </div>

                   ))}

               </div>}
            {main === 'vendor' && <div className="grid  lg:grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto h-3/4 w-full pb-10">
                {vendors.map((vendor) => (
                    <div key={vendor._id} onClick={() => handleClick(vendor.vendor, 'manufacturer')}>
                        <NewCard>
                            <div className=' md:flex justify-center'>
                                <Image src={vendor.img} alt="" width={300} height={350} objectFit="contain"/>
                            </div>
                            <div className='px-5 flex flex-col items-center text-center sm:items-end sm:text-end gap-5'>

                                <span
                                    className='uppercase text-slate-500 font-bold sm:text-slate-400 sm:text-lg'>{vendor.vendor}</span>


                            </div>
                        </NewCard>
                    </div>

                ))}

            </div>}

        </>
    );
};

export default MainReturn;
