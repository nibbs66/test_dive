import {useState, useEffect} from 'react';

import Link from "next/link";

const VendorPageDisplay = ({children, product, editButton, deleteButton, submitButton}) => {


    return (
        <div className=' relative flex flex-col gap-5 justify-start h-full  w-full mx-auto p-5   mt-16'>
            <div className={`absolute w-5/6 h-16 flex items-center justify-between shadow-2xl py-2.5 p-10 mx-20  items-center rounded-md bg-blue-500 -top-8 `}>
                {product && <h1
                    className=' uppercase text-3xl font-thin text-white tracking-widest'>{product.manufacturer}{' '}{product.name}</h1>}
                <div className='flex space-x-6 '>
                    {editButton && <Link href={`/admin/products/edit/${product._id}`} style={{textDecoration: "none"}} >
                        <button
                            className=' uppercase py-1 px-4 rounded font-bold text-sm text-white bg-blue-400'>Edit
                        </button>
                    </Link>}
                    {deleteButton && <button
                        className=' uppercase py-1 px-4 rounded font-bold text-sm bg-[#ef4444] text-white'>Delete
                    </button>}
                    {submitButton && <button

                        className=' uppercase py-1 px-4 rounded font-bold text-sm bg-green-500 text-white' type={`submit`}>Submit
                    </button>}

                </div>
            </div>
            {children}
        </div>
    );
};

export default VendorPageDisplay;
