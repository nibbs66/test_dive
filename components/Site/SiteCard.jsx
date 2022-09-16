import React from 'react';
import NewPage from "./NewPage";
import PageLayout from "./Page/PageLayout";

const SiteCard = ({name, getData}) => {
    return (
        <div
             className="px-3 py-3 gap-4 flex flex-col border border-gray-200 rounded-md h-32 items-center bg-white cursor-pointer">
            <div>
                <div className="font-bold text-slate-400 uppercase text-center">{name}</div>


            </div>

            <div className="flex  gap-5 items-center">

                <span className={`bg-red-500 text-white py-1 px-2 rounded uppercase text-sm`}>Edit</span>
                <span  onClick={()=>getData(<NewPage title={<PageLayout/>}/>)} className={`bg-blue-500 text-white py-1 px-2 rounded uppercase text-sm`}>New</span>
            </div>
        </div>
    );
};

export default SiteCard;
