import React from 'react';
import Image from "next/image";
import {ArrowUpTrayIcon} from '@heroicons/react/24/outline'
const UploadImg = ({setFile, setUpload, upload, handleClick, file}) => {
    return (

        <div className="flex items-center  justify-center w-full gap-10">
            <div className={`shrink-0`}>
                <Image
                    className={`object-cover rounded-full items-center`}
                    src={ file.length !== 0
                        ? URL.createObjectURL(file)

                        :  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                    alt={''}
                    width={100} height={100} objectFit='cover'
                />

            </div>
            {!upload &&  <div className={`flex items-center justify-center cursor-pointer `}>

                <input
                    className={`flex file:bg-[#3b81f6] file:text-white file:mr-4 file:py-2 text-sm text-slate-400
                                    file:uppercase file:text-sm file:px-4 file:rounded-full file:border-0
                                    file:cursor-pointer
                                    `}
                    type="file"
                    id="file"
                    onChange={(e)=> {
                        setFile(e.target.files[0])
                        setUpload(true)
                    }}

                />
            </div>}

            <div className={`flex  items-center gap-2`}>
                {upload && <button
                    onClick={handleClick}
                    className={`bg-green-500 text-white uppercase py-1 px-2 rounded text-sm font-bold`}>Add
                    Img</button>}
            </div>
        </div>
    );
};

export default UploadImg;
