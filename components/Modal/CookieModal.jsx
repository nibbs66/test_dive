import React from 'react';
import Cookie from "../icons/Cookie";


const CookieModal = ({ setOpen}) => {
    return (
        <div className={`container`}>
            <div   onClick={()=>setOpen(true)} className={`fixed flex items-center justify-center left-4 bottom-6 h-12 w-12 border-4 border-[ghostwhite] rounded-full bg-blue-500 hover:bg-blue-600 drop-shadow-lg cursor-pointer z-50`}>
                <Cookie />
            </div>
        </div>
    );
};

export default CookieModal;
/*<div className={`fixed flex items-center justify-center left-4 bottom-10 h-12 w-12 border border-[ghostwhite] rounded-full bg-blue-500 drop-shadow-lg cursor-pointer z-50`}>
                   <Cookie className={`text-slate-400 z-50`}/>
               </div>*/
