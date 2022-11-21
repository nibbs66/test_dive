import React from 'react';
import axios from "axios";
import Image from 'next/image'
import NoPic from "../../icons/NoPic";
const PosCard = ({idx, man, id, name, img, getProduct}) => {
    return (

            <div key={id} onClick={()=>getProduct(id)}
                 className="px-3 py-3 gap-2 flex flex-col border border-gray-200 rounded-md  items-center bg-white cursor-pointer">
                <div>
                    <div className={`font-bold text-slate-500 text-center`}>{man}</div>
                    <div className={`font-bold text-slate-400 text-center text-sm`}>{name}</div>

                </div>
                <div className="flex flex-row h-24  items-center">

                    {img?.length >0 ? <Image src={img[0]} height={70} width={70} objectFit={`contain`} alt=""/>
                        : <NoPic height={`h-20`} width={`w-20`}/>
                    }
                </div>
            </div>


    );
};

export default PosCard;
