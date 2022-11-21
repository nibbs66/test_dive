
import  {useState} from 'react';

import {TrashIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/outline'
const Quantity = ({ trash, quantity, item, handleQuantity, showX, locator, height, width, idx, id}) => {




    return (
        <div className="w-32 flex justify-center sm:gap-5 gap-2 " >
            {trash && quantity === 1 ? <span className="sm:px-1 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-red-500 text-white text-xs cursor-pointer uppercase">
                   {/*<Trash height={height} width={width} idx={idx} id={id}/>*/}
                <TrashIcon  className={`h-5 w-5`}/>
            </span> : showX && quantity === 1 ? <button disabled={true} className="sm:px-3 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-red-500 text-white font-bold text-xs sm:text-sm cursor-pointer uppercase">
                    X
            </button> : <button onClick={()=>handleQuantity(locator, item, 'dec')} className="sm:px-2 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-slate-200 hover:bg-slate-400 cursor-pointer">
                <MinusIcon className={`h-4 w-4 text-slate-600`}/>
            </button>
            }

            <span className="font-semibold border-2 sm:px-3 px-1.5 py-0.5 sm:py-1 sm:text-sm text-xs rounded-md">{quantity}</span>
            <button onClick={()=>handleQuantity(locator, item, 'inc')} className="sm:px-2 px-1.5 py-1 font-bold sm:py-1  rounded-md bg-slate-200 hover:bg-slate-400 cursor-pointer">
                <PlusIcon className={`h-4 w-4 text-slate-600`}/>
            </button>
        </div>
    );
};

export default Quantity;
