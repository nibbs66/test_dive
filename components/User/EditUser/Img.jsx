import React from 'react';
import Upload from "../../icons/Upload";
import Image from "next/image";

const Img = () => {
    return (
        <div className="flex items-center justify-around w-full gap-5">
            <div className={`flex flex-col items-center gap-2`}>
                <button className={`bg-red-500 text-white uppercase py-1 px-2 rounded text-sm`}>Delete Img</button>
                <span className={`uppercase text-slate-400`}>-or-</span>
                <button  className={`bg-green-500 text-white uppercase py-1 px-2 rounded text-sm`}>Add Img</button>
            </div>
            <Image className={`object-cover rounded-full items-center`} src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt={''}
                   width={100} height={100} objectFit='cover'/>
            <div className={`flex gap-2 items-center uppercase text-sm text-slate-400 font-bold`}>

                <label htmlFor="">
                    Upload Image:
                </label>
                <Upload fill={`#94a2b8`}/>
            </div>

            <div   className={`flex `}>

            </div>
        </div>
    );
};

export default Img;
