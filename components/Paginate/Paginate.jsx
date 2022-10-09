import React, {useEffect, useState} from 'react';
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/outline'
import { usePagination, DOTS} from './usePagination';

const Paginate = (props) => {

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;



    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    const onNext = () => {
        if(currentPage === lastPage){

        }else{
            onPageChange(currentPage + 1);
        }

    };

    const onPrevious = () => {
        if(currentPage === 1){

        }else{
            onPageChange(currentPage - 1);
        }

    };
    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className="flex items-center justify-end pt-5 pr-16 space-x-1 text-sm ">
            <li
                onClick={onPrevious}

                className="flex items-center px-2 py-1.5 text-gray-500 bg-gray-300 rounded-md  hover:bg-blue-400 hover:text-white" >
                <ArrowLeftIcon className={`w-4 h-4`}/>

            </li>
            {paginationRange.map((pageNumber,idx)=>{
                if(pageNumber === DOTS){
                    return  <li className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">&#8230;</li>
                }
                return (
                    <li key={idx}
                        onClick={()=> onPageChange(pageNumber)}
                        className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                        {pageNumber}
                    </li>
                )
            })}
            <li
                onClick={onNext}
                className="px-2 py-1.5 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
                <ArrowRightIcon className={`w-4 h-4`}/>


            </li>
        </ul>
    );
};

export default Paginate;
