
import React, {useState} from 'react';
import TrashCan from "./icons/TrashCan";
import Trash from "./Trash";
import {TrashIcon} from '@heroicons/react/24/outline'
const Quantity = ({ trash, quantity, item, handleQuantity, showX, locator, height, width, idx, id}) => {




    return (
        <div className="w-32 flex justify-center sm:gap-5 gap-2 " >
            {trash && quantity === 1 ? <span className="sm:px-1 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-red-500 text-white text-xs cursor-pointer uppercase">
                   {/*<Trash height={height} width={width} idx={idx} id={id}/>*/}
                <TrashIcon  className={`h-5 w-5`}/>
            </span> : <span onClick={()=>handleQuantity(locator, item, 'dec')} className="sm:px-3 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-gray-300 cursor-pointer">-</span>
            }

            <span className="font-semibold border-2 sm:px-3 px-1.5 py-0.5 sm:py-1 sm:text-sm text-xs rounded-md">{quantity}</span>
            <span onClick={()=>handleQuantity(locator, item, 'inc')} className="sm:px-3 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-gray-300 cursor-pointer">+</span>
        </div>
    );
};

export default Quantity;
