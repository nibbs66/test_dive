import {useState, useEffect} from 'react';

import Link from "next/link";
import Popover from "../../Tools/Popover";


const ProductPageDisplay = ({children, product, editButton, deleteButton, submitButton, handleSubmit, message, disabled}) => {


    return (
        <div className=' relative flex flex-col gap-5 justify-start h-full  w-full mx-auto p-5   mt-16'>
            <div className={`absolute w-5/6 h-16 flex items-center justify-between shadow-2xl py-2.5 p-10 mx-20  items-center rounded-md bg-slate-400 -top-8 `}>
                {product && <span
                    className=' uppercase text-3xl font-thin text-white tracking-widest'>{product.manufacturer}{' '}{product.name?.length > 20 ? product.name.slice(0, 20)+'...' : product.name}</span>}
                <div className=' relative flex space-x-6 '>
                    {editButton && <Link href={`/admin/products/edit/${product._id}`} style={{textDecoration: "none"}} >
                        <button
                            className=' uppercase py-1 px-4 rounded font-bold text-sm text-white bg-blue-500'>Edit
                        </button>
                    </Link>}
                    {deleteButton && <button
                        className=' uppercase py-1 px-4 rounded font-bold text-sm bg-[#ef4444] text-white'>Delete
                    </button>}
                    {submitButton &&
                        <div className='relative flex flex-col justify-center group'>
                            <button  onClick={handleSubmit}
                                    className={`disabled:cursor-not-allowed uppercase py-3 px-4 rounded font-bold disabled:bg-blue-200 text-sm bg-blue-500 hover:bg-blue-600 text-white leading-none`}
                                     type={`submit`}
                                     disabled={disabled}
                            >Submit
                            </button>
                            <Popover disabled={disabled} message={message}/>
                        </div>
                    }

                </div>
            </div>
            {children}
        </div>
    );
};

export default ProductPageDisplay;
