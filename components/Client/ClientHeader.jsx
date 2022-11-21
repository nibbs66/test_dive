import React from 'react';
import ArrowBack from "../icons/ArrowBack";
import {useRouter} from "next/router";
import {ChevronDoubleLeftIcon} from '@heroicons/react/24/outline'
const ClientHeader = ({title, lastPage}) => {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/`+lastPage)
    }
    return (
        <div className=' w-screen'>
            <div className="flex items-center sm:justify-around justify-evenly pt-6 uppercase text-slate-400 font-thin w-screen">
                <div onClick={handleClick} className="flex items-center gap-1 cursor-pointer hover:text-slate-600  md:text-3xl">
                    <div className={`hidden sm:block`}>
                        <ChevronDoubleLeftIcon className={`h-8 w-8`}/>
                    </div>
                    <div  className={`sm:hidden block`}>
                        <ChevronDoubleLeftIcon  className={`h-8 w-8`}/>
                    </div>
                    <span >Terug</span>

                </div>
                <div className={`md:text-3xl`}>
                    <span>{title}</span>
                </div>
            </div>

        </div>
    );
};

export default ClientHeader;
